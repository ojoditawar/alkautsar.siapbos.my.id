<?php

namespace App\Http\Controllers;

use App\Models\MutiaraImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MutiaraImageController extends Controller
{
    public function index(): Response
    {
        $masjidId = auth()->user()->masjid_id;

        $images = MutiaraImage::where('masjid_id', $masjidId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($img) => [
                'id' => $img->id,
                'masjid_id' => $img->masjid_id,
                'image' => $img->image,
                'caption' => $img->caption,
                'is_active' => (bool) $img->is_active,
                'order' => (int) $img->order,
                'created_at' => $img->created_at,
            ]);

        return Inertia::render('MutiaraImages/Index', [
            'images' => $images,
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-mutiara-images'), 403);

        return Inertia::render('MutiaraImages/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-mutiara-images'), 403);

        $validated = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $imagePath = $request->file('image')->store('mutiara-images', 'public');

        MutiaraImage::create([
            'masjid_id' => auth()->user()->masjid_id,
            'image' => $imagePath,
            'caption' => $validated['caption'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $validated['order'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gambar Mutiara berhasil ditambahkan.']);

        return to_route('mutiara-images.index');
    }

    public function edit(MutiaraImage $mutiaraImage): Response
    {
        abort_unless(auth()->user()->can('edit-mutiara-images'), 403);

        $masjidId = auth()->user()->masjid_id;

        if ($mutiaraImage->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('MutiaraImages/Edit', [
            'mutiaraImage' => [
                'id' => $mutiaraImage->id,
                'masjid_id' => $mutiaraImage->masjid_id,
                'image' => $mutiaraImage->image,
                'caption' => $mutiaraImage->caption,
                'is_active' => (bool) $mutiaraImage->is_active,
                'order' => (int) $mutiaraImage->order,
            ],
        ]);
    }

    public function update(Request $request, MutiaraImage $mutiaraImage): RedirectResponse
    {
        abort_unless($request->user()->can('edit-mutiara-images'), 403);

        $masjidId = auth()->user()->masjid_id;

        if ($mutiaraImage->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data = [
            'caption' => $validated['caption'] ?? $mutiaraImage->caption,
            'is_active' => $validated['is_active'] ?? $mutiaraImage->is_active,
            'order' => $validated['order'] ?? $mutiaraImage->order,
        ];

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($mutiaraImage->image) {
                Storage::disk('public')->delete($mutiaraImage->image);
            }

            $data['image'] = $request->file('image')->store('mutiara-images', 'public');
        }

        $mutiaraImage->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gambar Mutiara berhasil diperbarui.']);

        return to_route('mutiara-images.index');
    }

    public function destroy(MutiaraImage $mutiaraImage): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-mutiara-images'), 403);

        $masjidId = auth()->user()->masjid_id;

        if ($mutiaraImage->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        // Delete image file if exists
        if ($mutiaraImage->image) {
            Storage::disk('public')->delete($mutiaraImage->image);
        }

        $mutiaraImage->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gambar Mutiara berhasil dihapus.']);

        return to_route('mutiara-images.index');
    }
}

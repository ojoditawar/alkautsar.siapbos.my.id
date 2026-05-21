<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HijriHoliday;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

use Inertia\Inertia;

class HijriHolidayController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        $holidays = HijriHoliday::orderBy('gregorian_date', 'asc')
            ->get()
            ->map(function ($holiday) use ($today) {
                $diff = $today->diffInDays($holiday->gregorian_date, false);
                $holiday->days_left = $diff;
                return $holiday;
            });

        return Inertia::render('HijriHolidays/Index', [
            'holidays' => $holidays
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'hijri_date' => 'nullable|string',
            'gregorian_date' => 'required|date',
        ]);

        HijriHoliday::create($validated);
        return redirect()->back();
    }

    public function sync(Request $request)
    {
        $year = $request->input('year', date('Y'));
        $count = 0;

        // MyQuran API v2 Holiday endpoint: /cal/holiday/{year}/{month}
        // We sync all months for the given year
        for ($month = 1; $month <= 12; $month++) {
            $response = Http::get("https://api.myquran.com/v1/cal/holiday/{$year}/" . str_pad($month, 2, '0', STR_PAD_LEFT));
            
            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['status']) && $data['status'] === true && isset($data['data'])) {
                    foreach ($data['data'] as $item) {
                        // Check if already exists by name and date
                        HijriHoliday::updateOrCreate(
                            [
                                'name' => $item['name'],
                                'gregorian_date' => $item['date'],
                            ],
                            [
                                'hijri_date' => $item['hijri'] ?? null,
                                'is_sync' => true,
                            ]
                        );
                        $count++;
                    }
                }
            }
        }

        return redirect()->back()->with('success', "Successfully synced {$count} holidays for year {$year}.");
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'hijri_date' => 'nullable|string',
            'gregorian_date' => 'required|date',
        ]);

        $holiday = HijriHoliday::findOrFail($id);
        $holiday->update($validated);

        return redirect()->back()->with('success', 'Hari besar berhasil diperbarui');
    }

    public function duplicate(Request $request, $id)
    {
        $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
        ]);

        $holiday = HijriHoliday::findOrFail($id);
        $newDate = Carbon::parse($holiday->gregorian_date)->setYear($request->year)->toDateString();

        HijriHoliday::create([
            'name' => $holiday->name,
            'hijri_date' => $holiday->hijri_date,
            'gregorian_date' => $newDate,
            'is_sync' => false,
        ]);

        return redirect()->back()->with('success', "Hari besar berhasil dicopy ke tahun {$request->year}.");
    }

    public function destroy($id)
    {
        $holiday = HijriHoliday::findOrFail($id);
        $holiday->delete();

        return redirect()->back()->with('success', 'Holiday deleted successfully.');
    }
}

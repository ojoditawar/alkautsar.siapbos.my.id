<?php

namespace App\Http\Controllers;

use App\Models\Pekurban;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class PekurbanPdfController extends Controller
{
    public function generate(Request $request)
    {
        $query = Pekurban::with(['detail_pekurbans', 'user']);

        // Filter search
        if ($request->filled('search') && $request->search !== 'undefined') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('kelompok_pequrban', 'like', "%{$search}%")
                  ->orWhere('sapi', 'like', "%{$search}%")
                  ->orWhere('kelas', 'like', "%{$search}%");
            });
        }

        // Filter tahun
        if ($request->filled('tahun') && $request->tahun !== 'all' && $request->tahun !== 'undefined') {
            $query->where('tahun', $request->tahun);
        }

        // Filter jenis
        if ($request->filled('jenis') && $request->jenis !== 'all' && $request->jenis !== 'undefined') {
            $query->where('jenis', $request->jenis);
        }

        // Filter status bayar
        $status_bayar = $request->input('status_bayar');
        if ($status_bayar !== null && $status_bayar !== 'all' && $status_bayar !== 'undefined') {
            $query->whereHas('detail_pekurbans', function ($sub) use ($status_bayar) {
                $sub->where('bayar', $status_bayar);
            });
            // Also filter the details themselves for the PDF
            $query->with(['detail_pekurbans' => function ($sub) use ($status_bayar) {
                $sub->where('bayar', $status_bayar);
            }]);
        }

        $pekurbans = $query->orderBy('tahun', 'desc')
                           ->orderBy('jenis', 'asc')
                           ->orderBy('kelompok_pequrban', 'asc')
                           ->get();

        $data = [
            'pekurbans' => $pekurbans,
            'filters' => [
                'tahun' => $request->tahun ?? 'Semua',
                'jenis' => $request->jenis ?? 'Semua',
                'search' => $request->search ?? '-',
                'status_bayar' => $status_bayar == '0' ? 'Belum Transfer' : ($status_bayar == '1' ? 'Sudah Lunas' : 'Semua'),
            ],
            'date' => Carbon::now()->translatedFormat('d F Y H:i'),
        ];

        $pdf = Pdf::loadView('report.pekurban', $data);
        $pdf->setPaper('A4', 'landscape');

        return $pdf->stream('daftar-pekurban-' . date('Y-m-d') . '.pdf');
    }
}

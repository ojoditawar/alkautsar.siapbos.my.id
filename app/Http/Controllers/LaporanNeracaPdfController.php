<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanNeracaPdfController extends Controller
{
    public function generate()
    {
        $neraca = session('neraca_data');
        $totals = session('neraca_totals');
        $params = session('neraca_params');

        if (!$neraca || !$params) {
            return redirect()->back()->with('error', 'Data laporan neraca tidak ditemukan');
        }

        $masjid = null;
        if (!empty($params['masjid_id'])) {
            $masjid = Masjid::find($params['masjid_id']);
        }

        $data = [
            'neraca' => $neraca,
            'totals' => $totals ?? ['aset' => 0, 'kewajiban' => 0, 'ekuitas' => 0],
            'tanggal_mulai' => $params['tanggal_mulai'],
            'tanggal_akhir' => $params['tanggal_akhir'],
            'masjid' => $masjid,
        ];

        session()->forget(['neraca_data', 'neraca_totals', 'neraca_params']);

        $pdf = Pdf::loadView('report.neraca', $data);
        $pdf->setPaper('A4', 'portrait');

        return $pdf->stream('laporan-neraca-' . date('Y-m-d-H-i-s') . '.pdf');
    }
}

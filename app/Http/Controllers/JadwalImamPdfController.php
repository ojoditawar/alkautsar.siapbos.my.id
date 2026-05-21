<?php

namespace App\Http\Controllers;

use App\Models\JadwalImam;
use App\Models\Masjid;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JadwalImamPdfController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'bulan' => 'required|date_format:Y-m',
        ]);

        $bulan = $request->input('bulan'); // e.g. "2026-04"
        $tahun = (int) substr($bulan, 0, 4);
        $bln = (int) substr($bulan, 5, 2);

        $jadwals = JadwalImam::with('masjid:id,nama')
            ->whereYear('tanggal', $tahun)
            ->whereMonth('tanggal', $bln)
            ->orderBy('tanggal')
            ->get();

        // Get masjid from first record or user's masjid
        $masjid = null;
        if ($jadwals->isNotEmpty() && $jadwals->first()->masjid) {
            $masjid = $jadwals->first()->masjid;
        } else {
            $masjid = Masjid::first();
        }

        $namaBulan = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];

        $data = [
            'jadwals' => $jadwals,
            'masjid' => $masjid,
            'bulan' => $namaBulan[$bln] ?? '',
            'tahun' => $tahun,
        ];

        $pdf = Pdf::loadView('report.jadwal-imam', $data);
        $pdf->setPaper('A4', 'landscape');

        return $pdf->stream("jadwal-imam-{$bulan}.pdf");
    }

    public function rekap(Request $request)
    {
        $request->validate([
            'bulan' => 'required|date_format:Y-m',
        ]);

        $bulan = $request->input('bulan');
        $tahun = (int) substr($bulan, 0, 4);
        $bln = (int) substr($bulan, 5, 2);

        $masjidId = auth()->user()->masjid_id;

        $sql = "
            SELECT 
                nama_imam,
                SUM(subuh) AS subuh,
                SUM(magrib) AS magrib,
                SUM(isya) AS isya,
                SUM(subuh + magrib + isya) AS total
            FROM (
                SELECT imam_subuh AS nama_imam, 1 AS subuh, 0 AS magrib, 0 AS isya
                FROM jadwal_imams
                WHERE masjid_id = ?
                  AND EXTRACT(YEAR FROM tanggal) = ?
                  AND EXTRACT(MONTH FROM tanggal) = ?

                UNION ALL

                SELECT imam_magrib AS nama_imam, 0 AS subuh, 1 AS magrib, 0 AS isya
                FROM jadwal_imams
                WHERE masjid_id = ?
                  AND EXTRACT(YEAR FROM tanggal) = ?
                  AND EXTRACT(MONTH FROM tanggal) = ?

                UNION ALL

                SELECT imam_isya AS nama_imam, 0 AS subuh, 0 AS magrib, 1 AS isya
                FROM jadwal_imams
                WHERE masjid_id = ?
                  AND EXTRACT(YEAR FROM tanggal) = ?
                  AND EXTRACT(MONTH FROM tanggal) = ?
            ) AS gabungan
            WHERE nama_imam IS NOT NULL
              AND nama_imam <> ''
            GROUP BY nama_imam
            ORDER BY total DESC, nama_imam ASC
        ";

        $frekuensiImam = DB::select($sql, [
            $masjidId,
            $tahun,
            $bln,
            $masjidId,
            $tahun,
            $bln,
            $masjidId,
            $tahun,
            $bln,
        ]);

        $masjid = Masjid::find($masjidId);

        $namaBulan = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];

        $data = [
            'frekuensiImam' => $frekuensiImam,
            'masjid' => $masjid,
            'bulan' => $namaBulan[$bln] ?? '',
            'tahun' => $tahun,
        ];

        $pdf = Pdf::loadView('report.rekap-imam', $data);
        $pdf->setPaper('A4', 'portrait');

        return $pdf->stream("rekap-imam-{$bulan}.pdf");
    }
}

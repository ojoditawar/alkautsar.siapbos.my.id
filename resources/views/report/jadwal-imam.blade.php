<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Jadwal Imam {{ $bulan }} {{ $tahun }}</title>
    <style>
        @page {
            margin: 15mm 12mm 15mm 12mm;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #111827;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header .masjid-name {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 2px;
        }

        .header .masjid-address {
            font-size: 10px;
            color: #4b5563;
            margin-bottom: 10px;
        }

        .header .title-box {
            display: inline-block;
            border: 2px solid #111827;
            padding: 6px 20px;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        .period {
            text-align: center;
            font-size: 11px;
            margin-bottom: 12px;
            color: #374151;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        table th,
        table td {
            border: 1px solid #374151;
            padding: 5px 8px;
        }

        table thead th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            font-size: 11px;
        }

        table tbody td {
            font-size: 10px;
        }

        table tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .footer {
            margin-top: 20px;
            font-size: 9px;
            color: #6b7280;
            text-align: right;
        }
    </style>
</head>

<body>
    <div class="header">
        @if ($masjid)
            <div class="masjid-name">{{ $masjid->nama }}</div>
            @if ($masjid->alamat)
                <div class="masjid-address">{{ $masjid->alamat }}</div>
            @endif
        @endif
        <div class="title-box">
            JADWAL IMAM & MUAZDIN SHALAT SUBUH, MAGRIB & ISYA
        </div>
    </div>

    <div class="period">
        Bulan {{ $bulan }} {{ $tahun }}
    </div>

    <table>
        <thead>
            <tr>
                <th rowspan="2" style="width: 20%;">TANGGAL</th>
                <th rowspan="2" style="width: 16%;">MUAZDIN</th>
                <th colspan="3">IMAM</th>
            </tr>
            <tr>
                <th style="width: 22%;">SUBUH</th>
                <th style="width: 22%;">MAGRIB</th>
                <th style="width: 20%;">ISYA</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($jadwals as $item)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($item->tanggal)->translatedFormat('d F Y') }} - {{ strtoupper($item->hari) }}</td>
                    <td>{{ strtoupper($item->muadzin) }}</td>
                    <td>{{ strtoupper($item->imam_subuh) }}</td>
                    <td>{{ strtoupper($item->imam_magrib) }}</td>
                    <td>{{ strtoupper($item->imam_isya) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center; padding: 20px; color: #6b7280;">
                        Tidak ada data jadwal imam untuk bulan ini.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dicetak pada {{ \Carbon\Carbon::now()->translatedFormat('d F Y H:i') }}
    </div>
</body>

</html>

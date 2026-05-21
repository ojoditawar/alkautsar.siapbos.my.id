<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Rekap Frekuensi Imam {{ $bulan }} {{ $tahun }}</title>
    <style>
        @page {
            margin: 18mm 15mm 18mm 15mm;
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
            padding: 6px 10px;
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

        table tbody td.number {
            text-align: center;
        }

        table tbody td.currency {
            text-align: right;
        }

        table tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .note {
            margin-top: 14px;
            font-size: 9px;
            color: #6b7280;
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
            REKAP FREKUENSI IMAM & HONOR
        </div>
    </div>

    <div class="period">
        Bulan {{ $bulan }} {{ $tahun }}
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 5%;">NO</th>
                <th style="width: 25%;">NAMA IMAM</th>
                <th style="width: 10%;">SUBUH</th>
                <th style="width: 10%;">MAGRIB</th>
                <th style="width: 10%;">ISYA</th>
                <th style="width: 10%;">TOTAL</th>
                <th style="width: 30%;">HONOR</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($frekuensiImam as $index => $item)
            @php
            $total = (int) $item->total;
            $honor = floor($total / 2) * 50000;
            @endphp
            <tr>
                <td class="number">{{ $index + 1 }}</td>
                <td>{{ strtoupper($item->nama_imam) }}</td>
                <td class="number">{{ $item->subuh }}</td>
                <td class="number">{{ $item->magrib }}</td>
                <td class="number">{{ $item->isya }}</td>
                <td class="number">{{ $total }}</td>
                <td class="currency">
                    {{ $total }} : 2 = {{ floor($total / 2) }} x Rp 50.000 = <strong>Rp {{ number_format($honor, 0, ',', '.') }}</strong>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px; color: #6b7280;">
                    Tidak ada data rekap imam untuk bulan ini.
                </td>
            </tr>
            @endforelse
        </tbody>
        <tfoot>
            @php
            $totalHonor = collect($frekuensiImam)->sum(function ($item) {
            return floor((int) $item->total / 2) * 50000;
            });
            @endphp
            <tr>
                <td colspan="6" style="text-align: right; font-weight: bold; padding: 8px 10px;">
                    TOTAL HONOR
                </td>
                <td class="currency" style="font-weight: bold; text-align: right; font-size: 11px;">
                    <strong>Rp {{ number_format($totalHonor, 0, ',', '.') }}</strong>
                </td>
            </tr>
        </tfoot>
    </table>

    <div class="w-full flex justify-between items-start">
        <div class="note">
            *) Honor dihitung: Total / 2 x Rp 50.000
        </div>
        <div class="font-semibold text-right">
            PIC: Indra Sugiri
        </div>
    </div>

    <div class="footer">
        Dicetak pada {{ \Carbon\Carbon::now()->translatedFormat('d F Y H:i') }}
    </div>
</body>

</html>
<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan Neraca</title>
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
            border-bottom: 2px solid #374151;
            padding-bottom: 8px;
            margin-bottom: 14px;
        }

        .header .title {
            font-size: 18px;
            font-weight: bold;
            color: #111827;
        }

        .header .subtitle {
            font-size: 11px;
            color: #4b5563;
            margin-top: 4px;
        }

        .header .periode {
            font-size: 10.5px;
            color: #4b5563;
            font-style: italic;
            margin-top: 2px;
        }

        .section-header {
            background: #e5e7eb;
            padding: 6px 10px;
            font-weight: bold;
            font-size: 12px;
            border-bottom: 2px solid #6b7280;
            margin-top: 12px;
            margin-bottom: 0;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        table.neraca-table {
            width: 100%;
            border-collapse: collapse;
        }

        table.neraca-table td {
            padding: 5px 8px;
            border-bottom: 1px dotted #d1d5db;
            vertical-align: top;
        }

        .lv1 td {
            background: #f3f4f6;
            font-weight: bold;
            font-size: 11.5px;
            border-bottom: 1px solid #9ca3af;
        }

        .lv2 td {
            font-weight: bold;
             font-size: 10.5px;
            padding-left: 18px !important;
        }

        .lv3 td {
            padding-left: 36px !important;
            color: #374151;
        }

        .text-right {
            text-align: right;
            white-space: nowrap;
        }

        .status-box {
            margin-top: 18px;
            padding: 10px;
            border: 1.5px solid #d1d5db;
            border-radius: 4px;
            background: #f3f4f6;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
        }

        .status-seimbang {
            color: #047857;
        }

        .status-tidak-seimbang {
            color: #b91c1c;
        }

        .totals-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        .totals-table td {
            padding: 4px 8px;
        }

        .footer {
            margin-top: 18px;
            border-top: 1px solid #d1d5db;
            padding-top: 6px;
            font-size: 9.5px;
            color: #6b7280;
            text-align: right;
        }

        .empty-row td {
            text-align: center;
            font-style: italic;
            color: #6b7280;
            padding: 10px;
        }
    </style>
</head>

<body>

    @php
        $fmt = function ($n) {
            return number_format((float) $n, 0, ',', '.');
        };
        $totalAset = $totals['aset'] ?? 0;
        $totalKewajiban = $totals['kewajiban'] ?? 0;
        $totalEkuitas = $totals['ekuitas'] ?? 0;
        $totalKewEkuitas = $totalKewajiban + $totalEkuitas;
        $selisih = $totalAset - $totalKewEkuitas;
        $seimbang = abs($selisih) < 0.01;
    @endphp

    <div class="header">
        <div class="title">LAPORAN NERACA</div>
        <div class="subtitle">{{ $masjid?->nama ?? '-' }}</div>
        <div class="periode">
            Periode: {{ \Carbon\Carbon::parse($tanggal_mulai)->format('d/m/Y') }}
            &ndash;
            {{ \Carbon\Carbon::parse($tanggal_akhir)->format('d/m/Y') }}
        </div>
    </div>

    @foreach (['aset' => 'ASET', 'kewajiban' => 'KEWAJIBAN', 'ekuitas' => 'EKUITAS'] as $key => $label)
        <div class="section-header">{{ $label }}</div>
        <table class="neraca-table">
            @forelse($neraca[$key] ?? [] as $lv1)
                <tr class="lv1">
                    <td>{{ $lv1['kode'] }} - {{ $lv1['nama'] }}</td>
                    <td class="text-right">Rp {{ $fmt($lv1['saldo']) }}</td>
                </tr>
                @foreach ($lv1['children'] ?? [] as $lv2)
                    <tr class="lv2">
                        <td>{{ $lv2['kode'] }} - {{ $lv2['nama'] }}</td>
                        <td class="text-right">Rp {{ $fmt($lv2['saldo']) }}</td>
                    </tr>
                    @foreach ($lv2['children'] ?? [] as $lv3)
                        <tr class="lv3">
                            <td>{{ $lv3['kode'] }} - {{ $lv3['nama'] }}</td>
                            <td class="text-right">Rp {{ $fmt($lv3['saldo']) }}</td>
                        </tr>
                    @endforeach
                @endforeach
            @empty
                <tr class="empty-row">
                    <td colspan="2">Tidak ada data.</td>
                </tr>
            @endforelse
        </table>
    @endforeach

    <table class="totals-table">
        <tr class="lv1">
            <td>TOTAL ASET</td>
            <td class="text-right">Rp {{ $fmt($totalAset) }}</td>
        </tr>
        <tr class="lv1">
            <td>TOTAL KEWAJIBAN + EKUITAS</td>
            <td class="text-right">Rp {{ $fmt($totalKewEkuitas) }}</td>
        </tr>
    </table>

    <div class="status-box {{ $seimbang ? 'status-seimbang' : 'status-tidak-seimbang' }}">
        @if ($seimbang)
            Status Neraca: SEIMBANG
        @else
            Status Neraca: TIDAK SEIMBANG (Selisih: Rp {{ $fmt($selisih) }})
        @endif
    </div>

    <div class="footer">
        Dicetak: {{ now()->format('d/m/Y H:i:s') }}
    </div>

</body>

</html>

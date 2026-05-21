<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Daftar Pekurban</title>
    <style>
        @page {
            margin: 15mm 15mm 15mm 15mm;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #111827;
            margin: 0;
            padding: 0;
        }

        .header {
            border-bottom: 2px solid #374151;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }

        .title {
            font-size: 18px;
            font-weight: bold;
            color: #111827;
            margin: 0;
        }

        .subtitle {
            font-size: 11px;
            color: #4b5563;
            margin-top: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th, td {
            border: 1px solid #d1d5db;
            padding: 4px 4px;
            vertical-align: middle;
        }

        th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-align: center;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .status-lunas {
            color: #047857;
            font-weight: bold;
        }

        .status-belum {
            color: #b91c1c;
            font-weight: bold;
        }

        .footer {
            margin-top: 20px;
            font-size: 10px;
            color: #6b7280;
            text-align: right;
        }
        
        .badge {
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 9px;
            font-weight: bold;
        }
        
        .badge-sapi { background-color: #fef3c7; color: #92400e; }
        .badge-domba { background-color: #f3e8ff; color: #6b21a8; }
        .badge-kambing { background-color: #ffedd5; color: #9a3412; }
    </style>
</head>

<body>
    <div class="header">
        <div class="title">Daftar Pekurban</div>
        <div class="subtitle">
            Tahun: {{ $filters['tahun'] }} | Jenis: {{ $filters['jenis'] == '1' ? 'Sapi' : ($filters['jenis'] == '2' ? 'Domba' : ($filters['jenis'] == '3' ? 'Kambing' : 'Semua')) }}<br>
            Dicetak pada: {{ $date }}
        </div>
    </div>

    <table style="table-layout: fixed;">
        <thead style="display: table-header-group;">
            <tr>
                <th style="width: 4%;">No</th>
                <th style="width: 12%;">Kelas</th>
                <th style="width: 32%;">Kelompok Pekurban</th>
                <th style="width: 35%;">Nama Detail Pekurban</th>
                <th style="width: 17%;">Status</th>
            </tr>
        </thead>
        @php $no = 1; @endphp
        @forelse($pekurbans as $pekurban)
            @php 
                $details = $pekurban->detail_pekurbans;
                $rowCount = count($details) > 0 ? count($details) : 1;
            @endphp
            <tbody style="page-break-inside: avoid;">
                @if(count($details) > 0)
                    @foreach($details as $index => $detail)
                        <tr>
                            <td class="text-center" style="{{ $index > 0 ? 'border-top: none;' : '' }}">
                                {{ $index === 0 ? $no++ : '' }}
                            </td>
                            <td class="text-center" style="{{ $index > 0 ? 'border-top: none;' : '' }}">
                                {{ $index === 0 ? $pekurban->kelas : '' }}
                            </td>
                            <td style="{{ $index > 0 ? 'border-top: none;' : '' }}">
                                @if($index === 0)
                                    <strong>{{ $pekurban->kelompok_pequrban }}</strong><br>
                                    <small>{{ $pekurban->sapi }}</small>
                                @endif
                            </td>
                            <td>
                                {{ $detail->nama }}
                                @if($detail->bagian)
                                    <br><small>Bagian: {{ $detail->bagian }}</small>
                                @endif
                            </td>
                            <td class="text-center">
                                @if($detail->bayar)
                                    <span class="status-lunas">Lunas</span>
                                @else
                                    <span class="status-belum">Belum Transfer</span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td class="text-center">{{ $no++ }}</td>
                        <td>
                            <strong>{{ $pekurban->kelompok_pequrban }}</strong><br>
                            <small>{{ $pekurban->sapi ?? '-' }}</small>
                        </td>
                        <td class="text-center">{{ $pekurban->kelas ?? '-' }}</td>
                        <td class="text-center italic text-gray-500" style="color: #6b7280;">- Belum ada peserta -</td>
                        <td class="text-center">-</td>
                    </tr>
                @endif
            </tbody>
        @empty
            <tbody>
                <tr>
                    <td colspan="5" class="text-center italic">Tidak ada data pekurban.</td>
                </tr>
            </tbody>
        @endforelse
    </table>

    <div class="footer">
        Halaman 1 dari 1
    </div>
</body>

</html>

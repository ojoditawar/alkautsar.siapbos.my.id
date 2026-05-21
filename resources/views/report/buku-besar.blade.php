<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan Buku Besar</title>
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

        .page-wrap {
            page-break-after: always;
        }

        .page-wrap-last {
            page-break-after: auto;
        }

        /* ── Header ── */
        .header {
            border-bottom: 2px solid #374151;
            padding-bottom: 8px;
            margin-bottom: 14px;
        }

        .header-top {
            width: 100%;
            border-collapse: collapse;
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            color: #111827;
        }

        .subtitle {
            font-size: 10px;
            color: #4b5563;
            margin-top: 3px;
        }

        .page-number {
            font-size: 10px;
            color: #6b7280;
            text-align: right;
            vertical-align: top;
            white-space: nowrap;
        }

        /* ── Section ── */
        .section {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            overflow: hidden;
        }

        .section-head {
            background: #f3f4f6;
            padding: 7px 10px;
            border-bottom: 1px solid #d1d5db;
        }

        .section-title {
            font-weight: 700;
            font-size: 12px;
            margin: 0;
            color: #1f2937;
        }

        /* ── Table ── */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 5px 7px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }

        th {
            background: #f9fafb;
            font-weight: 700;
            font-size: 10.5px;
            color: #374151;
        }

        tbody tr:last-child td {
            border-bottom: none;
        }

        tfoot tr td {
            background: #f3f4f6;
            border-top: 2px solid #d1d5db;
            border-bottom: none;
            font-weight: 300;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .col-tanggal  { width: 9%; }
        .col-notrans  { width: 13%; }
        .col-uraian   { width: 36%; }
        .col-nominal  { width: 14%; }

        /* ── Footer ── */
        .footer {
            margin-top: 12px;
            border-top: 1px solid #d1d5db;
            padding-top: 6px;
        }

        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        .footer-left {
            font-size: 10px;
            color: #6b7280;
            text-align: left;
        }

        .footer-right {
            font-size: 10px;
            color: #6b7280;
            text-align: right;
        }

        /* ── Empty state ── */
        .empty-state {
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-style: italic;
        }
    </style>
</head>

<body>

    @forelse($bukuBesar as $group)
        <div class="{{ $loop->last ? 'page-wrap-last' : 'page-wrap' }}">

            {{-- ── Header ── --}}
            <div class="header">
                <table class="header-top">
                    <tr>
                        <td>
                            <div class="title">Laporan Buku Besar</div>
                            <div class="subtitle">
                                Masjid&nbsp;: {{ $masjid?->nama ?? '-' }}<br>
                                Periode&nbsp;: {{ \Carbon\Carbon::parse($tanggal_mulai)->format('d/m/Y') }}
                                &ndash;
                                {{ \Carbon\Carbon::parse($tanggal_akhir)->format('d/m/Y') }}
                            </div>
                        </td>
                        <td class="page-number">
                            Halaman {{ $loop->index + 1 }} / {{ $loop->count }}
                        </td>
                    </tr>
                </table>
            </div>

            {{-- ── Section Buku Besar ── --}}
            <div class="section">
                <div class="section-head">
                    <p class="section-title">
                        {{ $group['rekening']['jenis'] }} &mdash; {{ $group['rekening']['nama'] }}
                    </p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th class="col-tanggal">Tanggal</th>
                            <th class="col-notrans">No. Trans</th>
                            <th class="col-uraian">Uraian</th>
                            <th class="col-nominal text-right">Debet</th>
                            <th class="col-nominal text-right">Kredit</th>
                            <th class="col-nominal text-right">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($group['entries'] as $entry)
                            <tr>
                                <td>{{ \Carbon\Carbon::parse($entry['tanggal'])->format('d/m/Y') }}</td>
                                <td>{{ $entry['no_trans'] ?: '-' }}</td>
                                <td>{{ $entry['uraian'] }}</td>
                                <td class="text-right">
                                    {{ $entry['debet'] ? number_format($entry['debet'], 2, ',', '.') : '-' }}
                                </td>
                                <td class="text-right">
                                    {{ $entry['kredit'] ? number_format($entry['kredit'], 2, ',', '.') : '-' }}
                                </td>
                                <td class="text-right">
                                    {{ number_format($entry['saldo'], 2, ',', '.') }}
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="empty-state">Tidak ada entri.</td>
                            </tr>
                        @endforelse
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">Total</td>
                            <td class="text-right">
                                {{ number_format($group['total_debet'], 2, ',', '.') }}
                            </td>
                            <td class="text-right">
                                {{ number_format($group['total_kredit'], 2, ',', '.') }}
                            </td>
                            <td class="text-right">
                                {{ number_format($group['saldo_akhir'], 2, ',', '.') }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {{-- ── Footer ── --}}
            <div class="footer">
                <table class="footer-table">
                    <tr>
                        <td class="footer-left">
                            Rekening ke-{{ $loop->index + 1 }} dari {{ $loop->count }}
                            &nbsp;&bull;&nbsp;
                            {{ $group['rekening']['jenis'] }} &mdash; {{ $group['rekening']['nama'] }}
                        </td>
                        <td class="footer-right">
                            Dicetak: {{ now()->format('d/m/Y H:i:s') }}
                        </td>
                    </tr>
                </table>
            </div>

        </div>
    @empty
        <div class="empty-state">
            Tidak ada data buku besar untuk periode yang dipilih.
        </div>
    @endforelse

</body>

</html>

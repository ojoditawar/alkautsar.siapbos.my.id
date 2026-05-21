<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Daftar Rekening</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 10px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }

        .header h1 {
            font-size: 16px;
            margin-bottom: 4px;
        }

        .header p {
            font-size: 10px;
            color: #666;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 6px 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
        }

        td {
            border: 1px solid #ddd;
            padding: 5px 8px;
            font-size: 10px;
        }

        .row-rek {
            background-color: #e8f4fd;
            font-weight: bold;
        }

        .row-rek td {
            border-bottom: 1px solid #b0d4f1;
            font-size: 11px;
        }

        .row-subrek {
            background-color: #f5f5f5;
            font-weight: bold;
        }

        .row-subrek td {
            padding-left: 20px;
        }

        .row-jenis td {
            padding-left: 40px;
            font-weight: normal;
        }

        .footer {
            margin-top: 20px;
            text-align: right;
            font-size: 9px;
            color: #999;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>CART OF ACCOUNT</h1>
        <p>Daftar Struktur Rekening, Sub Rekening, dan Jenis Rekening</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 15%;">Kode</th>
                <th>Nama</th>
                <th style="width: 12%;">Level</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($reks as $rek)
            <tr class="row-rek">
                <td>{{ $rek->kode }}</td>
                <td>{{ $rek->nama }}</td>
                <td>Rekening</td>
            </tr>
            @foreach ($rek->subReks as $subRek)
            <tr class="row-subrek">
                <td>{{ $subRek->kelompok }}</td>
                <td>{{ $subRek->nama }}</td>
                <td>Sub Rekening</td>
            </tr>
            @foreach ($subRek->rekenings as $rekening)
            <tr class="row-jenis">
                <td>{{ $rekening->jenis }}</td>
                <td>{{ $rekening->nama }}</td>
                <td>Jenis</td>
            </tr>
            @endforeach
            @endforeach
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak pada: {{ $tanggal }}
    </div>
</body>

</html>
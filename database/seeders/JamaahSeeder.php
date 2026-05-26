<?php

namespace Database\Seeders;

use App\Models\Jamaah;
use App\Models\Masjid;
use Illuminate\Database\Seeder;

class JamaahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil masjid pertama dari database agar berelasi dengan benar
        $masjid = Masjid::first();
        if (!$masjid) {
            $this->command->warn('Tidak ada data Masjid ditemukan. Silakan jalankan seeder Masjid terlebih dahulu.');
            return;
        }

        $masjidId = $masjid->id;

        // Data jamaah dari tabel gambar (melewatkan baris dengan nama "Kosong")
        $jamaahData = [
            ['nama' => 'Panji', 'no_rumah' => '1'],
            ['nama' => 'Flansia', 'no_rumah' => '2'],
            ['nama' => 'Ikko Arindi', 'no_rumah' => '3'],
            ['nama' => 'Wiyarto', 'no_rumah' => '4'],
            // No. 5 & 6 bernilai "Kosong" (dilewati)
            ['nama' => 'Rahman', 'no_rumah' => '7'],
            ['nama' => 'Fahmi', 'no_rumah' => '8'],
            ['nama' => 'Rizaludin', 'no_rumah' => '9'],
            ['nama' => 'Mulyadi', 'no_rumah' => '10'],
            // No. 11 bernilai "Kosong" (dilewati)
            ['nama' => 'Mulyadi', 'no_rumah' => '12'],
            ['nama' => 'Khusnaini', 'no_rumah' => '13'],
            ['nama' => 'Dion Mardiono', 'no_rumah' => '14'],
            ['nama' => 'Asep', 'no_rumah' => '15'],
            ['nama' => 'TPQ Azzahra2', 'no_rumah' => '16'],
            ['nama' => 'Hari Sutopo', 'no_rumah' => '17'],
            ['nama' => 'TPQ Azzahra3', 'no_rumah' => '18'],
            ['nama' => 'Intan', 'no_rumah' => '19'],
            ['nama' => 'Paud', 'no_rumah' => '20'],
            ['nama' => 'Bahtiar', 'no_rumah' => '21'],
        ];

        foreach ($jamaahData as $data) {
            Jamaah::create([
                'masjid_id' => $masjidId,
                'nama' => $data['nama'],
                'rt' => '4',
                'rw' => '11',
                'blok' => 'D1',
                'no_rumah' => $data['no_rumah'],
                'alamat' => 'Griya Anggraini',
                'telpon' => null,
                'art' => 0,
                'foto' => null,
                'status' => 'warga',
            ]);
        }

        $this->command->info('Berhasil menginjek ' . count($jamaahData) . ' data Jamaah.');
    }
}

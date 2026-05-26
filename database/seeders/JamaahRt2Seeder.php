<?php

namespace Database\Seeders;

use App\Models\Jamaah;
use Illuminate\Database\Seeder;

class JamaahRt2Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $masjidId = '96704a80-e2c5-4010-bb39-d3a3df637ef0';

        $jamaahs = [
            // === BLOK B1 ===
            ['nama' => 'Johar', 'blok' => 'B1', 'no' => '1'],
            ['nama' => 'Candi', 'blok' => 'B1', 'no' => '2'],
            ['nama' => 'Nur Asiah Ibu', 'blok' => 'B1', 'no' => '3'],
            ['nama' => 'Kahar', 'blok' => 'B1', 'no' => '4'],
            ['nama' => 'Helman', 'blok' => 'B1', 'no' => '5'],
            ['nama' => 'Abed', 'blok' => 'B1', 'no' => '6'],
            ['nama' => 'Lutfie', 'blok' => 'B1', 'no' => '7'],
            ['nama' => 'Soni W / Novi', 'blok' => 'B1', 'no' => '10'],
            ['nama' => 'Eva/Supir', 'blok' => 'B1', 'no' => '10'],
            ['nama' => 'Dwi Purwanto', 'blok' => 'B1', 'no' => '11'],
            ['nama' => 'Sugiono', 'blok' => 'B1', 'no' => '12'],
            ['nama' => 'Yunhar', 'blok' => 'B1', 'no' => '14'],
            ['nama' => 'Ajar Rohadi', 'blok' => 'B1', 'no' => '23'],
            ['nama' => 'Handoyo', 'blok' => 'B1', 'no' => '24'],
            ['nama' => 'Ibu Herna', 'blok' => 'B1', 'no' => '25'],
            ['nama' => 'Murtado', 'blok' => 'B1', 'no' => '26'],

            // === BLOK B2 ===
            ['nama' => 'Bularbular', 'blok' => 'B2', 'no' => '2'],
            ['nama' => 'Margaret', 'blok' => 'B2', 'no' => '4'],
            ['nama' => 'Halimah', 'blok' => 'B2', 'no' => '5'],
            ['nama' => 'Mulyadi', 'blok' => 'B2', 'no' => '6'],
            ['nama' => 'Ismahari', 'blok' => 'B2', 'no' => '7'],
            ['nama' => 'Yudi', 'blok' => 'B2', 'no' => '9'],
            ['nama' => 'Elang', 'blok' => 'B2', 'no' => '10'],
            ['nama' => 'Sita', 'blok' => 'B2', 'no' => '11'],
            ['nama' => 'Dwi', 'blok' => 'B2', 'no' => '12'],
            ['nama' => 'Isah/Juju', 'blok' => 'B2', 'no' => '13'],
            ['nama' => 'Reno', 'blok' => 'B2', 'no' => '16'],
            ['nama' => 'Angga', 'blok' => 'B2', 'no' => '17'],
            ['nama' => 'Ayep', 'blok' => 'B2', 'no' => '18'],
            ['nama' => 'Janiser', 'blok' => 'B2', 'no' => '19'],
            ['nama' => 'Aris P', 'blok' => 'B2', 'no' => '20'],
            ['nama' => 'Nanang', 'blok' => 'B2', 'no' => '21'],
            ['nama' => 'Jajang', 'blok' => 'B2', 'no' => '22'],
            ['nama' => 'Jaenuddin', 'blok' => 'B2', 'no' => '23'],
            ['nama' => 'Iswahyudi', 'blok' => 'B2', 'no' => '24'],
            ['nama' => 'Uji Doso', 'blok' => 'B2', 'no' => '25'],
            ['nama' => 'Bunda Cece', 'blok' => 'B2', 'no' => '26'],
            ['nama' => 'Cimori', 'blok' => 'B2', 'no' => '27'],

            // === BLOK B3 ===
            ['nama' => 'Marjono', 'blok' => 'B3', 'no' => '1'],
            ['nama' => 'Haryono', 'blok' => 'B3', 'no' => '2'],
            ['nama' => 'Hendra', 'blok' => 'B3', 'no' => '3'],
            ['nama' => 'Louis', 'blok' => 'B3', 'no' => '4'],
            ['nama' => 'B. Nababan', 'blok' => 'B3', 'no' => '5'],
            ['nama' => 'Satrio', 'blok' => 'B3', 'no' => '6'],
            ['nama' => 'Hendrik', 'blok' => 'B3', 'no' => '7'],
            ['nama' => 'Haryanto', 'blok' => 'B3', 'no' => '8'],
            ['nama' => 'Asep Rudi Permana', 'blok' => 'B3', 'no' => '10'],
            ['nama' => 'Jati', 'blok' => 'B3', 'no' => '12'],
            ['nama' => 'Adul', 'blok' => 'B3', 'no' => '15'],
            ['nama' => 'Jimmy', 'blok' => 'B3', 'no' => '16'],
            ['nama' => 'Erwal Hanif', 'blok' => 'B3', 'no' => '17'],
            ['nama' => 'Rangkuti', 'blok' => 'B3', 'no' => '19'],
            ['nama' => 'Alvin', 'blok' => 'B3', 'no' => '20'],
            ['nama' => 'H. Thayeb', 'blok' => 'B3', 'no' => '21'],
            ['nama' => 'Nurhawanto', 'blok' => 'B3', 'no' => '22'],
            ['nama' => 'Dede Haryadi', 'blok' => 'B3', 'no' => '25'],
            ['nama' => 'Willi Roy P', 'blok' => 'B3', 'no' => '28'],

            // === BLOK B4 ===
            ['nama' => 'Edwin', 'blok' => 'B4', 'no' => '1'],
            ['nama' => 'Herman', 'blok' => 'B4', 'no' => '2'],
            ['nama' => 'Ibu Endang', 'blok' => 'B4', 'no' => '5'],
            ['nama' => 'Harji', 'blok' => 'B4', 'no' => '6'],
            ['nama' => 'Siti K', 'blok' => 'B4', 'no' => '7'],
            ['nama' => 'Drajat', 'blok' => 'B4', 'no' => '8'],
            ['nama' => 'A. Rafik', 'blok' => 'B4', 'no' => '9'],
            ['nama' => 'Rahmat', 'blok' => 'B4', 'no' => '10'],
            ['nama' => 'Showroom/Dodi', 'blok' => 'B4', 'no' => '12'],
            ['nama' => 'Showroom/Dedi', 'blok' => 'B4', 'no' => '13'],
            ['nama' => 'Taqih', 'blok' => 'B4', 'no' => '14'],
            ['nama' => 'Tarmizi', 'blok' => 'B4', 'no' => '16'],
            ['nama' => 'Mastoni', 'blok' => 'B4', 'no' => '17'],
            ['nama' => 'Dodon', 'blok' => 'B4', 'no' => '18'],
            ['nama' => 'Ade Darmaji', 'blok' => 'B4', 'no' => '19'],
            ['nama' => 'Andri', 'blok' => 'B4', 'no' => '20'],
            ['nama' => 'Kardi', 'blok' => 'B4', 'no' => '21'],
            ['nama' => 'Hans', 'blok' => 'B4', 'no' => '23'],
            ['nama' => 'Supardi', 'blok' => 'B4', 'no' => '24'],
            ['nama' => 'Jamil', 'blok' => 'B4', 'no' => '25'],
            ['nama' => 'Suparman/Nandar', 'blok' => 'B4', 'no' => '26'],
            ['nama' => 'Abduh', 'blok' => 'B4', 'no' => '27'],

            // === BLOK B5 ===
            ['nama' => 'Halomoan/Mohan', 'blok' => 'B5', 'no' => '2'],
            ['nama' => 'Edi Asmoro', 'blok' => 'B5', 'no' => '3'],
            ['nama' => 'Anti / Alvian', 'blok' => 'B5', 'no' => '4'],
            ['nama' => 'Hesti', 'blok' => 'B5', 'no' => '6'],
            ['nama' => 'Erman', 'blok' => 'B5', 'no' => '7'],
            ['nama' => 'Felis/Ratu', 'blok' => 'B5', 'no' => '8'],
            ['nama' => 'Agus Pratama', 'blok' => 'B5', 'no' => '9'],
            ['nama' => 'Purnomo', 'blok' => 'B5', 'no' => '10'],
            ['nama' => 'Jajang P', 'blok' => 'B5', 'no' => '11'],
            ['nama' => 'Hery', 'blok' => 'B5', 'no' => '12'],
            ['nama' => 'Jamot', 'blok' => 'B5', 'no' => '14'],
            ['nama' => 'Sudin', 'blok' => 'B5', 'no' => '17'],
            ['nama' => 'Jajang A', 'blok' => 'B5', 'no' => '18'],
            ['nama' => 'Imas S', 'blok' => 'B5', 'no' => '20'],
            ['nama' => 'Agus T', 'blok' => 'B5', 'no' => '22'],
            ['nama' => 'Bambang Priadi', 'blok' => 'B5', 'no' => '23'],
            ['nama' => 'Rose Melati', 'blok' => 'B5', 'no' => '24'],
            ['nama' => 'Kurniawan', 'blok' => 'B5', 'no' => '25'],
            ['nama' => 'Tohalimin', 'blok' => 'B5', 'no' => '26'],

            // === BLOK B6 ===
            ['nama' => 'Junaidi', 'blok' => 'B6', 'no' => '2'],
            ['nama' => 'Bayu', 'blok' => 'B6', 'no' => '3'],
            ['nama' => 'Austin/Roselina', 'blok' => 'B6', 'no' => '5'],
            ['nama' => 'Gunadi', 'blok' => 'B6', 'no' => '6'],
            ['nama' => 'Wahyu', 'blok' => 'B6', 'no' => '7'],
            ['nama' => 'Deny', 'blok' => 'B6', 'no' => '9'],
            ['nama' => 'Gusman', 'blok' => 'B6', 'no' => '10'],
            ['nama' => 'Arifin', 'blok' => 'B6', 'no' => '11'],
            ['nama' => 'Irwan', 'blok' => 'B6', 'no' => '14'],
            ['nama' => 'Wiwin', 'blok' => 'B6', 'no' => '15'],
            ['nama' => 'Ibu Dini', 'blok' => 'B6', 'no' => '16'],
            ['nama' => 'Ibu Alwi', 'blok' => 'B6', 'no' => '17'],
            ['nama' => 'J. Situmorang', 'blok' => 'B6', 'no' => '18'],
            ['nama' => 'Afri', 'blok' => 'B6', 'no' => '19'],
            ['nama' => 'Fahmi', 'blok' => 'B6', 'no' => '20'],
            ['nama' => 'Harmidi', 'blok' => 'B6', 'no' => '21'],
            ['nama' => 'Adam', 'blok' => 'B6', 'no' => '22'],
            ['nama' => 'Maulana', 'blok' => 'B6', 'no' => '23'],
            ['nama' => 'Jujun', 'blok' => 'B6', 'no' => '24'],
            ['nama' => 'Agustinus', 'blok' => 'B6', 'no' => '25'],
            ['nama' => 'Asep', 'blok' => 'B6', 'no' => '26'],
            ['nama' => 'Joko', 'blok' => 'B6', 'no' => '27'],
            ['nama' => 'Pujo S', 'blok' => 'B6', 'no' => '29'],
            ['nama' => 'Yenmira F', 'blok' => 'B6', 'no' => '30'],
            ['nama' => 'Ricaldo', 'blok' => 'B6', 'no' => '31'],
            ['nama' => 'Misbah', 'blok' => 'B6', 'no' => '32'],
            ['nama' => 'Albar', 'blok' => 'B6', 'no' => '33'],
            ['nama' => 'Analis', 'blok' => 'B6', 'no' => '34'],
            ['nama' => 'Akbar', 'blok' => 'B6', 'no' => '35'],
        ];

        foreach ($jamaahs as $j) {
            Jamaah::create([
                'masjid_id' => $masjidId,
                'nama' => $j['nama'],
                'rt' => '2',
                'rw' => '11',
                'blok' => $j['blok'],
                'no_rumah' => $j['no'],
                'alamat' => 'Griya Anggraini',
                'telpon' => null,
                'art' => 0,
                'foto' => null,
                'status' => 'warga',
            ]);
        }

        $this->command->info('Berhasil menginjek ' . count($jamaahs) . ' data Jamaah RT 02.');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class Rekening extends Model
{
    protected $fillable = [
        'rek_id',
        'sub_rek_id',
        'akun',
        'kelompok',
        'jenis',
        'nama',
    ];

    protected static function booted()
    {
        static::saving(function ($model) {
            if ($model->sub_rek_id) {
                $subRek = \App\Models\SubRek::find($model->sub_rek_id);
                if ($subRek) {
                    if (!$model->rek_id) {
                        $model->rek_id = $subRek->rek_id;
                    }
                    if (!$model->akun) {
                        $model->akun = $subRek->kode;
                    }
                    if (!$model->kelompok) {
                        $model->kelompok = $subRek->kelompok;
                    }
                    // Auto-generate jenis as kelompok + '.' + jenis input (only on create)
                    if ($model->jenis && $model->kelompok && !$model->exists) {
                        $generatedJenis = $model->kelompok . '.' . $model->jenis;

                        // Cek apakah jenis sudah ada di database
                        $existingRekening = static::where('jenis', $generatedJenis)
                            // ->where('id', '!=', $model->id ?? 0)
                            ->first();

                        if ($existingRekening) {
                            throw ValidationException::withMessages([
                                'jenis' => "Kode jenis '{$generatedJenis}' sudah digunakan oleh rekening: {$existingRekening->nama}"
                            ]);
                        }
                        // dd($generatedJenis);
                        $model->jenis = $generatedJenis;
                    }
                }
            }
        });
    }

    public function subRek()
    {
        return $this->belongsTo(SubRek::class, 'sub_rek_id', 'id');
    }

    public function rek()
    {
        return $this->belongsTo(Rek::class, 'rek_id', 'kode');
    }

    public function mappingAkun()
    {
        return $this->hasMany(MappingRekening::class, 'mapping', 'jenis');
    }

    // public function buku()
    // {
    //     return $this->hasMany(Buku::class, 'rekening_id', 'id');
    // }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = [
        'name',
        'address', 
        'city',
        'postcode',
        'phone',
        'opening_time',
        'closing_time',
        'email',
        'state'
    ];

    protected $appends = ['images'];

    public function getImagesAttribute()
    {
        $slug = \Illuminate\Support\Str::slug($this->name);
        // Retornem un array amb la ruta de la imatge principal
        // El React ho buscarà a la seva carpeta public/img/clubs/...
        return [
            "/img/clubs/{$slug}/{$slug}-1.png"
        ];
    }

    public function courts()
    {
        return $this->hasMany(Court::class);
    }
}
 

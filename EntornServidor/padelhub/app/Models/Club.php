<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    public function courts()
    {
        return $this->hasMany(Court::class);
    }
}
 

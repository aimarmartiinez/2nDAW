<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'ingredients',
        'instructions',
        'prep_time',
        'category_id',
    ];

    protected $casts = [
        'prep_time' => 'integer',
    ];

    /**
     * SOLUCIÓ TODO 4: Relació belongsTo amb Category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

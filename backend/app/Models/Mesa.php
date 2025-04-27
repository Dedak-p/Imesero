<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'ocupada',
        'capacidad',
    ];

    protected $casts = [
        'ocupada' => 'boolean',
    ];

    /**
     * Una mesa puede tener varias comandas.
     */
    public function comandas(): HasMany
    {
        return $this->hasMany(Comanda::class);
    }
}

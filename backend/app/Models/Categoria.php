<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    protected $fillable = [
        'nombre_es',
    ];

    /**
     * Una categoría agrupa varios productos.
     */
    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class);
    }
}

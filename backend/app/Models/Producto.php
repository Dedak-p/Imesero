<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    /** @use HasFactory<\Database\Factories\ProductoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'ingredientes',
        'precio',
        'categoria',
        'imagen',

    ];

    public function comandas()
    {
        return $this->belongsToMany(Comanda::class, 'comanda_producto')
            ->withPivot('cantidad')
            ->withTimestamps();
    }
}

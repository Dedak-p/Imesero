<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Producto extends Model
{
    // /** @use HasFactory<\Database\Factories\ProductoFactory> */
    // use HasFactory;

    protected $fillable = [
        'categoria_id',
        'imagen',
        'nombre_es',
        'nombre_ca',
        'nombre_en',
        'descripcion_es',
        'descripcion_ca',
        'descripcion_en',
        'ingredientes_es',
        'ingredientes_ca',
        'ingredientes_en',
        'precio',
        'disponible',
        'recomendada',  
    ];

    protected $casts = [
        'disponible' => 'boolean',
        'recomendada'  => 'boolean',
        'precio'     => 'decimal:2',
    ];

    /**
     * Producto pertenece a una categoría.
     */
    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Producto está en muchas líneas de comanda.
     */
    public function comandaItems(): HasMany
    {
        return $this->hasMany(ComandaItem::class);
    }
}

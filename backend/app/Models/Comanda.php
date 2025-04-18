<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comanda extends Model
{
    protected $fillable = [
        'mesa_id',
        'user_id',
        'anonimo',
        'estado',
    ];

    protected $casts = [
        'anonimo' => 'boolean',
    ];

    /**
     * Comanda pertenece a una mesa.
     */
    public function mesa(): BelongsTo
    {
        return $this->belongsTo(Mesa::class);
    }

    /**
     * Comanda puede ser de un usuario registrado o nulo (anónimo).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Línea de pedidos de esta comanda.
     */
    public function items(): HasMany
    {
        return $this->hasMany(ComandaItem::class);
    }

    /**
     * Total calculado sobre los ítems (helper).
     */
    public function getTotalAttribute(): float
    {
        return $this->items->sum(function($item) {
            return $item->cantidad * $item->precio_unitario;
        });
    }
}

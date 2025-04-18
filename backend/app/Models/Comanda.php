<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comanda extends Model
{
    // Asegúrate de que cargas siempre los items para el cálculo
    protected $with    = ['items','estadoComanda'];
    protected $appends = ['total','estado_nombre'];

    protected $fillable = [
        'mesa_id',
        'user_id',
        'anonimo',
        'estado_comanda_id',
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

    public function estadoComanda(): BelongsTo
    {
        return $this->belongsTo(EstadoComanda::class, 'estado_comanda_id');
    }

    public function getTotalAttribute(): float
    {
        return $this->items->sum(fn($i)=>$i->cantidad*(float)$i->precio_unitario);
    }

    public function getEstadoNombreAttribute(): string
    {
        return $this->estadoComanda->nombre;
    }
}

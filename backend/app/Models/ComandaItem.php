<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComandaItem extends Model
{
    protected $fillable = [
        'comanda_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
        'estado_item_id',
    ];

    /**
     * Ítem pertenece a una comanda.
     */
    public function comanda(): BelongsTo
    {
        return $this->belongsTo(Comanda::class);
    }

    /**
     * Ítem al producto correspondiente.
     */
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    /**
     * Estado actual del ítem.
     */
    public function estado(): BelongsTo
    {
        return $this->belongsTo(EstadoPedidoItem::class, 'estado_item_id');
    }
}

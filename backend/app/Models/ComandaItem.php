<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComandaItem extends Model
{
    // Los campos que puedan hacer mass‐assignment
    protected $appends = ['estado'];
    protected $fillable = [
      'comanda_id',
      'producto_id',
      'cantidad',
      'precio_unitario',
      'estado_item_id',
        'pagada',
    ];

    // Relación al producto
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    // Relación al estado del ítem
    public function estadoPedidoItem(): BelongsTo
    {
        return $this->belongsTo(EstadoPedidoItem::class, 'estado_item_id');
    }

    // Relación a la comanda
    public function comanda(): BelongsTo
    {
        return $this->belongsTo(Comanda::class);
    }

    // Devuelve el nombre del estado
    public function getEstadoAttribute(): string
    {
        return $this->estadoPedidoItem->nombre;
    }
}

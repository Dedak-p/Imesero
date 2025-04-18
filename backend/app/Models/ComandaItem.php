<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComandaItem extends Model
{
    // Los campos que puedas hacer mass‐assignment
    protected $fillable = [
      'comanda_id',
      'producto_id',
      'cantidad',
      'precio_unitario',
      'estado_item_id',
    ];

    // Relación al producto
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    // Relación al estado del ítem
    public function estado()
    {
        
        return $this->belongsTo(EstadoPedidoItem::class, 'estado_item_id');
    }

    // Relación a la comanda
    public function comanda()
    {
        return $this->belongsTo(Comanda::class);
    }
}

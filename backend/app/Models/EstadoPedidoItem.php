<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstadoPedidoItem extends Model
{
    protected $table = 'estado_pedido_items';

    protected $fillable = [
        'nombre',
        'orden',
    ];

    /**
     * Relaciones inversa: qué líneas de comanda usan este estado.
     */
    public function comandaItems(): HasMany
    {
        return $this->hasMany(ComandaItem::class, 'estado_item_id');
    }
}

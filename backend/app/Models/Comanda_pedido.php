<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Comanda_pedido extends Pivot
{
    // Definimos la tabla intermedia, la cual se utilizará para establecer
    // la relación muchos a muchos entre 'comandas' y 'pedidos'.
    protected $table = 'comanda_pedido';

    // Definimos los atributos que son asignables en masa en este modelo pivot.
    // Esto incluye las columnas 'comanda_id', 'pedido_id' y 'cantidad'.
    // 'cantidad' almacena la cantidad del producto asociado con un pedido en una comanda.
    protected $fillable = ['comanda_id', 'pedido_id', 'cantidad'];

    /**
     * Definir la relación con el modelo Comanda.
     *
     * Aquí estamos diciendo que cada registro en la tabla intermedia 
     * 'comanda_pedido' pertenece a una 'comanda'. Esto establece la 
     * relación de "pertenencia" desde el punto de vista de esta tabla intermedia.
     * 
     * Un 'comanda' puede tener muchos registros en la tabla 'comanda_pedido' 
     * porque puede estar asociada a múltiples pedidos. A su vez, un 
     * 'comanda_pedido' sólo puede estar relacionado con una única 'comanda'.
     * 
     * Esta relación nos permite acceder a la comanda asociada desde cualquier 
     * instancia de 'ComandaPedido'.
     *
     * Ejemplo de uso: 
     * $comandaPedido = ComandaPedido::find(1);
     * $comanda = $comandaPedido->comanda; // Esto obtiene la comanda relacionada.
     */
    public function comanda()
    {
        return $this->belongsTo(Comanda::class);
    }

    /**
     * Definir la relación con el modelo Pedido.
     *
     * Aquí estamos diciendo que cada registro en la tabla intermedia 
     * 'comanda_pedido' pertenece a un 'pedido'. Esto establece la relación
     * de "pertenencia" desde el punto de vista de esta tabla intermedia.
     *
     * Un 'pedido' puede estar en múltiples registros de la tabla 
     * 'comanda_pedido' porque puede pertenecer a múltiples comandas 
     * (esto ocurre si el mismo pedido se repite en distintas comandas).
     * A su vez, un 'comanda_pedido' sólo puede estar relacionado con un 
     * único 'pedido'.
     *
     * Esta relación nos permite acceder al pedido asociado desde cualquier 
     * instancia de 'ComandaPedido'.
     *
     * Ejemplo de uso: 
     * $comandaPedido = ComandaPedido::find(1);
     * $pedido = $comandaPedido->pedido; // Esto obtiene el pedido relacionado.
     */
    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }
}

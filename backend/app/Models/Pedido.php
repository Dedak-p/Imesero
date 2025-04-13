<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    // Definimos la tabla asociada al modelo
    protected $table = 'pedidos'; // Esto especifica que la tabla asociada al modelo es 'pedidos'.

    // Definimos los atributos asignables en masa.
    protected $fillable = ['user_id', 'producto_id','comanda_id', 'estado' , 'mesa_id']; 
    // Estos son los campos de la tabla 'pedidos' que se pueden asignar en masa.

    /**
     * Relación entre Pedido y Usuario: Un pedido pertenece a un usuario.
     *
     * La función `user()` indica que cada pedido está asociado a un único usuario. 
     * Usamos `belongsTo` para establecer la relación de "pertenencia" de este pedido a un usuario.
     * Esto significa que cada pedido es hecho por un solo usuario.
     *
     * Ejemplo de uso:
     * $pedido = Pedido::find(1);
     * $usuario = $pedido->user; // Obtiene el usuario que hizo el pedido.
     */
    public function user()
    {
        // Relación muchos a uno: Un pedido pertenece a un usuario.
        return $this->belongsTo(User::class);
    }

    /**
     * Relación entre Pedido y Producto: Un pedido está relacionado con un producto.
     *
     * La función `producto()` indica que cada pedido está asociado a un único producto.
     * Usamos `belongsTo` para definir que un pedido "pertenece" a un producto específico.
     * Esto implica que un pedido está relacionado con un solo producto, pero un producto puede estar presente en muchos pedidos.
     *
     * Ejemplo de uso:
     * $pedido = Pedido::find(1);
     * $producto = $pedido->producto; // Obtiene el producto asociado con este pedido.
     */
    public function producto()
    {
        // Relación muchos a uno: Un pedido pertenece a un producto.
        return $this->belongsTo(Producto::class);
    }
    /**
    *
    * La función `comanda()` indica que cada pedido está asociado a una única comanda.
    * Usamos `belongsTo` para definir que un pedido  "pertenece" a una comanda específica.
    * Esto implica que un pedido está relacionado con una sola comanda, pero una comanda  puede estar presente en muchos pedidos.
    *
    * Ejemplo de uso:
    * $pedido = Pedido::find(1);
    * $comanda = $pedido->comanda; // Obtiene el producto asociado con este pedido.
    */
    public function comanda(){
    
        return $this->belongsTo(Comanda::class);
    }
}

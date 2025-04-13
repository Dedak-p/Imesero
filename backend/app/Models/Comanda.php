<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comanda extends Model
{
    use HasFactory;

    // Definimos la tabla asociada al modelo (puedes omitirlo si el nombre de la tabla es el plural del modelo, pero por claridad lo dejamos aquí).
    protected $table = 'comandas'; // Asegúrate de que la tabla en la base de datos se llame 'comandas'.

    // Definimos los atributos asignables en masa.
    protected $fillable = [ 'estado']; // Estos son los campos que se podrán asignar directamente en masa (como en un `create` o `update`).

    /**
     * Relación entre Comanda y Pedido: Una comanda puede tener muchos pedidos.
     *
     * La función `pedidos()` indica que una comanda tiene muchos pedidos asociados. Esto se hace con `hasMany`.
     * Esto implica que una comanda puede contener múltiples registros en la tabla 'pedidos'. En otras palabras,
     * un cliente (representado por la comanda) puede hacer varios pedidos en un solo proceso de compra.
     * 
     * Ejemplo de uso:
     * $comanda = Comanda::find(1);
     * $pedidos = $comanda->pedidos; // Obtiene todos los pedidos asociados a esta comanda.
     */
    public function pedidos()
    {
        // En este caso, una "comanda" tiene muchos "pedidos", por lo que usamos `hasMany`.
        // La relación será de uno a muchos: una comanda puede tener varios pedidos.
        return $this->hasMany(Pedido::class);
    }

    /**
     * Relación entre Comanda y Usuario: Un usuario puede realizar muchas comandas.
     *
     * La función `user()` indica que cada comanda está asociada a un único usuario.
     * Usamos `belongsTo` para indicar que cada registro en la tabla 'comandas' pertenece a un único usuario.
     * Esto crea una relación muchos a uno: muchos registros de comandas pueden pertenecer a un solo usuario.
     * 
     * Ejemplo de uso:
     * $comanda = Comanda::find(1);
     * $usuario = $comanda->user; // Obtiene el usuario asociado a esta comanda.
     */
  
}

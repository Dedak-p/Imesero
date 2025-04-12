<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    /** @use HasFactory<\Database\Factories\ProductoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'ingredientes',
        'precio',
        'categoria',
        'imagen',

    ];

    //Función para referenciar que un producto puede estar en múltiples pedidos
    public function pedidos () {
        return $this->hasMany(Pedido::class);
    }
}

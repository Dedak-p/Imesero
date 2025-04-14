<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comanda extends Model
{
    protected $fillable = [
        'user_id',
        'mesa',
        'estado',
        'fecha',
        'total',
        'forma_pago'
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'comanda_producto')
            ->withPivot('cantidad')
            ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

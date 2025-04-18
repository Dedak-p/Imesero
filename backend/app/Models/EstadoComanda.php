<?php
// app/Models/EstadoComanda.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstadoComanda extends Model
{
    protected $table = 'estado_comandas';
    protected $fillable = ['nombre','orden'];
    public function comandas(): HasMany
    {
        return $this->hasMany(Comanda::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pago extends Model
{
    protected $fillable = [
        'metodo_pago_id',
        'comanda_id',
        'monto',
        'referencia',
    ];

    public function metodo(): BelongsTo
    {
        return $this->belongsTo(MetodoPago::class, 'metodo_pago_id');
    }

    public function comanda(): BelongsTo
    {
        return $this->belongsTo(Comanda::class);
    }
}

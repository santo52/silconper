<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VentasGrafica extends Model
{
    use HasFactory;

    protected $table = 'tcpi_ventasgrafica';

    protected $primaryKey = 'id';

    const CREATED_AT = 'mes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mes',
        'mes_palabra',
        'ventaEfectiva',
        'ventaCancelada',
        'totalVenta',
}

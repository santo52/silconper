<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenGeneral extends Model
{
    use HasFactory;

    protected $table = 'tcpr_ordengeneral';

    protected $primaryKey = 'id';

    const CREATED_AT = 'fechaCrea';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'idMarca',
        'idMarcaAgregador',
        'idAgregador',
        'idPunto',
        'idCliente',
        'nombreCliente',
        'empresa',
        'identificacion',
        'telefonoFijo',
        'telefonoCelular',
        'idCiudad',
        'direccion',
        'barrio',
        'email',
        'lat',
        'lng',
        'nomTipoEntrega',
        'idOrdenGeneral',
        'idOrdenDia',
        'idOrdenNumero',
        'valorItems',
        'valorDomicilio',
        'valorPropina',
        'valorBaseItems',
        'valorBaseTotalOrden',
        'valorDescuento',
        'valorOrden',
        'totalOrden',
        'valorIngresaCli',
        'idEstadoOrden',
        'idEstadoPos',
        'idCupon',
        'nombreCupon',
        'impresion',
        'impresionLogistica',
        'idLogistica',
        'idDomiciliario',
        'factura',
        'observaciones',
        'idUsuario',
        'fechaEstado',
        'fechaFactura',
        'fechaOrden',
        'fechaCrea',
    ];
}

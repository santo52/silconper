<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tcpc_loginusuarios';

    protected $primaryKey = 'idUsuario';

    const CREATED_AT = 'fechaCrea';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'usuario',
        'clave',
        'celular',
        'identificacion',
        'tipoInicio',
        'idPais',
        'idCiudad',
        'idPunto',
        'idPerfil',
        'lat',
        'lng',
        'apiGeoGoogle',
        'keyGoogle',
        'tipoGeo',
        'cambioClave',
        'login',
        'suspenso',
        'fechaUltimoIngreso',
        'fechaSalida',
        'fechaLimiteIngreso',
        'fechaCrea',
        'activo',
        'fechaActivo'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'clave',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

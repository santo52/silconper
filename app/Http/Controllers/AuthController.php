<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthController extends Controller
{
    public function index() {
        return view('auth.login');
    }

    public function login(Request $request) {

        $password = hash('sha256', $request->get('password'));

        $usuario = User::where([
            'usuario' => $request->get('user'),
            'clave' => $password,
        ])->first();

        if(empty($usuario)) {
            return response()->json([
                'auth' => false, 
                'message' => 'El usuario o la contraseña son incorrectos'
            ]);
        }

        Auth::login($usuario);
        return response()->json(['auth' => true ]);
    }

    public function logout() {
        Auth::logout();
        return redirect('/login');
    }
}

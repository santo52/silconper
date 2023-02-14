@extends('base')

@section('title', 'Login')

@section('container')
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="{{ route('home') }}"><b>{{ env('APP_NAME') }}</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Iniciar sesión</p>

          <form method="post" onsubmit="login.send(event)">
            @csrf
            <div class="input-group mb-3">
              <input type="text" name="user" class="form-control required" placeholder="Usuario">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" name="password" class="form-control required" placeholder="Contraseña">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock danger"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
              </div>
              <!-- /.col -->
            </div>
            <p class="mt-3 mb-1">
                <a href="forgot-password.html">Olvide mi contraseña</a>
            </p>
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
@endsection

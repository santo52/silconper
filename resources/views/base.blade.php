<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ env('APP_NAME') }} | @yield('title')</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{!! asset('plugins/fontawesome-free/css/all.min.css') !!}">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{!! asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css') !!}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{!! asset('plugins/admin-lte/css/adminlte.min.css') !!}">

  <link rel="stylesheet" href="{!! asset('css/app.css') !!}">

  @yield('styles')

</head>
<body>

@yield('container')


<div class="preloader">
  <div class="page-loading">
    <div class="loader"></div>
    <span class="text">Loading...</span>
  </div>
</div>

<!-- jQuery -->
<script src="{!! asset('plugins/jquery/jquery.min.js') !!}"></script>
<!-- Bootstrap 4 -->
<script src="{!! asset('plugins/bootstrap/js/bootstrap.bundle.min.js') !!}"></script>

<!-- AdminLTE App -->
<script src="{!! asset('plugins/admin-lte/js/adminlte.min.js') !!}"></script>

<script src="{!! asset('js/app.bundle.js') !!}"></script>
<script src="{!! asset('js/views.bundle.js') !!}"></script>

@yield('scripts')

</body>
</html>

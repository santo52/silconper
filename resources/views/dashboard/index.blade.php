@extends('layout')

@section('title', 'Dashboard')


@section('content')
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
    </div>
   
    <section class="content">
    <div class="container-fluid"> 
        <div class="row">
            <!-- venta día -->
            <div class="col-xl-3 col-md-6 mb-4" id="salesOfDay">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-info text-uppercase mb-2">Venta del Día</div>
                      <div class="row no-gutters align-items-center">
                        <div class="col-auto">
                          <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800 card-value">0</div>
                        </div>
                        <div class="col">
                          <div class="progress progress-sm mr-2">
                            <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ordenes del día -->
            <div class="col-xl-3 col-md-6 mb-4" id="ordersOfDay">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Ordenes del dia</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800 card-value">0</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <!-- Venta Mensual -->
            <div class="col-xl-3 col-md-6 mb-4" id="salesOfMonth">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-2">Venta Mensual</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800 card-value">0</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Venta anual -->
            <div class="col-xl-3 col-md-6 mb-4" id="salesOfYear">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-2">Venta Anual</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800 card-value">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div class="row" >
                <!-- Grafico barras venta mes PDV -->
            <div class="col-md-6">
                <div id="generalSalesPDV" style="width: 100%; height: 100%;"></div>
            </div>
            {{-- <!-- Grafico venta dia agregadores --> --}}
            <div class="col-md-6">
                <div id="salesAggregators" style="width: 100%; height: 100%;"></div>
            </div>
        </div>
        <div class="row" >
        <!-- Grafico venta mes agregadores -->
            <div class="col-md-12">
                <div id="salesMonthAggregators" style="width: 100%; height: 100%;"></div>
            </div>
        </div>
    </div><!-- /.container-fluid -->
  </section>
<!-- /.content -->
@endsection

@section('scripts')

    <script src="{!! asset('plugins/silconper/code/highcharts.js') !!}"></script>
    <script src="{!! asset('plugins/silconper/code/modules/data.js') !!}"></script>
    <script src="{!! asset('plugins/silconper/code/modules/drilldown.js') !!}"></script>
    <script src="{!! asset('plugins/silconper/code/modules/series-label.js') !!}"></script>
    <script src="{!! asset('plugins/silconper/code/modules/exporting.js') !!}"></script>
    <script src="{!! asset('plugins/silconper/code/modules/export-data.js') !!}"></script>

    <script>
         $(document).ready(() => {
            const dashboard = new Dashboard();
            dashboard.load();
        })
    </script>
@endsection
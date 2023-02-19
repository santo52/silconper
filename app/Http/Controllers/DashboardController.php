<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    function index() {
        return view('dashboard.index');
    }

    public function orders(Request $request) {
        $orders = DB::table('tcpr_ordengeneral')
            ->select(DB::raw('FORMAT(count(1),0) total'))
            ->whereRaw('idEstadoOrden=2 and LEFT(fechaCrea,10)=CURDATE()')
            ->first();
            
        return response()->json($orders);
    }

    public function sales(Request $request) {

        $time = $request->get('time');
        $whereDate = '';

        switch($time) {
            case 'day': 
                $whereDate = 'LEFT(fechaCrea,10)=CURDATE()';
                break;
            case 'month': 
                $whereDate = 'MONTH(fechaCrea)=MONTH(CURRENT_DATE())';
                break;
            case 'year': 
                $whereDate = 'YEAR(fechaCrea)=YEAR(CURRENT_DATE())';
                break;
            default:
                $whereDate = 'LEFT(fechaCrea,10)=CURDATE()';
                break;
        }

        DB::enableQueryLog();

        $sales = DB::table('tcpr_ordengeneral')
            ->select(DB::raw('FORMAT(REPLACE(SUM(totalOrden), ".00",""),0) AS total'))
            ->where('idEstadoOrden', 2)
            ->whereRaw($whereDate)
            ->first();
            
        return response()->json($sales);
    }

    public function generalSalesPDV(Request $request) {        
        $ventasGrafica = DB::table('tcpi_ventasgrafica')
            ->select('mes_palabra', 'ventaEfectiva', 'ventaCancelada', 'totalVenta')
            ->get();
            
        return response()->json($ventasGrafica);

    }

    public function salesByAggregators(Request $request) {

        $time = $request->get('time');

        if($time == 'month') {
            $data = DB::select('SELECT * FROM tcpi_ventaagregador');
             return response()->json(['result' => $data ]);
        }

        // by day
        $data = DB::select('call rsd_ventasporagregador()');
        return response()->json(['result' => $data]);
    }
}

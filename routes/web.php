<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth'])->group(function () {

    /** Dashboard routes */

    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::post('/dashboard/sales-aggregators', [DashboardController::class, 'salesByAggregators']);
    Route::post('/dashboard/general-sales-pdv', [DashboardController::class, 'generalSalesPDV']);
    Route::post('/dashboard/sales', [DashboardController::class, 'sales']);
    Route::post('/dashboard/orders', [DashboardController::class, 'orders']);
});

Route::middleware('no-auth')->group(function () {
    Route::get('/login', [AuthController::class, 'index'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

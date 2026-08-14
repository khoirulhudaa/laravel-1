<?php

use App\Http\Controllers\PermintaanController;
use App\Http\Controllers\ProdukElektroniksController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [produkElektroniksController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/produk-elektroniks', [ProdukElektroniksController::class, 'index'])->name('produk-elektroniks.index');
    Route::post('/produk-elektroniks', [ProdukElektroniksController::class, 'store'])->name('produk-elektroniks.store');
    Route::get('/produk-elektroniks/create', [ProdukElektroniksController::class, 'create'])->name('produk-elektroniks.create');
    Route::get('/produk-elektroniks/{id}/edit', [ProdukElektroniksController::class, 'edit'])->name('produk-elektroniks.edit');
    Route::put('/produk-elektroniks/{id}', [ProdukElektroniksController::class, 'update'])->name('produk-elektroniks.update');
    Route::delete('/produk-elektroniks/{id}', [ProdukElektroniksController::class, 'destroy'])->name('produk-elektroniks.destroy'); 
    Route::post('/produk-elektroniks/${id}/restore', [ProdukElektroniksController::class, 'restore'])->name('produk-elektroniks.restore');


    Route::get('/permintaan', [PermintaanController::class, 'index'])->name('permintaan.index');
    Route::post('/permintaan/store', [PermintaanController::class, 'store'])->name('permintaan.store');
    Route::get('/permintaan/create', [PermintaanController::class, 'create'])->name('permintaan.create');
    Route::get('/permintaan/edit/{id}', [PermintaanController::class, 'edit'])->name('permintaan.edit');
    Route::put('/permintaan/edit/{id}', [PermintaanController::class, 'update'])->name('permintaan.update');
    Route::delete('/permintaan/destroy/{id}', [PermintaanController::class, 'destroy'])->name('permintaan.destroy');
    Route::post('/permintaan/{id}/restore', [PermintaanController::class, 'restore'])->name('permintaan.restore');

    // ACC/REJECT
    Route::post('/permintaan/approval/{id}', [PermintaanController::class, 'approval'])->name('permintaan.approval');
    Route::post('/permintaan/reject/{id}', [PermintaanController::class, 'reject'])->name('permintaan.reject');
});

require __DIR__.'/auth.php';

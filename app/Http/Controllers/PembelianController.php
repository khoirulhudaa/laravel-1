<?php

namespace App\Http\Controllers;

use App\Http\Requests\PembelianRequest;
use App\Services\PembelianService;
use App\Trait\RedirectsWithFlash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembelianController extends Controller
{

    use RedirectsWithFlash;
    
    /**
     * Display a listing of the resource.
     */
    public function index(PembelianService $pembelianService, Request $request)
    {
        $dataPembelian = $pembelianService->getAllDataPembelian($request);
        return Inertia::render('Pembelian', [
           'dataPembelian' =>  $dataPembelian,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('CreatePembelian');
        } catch (\Exception $e) {
            return $this->redirectError('pembelian.index', 'Gagal mendapatkan data pembelian');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PembelianService $pembeelianService, PembelianRequest $request)
    {
        $pembeelianService->createPembelian($request->validated());
        return $this->redirectSuccess('pembelian.index', 'Data berhasil ditambahkan');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PembelianService $pembelianService, int $id)
    {
        $dataPembelian = $pembelianService->getDataPembelianById($id);
        return Inertia::render('CreatePembelian', [
            'dataPembelian' => $dataPembelian
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PembelianService $pembelianService, array $data, int $id)
    {
        $pembelianService->updatePembelian($id, $data);
        return $this->redirectSuccess('pembelian.index', 'Data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PembelianService $pembelianService, int $id)
    {
        $pembelianService->deletePembelian($id);
        return $this->redirectSuccess('pembelian.index', 'Data berhasil dihapus');    
    }
}

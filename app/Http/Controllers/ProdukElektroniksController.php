<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdukElektroniksRequest;
use App\Models\ProdukElektroniks;
use App\Services\ProdukElektroniksService;
use App\Trait\RedirectsWithFlash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukElektroniksController extends Controller
{

    use RedirectsWithFlash;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ProdukElektroniksService $produkElektroniksService)
    {
        $produkElektroniksData = $produkElektroniksService->getAllProdukElektroniks($request);
        return Inertia::render('Dashboard', [
            'produkElektroniks' => $produkElektroniksData,
        ])->with('success', $request->session()->get('success'))
          ->with('error', $request->session()->get('error'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateProdukElektroniks');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProdukElektroniksService $produkElektroniksService, ProdukElektroniksRequest $request): RedirectResponse
    {
        $produkElektroniksService->createProdukElektronik($request->validated());
        return $this->redirectSuccess('produk-elektroniks.index', 'Data berhasil ditambahkan');
    }
        
        public function edit()
    {
        
        $produk = ProdukElektroniks::findOrFail(request()->route('id'));   
        
        if (!$produk) {
            return $this->redirectError('produk-elektroniks.index', 'Data tidak ditemukan!');
        }

        return Inertia::render('EditProdukElektroniks', [
            'produk' => $produk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProdukElektroniksService $produkElektroniksService, ProdukElektroniksRequest $request, int $id)
    {
        $produkElektroniksService->updateProdukElektronik($request->validated(), $id);
        return $this->redirectSuccess('produk-elektroniks.index', 'Data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProdukElektroniksService $produkElektroniksService, int $id)
    {
        $produkElektroniksService->deleteProdukElektronik($id);
        return $this->redirectSuccess('produk-elektroniks.index', 'Data berhasil dihapus');
    }

    public function restore(ProdukElektroniksService $produkElektroniksService, int $id)    
    {
        $produkElektroniksService->restoreDataProduk($id);
        return $this->redirectSuccess('produk-elektroniks.index', 'Data berhasil dikembalikan');
    }
}
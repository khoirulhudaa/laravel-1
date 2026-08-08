<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdukElektroniksRequest;
use App\Models\ProdukElektroniks;
use App\Services\ProdukElektroniksService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukElektroniksController extends Controller
{
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
    public function store(ProdukElektroniksRequest $request): RedirectResponse
    {
        ProdukElektroniks::create($request->validated());
        return redirect()->route('produk-elektroniks.index')->with('success', 'Produk elektronik berhasil ditambahkan.');
    }

    public function edit()
    {

        $produk = ProdukElektroniks::findOrFail(request()->route('id'));   

        if (!$produk) {
            return redirect()->route('produk-elektroniks.index')->with('error', 'Produk elektronik tidak ditemukan.');
        }

        return Inertia::render('EditProdukElektroniks', [
            'produk' => $produk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProdukElektroniksRequest $request, string $id)
    {
        ProdukElektroniks::findOrFail($id)->update($request->validated());
        return redirect()->route('produk-elektroniks.index')->with('success', 'Produk elektronik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        ProdukElektroniks::findOrFail($id)->delete();
        return redirect()->route('produk-elektroniks.index')->with('success', 'Produk elektronik berhasil dihapus.');
    }

    public function restore(int $id)    
    {
        $produk = ProdukElektroniks::withTrashed()->findOrFail($id);
        $produk->restore();

        return redirect()->back();
    }
}
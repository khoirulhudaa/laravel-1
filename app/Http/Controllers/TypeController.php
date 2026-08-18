<?php

namespace App\Http\Controllers;

use App\Http\Requests\TypeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TypeService;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, TypeService $typeService)
    {
        $dataType = $typeService->getAllDataService($request);

        return Inertia::render('Type', [
            'dataType' => $dataType
        ])
        ->with('success', 'Berhasil daapatkan data tipe')
        ->with('error', 'Gagal dapatkan data tipe');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateType');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TypeRequest $request, TypeService $typeService)
    {
        $typeService->createType($request->validated());
        return redirect()->route('type.index')->with('success', 'Berhasil tambah tipe produk');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypeService $typeService, int $id)
    {
        $data = $typeService->getDataTypeById($id);
        return Inertia::render('createType', [
            'dataType' => $data
        ])
        ->with('success', 'Berhasil dapatkan data tipe by id')
        ->with('error', 'Gagal dapatkan data tipe by id');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TypeRequest $request, TypeService $typeService, int $id)
    {
        $typeService->getDataTypeById($id)->update($request);
        return redirect()->route('type.index')->with('success', 'Berhasil perbarui data tipe');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeService $typeService, int $id)
    {
        $typeService->deleteType($id);
        return redirect()->route('type.index')->with('success', 'Berhasil hapus data tipe');
    }
}

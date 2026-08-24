<?php

namespace App\Http\Controllers;

use App\Http\Requests\PenerimaanRequest;
use App\Models\Penerimaan;
use App\Services\PenerimaanService;
use App\Trait\RedirectsWithFlash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenerimaanController extends Controller
{

    use RedirectsWithFlash;

    /**
     * Display a listing of the resource.
     */
    public function index(PenerimaanService $penerimaanService, Request $request)
    {

        $penerimaanData = $penerimaanService->getAllDataPenerimaan($request);

        return Inertia::render('Penerimaan', [
            'penerimaanData' => $penerimaanData
        ]);
    }

    public function rollbackToPending(PenerimaanService $penerimaanService, int $id)
    {
        $penerimaanService->rollbackToPending($id);
        return $this->redirectSuccess('penerimaan.index', 'Status data berhasil dirollback');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Penerimaan $penerimaan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PenerimaanService $penerimaanService, int $id)
    {
        $data = $penerimaanService->getDataById($id);

        return Inertia::render('UpdatePenerimaan', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PenerimaanRequest $penerimaanRequest, PenerimaanService $penerimaanService, int $id)
    {
        $penerimaanService->updateData($penerimaanRequest->validated(), $id);
        return $this->redirectSuccess('penerimaan.index', 'Data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PenerimaanService $penerimaanService, int $id)
    {
        $penerimaanService->destroy($id);
        return $this->redirectSuccess('penerimaan.index', 'Data berhasil dihapus');
    }
}

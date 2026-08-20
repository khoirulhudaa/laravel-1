<?php

namespace App\Http\Controllers;

use App\Models\Penerimaan;
use App\Services\PenerimaanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenerimaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(penerimaanService $penerimaanService, Request $request)
    {

        $penerimaanData = $penerimaanService->getAllDataPenerimaan($request);

        return Inertia::render('Penerimaan', [
            'penerimaanData' => $penerimaanData
        ]);
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
    public function edit(Penerimaan $penerimaan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penerimaan $penerimaan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penerimaan $penerimaan)
    {
        //
    }
}

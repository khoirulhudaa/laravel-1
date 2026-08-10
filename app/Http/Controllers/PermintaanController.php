<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PermintaanController extends Controller
{
    public function index(Request $request, PermintaanService $permintaanService) 
    {
        $permintaanData = $permintaanService->getAllDataPermintaan($request);
        return Inertia::render('Permintaan', [
            'permintaanData' => $permintaanData,
        ])->with('success', $requst->session()->get('success'))
          ->with('error', $request->session()->get('error'));
    }

    public function create() 
    {
        return Inertia::render('CreatePermintaan');
    }

    public function store(PermintaanRequest $request): RedirectResponse
    {
        Permintaan::create($request->validated());
        return redirect()->route('permintaan.index')->with('success', 'Berhasil menambahkan permintan');
    }
}

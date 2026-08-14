<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermintaanRequest;
use App\Models\Permintaan;
use App\Services\PermintaanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermintaanController extends Controller
{
    public function index(Request $request, PermintaanService $permintaanService) 
    {
        $permintaanData = $permintaanService->getAllDataPermintaan($request);
        return Inertia::render('Permintaan', [
            'permintaanData' => $permintaanData,
        ])->with('success', $request->session()->get('success'))
          ->with('error', $request->session()->get('error'));
    }

    public function create() 
    {
        return Inertia::render('CreatePermintaan');
    }

    public function store(PermintaanRequest $request, PermintaanService $permintaanService)
    {
        $permintaanService->createPermintaan($request->validated());
        return redirect()->route('permintaan.index')->with('success', 'Berhasil tambah permintaan');
    }

    public function update(PermintaanRequest $permintaanRequest, PermintaanService $permintaanService, int $id)
    {   
        $permintaanService->updatePermintaanByid($permintaanRequest->validated(), $id);
        return redirect()->route('permintaan.index')->with('success', 'Berhasil perbarui permintaan');
    }

    public function edit(PermintaanService $permintaanService, int $id)
    {

        $item = $permintaanService->getDataById($id);

        return Inertia::render('CreatePermintaan', [
            'dataPermintaan' => $item
        ])->with('succes', 'Berhasil dapatkan data permintaan')
          ->with('error', 'Gagal mendapatkan data permintaan');
    }

    public function destroy(PermintaanService $permintaanService, int $id) 
    {
        $permintaanService->deletePermintaanById($id);
        return redirect()->route('permintaan.index')->with('success', 'Berhasil hapus permintaan');
    }

    public function Approval(PermintaanService $permintaanService, int $id)
    {
        $permintaanService->approval($id);
        return redirect()->route('permintaan.index')->with('success', 'Anda menerima permintaan');
    }
        
    public function Reject(PermintaanService $permintaanService, int $id)
    {
        $permintaanService->reject($id);
        return redirect()->route('permintaan.index')->with('success', 'Anda menolak permintaan');

    }
}

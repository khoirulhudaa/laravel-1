<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Requests\PermintaanRequest;
use App\Services\PermintaanService;
use App\Trait\RedirectsWithFlash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermintaanController extends Controller
{

    use RedirectsWithFlash;

    public function index(Request $request, PermintaanService $permintaanService) 
    {
        $permintaanData = $permintaanService->getAllDataPermintaan($request);
        $commentData = $permintaanService->getAllDataCommmentPermintaan();
        return Inertia::render('Permintaan', [
            'permintaanData' => $permintaanData,
            'permintaanCommentData' => $commentData
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
        return $this->redirectSuccess('permintaan.index', 'Data berhasil ditambahkan');
    }

    public function update(PermintaanRequest $permintaanRequest, PermintaanService $permintaanService, int $id)
    {   
        $permintaanService->updatePermintaanByid($permintaanRequest->validated(), $id);
        return $this->redirectSuccess('permintaan.index', 'Data berhasil diperbarui');
    }

    public function edit(PermintaanService $permintaanService, int $id)
    {
        $item = $permintaanService->getDataById($id);

        return Inertia::render('CreatePermintaan', [
            'dataPermintaan' => $item
        ])->with('success', 'Berhasil dapatkan data permintaan')
          ->with('error', 'Gagal mendapatkan data permintaan');
    }

    public function destroy(PermintaanService $permintaanService, int $id) 
    {
        $permintaanService->deletePermintaanById($id);
        return $this->redirectSuccess('permintaan.index', 'Data berhasil dihapus');
    }

    public function Approval(PermintaanService $permintaanService, int $id)
    {
        $permintaanService->approval($id);
        return $this->redirectSuccess('permintaan.index', 'Data berhasil disetujui');
    }
        
    public function Reject(PermintaanService $permintaanService, int $id)
    {
        $permintaanService->reject($id);
        return $this->redirectSuccess('permintaan.index', 'Data berhasil ditolak');
    }

    public function comment(PermintaanService $permintaanService, CommentRequest $commentRequest, int $id)
    {
        $permintaan = $permintaanService->getDataById($id);
        $permintaanService->comment($permintaan, $commentRequest->validated());
        return $this->redirectSuccess('permintaan.index', 'Komentar berhasil dikirimkan');
    }
}

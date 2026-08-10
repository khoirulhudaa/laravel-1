<?php

namespace App\Services;

use App\Models\ProdukElektroniks;
use Illuminate\Http\Request;
use App\Models\Permintaan;

class ProdukElektroniksService
{
    public function getAllDataPermintaan(PermintaanRequest $request) 
    {
        $query = Permintaan::query();

        if($query->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('namaProduk', 'like', "%$search%");
                $q->where('kodeseri', 'like', "%$search%");
            });
        }

        if($query->filled('category')) {
            $category = $request->input('category');
            $query->where('category', $category);
        }

        if($query->filled('type')) {
            $type = $request->input('type');
            $query->where('type', $type);    
        }

        return $query->get();
    }

    public function getPrdukById(int $id) 
    {
        return Permintaan::find($id, ['*']);
    }

    public function createPermintaan($data) 
    {
        Permintaan::create($data);
    }

    public function updatePermintaanByid(int $id)
    {
        $dataFind = $this->getDataById($id);
        $dataFind->update($request);
        return $dataFind;
    }

    public function deletePermintaanById(int $id)
    {
        return Permintaan::destroy($id);
    }
    
}
<?php

namespace App\Services;

use App\Models\Permintaan;
use Illuminate\Http\Request;

class PermintaanService
{
    public function getAllDataPermintaan(Request $request) 
    {
        $query = Permintaan::query();

        if($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('namaProduk', 'like', "%$search%")
                  ->orWhere('kodeseri', 'like', "%$search%");
            });
        }

        if($request->filled('category')) {
            $category = $request->input('category');
            $query->where('category', $category);
        }

        if($request->filled('type')) {
            $type = $request->input('type');
            $query->where('type', $type);    
        }

        $query->where('deleted_at', null);

        return $query->get();
    }

    public function getDataById(int $id) 
    {
        return Permintaan::findOrFail($id);
    }

    public function createPermintaan(array $data) 
    {
        return Permintaan::create($data);
    }

    public function updatePermintaanByid(array $data, int $id)
    {
        $item = Permintaan::findOrFail($id);
        $item->update($data);
        return $item;
    }

    public function deletePermintaanById(int $id)
    {
        return Permintaan::findOrFail($id)->delete();
    }

    public function approval(int $id)
    {
        return Permintaan::findOrFail($id)->update([
            'status' => 'ACC'
        ]);
    }

    public function reject(int $id)
    {
        return Permintaan::findOrFail($id)->update([
            'status' => 'REJECT'
        ]);
    }
    
}
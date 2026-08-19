<?php

namespace App\Services;

use App\Models\Permintaan;
use Illuminate\Http\Request;

class PermintaanService
{
    public function getAllDataPermintaan(Request $request) 
    {
        return Permintaan::search($request->input('search'))
        ->category($request->input('category'))
        ->with('type')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'namaProduk' => $item->namaProduk,
                'applicant' => $item->applicant,
                'category' => $item->category,
                'type' => $item->type ? "{$item->type->name} ({$item->type->country})" : "-",               
                'condition' => $item->condition,
                'description' => $item->description,
                'status_label' => $item->status_label,
                'status' => $item->status,
            ];
        });
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
            'status' => 'approved'
        ]);
    }

    public function reject(int $id)
    {
        return Permintaan::findOrFail($id)->update([
            'status' => 'rejected'
        ]);
    }
    
}
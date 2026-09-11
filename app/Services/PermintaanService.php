<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Penerimaan;
use App\Models\Permintaan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PermintaanService
{

    public function getAllDataPermintaan(Request $request) 
    {
        return Permintaan::search($request->input('search'))
        ->category($request->input('category'))
        ->status(['pending', 'rejected'])
        ->with('type')
        ->paginate($request->input('per_page', 10))
        ->withQueryString()
        ->through(function ($item) {
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

    public function getAllDataCommmentPermintaan() 
    {
        return Comment::with('user')->get();
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
        $dataById = Permintaan::findOrFail($id);
        $dataById->update([
            'status' => 'PROSES PEMBELIAN'
        ]);
        return Penerimaan::create([
            'nameProduk' => $dataById->namaProduk,
            'category' => $dataById->category,
            'type_id' => $dataById->type_id,
            'price' => $dataById->price,
            'description' => $dataById->description,
            'applicant' => $dataById->applicant,
            'condition' => $dataById->condition,
            'status' => 'reception'
        ]);
    }

    public function reject(int $id)
    {
        return Permintaan::findOrFail($id)->update([
            'status' => 'rejected'
        ]);
    }

    public function comment(Model $commentTable, array $data)
    {
        return $commentTable->comments()->create([
            'isi' => $data['isi'],
            'user_id' => Auth::id()
        ]);
    }
    
}
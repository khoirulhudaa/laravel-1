<?php

namespace App\Services;

use App\Models\ProdukElektroniks;
use Illuminate\Http\Request;

class ProdukElektroniksService
{
    public function getAllProdukElektroniks(Request $request)
    {   
        $query = ProdukElektroniks::query();

        if($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q
                ->where('nameProduk', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
            }); 
        }

        if($request->filled('category')) {
            $category = $request->input('category');
            $query->where('kategori', $category);
        }

        if($request->filled('type')) {
            $query->where('tipe', $request->input('type'));
        }

        return $query->paginate($request->input('per_page', 10))->withQueryString();
    }

    public function getProdukElektronikById($id)
    {
        return ProdukElektroniks::findOrFail($id);
    }

    public function createProdukElektronik(array $data)
    {
        return ProdukElektroniks::create($data);
    }

    public function updateProdukElektronik(Request $data, int $id)
    {
        $produk = $this->getProdukElektronikById($id);
        $produk->update($data);
        return $produk;
    }
    
    public function deleteProdukElektronik(int $id)
    {
        return ProdukElektroniks::findOrFail($id)->destroy($id);
    }

    public function restoreDataProduk(int $id)
    {
        $produk = ProdukElektroniks::withTrashed()->findOrFail($id);
        return $produk->restore();
    }
}
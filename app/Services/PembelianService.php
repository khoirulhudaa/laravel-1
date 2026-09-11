<?php

namespace App\Services;

use App\Models\PembelianModel;
use Illuminate\Http\Request;

class PembelianService
{

    public function getAllDataPembelian(Request $request)
    {
        return PembelianModel::search($request->input('search'))
        ->status('PROSES PEMBELIAN')
        ->with('type')
        ->paginate($request->input('per_page', 10));
    }

    public function getDataPembelianById(int $id)
    {
        $dataById = PembelianModel::findOrFail($id);
        return $dataById;
    }

    public function createPembelian(array $data)
    {
        return PembelianModel::create($data);
    }

    public function updatePembelian(int $id, array $data)
    {
        $dataById = PembelianModel::findOrFail($id);
        $dataById->update($data);
        return $dataById;
    }

    public function deletePembelian(int $id)
    {
        $dataById = PembelianModel::findOrFail($id);
        return $dataById->delete();
    }
}
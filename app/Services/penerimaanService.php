<?php

namespace App\Services;

use App\Models\Penerimaan;
use Illuminate\Http\Request;

class PenerimaanService
{
    public function getAllDataPenerimaan(Request $request)
    {
        return Penerimaan::search($request->input('search'))
            ->applicant($request->input('applicant'))
            ->status('reception')
            ->with('type')
            ->paginate($request->input('per_page', 10));
    }

    public function rollbackToPending(int $id)
    {
        return Penerimaan::findOrFail($id)->update(['status' => 'pending']);
    }

    public function getDataById(int $id)
    {
        return Penerimaan::findOrFail($id);
    }

    public function updateData(array $data, int $id)
    {
        $dataById = Penerimaan::findOrFail($id);
        $dataById->update($data);
        return $dataById;
    }

    public function destroy(int $id)
    {   
        return Penerimaan::findOrFail($id)->delete();
    }
}
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
            ->with('type')
            ->get();
    }
}
<?php

namespace App\Services;

use App\Models\TypeModel;
use Illuminate\Http\Request;

class TypeService
{
    public function getAllDataService(Request $request)
    {
        $query = TypeModel::query();

        if($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                ->orWhere('initial', 'like', "%$search%");
            });
        };

        if($request->filled('country')) {
            $search = $request->input('country');
            $query->where('country', $search);
        };

        return $query->get();
    }

    public function createType(array $data)
    {
        return TypeModel::create($data);
    }    

    public function getDataTypeById(int $id)
    {  
        return TypeModel::find($id, ['*']); 
    }
    
    public function updateType(Request $request, int $id)
    {
        $item = $this->getDataTypeById($id);
        $item->update($request);
        return $item;
    }    

    public function deleteType(int $id)
    {   
        return TypeModel::findOrFail($id)->delete();
    }

}
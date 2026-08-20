<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table='type';

    protected $fillable = [
        'name',     
        'country',
        'initial'
    ];

    protected function search(Builder $query, string $keywords)
    {
        if($keywords) {
            $query->where(function ($q) use ($keywords) {
                $q->where('name', 'like', "%$keywords%")
                ->orWhere('country', 'like', "%$keywords%");
            });
        }
    }

    public function produk()
    {
        return $this->hasMany(ProdukElektroniks::class, 'type_id');
    }

    public function permintaan()
    {
        return $this->hasMany(Permintaan::class, 'type_id');
    }

    public function penerimaan()
    {
        return $this->hasMany(Penerimaan::class, 'type_id');
    }
}

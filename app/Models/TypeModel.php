<?php

namespace App\Models;

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

    public function produk()
    {
        return $this->hasMany(ProdukElektroniks::class, 'type_id');
    }

    public function permintaan()
    {
        return $this->hasMany(Permintaan::class, 'type_id');
    }
}

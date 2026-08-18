<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdukElektroniks extends Model
{
    /** @use HasFactory<\Database\Factories\ProdukElektroniksFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $table = 'produk_elektroniks';

    protected $fillable = [
        'nameProduk',
        'category',
        'supplier',
        'buyer',
        'type_id',
        'catalog',
        'type',
        'condition',
        'description',
        'price',
        'kodeseri'
    ];

    public function type()
    {
        return $this->belongsTo(TypeModel::class, 'type_id');
    }
}

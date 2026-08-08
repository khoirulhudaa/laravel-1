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
    protected $guarded = ['id'];

    protected $fillable = [
        'nameProduk',
        'category',
        'supplier',
        'buyer',
        'catalog',
        'type',
        'condition',
        'description',
        'price',
        'kodeseri'
    ];
}

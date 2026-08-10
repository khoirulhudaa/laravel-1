<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permintaan extends Model
{

    use HasFactory;
    use SoftDeletes;

    protected $table='Permintaan';

    protected $fillable = [
        'id',
        'namaProduk',
        'applicant',
        'price',
        'category',
        'type',
        'condition',
        'descsription',
        'status',
    ];
}

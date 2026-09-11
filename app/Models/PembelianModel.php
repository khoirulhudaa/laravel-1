<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PembelianModel extends Model
{

    use HasFactory;
    use SoftDeletes;

    protected $table = 'pembelian';
    protected $fillable = [
        'id',
        'namaProduk',
        'applicant',
        'price',
        'user_id',
        'category',
        'type_id',
        'condition',
        'description',
        'status',
    ];

    protected function scopeSearch(Builder $query, ?string $keywords=null)
    {
        if($keywords) {
            $query->where(function ($q) use ($keywords) {
                $q->where('namaProduk', 'like', "%$keywords%")
                ->orWhere('category', 'like', "%$keywords%");
            });
        }
    }

    protected function scopeStatus(Builder $query, ?string $status=null)
    {
        if($status) {
            $query->where('status', '=', $status);
        }
    }   

    public function type()
    {
        return $this->belongsTo(TypeModel::class, 'type_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

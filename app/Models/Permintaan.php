<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permintaan extends Model
{

    use HasFactory;
    use SoftDeletes;

    protected $table='Permintaan';
    protected $appends = ['status_label'];

    protected $fillable = [
        'id',
        'namaProduk',
        'applicant',
        'price',
        'category',
        'type_id',
        'condition',
        'description',
        'status',
    ];


    public function type()
    {
        return $this->belongsTo(TypeModel::class, 'type_id');
    }

    protected function statusLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => match($this->status) {
                'pending' => 'Menunggu persetujuan',
                'approved' => 'Disetujui',
                'rejected' => 'Ditolak',
                default => 'Tidak diketahui'
            }
        );
    }

    #[Scope]
    protected function search(Builder $query, ?string $keyword): void
    {
     if($keyword) {
        $query->where(function ($q) use ($keyword) {
            $q->where('namaProduk', 'like', "%$keyword%")
            ->orWhere('category', 'like', "%$keyword%");
        });
     }   
    }

    #[Scope]
    protected function category(Builder $query, ?string $category): void
    {
        if($category) {
            $query->where('category', $category);
        }
    }

    protected function condition()
    {
        return Attribute::make(
            set: fn ($value) => strtoupper($value)
        );
    }
}

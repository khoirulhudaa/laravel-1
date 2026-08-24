<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Penerimaan extends Model
{
    protected $table='penerimaan';
    protected $appends = ['status_label'];
    protected $fillable = [
        'id',
        'nameProduk',
        'applicant',
        'price',
        'category',
        'type_id',
        'condition',
        'description',
        'status',
    ];

    protected function scopeSearch(Builder $query, ?string $keywords)
    {
        if($keywords) {
            $query->where(function ($q) use ($keywords) {
                $q->where('namaProduk', 'like', "%$keywords%")
                ->orWhere('category', 'like', "%$keywords%");
            });
        }   
    }

    public function scopeApplicant(Builder $query, ?string $keywords)
    {
        if($keywords) {
            $query->where('applicant', $keywords);
        }
    }

    public function scopeStatus(Builder $query, string $status)
    {
        if($status) {
            $query->where('status', '=', $status);
        }
    }

    protected function statusLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => match($this->status) {
                'reception' => 'Masuk Gudang',
                default => 'Tidak diketahui'
            }
        );
    }

    public function type()
    {
        return $this->belongsTo(TypeModel::class, 'type_id');
    }

    public function commentable()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

}

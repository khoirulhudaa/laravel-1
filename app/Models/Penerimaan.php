<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Penerimaan extends Model
{
    protected $table='penerimaan';
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

    public function type()
    {
        return $this->belongsTo(TypeModel::class, 'type_id');
    }

    public function commentable()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

}

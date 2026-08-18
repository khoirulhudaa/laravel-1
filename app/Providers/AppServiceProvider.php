<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->registerMacroCrud();
    }

    protected function registerMacroCrud():void
    {
        Builder::macro('ambil', function(...$args) {
            /** @var Builder $this */
            return $this->get(...$args);
        });
        
        Builder::macro('ambilById', function($id, $columns=['*']) {
            /** @var Builder $this */
            return $this->find($id, $columns);
        });
            
        Builder::macro('cariAtauGagal', function($id, $columns=['*']) {
            /** @var Builder $this */
            return $this->findOrFail($id, $columns);
        });
            
        Builder::macro('hapus', function() {
            /** @var Builder $this */
            return $this->delete();
            });
            
            Builder::macro('hitung', function($columns='*') {
            /** @var Builder $this */
            return $this->count($columns);
        });
    }
}

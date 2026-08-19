<?php

namespace App\Observers;

use App\Models\Permintaan;
use Illuminate\Support\Facades\Log;

class PermintaanObserver
{
    /**
     * Handle the Permintaan "created" event.
     */

    public function creating(Permintaan $permintaan):void
    {
        $permintaan->status = 'pending';
    }
    public function created(Permintaan $permintaan): void
    {
        Log::info("Permintaan bari dibuat: {$permintaan->namaProduk}");
    }

    /**
     * Handle the Permintaan "updated" event.
     */
    public function updating()
    {
       
    }
    public function updated(Permintaan $permintaan): void
    {
        Log::info("");
    }

    /**
     * Handle the Permintaan "deleted" event.
     */
    public function deleted(Permintaan $permintaan): void
    {
        //
    }

    /**
     * Handle the Permintaan "restored" event.
     */
    public function restored(Permintaan $permintaan): void
    {
        //
    }

    /**
     * Handle the Permintaan "force deleted" event.
     */
    public function forceDeleted(Permintaan $permintaan): void
    {
        //
    }
}

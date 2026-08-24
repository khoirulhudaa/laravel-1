<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class permintaanCheckRole
{
    public function handle(Request $request, Closure $next): Response
    {
        // Cek dulu apakah user login
        if (!Auth::check()) {
            abort(403, 'Anda harus login terlebih dahulu!');
        }

        $user = Auth::user();

        // Cek role_id
        if ($user->role->name !== 'Admin') {
            $roleName = $user->role->name ?? 'Unknown';
            abort(403, "{$roleName} Tidak ada akses!");
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Si no hay usuario o no es admin, 403
        if (! $request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden. Se requiere rol admin.'
            ], 403);
        }

        return $next($request);
    }
}

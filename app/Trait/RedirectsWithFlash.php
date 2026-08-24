<?php

namespace App\Trait;

trait RedirectsWithFlash
{
    protected function redirectSuccess(string $route, string $message, array $params=[])
    {
        return redirect()->route($route, $params)->with('success', $message);
    }

    protected function redirectError(string $route, string $message, array $params=[])
    {
        return redirect()->route($route, $params)->with('error', $message);
    }
}

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

    public function redirectWithFlash(string $route, string $message, string $type='success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message);
    }

    public function redirectWithErrors(string $route, array $errors, array $params=[])
    {
        return redirect()->route($route, $params)->withErrors($errors);
    }
}
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

    protected function redirectWarning(string $route, string $message, array $params=[])
    {
        return redirect()->route($route, $params)->with('warning', $message);
    }

    protected function redirectInfo(string $route, string $message, array $params=[])
    {
        return redirect()->route($route, $params)->with('info', $message);
    }

    protected function redirectWithFlash(string $route, string $message, string $type = 'success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message);
    }

    protected function redirectBackWithFlash(string $message, string $type = 'success')
    {
        return redirect()->back()->with($type, $message);
    }

    protected function redirectBackWithErrors(array $errors)
    {
        return redirect()->back()->withErrors($errors);
    }

    protected function redirectBackWithInput()
    {
        return redirect()->back()->withInput();
    }

    protected function redirectBackWithFlashAndInput(string $message, string $type = 'success')
    {
        return redirect()->back()->with($type, $message)->withInput();
    }

    protected function redirectToRouteWithFlash(string $route, string $message, string $type = 'success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message);
    }

    protected function redirectToRouteWithErrors(string $route, array $errors, array $params=[])
    {
        return redirect()->route($route, $params)->withErrors($errors);
    }

    protected function redirectToRouteWithFlashAndInput(string $route, string $message, string $type = 'success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message)->withInput();
    }

    protected function redirectToRouteWithErrorsAndInput(string $route, array $errors, array $params=[])
    {
        return redirect()->route($route, $params)->withErrors($errors)->withInput();
    }

    protected function redirectToRouteWithFlashErrorsAndInput(string $route, string $message, array $errors, string $type = 'success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput();
    }

    protected function redirectToRouteWithFlashAndErrors(string $route, string $message, array $errors, string $type = 'success', array $params=[])
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors);
    }

    protected function redirectToRouteWithFlashErrorsAndInputAndParams(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[])
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input);
    }

    protected function redirectToRouteWithFlashAndErrorsAndInput(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[])
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input);
    }

    public function redirectToRouteWithFlashErrorsAndInputAndParamsAndMessage(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[], string $flashMessage='')
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input)->with('flash_message', $flashMessage);
    }

    public function redirectToRouteWithFlashAndErrorsAndInputAndParamsAndMessage(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[], string $flashMessage='')
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input)->with('flash_message', $flashMessage);
    }

    public function redirectToRouteWithFlashErrorsAndInputAndParamsAndMessageAndType(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[], string $flashMessage='', string $flashType='success')
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input)->with('flash_message', $flashMessage)->with('flash_type', $flashType);
    }

    public function redirectToRouteWithFlashAndErrorsAndInputAndParamsAndMessageAndType(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[], string $flashMessage='', string $flashType='success')
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input)->with('flash_message', $flashMessage)->with('flash_type', $flashType);
    }

    public function redirectToRouteWithFlashErrorsAndInputAndParamsAndMessageAndTypeAndStatus(string $route, string $message, array $errors, string $type = 'success', array $params=[], array $input=[], string $flashMessage='', string $flashType='success', int $status=302)
    {
        return redirect()->route($route, $params)->with($type, $message)->withErrors($errors)->withInput($input)->with('flash_message', $flashMessage)->with('flash_type', $flashType)->setStatusCode($status);
    }
}
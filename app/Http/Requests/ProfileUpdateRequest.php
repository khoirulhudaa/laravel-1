<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name tidak boleh kosong',
            'name.string' => 'Name wajib karakter',
            'name.max' => 'Maksimal 255 karakter',

            'email.required' => 'Email waji diisi',
            'email.string' => 'Email wajib karakter',
            'email.lowercase' => 'Email tidak boleh kapital',
            'email.email' => 'Wajib mengandung simbol @',
            'email.max' => 'Maksimal 255 karakter'
        ];        
    }
}

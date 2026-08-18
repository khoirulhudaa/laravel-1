<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'country' => ['required', 'string', 'min:2', 'max:35'],
            'initial' => ['required', 'string', 'min:3']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama tipe wajib diisi',
            'name.string' => 'Nama tipe wajib karakter',
            'name.min' => 'Minimal panjang 3 karakter',
            'name.max' => 'Maksimal panjang 255 karakter',

            'country.required' => 'Nama negara wajib diisi',
            'country.string' => 'Nama negara wajib karakter',
            'country.min' => 'Minimal panjang 2 karakter',
            'country.max' => 'Maksimal panjang 35 karakter',
            
            'initial.required' => 'Nama inisial wajib karakter',
            'initial.string' => 'Nama inisial wajib karakter',
            'initial.min' => 'Minimal panjang 3 karakter',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class CommentRequest extends FormRequest
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
            'isi' => ['required', 'string', 'min:2', 'max:500']
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'isi.required' => 'Pesan harus wajib di-isi!',
            'isi.string' => 'Wajib berubah karakter',
            'isi.min' => 'Minimal 2 karakter',
            'isi.max' => 'Maksimal panjang 500 karakter'
        ];
    }
}

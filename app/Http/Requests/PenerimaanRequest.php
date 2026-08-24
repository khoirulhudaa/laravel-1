<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Override;

class PenerimaanRequest extends FormRequest
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
            'nameProduk' => ['required', 'string', 'min:3', 'max:255'],
            'category' => ['required', 'string'],
            'description' => ['required', 'string', 'min:5', 'max:500']
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'nameProduk.required' => 'Nama produk wajib diisi',
            'nameProduk.string' => 'Nama produk wajib kakrakter',
            'nameProduk.min' => 'Panjang karakter minimal 3',
            'nameProduk.max' => 'Panjang karakter maksimal 255',
            
            'category.required' => 'Kategori wajib diisi',
            'category.string' => 'Kategori wajib karakter',

            'description.required' => 'Deskripsi wajib diisi',
            'description.string' => 'Deksripsi wajib karakter',
            'description.min' => 'Panjang karakter minimal 5',
            'description.max' => 'Panjang karakter maksimal 500'
        ];
    }
}

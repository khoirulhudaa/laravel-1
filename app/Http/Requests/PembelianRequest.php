<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PembelianRequest extends FormRequest
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
            'nameProduk' => 'required|string|max:255',
            'applicant' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'type_id' => 'required|exists:type,id',
            'condition' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:pending,approved,rejected',
        ];
    }

    public function messages(): array
    {
        return [
            'nameProduk.required' => 'Nama produk harus diisi.',
            'applicant.required' => 'Nama pemohon harus diisi.',
            'price.required' => 'Harga harus diisi.',
            'category.required' => 'Kategori harus diisi.',
            'type_id.required' => 'Tipe harus dipilih.',
            'type_id.exists' => 'Tipe yang dipilih tidak valid.',
            'condition.required' => 'Kondisi harus diisi.',
            'status.required' => 'Status harus diisi.',
            'status.in' => 'Status harus salah satu dari: pending, approved, rejected.',
        ];
    }
}

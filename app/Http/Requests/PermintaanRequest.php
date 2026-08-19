<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermintaanRequest extends FormRequest
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
            'namaProduk' => ['required' , 'string', 'min:3', 'max:255'],
            'applicant' => ['required', 'string', 'min:2', 'max:255'],
            'kodeseri' => ['required', 'string', 'regex:/^[A-Z]{3}-[0-9]{4}$/'],
            'category' => ['required', 'string', 'in:Laptop,Smartphone,Tablet,Tv,Kamera,Audio,Sound,Hardware,Software,Komputer'],
            'type' => ['required', 'string', 'in:Lg,Panasonic,Samsung,Motorola,Vivo,Oppo,Intel,Hp', 'min:3', 'max:255'],
            'description' => ['required', 'min:3', 'max:255'],
            'status' => ['required', 'string', 'in:pending,approved,rejected,another'],
            'price' => ['required', 'string'],
            'condition' => ['required', 'string', 'in:New,Second'],
        ];
    }


    public function messages(): array
    {
        return [
            'namaProduk.required' => 'Nama produk harus diisi.',
            'namaProduk.string' => 'Nama produk harus berupa teks.',
            'namaProduk.max' => 'Nama produk tidak boleh lebih dari 255 karakter.',
            'namaProduk.min' => 'Nama produk harus memiliki minimal 3 karakter.',

            'category.required' => 'Kategori harus diisi.',
            'category.string' => 'Kategori harus berupa teks.',
            'category.in' => 'Kategori tidak valid. Pilih salah satu dari: Laptop, Smartphone, Tablet, Tv, Kamera, Audio, Sound, Hardware, Software.',

            'kodeseri.required' => 'Kode seri harus diisi.',
            'kodeseri.string' => 'Kode seri harus berupa teks.',
            'kodeseri.regex' => 'Kode seri tidak valid. Format yang benar adalah AAA-1234.',

            'applicant.required' => 'Applicant harus diisi.',
            'applicant.string' => 'Applicant harus berupa teks.',
            'applicant.max' => 'Applicant tidak boleh lebih dari 100 karakter.',

            'type.required' => 'Tipe harus diisi.',
            'type.string' => 'Tipe harus berupa teks.',
            'type.in' => 'Tipe tidak valid. Pilih salah satu dari: Panasonic, Lg, Samsung, Vivo, Motorola, Oppo, Intel, Hp.',

            'condition.required' => 'Kondisi harus diisi.',
            'condition.string' => 'Kondisi harus berupa teks.',
            'condition.in' => 'Kondisi tidak valid. Pilih salah satu dari: New, Second.',

            'description.required' => 'Deskripsi harus diisi.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi tidak boleh lebih dari 500 karakter.',
        ];
    }
}

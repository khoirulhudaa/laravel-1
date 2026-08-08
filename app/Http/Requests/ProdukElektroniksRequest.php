<?php

    namespace App\Http\Requests;

    use Illuminate\Foundation\Http\FormRequest;

    class ProdukElektroniksRequest extends FormRequest
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
                'nameProduk' => ['required', 'string', 'max:100', 'min:3'],
                'category' => ['required', 'string', 'in:Laptop,Smartphone,Tablet,Tv,Kamera,Audio,Sound,Hardware,Software','Komputer'],
                'kodeseri' => ['required', 'string', 'regex:/^[A-Z]{3}-[0-9]{4}$/'],
                'supplier' => ['required', 'string', 'max:100'],
                'buyer' => ['required', 'string', 'max:100'],
                'catalog' => ['required', 'string'],
                'type' => ['required', 'string', 'in:Panasonic,Lg,Samsung,Vivo,Motorola,Oppo,Intel,Hp'],
                'condition' => ['required', 'string', 'in:New,Second'],
                'description' => ['required', 'string', 'max:500'],
                'price' => ['required', 'string'],
            ];
        }

        public function messages(): array
        {
            return [
                'nameProduk.required' => 'Nama produk harus diisi.',
                'nameProduk.string' => 'Nama produk harus berupa teks.',
                'nameProduk.max' => 'Nama produk tidak boleh lebih dari 100 karakter.',
                'nameProduk.min' => 'Nama produk harus memiliki minimal 3 karakter.',

                'category.required' => 'Kategori harus diisi.',
                'category.string' => 'Kategori harus berupa teks.',
                'category.in' => 'Kategori tidak valid. Pilih salah satu dari: Laptop, Smartphone, Tablet, Tv, Kamera, Audio, Sound, Hardware, Software.',

                'kodeseri.required' => 'Kode seri harus diisi.',
                'kodeseri.string' => 'Kode seri harus berupa teks.',
                'kodeseri.regex' => 'Kode seri tidak valid. Format yang benar adalah AAA-1234.',

                'supplier.required' => 'Supplier harus diisi.',
                'supplier.string' => 'Supplier harus berupa teks.',
                'supplier.max' => 'Supplier tidak boleh lebih dari 100 karakter.',

                'buyer.required' => 'Buyer harus diisi.',
                'buyer.string' => 'Buyer harus berupa teks.',
                'buyer.max' => 'Buyer tidak boleh lebih dari 100 karakter.',

                'catalog.required' => 'Catalog harus diisi.',
                'catalog.string' => 'Catalog harus berupa teks.',

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

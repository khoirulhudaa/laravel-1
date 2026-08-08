import { useEffect } from 'react';
import { Form, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CATEGORY_OPTIONS = ['Laptop', 'Smartphone', 'Tablet', 'Tv', 'Kamera', 'Audio', 'Sound', 'Hardware', 'Software'];
const TYPE_OPTIONS = ['Panasonic', 'Lg', 'Samsung', 'Vivo', 'Motorola', 'Oppo', 'Intel', 'Hp'];
const CONDITION_OPTIONS = ['New', 'Second'];

export default function CreateProdukElektroniksView({ produkElektronik = null }) {
    const isEdit = Boolean(produkElektronik);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nameProduk: produkElektronik?.nameProduk ?? '',
        category: produkElektronik?.category ?? '',
        kodeseri: produkElektronik?.kodeseri ?? '',
        supplier: produkElektronik?.supplier ?? '',
        buyer: produkElektronik?.buyer ?? '',
        catalog: produkElektronik?.catalog ?? '',
        type: produkElektronik?.type ?? '',
        condition: produkElektronik?.condition ?? '',
        description: produkElektronik?.description ?? '',
        price: produkElektronik?.price ?? '',
    });

    useEffect(() => {
        if (!isEdit) reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('produk-elektroniks.update', produkElektronik.id));
        } else {
            post(route('produk-elektroniks.store'));
        }
    };

    const inputClass =
        'mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none';
    const labelClass = 'text-sm font-medium text-gray-300';
    const errorClass = 'mt-1 text-xs text-red-400';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isEdit ? 'Edit Produk' : 'Tambah Produk'}
                </h2>
            }
        >
            <div className="bg-gray-900 py-10">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
                        <Form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                {/* Kolom kiri */}
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className={labelClass}>Nama Produk</label>
                                        <input
                                            type="text"
                                            value={data.nameProduk}
                                            onChange={(e) => setData('nameProduk', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.nameProduk && <p className={errorClass}>{errors.nameProduk}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Kategori</label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Pilih kategori</option>
                                            {CATEGORY_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        {errors.category && <p className={errorClass}>{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Type</label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Pilih type</option>
                                            {TYPE_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        {errors.type && <p className={errorClass}>{errors.type}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Kondisi</label>
                                        <select
                                            value={data.condition}
                                            onChange={(e) => setData('condition', e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Pilih kondisi</option>
                                            {CONDITION_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        {errors.condition && <p className={errorClass}>{errors.condition}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Kode Seri</label>
                                        <input
                                            type="text"
                                            placeholder="AAA-1234"
                                            value={data.kodeseri}
                                            onChange={(e) => setData('kodeseri', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.kodeseri && <p className={errorClass}>{errors.kodeseri}</p>}
                                    </div>
                                </div>

                                {/* Kolom kanan */}
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className={labelClass}>Catalog</label>
                                        <input
                                            type="text"
                                            value={data.catalog}
                                            onChange={(e) => setData('catalog', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.catalog && <p className={errorClass}>{errors.catalog}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Supplier</label>
                                        <input
                                            type="text"
                                            value={data.supplier}
                                            onChange={(e) => setData('supplier', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.supplier && <p className={errorClass}>{errors.supplier}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Buyer</label>
                                        <input
                                            type="text"
                                            value={data.buyer}
                                            onChange={(e) => setData('buyer', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.buyer && <p className={errorClass}>{errors.buyer}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Harga</label>
                                        <input
                                            type="text"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.price && <p className={errorClass}>{errors.price}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Deskripsi</label>
                                        <textarea
                                            rows={5}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className={inputClass}
                                        />
                                        {errors.description && <p className={errorClass}>{errors.description}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2 border-t border-gray-800 pt-4">
                                <Link
                                    href={route('produk-elektroniks.index')}
                                    className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
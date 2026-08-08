import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Save, ArrowLeft } from 'lucide-react';

const CATEGORY_OPTIONS = [
    'Laptop', 'Smartphone', 'Tablet', 'Tv', 'Kamera', 'Audio', 'Sound', 'Hardware', 'Software',
];

const TYPE_OPTIONS = [
    'Panasonic', 'Lg', 'Samsung', 'Vivo', 'Motorola', 'Oppo', 'Intel', 'Hp',
];

const CONDITION_OPTIONS = ['New', 'Second'];

const inputClass =
    'w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none';
const labelClass = 'block text-sm font-medium text-gray-300 mb-1';
const errorClass = 'mt-1 text-xs text-red-400';

export default function EditProdukElektroniks({ produk }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        nameProduk: produk.nameProduk ?? '',
        category: produk.category ?? '',
        kodeseri: produk.kodeseri ?? '',
        supplier: produk.supplier ?? '',
        buyer: produk.buyer ?? '',
        catalog: produk.catalog ?? '',
        type: produk.type ?? '',
        condition: produk.condition ?? '',
        description: produk.description ?? '',
        price: produk.price ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('produk-elektroniks.update', produk.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Produk
                </h2>
            }
        >
            <div className="bg-gray-900 min-h-screen py-10">
                <div className="mx-auto max-w-3xl px-6">
                    <button
                        onClick={() => window.history.back()}
                        className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>

                    <div className="rounded-lg border border-gray-700 bg-gray-800/40 p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Edit: {produk.nameProduk}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                                    <label className={labelClass}>Kode Seri</label>
                                    <input
                                        type="text"
                                        value={data.kodeseri}
                                        onChange={(e) => setData('kodeseri', e.target.value)}
                                        placeholder="AAA-1234"
                                        className={inputClass}
                                    />
                                    {errors.kodeseri && <p className={errorClass}>{errors.kodeseri}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Kategori</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">-- Pilih Kategori --</option>
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
                                        <option value="">-- Pilih Type --</option>
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
                                        <option value="">-- Pilih Kondisi --</option>
                                        {CONDITION_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    {errors.condition && <p className={errorClass}>{errors.condition}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>Harga</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.price && <p className={errorClass}>{errors.price}</p>}
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

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Catalog</label>
                                    <input
                                        type="text"
                                        value={data.catalog}
                                        onChange={(e) => setData('catalog', e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors.catalog && <p className={errorClass}>{errors.catalog}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Deskripsi</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className={inputClass}
                                    />
                                    {errors.description && <p className={errorClass}>{errors.description}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !isDirty}
                                    className="flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                                >
                                    <Save size={16} />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
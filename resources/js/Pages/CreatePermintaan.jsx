import { Form, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CATEGORY_OPTIONS = ['Laptop', 'Smartphone', 'Tablet', 'Tv', 'Kamera', 'Audio', 'Sound', 'Hardware', 'Software'];
const TYPE_OPTIONS = ['Panasonic', 'Lg', 'Samsung', 'Vivo', 'Motorola', 'Oppo', 'Intel', 'Hp'];
const CONDITION_OPTIONS = ['New', 'Second'];

export default function CreatePermintaan({ dataPermintaan = null }) {
    const isEdit = Boolean(dataPermintaan);

    const inputClass =
        'mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none';
    const labelClass = 'text-sm font-medium text-gray-300';
    const errorClass = 'mt-1 text-xs text-red-400';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isEdit ? 'Edit Permintaan' : 'Tambah Permintaan'}
                </h2>
            }
        >
            <div className="bg-gray-900 py-10">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
                        <Form
                            action={isEdit ? route('permintaan.update', dataPermintaan.id) : route('permintaan.store')}
                            method={isEdit ? 'put' : 'post'}
                            resetOnSuccess={!isEdit}
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                        {/* Kolom kiri */}
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label className={labelClass}>Nama Produk</label>
                                                <input
                                                    type="text"
                                                    name="namaProduk"
                                                    defaultValue={dataPermintaan?.namaProduk ?? ''}
                                                    className={inputClass}
                                                />
                                                {errors.namaProduk && <p className={errorClass}>{errors.namaProduk}</p>}
                                            </div>

                                            <div>
                                                <label className={labelClass}>Kategori</label>
                                                <select
                                                    name="category"
                                                    defaultValue={dataPermintaan?.category ?? ''}
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
                                                    name="type"
                                                    defaultValue={dataPermintaan?.type ?? ''}
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
                                                    name="condition"
                                                    defaultValue={dataPermintaan?.condition ?? ''}
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
                                                    name="kodeseri"
                                                    placeholder="AAA-1234"
                                                    defaultValue={dataPermintaan?.kodeseri ?? ''}
                                                    className={inputClass}
                                                />
                                                {errors.kodeseri && <p className={errorClass}>{errors.kodeseri}</p>}
                                            </div>
                                        </div>

                                        {/* Kolom kanan */}
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label className={labelClass}>Pemohon</label>
                                                <input
                                                    type="text"
                                                    name="applicant"
                                                    defaultValue={dataPermintaan?.applicant ?? ''}
                                                    className={inputClass}
                                                />
                                                {errors.applicant && <p className={errorClass}>{errors.applicant}</p>}
                                            </div>

                                            <div>
                                                <label className={labelClass}>Harga</label>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    defaultValue={dataPermintaan?.price ?? ''}
                                                    className={inputClass}
                                                />
                                                {errors.price && <p className={errorClass}>{errors.price}</p>}
                                            </div>

                                            <div>
                                                <label className={labelClass}>Deskripsi</label>
                                                <textarea
                                                    name="description"
                                                    rows={5}
                                                    defaultValue={dataPermintaan?.description ?? ''}
                                                    className={inputClass}
                                                />
                                                {errors.description && <p className={errorClass}>{errors.description}</p>}
                                            </div>

                                            {/* status gak ada input visible di form ini, tetap dikirim biar kolom DB terisi */}
                                            <input
                                                type="hidden"
                                                name="status"
                                                value={dataPermintaan?.status ?? 'pending'}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-800 pt-4">
                                        <Link
                                            href={route('permintaan.index')}
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
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
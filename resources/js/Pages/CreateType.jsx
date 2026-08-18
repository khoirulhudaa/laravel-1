import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Form, Link, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react'

export default function CreateType({ dataType=null }) {

    const isEdit = Boolean(dataType);
    
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
                    <Form
                        action={isEdit ? route('type.update', dataType?.id) : route('type.store')}
                        method={isEdit ? 'put' : 'post'}
                        resetOnSuccess={!isEdit}
                    >
                        {({ errors, processing }) => (
                            <>
                                <div className="grid grid-cols-1">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className={labelClass}>Nama Tipe</label>
                                            <input
                                                type="text"
                                                name='name'
                                                defaultValue={dataType?.name}
                                                // onChange={(e) => setData('name', e.target.value)}
                                                className={inputClass}
                                            />
                                            {errors.name && <p className={errorClass}>{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className={labelClass}>Asal</label>
                                            <input
                                                type="text"
                                                name='country'
                                                defaultValue={dataType?.country}
                                                // onChange={(e) => setData('country', e.target.value)}
                                                className={inputClass}
                                            />
                                            {errors.country && <p className={errorClass}>{errors.country}</p>}
                                        </div>

                                        <div>
                                            <label className={labelClass}>Insial</label>
                                            <input
                                                type="text"
                                                name='initial'
                                                defaultValue={dataType?.initial}
                                                // onChange={(e) => setData('initial', e.target.value)}
                                                className={inputClass}
                                            />
                                            {errors.initial && <p className={errorClass}>{errors.initial}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-2 border-t border-gray-800 pt-4">
                                    <Link
                                        href={route('type.index')}
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
  )
}

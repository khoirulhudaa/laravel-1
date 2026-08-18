import { ActionGroup, DeleteButton, DetailButton, EditButton } from '@/Components/DataTable/ActionButtons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { DataTable } from '@/shared/DataTable'
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import React, { Fragment, useState } from 'react'

export default function Type({ dataType=null }) {

const [isDetail, setIsDetail] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [isItemDelete, setIsItemDelete] = useState(null);

const columns = [
    {accessor: 'name', header: 'Nama'},
    {accessor: 'country', header: 'Asal'},
    {accessor: 'initial', header: 'Inisial'}
];

const handleEdit = (item) => {
    router.get(route('type.edit', item.id));
}

const handleDetail = (item) => {

}

const handleDelete = (item) => {
    setShowDeleteModal(true)
    setIsItemDelete(item)
}

const onCloseModalDelete = () => {
    setShowDeleteModal(false)
    setIsItemDelete(null)
}

const confirmDelete = () => {
    router.delete(route('type.destroy', isItemDelete.id), {
        onSuccess: () => onCloseModalDelete()
    })
}

const actions = (item) => {
    return (
        <ActionGroup>
            <EditButton 
                onClick={() => handleEdit(item)} 
            />
            <DetailButton 
                onClick={() => handleDetail(item)} 
            />
            <DeleteButton 
                onClick={() => handleDelete(item)} 
            />
        </ActionGroup>
    )
}

  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Halaman Tipe Produk
            </h2>
        }
    >

        <DataTable 
            title='Tipe Produk'
            data={dataType}
            columns={columns}
            actions={actions}
            prefix={'/type'}
        />

        <Transition show={showDeleteModal && isItemDelete !== null} as={Fragment}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onCloseModalDelete}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                        Yakin hapus {isItemDelete?.name}
                    </DialogTitle>
                    <p className="mt-2 text-sm/6 text-white/50">
                        Data anda akan terhapus secara permanen
                    </p>
                    <div className="mt-4 flex gap-2 items-center justify-between">
                        <Button
                            className="active:scale-[0.98] w-full inline-flex items-center gap-2 rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-600"
                            onClick={() => setShowDeleteModal(false)}
                        >
                        Batalkan
                        </Button>
                        <Button
                            className="active:scale-[0.98] w-full inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-700 data-open:bg-gray-600"
                            onClick={() => confirmDelete()}
                        >
                        Hapus
                        </Button>
                    </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </Transition>

        
    </AuthenticatedLayout>
  )
}
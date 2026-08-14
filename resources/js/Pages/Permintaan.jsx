import { ActionGroup, ApproveButton, DeleteButton, EditButton, RejectButton } from '@/Components/DataTable/ActionButtons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Fragment, useState } from 'react';

export default function Permintaan({permintaanData}) {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [isItemDelete, setIsItemDelete] = useState(null);

    const columns = [
        {accessor: 'namaProduk', header: 'Nama'},
        {accessor: 'category', header: 'Nama'},
        {accessor: 'applicant', header: 'Pemohon'},
        {accessor: 'type', header: 'Tipe'},
        {accessor: 'condition', header: 'Kondisi'},
        {accessor: 'description', header: 'Deskripsi'},
        {accessor: 'status', header: 'Status'},
    ]
    
    const handleDelete = (item) => {
        setShowModalDelete(true);
        setIsItemDelete(item)
    }

    const confirmDelete = (item) => {
        router.delete(route('permintaan.destroy', item.id), {
            onSuccess: () => {
                onCloseModalDelete();
            }
        })
    }
    
    const handleReject = (item) => {
        router.post(route('permintaan.reject', item.id))
    }

    const handleApproval = (item) => {
        router.post(route('permintaan.approval', item.id))
    }

    const onCloseModalDelete = () => {
        setShowModalDelete(false)
        setIsItemDelete(null)
    }

    const handleEdit = (item) => {
        router.get(route('permintaan.edit', item.id));
    }

    const actions = (item) => {
         return (
            <ActionGroup>
                <ApproveButton 
                    onClick={() => handleApproval(item)}
                />
                <RejectButton 
                    onClick={() => handleReject(item)}
                />
                <EditButton 
                    onClick={() => handleEdit(item)}
                />
                <DeleteButton 
                    onClick={() => handleDelete(item)}
                />
            </ActionGroup>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Halaman Permintaan
                </h2>
            }
        >

        <DataTable 
            data={permintaanData}
            title="List Permintaan" 
            description="Daftar permintaan produk" 
            actions={actions}
            columns={columns}
            prefix={'permintaan'}
        />

        <Transition appear show={showModalDelete && isItemDelete !== null} as={Fragment}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onCloseModalDelete}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                        Hapus data {isItemDelete?.namaProduk} ?
                    </DialogTitle>
                    <p className="mt-2 text-sm/6 text-white/50">
                        Data ini akan di hapus secara permanen
                    </p>
                    <div className="mt-4 w-full flex gap-2 justify-between">
                        <Button
                            className="w-full inline-flex justify-center active:scale-[0.98] items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                            onClick={onCloseModalDelete}
                        >
                        Batalkan
                        </Button>
                        <Button
                            className="w-full inline-flex justify-center active:scale-[0.98] items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                            onClick={() => confirmDelete(isItemDelete)}
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
    );
}
import { ActionGroup, ApproveButton, DeleteButton, EditButton, RejectButton, RollbackButton } from '@/Components/DataTable/ActionButtons';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { TriangleAlertIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

export default function Penerimaan({penerimaanData}) {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isItemDelete, setIsItemDelete] = useState(null);
    const [selectItem, setSelectItem] = useState(null);

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
        router.delete(route('penerimaan.destroy', item.id), {
            onSuccess: () => {
                onCloseModalDelete();
            }
        })
    }
    
    const handleRollbackToPending = (item) => {
        setShowModal(true);
        setSelectItem(item);
    }
    
    const handleConfirmRollback = (item) => {        
        router.put(route('penerimaan.rollbackToPending', item.id), {
            onSuccess: () => {
                setShowModal(false)
                setSelectItem(null)
            },
            onError: () => {
                setShowModal(false)
                setSelectItem(null)
            }
        })
    }

    const handleApproval = (item) => {
        router.post(route('penerimaan.approval', item.id))
    }

    const onCloseModalDelete = () => {
        setShowModalDelete(false)
        setIsItemDelete(null)
    }

    const handleEdit = (item) => {
        router.get(route('penerimaan.edit', item.id));
    }

    const actions = (item) => {
         return (
            <ActionGroup>
                <ApproveButton 
                    onClick={() => handleApproval(item)}
                />
                <RollbackButton 
                    onClick={() => handleRollbackToPending(item)}
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
                    Halaman penerimaan
                </h2>
            }
        >

        <DataTable 
            data={penerimaanData}
            title="List penerimaan" 
            description="Daftar penerimaan produk" 
            actions={actions}
            columns={columns}
            prefix={'penerimaan'}
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

        {
            showModal && (
                <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-200">
                                <TriangleAlertIcon className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                    Kembalikan ke status (pending) ?
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Data <span className="font-medium text-gray-700">{selectItem?.nameProduk}</span> akan dirollback secara permanen.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 justify-between gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleConfirmRollback(selectItem)}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 active:scale-[0.98]"
                            >
                                Ya, Rollback
                            </button>
                        </div>
                    </div>
                </Modal>
            )
        }

        </AuthenticatedLayout>
    );
}
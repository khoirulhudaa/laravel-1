import Button from '@/Components/Button';
import { ActionGroup, DeleteButton, DetailButton, EditButton } from '@/Components/DataTable/ActionButtons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Fragment, useState } from 'react';

export default function Dashboard({produkElektroniks}) {

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [isItemDelete, setIsItemDelete] = useState(null);

    console.log('data produk elektroniks:', produkElektroniks)

    const columns = [
        {accessor: 'nameProduk', header: 'Nama'},
        {accessor: 'kodeseri', header: 'Kode'},
        {accessor: 'price', header: 'Harga'},
        {accessor: 'category', header: 'Kategori'},
        {accessor: 'supplier', header: 'Penjual'},
        {accessor: 'condition', header: 'Kondisi'},
        {accessor: 'description', header: 'Deskripsi'},
    ]

    const handleEdit = (item) => {
        setShowModal(true)
    }
    
    const handleDelete = (item) => {
        setShowModalDelete(true)
        setIsItemDelete(item)
    }

    const handleDetail = (item) => {

    }

    const onCloseModalDelete = () => {
        setShowModalDelete(false)
        setIsItemDelete(null)
    }

    const confirmDelete = () => {
        router.delete('produk-elektroniks.dstroy', isItemDelete?s.id)
    }

    const actions = (item) => {
        return (
            <ActionGroup>
                <EditButton 
                    onClick={() => handleEdit(item.id)}
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
                    Halaman Utama
                </h2>
            }
        >

            <DataTable 
                data={produkElektroniks}
                title="Barang Elektronik" 
                description="Daftar barang yang masih di gudang penyimpanan" 
                columns={columns}
                actions={actions}
                prefix={'produk-elektroniks'}
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
                            Hapus data ({isItemDelete?.nameProduk}) ?
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
    );
}
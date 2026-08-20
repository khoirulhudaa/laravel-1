import CommentSection from '@/CommentSection';
import { ActionGroup, ApproveButton, DeleteButton, EditButton, RejectButton } from '@/Components/DataTable/ActionButtons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { MessageSquare, RefreshCcwIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Permintaan({permintaanData, permintaanCommentData}) {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [isItemDelete, setIsItemDelete] = useState(null);
    const [selectData, setSelectData] = useState(null);

    // state khusus buat modal komentar
    const [showModalComment, setShowModalComment] = useState(false);
    const [itemComment, setItemComment] = useState(null);
    const [isProcessing, setIsProcessing] = useState(null);

    useEffect(() => {
        setItemComment(permintaanCommentData)
    }, [permintaanCommentData])

    console.log('comment', permintaanCommentData)
    console.log('permintaan data:', permintaanData)

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
        setIsProcessing({id: item.id, action: 'delete'})
        setIsItemDelete(item)
    }
    
    const confirmDelete = (item) => {
        setIsProcessing({id: item.id, action: 'delete'})
        router.delete(route('permintaan.destroy', item.id), {
            onSuccess: () => {
                onCloseModalDelete();
                setIsProcessing(null)
            },
            onError: () => {
                setIsProcessing(null);
                toast.error('Gagal delete permintaan', {
                    duration: 3000,
                    position: 'top-right'
                });
            }
        })
    }
    
    const handleReject = (item) => {
        setIsProcessing({id: item.id, action: 'reject'})
        router.post(route('permintaan.reject', item.id), {}, {
            onSuccess: () => {
                setIsProcessing(null)
            },
            onError: () => {
                setIsProcessing(null);
                toast.error('Gagal reject permintaan', {
                    duration: 3000,
                    position: 'top-right'
                });
            }
        })
    }
    
    const handleApproval = (item) => {
        setIsProcessing({id: item.id, action: 'approval'})
        console.log('')
        router.post(route('permintaan.approval', item.id), {}, {
            onSuccess: () => {
                setIsProcessing(null)
            },
            onError: () => {
                setIsProcessing(null)
                toast.error('Gagal reject permintaan', {
                    duration: 3000,
                    position: 'top-right'
                });
            },
        })
    }

    const onCloseModalDelete = () => {
        setShowModalDelete(false)
        setIsItemDelete(null)
    }

    const handleEdit = (item) => {
        router.get(route('permintaan.edit', item.id));
        setIsProcessing({id: item.id, action: 'edit'})
    }

    // buka modal komentar untuk item tertentu
    const handleComment = (item) => {
        setSelectData(item)
        setShowModalComment(true);
    }

    const onCloseModalComment = () => {
        setShowModalComment(false);
        setItemComment(null);
    }

    const handleCloseModal = () => {
        setShowModalComment(false)
    }

    const actions = (item) => {

        const isApproving = isProcessing?.id === item.id && isProcessing?.action === 'approval'
        const isRejecting = isProcessing?.id === item.id && isProcessing?.action === 'reject'
        const isEditing = isProcessing?.id === item.id && isProcessing?.action === 'edit'
        const isDeleting = isProcessing?.id === item.id && isProcessing?.action === 'delete'
        const isBusy = isProcessing?.id === item.id // buat disable semua tombol di baris itu selama proses apapun jalan

         return (
            <ActionGroup>
                <ApproveButton 
                    Icon={RefreshCcwIcon}
                    disabled={isBusy}
                    loading={isApproving}
                    onClick={() => handleApproval(item)}
                />
                <RejectButton 
                    Icon={RefreshCcwIcon}
                    disabled={isBusy}
                    loading={isRejecting}
                    onClick={() => handleReject(item)}
                />
                <EditButton 
                    Icon={RefreshCcwIcon}
                    disabled={isBusy}
                    loading={isEditing}
                    onClick={() => handleEdit(item)}
                />
                <DeleteButton 
                    Icon={RefreshCcwIcon}
                    disabled={isBusy}
                    loading={isDeleting}
                    onClick={() => handleDelete(item)}
                />
                <button
                    onClick={() => handleComment(item)}
                    className="rounded-md border border-gray-700 px-2 py-1 flex items-center justify-center w-[32px] h-[32px] text-xs font-medium text-gray-300 hover:bg-gray-800"
                >
                    <MessageSquare className='w-4' />
                </button>
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

        {/* Modal Delete (sudah ada sebelumnya) */}
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

        {/* Modal Komentar (baru) */}
        <Transition appear show={showModalComment && itemComment !== null} as={Fragment}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onCloseModalComment}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-lg rounded-xl bg-gray-900 border border-gray-700 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                    <div className="flex items-center justify-between mb-4">
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Komentar — {itemComment?.namaProduk}
                        </DialogTitle>
                        <button
                            onClick={onCloseModalComment}
                            className="text-gray-400 hover:text-white text-sm"
                        >
                            Tutup
                        </button>
                    </div>

                    {itemComment && (
                        <CommentSection
                            comments={itemComment ?? []}
                            routeName="permintaan.comment"
                            handleClose={handleCloseModal}
                            parentId={selectData?.id}
                        />
                    )}
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </Transition>

        </AuthenticatedLayout>
    );
}
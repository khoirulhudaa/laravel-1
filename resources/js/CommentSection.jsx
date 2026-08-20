import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast, { ToastBar } from 'react-hot-toast';
import { DeleteButton } from './Components/DataTable/ActionButtons';
import { RefreshCcwIcon } from 'lucide-react';

/**
 * Komponen komentar generic — dipakai dengan cara passing `routeName`
 * dan `parentId`, jadi bisa dipakai ulang di Permintaan, Penerimaan,
 * atau model lain yang punya relasi morphMany('comments').
 *
 * Contoh pakai di halaman Permintaan:
 * <CommentSection
 *   comments={dataPermintaan.comments}
 *   routeName="permintaan.comments.store"
 *   parentId={dataPermintaan.id}
 * />
 */

export default function CommentSection({ comments = [], routeName, parentId, handleClose }) {
    const [isi, setIsi] = useState('');
    const [processing, setProcessing] = useState(false);
    const [selectCommentId, setSelectCommentId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isi.trim()) return;

        setProcessing(true);

        router.post(
            route(routeName, parentId),
            { isi },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsi('');
                    toast.success('Komentar berhasil dibuat', {
                        duration: 3000,
                        position: 'top-right'
                    });
                    handleClose();
                },
                onError: () => {
                    toast.error('Gagal membuat komentar', {
                        duration: 3000,
                        position: 'top-right'
                    })
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const handleDelete = (item) => {
        setProcessing(true)
        setSelectCommentId(item.id)

        router.delete(route('comment.destroy', item.id), {
            onSuccess: () => {
                setProcessing(false)
                setSelectCommentId(null)
                toast.success('Berhasil hapus komentar', {
                    duration: 3000,
                    position: 'top-right'
                })
            },
            onError: () => {
                setProcessing(false)
                setSelectCommentId(null)
                toast.success('Berhasil hapus komentar', {
                    duration: 3000,
                    position: 'top-right'
                })
            }
        });
    }

    return (
        // Overlay hitam
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-300">
                Komentar {comments.length > 0 && `(${comments.length})`}
            </h3>

            {/* Form kirim komentar */}
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={processing || !isi.trim()}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                    {processing ? 'Mengirim...' : 'Kirim'}
                </button>
            </form>

            {/* Daftar komentar */}
            <div className="flex flex-col gap-4 max-h-[50vh] pr-2.5 overflow-y-auto">
                {comments.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada komentar.</p>
                )}

                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 border-b border-gray-800 pb-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white">
                            {comment.user?.name?.charAt(0).toUpperCase() ?? '?'}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-200">
                                    {comment.user?.name ?? 'Pengguna'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {comment.created_at}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-400">{comment.isi}</p>
                        </div>
                        <DeleteButton 
                            Icon={RefreshCcwIcon}
                            loading={processing && selectCommentId === comment.id}
                            disabled={selectCommentId === comment.id}
                            onClick={() => handleDelete(comment)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
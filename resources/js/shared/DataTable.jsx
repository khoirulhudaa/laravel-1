import Button from '@/Components/Button';
import { Dialog, Transition } from '@headlessui/react';
import { router, usePage } from '@inertiajs/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClipboardIcon, EyeIcon, FileSpreadsheetIcon, FileTextIcon, PenIcon, PlusIcon, RefreshCcwIcon, TrashIcon } from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';

const columnHelper = createColumnHelper();

const COLUMN_LABELS = {
    nameProduk: 'Nama Produk',
    category: 'Kategori',
    type: 'Type',
    supplier: 'Supplier',
    condition: 'Kondisi',
    kodeseri: 'Kode Seri',
    price: 'Harga',
};

const TruncatedCell = ({ value, maxWidth = 'max-w-[150px]' }) => (
    <span
        title={value}
        className={`block truncate ${maxWidth}`}
    >
        {value}
    </span>
);

export const DataTable = ({ data, title, description }) => {

    const { flash } = usePage().props;
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                }, 
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        } else if (flash.error) {
            toast.error(flash.error, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                }, 
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        }
    }, [flash.success]);

    const dummyData = useMemo(() => [
        {
            id: 1,
            nameProduk: 'Contoh Produk A',
            category: 'Komputer',
            supplier: 'PT Supplier Jaya',
            buyer: 'PT Pembeli Makmur',
            catalog: 'CAT-001',
            type: 'Laptop',
            condition: 'Baru',
            description: 'Contoh deskripsi produk elektronik.',
            price: '5000000',
            kodeseri: 'SN-0001',
        },
        {
            id: 2,
            nameProduk: 'Mesin Bubut',
            category: 'Mesin Industri',
            supplier: 'PT Jaya Jaya',
            buyer: 'PT Pembeli Jaya',
            catalog: 'CAT-002',
            type: 'Mesin',
            condition: 'Bekas',
            description: 'Contoh deskripsi produk mesin.',
            price: '1000000',
            kodeseri: 'MS-0001',
        },
    ], []);

    const dataCurrents = useMemo(
        () => (data && data.length > 0 ? data : dummyData),
        [data, dummyData]
    );

    const formatPrice = (price) => {
        const num = Number(price);
        if (isNaN(num)) return price;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(num);
    };

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [copied, setCopied] = useState(false);
    const [detailItem, setDetailItem] = useState(null);       // buat modal detail
    const [deleteItem, setDeleteItem] = useState(null);        // buat modal konfirmasi hapus
    const [isDeleting, setIsDeleting] = useState(false);        // loading state pas proses hapus

    const columns = useMemo(() => [
        columnHelper.accessor('nameProduk', {
            header: 'Nama Produk',
            cell: (info) => (
                <TruncatedCell value={info.getValue()} maxWidth="max-w-[180px]" />
            ),
        }),
        columnHelper.accessor('category', {
            header: 'Kategori',
            cell: (info) => (
                <span
                    title={info.getValue()}
                    className="inline-block max-w-[120px] truncate rounded-full bg-gray-800/60 px-3 py-1 text-xs font-medium text-gray-300"
                >
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor('type', {
            header: 'Type',
            cell: (info) => <TruncatedCell value={info.getValue()} maxWidth="max-w-[100px]" />,
        }),
        columnHelper.accessor('supplier', {
            header: 'Supplier',
            cell: (info) => <TruncatedCell value={info.getValue()} maxWidth="max-w-[150px]" />,
        }),
        columnHelper.accessor('condition', {
            header: 'Kondisi',
            cell: (info) => <TruncatedCell value={info.getValue()} maxWidth="max-w-[100px]" />,
        }),
        columnHelper.accessor('kodeseri', {
            header: 'Kode Seri',
            cell: (info) => (
                <span title={info.getValue()} className="block max-w-[120px] truncate text-gray-400">
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor('price', {
            header: 'Harga',
            cell: (info) => formatPrice(info.getValue()),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Aksi',
            cell: (info) => {
                const item = info.row.original;
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(item.id)}
                            className="rounded-md bg-orange-600 p-2 text-sm font-medium text-white hover:bg-yellow-700"
                        >
                            <PenIcon size={13} />
                        </button>
                        <button
                            onClick={() => handleDetail(item)}
                            className="rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <EyeIcon size={13} />
                        </button>
                        <button
                            onClick={() => handleDeleteClick(item)}
                            className="rounded-md bg-red-600 p-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            <TrashIcon size={13} />
                        </button>
                    </div>
                );
            }
        })
    ], []);

    const table = useReactTable({
        data: dataCurrents,
        columns,
        state: { sorting, globalFilter, columnFilters },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 10 },
        },
    });

    const getFilteredData = () =>
        table.getFilteredRowModel().rows.map((row) => row.original);

    const handleExportExcel = () => {
        const rows = getFilteredData();
        const exportRows = rows.map((item) => ({
            'Nama Produk': item.nameProduk,
            'Kategori': item.category,
            'Type': item.type,
            'Supplier': item.supplier,
            'Buyer': item.buyer,
            'Kondisi': item.condition,
            'Kode Seri': item.kodeseri,
            'Harga': Number(item.price) || item.price,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Produk');
        XLSX.writeFile(workbook, `${title || 'data'}-${Date.now()}.xlsx`);
    };

    const handleExportPdf = () => {
        const rows = getFilteredData();
        const doc = new jsPDF({ orientation: 'landscape' });

        doc.setFontSize(14);
        doc.text(title || 'Data Produk', 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [['Nama Produk', 'Kategori', 'Type', 'Supplier', 'Buyer', 'Kondisi', 'Kode Seri', 'Harga']],
            body: rows.map((item) => [
                item.nameProduk,
                item.category,
                item.type,
                item.supplier,
                item.buyer,
                item.condition,
                item.kodeseri,
                formatPrice(item.price),
            ]),
            styles: { fontSize: 8 },
            headStyles: { fillColor: [31, 41, 55] },
        });

        doc.save(`${title || 'data'}-${Date.now()}.pdf`);
    };

    const handleCopy = async () => {
        const rows = getFilteredData();
        const header = Object.values(COLUMN_LABELS).join('\t');
        const body = rows
            .map((item) =>
                Object.keys(COLUMN_LABELS)
                    .map((key) => (key === 'price' ? formatPrice(item[key]) : item[key]))
                    .join('\t')
            )
            .join('\n');

        const text = `${header}\n${body}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Data berhasil disalin ke clipboard!', {
                position: 'bottom-right',
                duration: 3000,
                style: {
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                }, 
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
        }
    };

    const handleRefreshData = () => {
        setIsRefreshing(true)

        router.reload({
            only: ['produkElektroniks'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Berhasil perbarui data', {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        backgroundColor: '#1f2937',
                        color: '#ffffff',
                    },
                })
            },
            onError: () => {
                toast.error('Gagal perbarui data', {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        backgroundColor: 'red',
                        color: '#1f2937'
                    }
                })
            },
            onFinish: () => {
                setIsRefreshing(false)
            }
        })
    }

    const handleEdit = (id) => {
        router.visit(route('produk-elektroniks.edit', id));
    };

    const handleDetail = (item) => {
        setDetailItem(item);
    };

    const handleDeleteClick = (item) => {
        setDeleteItem(item); // buka modal konfirmasi, belum hapus beneran
    };

    const confirmDelete = () => {
        if(!deleteItem) return;
        setIsDeleting(true);

        router.delete(route('produk-elektroniks.destroy', deleteItem.id), {
            preserveScroll: true,

            onSuccess: () => {
                toast.custom((t) => (
                    <div
                    className={`${
                        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
                    } max-w-sm w-full bg-zinc-900 text-zinc-100 shadow-xl shadow-black/40 rounded-xl pointer-events-auto flex items-center gap-3 px-4 py-3 ring-1 ring-white/10 backdrop-blur-sm`}
                    >
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                        "{deleteItem.nameProduk}" dihapus
                        </p>
                    </div>
                    <button
                        onClick={() => {
                        router.post(route('produk-elektroniks.restore', deleteItem.id), {}, {
                            preserveScroll: true,
                            onSuccess: () => {
                            toast.dismiss(t.id);
                            toast.success(`"${deleteItem.nameProduk}" berhasil dipulihkan`, {
                                style: {
                                background: '#18181b',
                                color: '#fafafa',
                                border: '1px solid rgba(255,255,255,0.1)',
                                },
                                iconTheme: {
                                primary: '#22c55e',
                                secondary: '#18181b',
                                },
                            });
                            },
                        });
                        }}
                        className="shrink-0 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
                    >
                        Urungkan
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label="Tutup"
                    >
                        ✕
                    </button>
                    </div>
                ), { duration: 4000 });

                setDeleteItem(null);
                },
            onError: () => {
                toast.error('Gagal menghapus data', {
                    position: 'top-right',
                    duration: 3000
                }),
                setDeleteItem(null);
            },
            onFinish: () => {
                setIsDeleting(false)
            }
        });
    }

    const pageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;

    // Bikin range nomor halaman yang ditampilkan di sekitar currentPage,
    // dengan ellipsis (null) buat gap, dan selalu nampilin halaman pertama/terakhir.
    const getPaginationRange = (current, total, siblingCount = 1) => {
        // +5 = current + first + last + 2 ellipsis
        const totalNumbersToShow = siblingCount * 2 + 5;

        if (total <= totalNumbersToShow) {
            return Array.from({ length: total }, (_, i) => i);
        }

        const leftSiblingIndex = Math.max(current - siblingCount, 0);
        const rightSiblingIndex = Math.min(current + siblingCount, total - 1);

        const showLeftEllipsis = leftSiblingIndex > 1;
        const showRightEllipsis = rightSiblingIndex < total - 2;

        if (!showLeftEllipsis && showRightEllipsis) {
            const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i);
            return [...leftRange, 'ellipsis', total - 1];
        }

        if (showLeftEllipsis && !showRightEllipsis) {
            const rightRange = Array.from(
                { length: 3 + siblingCount * 2 },
                (_, i) => total - (3 + siblingCount * 2) + i
            );
            return [0, 'ellipsis', ...rightRange];
        }

        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i
        );
        return [0, 'ellipsis', ...middleRange, 'ellipsis', total - 1];
    };

    const pageNumbers = getPaginationRange(currentPage, pageCount, 1);

    return (
        <div className="bg-gray-900 py-24 sm:py-20">

            <Toaster />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                        Data {title ?? ''}
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-300">{description ?? ''}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <input
                        type="text"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Cari semua kolom..."
                        className="w-full max-w-sm rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={'success'}
                            icon={PlusIcon}
                            onClick={() => window.location.href = '/create'}
                            className="flex items-center gap-2 rounded-md active:scale-[0.98] bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                        >
                            Tambah Data
                        </Button>
                        <Button
                            variant={'excel'}
                            icon={FileSpreadsheetIcon}
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 rounded-md active:scale-[0.98] bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-600"
                        >
                            Export Excel
                        </Button>
                        <Button
                            variant={'error'}
                            icon={FileTextIcon}
                            onClick={handleExportPdf}
                            className="flex items-center gap-2 rounded-md active:scale-[0.98] bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                            Export PDF
                        </Button>
                        <Button
                            variant={'neutral'}
                            icon={ClipboardIcon}
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-md active:scale-[0.98] bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
                            >
                            {copied ? 'Tersalin!' : 'Salin'}
                        </Button>
                        <Button
                            variant={'neutral'}
                            icon={RefreshCcwIcon}
                            onClick={handleRefreshData}
                            disabled={isRefreshing}
                            loading={isRefreshing}
                            className={`flex items-center gap-2 rounded-md active:scale-[0.98] bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600`}
                        >
                            Perbarui
                        </Button>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700 text-left text-sm">
                        <thead className="bg-gray-800">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-4 py-3 font-semibold text-white"
                                        >
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="cursor-pointer select-none hover:text-gray-300"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: ' ↑',
                                                    desc: ' ↓',
                                                }[header.column.getIsSorted()] ?? ''}
                                            </div>

                                            <input
                                                type="text"
                                                value={header.column.getFilterValue() ?? ''}
                                                onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                placeholder="Cari..."
                                                className="mt-2 w-full rounded border border-gray-600 bg-gray-900 px-2 py-1 text-xs font-normal text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                                            />
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-800/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 text-gray-300">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {table.getRowModel().rows.length === 0 && (
                        <div className="px-4 py-8 text-center text-gray-400">
                            Tidak ada data produk.
                        </div>
                    )}
                </div>

                <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-gray-300 sm:flex-row">
                    <div className="w-max flex items-center gap-4">
                        {/* Dropdown jumlah data per halaman */}
                        <div className="flex items-center gap-2">
                            <select
                                id="pageSize"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-white focus:border-gray-500 focus:outline-none"
                            >
                                {[10, 25, 50, 100].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <span>
                            Menampilkan {table.getRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} data
                        </span>

                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-md border border-gray-700 px-3 py-1 disabled:opacity-40"
                        >
                            «
                        </button>

                        {pageNumbers.map((pageIndex, i) =>
                            pageIndex === 'ellipsis' ? (
                                <span key={`ellipsis-${i}`} className="px-2 text-gray-500 select-none">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={pageIndex}
                                    onClick={() => table.setPageIndex(pageIndex)}
                                    className={`rounded-md border px-3 py-1 ${
                                        currentPage === pageIndex
                                            ? 'border-white bg-white text-gray-900 font-semibold'
                                            : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {pageIndex + 1}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-md border border-gray-700 px-3 py-1 disabled:opacity-40"
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>

            <Transition appear show={deleteItem !== null} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => !isDeleting && setDeleteItem(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm rounded-lg bg-gray-900 border border-gray-700 p-6">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <Dialog.Title className="text-base font-semibold text-white">
                                                Hapus Produk?
                                            </Dialog.Title>
                                            <p className="mt-1 text-sm text-gray-400">
                                                Kamu akan menghapus{' '}
                                                <span className="font-medium text-gray-200">
                                                    {deleteItem?.nameProduk}
                                                </span>
                                                . Tindakan ini tidak bisa dibatalkan.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between gap-2">
                                        <button
                                            onClick={() => setDeleteItem(null)}
                                            disabled={isDeleting}
                                            className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                                        >
                                            Batalkan
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            disabled={isDeleting}
                                            className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
                                        >
                                            {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={detailItem !== null} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setDetailItem(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg rounded-lg bg-gray-900 border border-gray-700 p-6">
                                    <Dialog.Title className="text-lg font-semibold text-white mb-4">
                                        Detail Produk
                                    </Dialog.Title>

                                    {detailItem && (
                                        <dl className="grid grid-cols-3 gap-y-3 text-sm">
                                            {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                                                <div key={key} className="contents">
                                                    <dt className="text-gray-400 col-span-1">{label}</dt>
                                                    <dd className="text-white col-span-2">
                                                        {key === 'price'
                                                            ? formatPrice(detailItem[key])
                                                            : detailItem[key] || '-'}
                                                    </dd>
                                                </div>
                                            ))}
                                            {detailItem.description && (
                                                <div className="contents">
                                                    <dt className="text-gray-400 col-span-1">Deskripsi</dt>
                                                    <dd className="text-white col-span-2">{detailItem.description}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    )}

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={() => setDetailItem(null)}
                                            className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
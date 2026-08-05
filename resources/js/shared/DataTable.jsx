import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const columnHelper = createColumnHelper();

const COLUMN_LABELS = {
    nameProduk: 'Nama Produk',
    category: 'Kategori',
    type: 'Type',
    supplier: 'Supplier',
    buyer: 'Buyer',
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
    const dummyData = useMemo(() => [
        {
            id: 1,
            nameProduk: 'Contoh Produk A',
            category: 'Komputer',
            supplier: 'PT Supplier Jaya',
            buyer: 'PT Pembeli Makmur dasdhasj jdashahdaj',
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
        columnHelper.accessor('buyer', {
            header: 'Buyer',
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
            pagination: { pageSize: 1 },
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
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
        }
    };

    const pageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i);

    return (
        <div className="bg-gray-900 py-24 sm:py-20">
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
                        <button
                            onClick={() => window.location.href = '/create'}
                            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                        >
                            Tambah Data
                        </button>
                        <button
                            onClick={handleExportExcel}
                            className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-600"
                        >
                            Export Excel
                        </button>
                        <button
                            onClick={handleExportPdf}
                            className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                            Export PDF
                        </button>
                        <button
                            onClick={handleCopy}
                            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
                        >
                            {copied ? 'Tersalin!' : 'Salin'}
                        </button>
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
                    <div class="w-max flex items-center gap-4">
                        {/* Dropdown jumlah data per halaman */}
                        <div className="flex items-center gap-2">
                            <select
                                id="pageSize"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-white focus:border-gray-500 focus:outline-none"
                            >
                                {[1, 2, 25, 50, 100].map((size) => (
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

                        {pageNumbers.map((pageIndex) => (
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
                        ))}

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
        </div>
    );
};
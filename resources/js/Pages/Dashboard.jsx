import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';

export default function Dashboard({produkElektroniks}) {

    const columns = [
        {accessor: 'nameProduk', header: 'Nama'},
        {accessor: 'kodeseri', header: 'Kode'},
        {accessor: 'price', header: 'Harga'},
        {accessor: 'category', header: 'Kategori'},
        {accessor: 'supplier', header: 'Penjual'},
        {accessor: 'condition', header: 'Kondisi'},
        {accessor: 'description', header: 'Deskripsi'},
    ]

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    const handleDetail = () => {

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
                    onClick={() => handleDelete(item.id)}
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

        </AuthenticatedLayout>
    );
}
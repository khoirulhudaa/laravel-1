import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/shared/dataTable';

export default function Dashboard({ produkElektroniks, filters }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Halaman Utama
                </h2>
            }
        >

            <DataTable 
                title="Barang Elektronik" 
                description="Daftar barang yang masih di gudang penyimpanan" 
                data={produkElektroniks}
                filters={filters}
        />

        </AuthenticatedLayout>
    );
}

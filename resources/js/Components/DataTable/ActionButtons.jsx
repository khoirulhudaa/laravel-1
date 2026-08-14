import { EyeIcon, PenIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';

export const EditButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="rounded-md bg-orange-600 p-2 text-sm font-medium text-white hover:bg-yellow-700"
        title="Edit"
    >
        <PenIcon size={13} />
    </button>
);

export const DetailButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700"
        title="Detail"
    >
        <EyeIcon size={13} />
    </button>
);

export const DeleteButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="rounded-md bg-red-600 p-2 text-sm font-medium text-white hover:bg-red-700"
        title="Hapus"
    >
        <TrashIcon size={13} />
    </button>
);

export const ApproveButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="rounded-md bg-green-600 p-2 text-sm font-medium text-white hover:bg-green-700"
        title="Setujui"
    >
        <CheckIcon size={13} />
    </button>
);

export const RejectButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="rounded-md bg-red-600 p-2 text-sm font-medium text-white hover:bg-red-700"
        title="Tolak"
    >
        <XIcon size={13} />
    </button>
);

export const ActionGroup = ({ children }) => (
    <div className="flex gap-2">{children}</div>
);
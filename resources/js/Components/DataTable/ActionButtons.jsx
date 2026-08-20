import { EyeIcon, PenIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';

export const EditButton = ({ onClick, Icon, loading, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md bg-orange-600 p-2 text-sm font-medium flex items-center justify-center w-[32px] h-[32px] text-white hover:bg-yellow-700"
        title="Edit"
    >
        {
            loading ? (
                <Icon className='animate animate-spin duration-300 w-3' />
            ):
                <PenIcon size={13} />
        }
    </button>
);

export const DetailButton = ({ onClick, Icon, loading, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md bg-blue-600 p-2 text-sm font-medium flex items-center justify-center w-[32px] h-[32px] text-white hover:bg-blue-700"
        title="Detail"
    >
        {
            loading ? (
                <Icon className='animate animate-spin duration-300 w-3' />
            ):
                <EyeIcon size={13} />
        }
    </button>
);

export const DeleteButton = ({ onClick, Icon, loading, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md bg-red-600 p-2 text-sm font-medium t flex items-center justify-center w-[32px] h-[32px] text-white hover:bg-red-700"
        title="Hapus"
    >
        {
            loading ? (
                <Icon className='animate animate-spin duration-300 w-3' />
            ):
                <TrashIcon size={13} />
        }
    </button>
);

export const ApproveButton = ({ onClick, Icon, loading, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md bg-green-600 p-2 text-sm font-medium flex items-center justify-center w-[32px] h-[32px] text-white hover:bg-green-700"
        title="Setujui"
    >
        {
            loading ? (
                <Icon className='animate animate-spin duration-300 w-3' />
            ):
                <CheckIcon size={13} />
        }
    </button>
);

export const RejectButton = ({ onClick, Icon, loading, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md bg-red-600 p-2 text-sm font-medium t flex items-center justify-center w-[32px] h-[32px] text-white hover:bg-red-700"
        title="Tolak"
    >
        {
            loading ? (
                <Icon className='animate animate-spin duration-300 w-3' />
            ):
                <XIcon size={13} />
        }
    </button>
);

export const ActionGroup = ({ children }) => (
    <div className="flex gap-2">{children}</div>
);
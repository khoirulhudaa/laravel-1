import { cva } from "class-variance-authority";

const button = cva(
    "flex items-center gap-2 rounded-md active:scale-[0.98] text-sm font-medium text-white transition-colors",
    {
        variants: {
            variant: {
                "success": "bg-blue-600 hover:bg-blue-700",
                "warning": "bg-yellow-600 hover:bg-yellow-700",
                "excel": "bg-green-600 hover:bg-green-700",
                "error": "bg-red-600 hover:bg-red-700",
                "neutral": "bg-gray-600 hover:bg-gray-700",
            },
            size: {
                sm: "px-2 py-1 text-xs",
                md: "px-3 py-2 text-sm",
            }
        },
        defaultVariants: {
            variant: 'success', size: 'md'
        }
    },
)

export default function Button({ variant, size, className, icon: Icon, children, ...props }) {
    return (
        <button className={button({ variant, size, className })} {...props}>
            { Icon && <Icon className="h-4 w-4" /> }
            { children }
        </button>
    )
}
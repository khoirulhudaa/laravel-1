import { Typography } from "@material-tailwind/react"

export const Footer = () => {
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 px-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
            <Typography color="blue-gray" className="font-normal">
            &copy; PT Pintex Plumbon
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
                <Typography
                    as="a"
                    href="/dashboard"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Halaman Utama
                </Typography>
            </li>
            <li>
                <Typography
                    as="a"
                    href="/permintaan"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Permintaan
                </Typography>
            </li>
            <li>
                <Typography
                    as="a"
                    href="/penerimaan"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Penerimaan
                </Typography>
            </li>
            <li>
                <Typography
                    as="a"
                    href="/kontak"
                    color="blue-gray"
                    className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                    Kontak Kantor
                </Typography>
            </li>
            </ul>
        </footer>
    )
}
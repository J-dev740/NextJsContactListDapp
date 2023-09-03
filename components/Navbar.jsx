
import Link from "next/link"

export default function Navbar(){
    return (
        <nav className="group flex justify-between items-center hover:shadow-slate-700 hover:shadow-lg bg-slate-800 px-8 py-3 rounded-[10px]">
            <Link className=" transition-all transform duration-150 font-light bg-slate-900 p-4 text-white rounded-[10px] hover:shadow-lg hover:shadow-slate-700 "
             href={'/'}>Contact List </Link>
            <Link className="transition-all transform duration-150   bg-white text-gray-600 p-2 rounded-[10px] hover:shadow-lg hover:shadow-slate-700 " 
            href={'/addTopic'}>Add Contact </Link>

        </nav>
    )
}
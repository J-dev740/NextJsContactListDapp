
import Link from "next/link"

export default function Navbar(){
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 rounded-[10px]">
            <Link className="font-bold bg-slate-900 p-4 text-white rounded-[30px]"
             href={'/'}>Contact List </Link>
            <Link className="bg-white text-gray-600 p-2 rounded-[50px] " 
            href={'/addTopic'}>Add Contact </Link>

        </nav>
    )
}
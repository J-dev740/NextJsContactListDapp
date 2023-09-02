'use client'
import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation"


export default function RemoveBtn({ name,phone }){

    const router=useRouter()
    const removeTopic=async()=>{
            const confirmed= confirm("Are you Sure ?")

            if(confirmed){
            const res=  await fetch(`http://localhost:8000/user?name=${name}&phone=${phone}`,{
                    method:"DELETE",

                })
                if(res.ok){
                    router.refresh()
                }
            }

    }


    return (


        <button  onClick={removeTopic} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    )
}
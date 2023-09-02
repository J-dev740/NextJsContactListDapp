// "use client"
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import {HiPencilAlt} from 'react-icons/hi'
import axios from "axios";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
let ContactList=[]
const getTopics=  async ()=>{

    const response = await axios.get('http://localhost:8000/user',{
        cache:'no-store'
    })

    const data= response.data
    ContactList=data
    return data
    // .then(response=>
    //     JSON.stringify(response.data)
    // )
    // .then(data=>{
    //     console.log(data)
    //     return data
    // })


}


export default  async function TopicsList(){



   ContactList= await  getTopics()
    // console.log(ContactList[0].name)
    return (
    <>

       { ContactList.map((t,index )=>(
            
            <div className="p-4 border border-slate-300  my-3 flex justify-between gap-5 rounded-[10px] shadow-xl" key={index}>
                <div>
                    <h2 className="font-bold text-2xl" >{ContactList[index].name}</h2>
                    <div >{ContactList[index].phone}</div>
                    <div><span className="font-bold">CreatedAt:</span>{ContactList[index].CreatedAt}</div>
                </div>
    
                <div className="flex gap-2 items-start ">
                    <RemoveBtn name={ContactList[index].name} phone={ContactList[index].phone} />
                    <Link href={'/editTopic/123'}>
                        <HiPencilAlt size={24}/>
                    </Link>
                </div>
            </div>

        ))}
        
    
    </>
)

}


"use client"
import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { useRouter } from "next/navigation";
import * as dotenv from  'dotenv'
import Loader from "@/components/Loader";
import axios from "axios";
dotenv.config()

const provider= new ethers.getDefaultProvider("https://eth-sepolia.g.alchemy.com/v2/rWqzqeV4QteHsQppUXJauHl-7vENalwT")
const PRIVATE_KEY="0xadc627587063d15a2ea7e979d3b85c7fea2a0b08c3c6737302c4d28fa8b30a80"
const wallet= new ethers.Wallet(PRIVATE_KEY,provider)
const Abi=  
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "contactInfo",
        "type": "uint256"
      }
    ],
    "name": "contactRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "contactInfo",
        "type": "uint256"
      }
    ],
    "name": "storeContact",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "contactNo",
        "type": "uint256"
      }
    ],
    "name": "RemoveContact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "contactNo",
        "type": "uint256"
      }
    ],
    "name": "Store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "UserToContact",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "i_owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
// const Abi= 
// [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "contactInfo",
//           "type": "uint256"
//         }
//       ],
//       "name": "storeContact",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "contactNo",
//           "type": "uint256"
//         }
//       ],
//       "name": "Store",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "i_owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
// ]
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)


//contract_abi for storing contact details


const ValidationString=/^[0-9]{10}$/
function AddTopic() {
    const router=useRouter()
    const[numbervalue,setNumValue]=useState(0)
    const[stringvalue,setStringValue]=useState('')
    const[isloading,setLoading]=useState(false)



    //define handlesubmit function
    const handleSubmit=async(e)=>{
        e.preventDefault()

        // setLoading(true)
        if(!numbervalue||numbervalue==0||!ValidationString.test(numbervalue)){
            alert("please provide a valid Mobile number")
            return 
        }else if(!stringvalue||stringvalue==''||stringvalue.length>30){
            alert('please provide a valid name')
            return
        }
         axios.get(`http://localhost:8000/user/${numbervalue}`,{
            cache:'no-store',
            // params:{
            //     number:`${numbervalue}`
            // },
        }).then((response)=>{
            console.log(response.data)
            let data=response.data
                    if (data) {
                      setLoading(false);
                      console.log("user already exists...");
                      alert(`User already exists Try a different PhoneNo.`);
                      return;
                    } else {
                      console.log("adding user");
                      setLoading(true);
                      goto().then(()=>{
                        console.log('success')
                      })
                    }
        })

            async function goto(){

                try {

                    console.log('initializing contract')
                    const contact= new  ethers.Contract("0x412bc555508e4e91bACaCFCB0Af717F7a4249A46",Abi)
                    const Contact=contact.connect(wallet)
                        console.log('initiating transaction...')
                        const tx=await Contact.Store(stringvalue,numbervalue)
                        await  tx.wait(1)
                        setLoading(false)
                        console.log('contact added....')
                        router.refresh()
                        router.refresh()
                        router.push('/',{
                            replace:true
                        })
                    
                } catch (error) {
                    console.log(error)
                }

            }
    }


  return (
    <form onSubmit={handleSubmit}
     className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Name"
        value={stringvalue}
        className="border rounded-[10px] bg-slate-600 border-slate-500 px-8 py-2 "
        onChange={(e)=>setStringValue(e.target.value)}
      />
      <input
        type="Number"
        placeholder="Phone Number"
        value={numbervalue}
        className="border rounded-[10px] bg-slate-600 border-slate-500 px-8 py-2 "
        onChange={(e)=>setNumValue(e.target.value)}

      />
        {
            isloading
            ?   <Loader />
            :
                <button type="submit"  className="bg-green-600 font-bold rounded-[20px] text-white py-3 px-6 w-fit "
                >Add Contact
                </button>
            
        }

    </form>
  );
}

export default AddTopic
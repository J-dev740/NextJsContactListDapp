
"use client"
import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { useRouter } from "next/navigation";
import * as dotenv from  'dotenv'
dotenv.config()
// import {useClient} from 'next/client'
// const provider= new ethers.AlchemyProvider()
const provider= new ethers.getDefaultProvider("https://eth-sepolia.g.alchemy.com/v2/rWqzqeV4QteHsQppUXJauHl-7vENalwT")
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const PRIVATE_KEY="0xadc627587063d15a2ea7e979d3b85c7fea2a0b08c3c6737302c4d28fa8b30a80"

const wallet= new ethers.Wallet(PRIVATE_KEY,provider)
// const signer=  provider.getSigner("a81DE2e4693b9fC3Bc16Ab56D148CC938203B430").then(()=>{})
const Contact_address= process.env.CONTRACT_ADDRESS
const Abi= [
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
      "name": "Store",
      "outputs": [],
      "stateMutability": "nonpayable",
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
const ValidationString=/^[0-9]{10}$/
function AddTopic() {
    const router=useRouter()

const[numbervalue,setNumValue]=useState(0)
const[stringvalue,setStringValue]=useState('')


    //define handlesubmit function
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!numbervalue||numbervalue==0||!ValidationString.test(numbervalue)){
            alert("please provide a valid Mobile number")
            return 
        }else if(!stringvalue||stringvalue==''||stringvalue.length>30){
            alert('please provide a valid name')
            return
        }
        const contact= new  ethers.Contract("0xb77fA9E3E251F434573972429EDfbaBD755A9d09",Abi)
        const Contact=contact.connect(wallet)
        try {
            const tx=await Contact.Store(stringvalue,numbervalue)
            await  tx.wait(1)
            console.log('contact added....')
            router.refresh()
            router.push('/',{
                replace:true
            })
        } catch (error) { 
            throw new Error("Failed to Create topic:\n")
            console.log(error)
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

      <button type="submit" className="bg-green-600 font-bold rounded-[20px] text-white py-3 px-6 w-fit "
      >Add Contact
      </button>
    </form>
  );
}

export default AddTopic
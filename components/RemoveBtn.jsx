'use client'
import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation"
import {ethers} from 'ethers'

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

export default function RemoveBtn({ name,phone }){

    const router=useRouter()
    const removeTopic=async()=>{
            const confirmed= confirm("Are you Sure ?")

            if(confirmed){
                console.log('initalizing contract...')
                const contact= new  ethers.Contract("0x412bc555508e4e91bACaCFCB0Af717F7a4249A46",Abi)
                const Contact=contact.connect(wallet)
                try {
                    //deleting it from the database
                    const res=  await fetch(`http://localhost:8000/user?name=${name}&phone=${phone}`,{
                        method:"DELETE",
    
                    })
                    console.log('checking res.ok')
                    if(res.ok){ 
                        console.log('contact deleted....')
                        router.refresh()
                    }
                    console.log
                    const tx=await Contact.RemoveContact(name,phone)
                    await  tx.wait(1)
                    console.log('contact removed....from contract')
                }catch(error){
                    console.log('something went wrong..')
                    console.log({message:error})
                }
            }

    }


    return (


        <button  onClick={removeTopic} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    )
}
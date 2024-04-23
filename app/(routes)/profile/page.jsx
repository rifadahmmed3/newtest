"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function profile() {

  const jwt = sessionStorage.getItem('jwt');
  const user= JSON.parse(sessionStorage.getItem('user'));
  const router= useRouter(); 
  const [loader,setLoader]=useState(false);

  const [fullname,setFullname] = useState();
  const [username,setUsername] = useState();
  const [fathername,setFathername] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [usertype,setUserType] = useState();
  const [gender,setGendar] = useState();
  const [point,setPoint] = useState();
  const [packages,setPackage] = useState();
  const [level,setLevel] = useState();
  const [moneys,setMoneys] = useState();

  useEffect(()=>{
    if(!jwt)
    {
        router.replace('/');
    }
    getMyInfo();

},[]);

const getMyInfo= async()=>{
    const getMyInfo_= await GlobalApi.getMyData(user.id);
    console.log(getMyInfo_);
    setFullname(getMyInfo_.fullname)
    setUsername(getMyInfo_.username)
    setFathername(getMyInfo_.fathersname)
    setEmail(getMyInfo_.email)
    setPhone(getMyInfo_.phone)
    setAddress(getMyInfo_.address)
    setUserType(getMyInfo_.usertype)
    setGendar(getMyInfo_.gender)
    setPoint(getMyInfo_.mypoint)
    setPackage(getMyInfo_.mypackage)
    setLevel(getMyInfo_.mylevel)
    setMoneys(getMyInfo_.mymoney)
}

const withdraw= ()=>{

}

  return (
    <div className=''>
            <h2 className='p-3 bg-primary text-xl font-bold text-center'>User Profile</h2>
            <div className='p-5 px-5 md:px-10 py-8 justify-center'>
                
                <div className='mx-10 border '>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'> {fullname}</h2> 
                    <div className='bg-gray-200 flex justify-center gap-2 mb-3 '>
                        {/* <h2>Point: {point}</h2> */}
                        <h2>Package: {packages}</h2>
                        <h2>Level: {level}</h2>
                        <h2>Money: {moneys}</h2>
                    </div>

                    <div className='p-4 flex flex-col gap-4 justify-center'>

                        <h2 className='flex justify-between text-bold'> Username: <span>{username}</span></h2>
                        <h2 className='flex justify-between text-bold'> Email Address: <span>{email}</span></h2>
                        <h2 className='flex justify-between text-bold'> Phone Number: <span>{phone}</span></h2>
                        <h2 className='flex justify-between text-bold'> Father's Name: <span>{fathername}</span></h2>
                        <h2 className='flex justify-between text-bold'> Address: <span>{address}</span></h2>
                        <h2 className='flex justify-between text-bold'> User Type: <span>{usertype}</span></h2>
                        <h2 className='flex justify-between text-bold'> Gendar: <span>{gender}</span></h2>
                        
                        
                        <h2>After 1000 on money, you can withdraw.</h2>
                        {/* <Input placeholder='Txn Id'  /> */}
                        <Button disabled={!(moneys > 1000)} onClick={()=>withdraw()} >{loader? <LoaderIcon className="animate-spin" />:'Withdraw'} </Button>
                    </div>
                </div>


            </div>

        </div>
  )
}

export default profile
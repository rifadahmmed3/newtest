"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react';
import { Link } from 'next/link'; 
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

function SignIn() {

  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const router=useRouter();
  const [loader,setLoader]=useState();

  useEffect(()=>{
    const jwt=sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }

  },[])


  const onSignIn=()=>{

    setLoader(true)
    GlobalApi.signIn(email,password).then(resp=>{
      sessionStorage.setItem('user',JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt',resp.data.jwt);
      router.push('/');
      toast("SignIn succesfully.")
      setLoader(false)
    },(e)=>{
      toast(e?.response?.data?.error?.message)
      
      setLoader(false)
    })
  }

  return (
    <div className='flex items-baseline justify-center my-10 mt-10'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
        <Image src="/logo.png" width={200} height={200} alt='logo'/>
        <h2 className='font-bold text-3xl' >Sign In to account</h2>
        <h2 className='text-gray-500'>Enter your Email and password to SignIn.</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder="Email Adress" onChange={(e)=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={()=>onSignIn()} disabled={!(email&&password)}> {loader? <LoaderIcon className="animate-spin" />:'Sign In'}</Button>
            <p>Don't have account, <a href={'/create-account'} className=' text-blue-500'>SignUp</a></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
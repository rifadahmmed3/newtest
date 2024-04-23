"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react';


// Radio Button
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link'



function CreateAccount() {


  const router=useRouter();
  const [username, setUsername]=useState();
  const [fullname, setFullname]=useState();
  const [fathername, setFathername]=useState();
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const [address, setAddress]=useState();
  const [phone, setPhone]=useState();
  const [nidorbirth, setNIDorBirth]=useState();

  const [usertype, setUsertype] = React.useState('male');
  const [gender, setGender] = React.useState('student');


 //(username,fullname,fathername,email,password,address,phone,nidorbirth)

  const [loader,setLoader]=useState();
  const [dataset,setdataset]=useState();

  
  

  useEffect(()=>{
    const jwt=sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }
    
  },[])

  const onCreateAccount=()=>{
    
    setLoader(true)
    GlobalApi.registerUser(username,fullname,fathername,email,password,address,phone,nidorbirth,usertype,gender).then(resp=>{
      // console.log(resp.data.user)
      // console.log(resp.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt',resp.data.jwt);
      router.push('/');
      toast("Account create succesfully.")
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
        <h2 className='font-bold text-3xl '>Create an account</h2>
        <h2 className='text-gray-500 '>Enter your information to create an account.</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder="User Name" onChange={(e)=>setUsername(e.target.value)} />
            <Input placeholder="Full Name" onChange={(e)=>setFullname(e.target.value)}/>
            <Input placeholder="Father's Name" onChange={(e)=>setFathername(e.target.value)}/>
            <Input placeholder="Email (example@mail.com)" onChange={(e)=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <Input placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
            <Input placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
            <Input placeholder="NID or Birth Registation" onChange={(e)=>setNIDorBirth(e.target.value)}/>

            <RadioGroup defaultValue="student" className='flex items-center gap-1' value={usertype} onValueChange={setUsertype}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family">Family</Label>
              </div>
            </RadioGroup>

            <RadioGroup defaultValue="male" className='flex items-center gap-1' value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>

            <Button onClick={()=>onCreateAccount()} disabled={!(username && fullname && fathername && email && password && address && phone && nidorbirth)}> {loader? <LoaderIcon className="animate-spin" />:'Sign Up'}</Button>
            <p>Already have account, <Link href={'/sign-in'} className=' text-blue-500'>SignIn</Link>
              
            </p>
          {/* <Link href={'www.youtube.com'}>SignIn</Link> */}
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Checkout(){

    
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [totalCartItem,setTotalCartItem] = useState(0);
    const [cartItemList,setCartItemList] = useState([]);
    const [subtotal,setSubTotal]=useState(0);
    const [totalPoint,setTotalPoint]=useState(0);
    const router=useRouter();

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [phone,setPhone]=useState();
    const [zip,setZip]=useState();
    const [address,setAddress]=useState();


    const [paymentmethod, setPaymentmethod] = React.useState('bkash');
    const [paymentid, setPaymentid] = useState();

    const [payerNumb,setpayerNumb] = useState();

    const [loader,setLoader]=useState(false);
    
    

    useEffect(()=>{
        if(!jwt){
            router.push('/sign-in')
        }
        getCartItems();

      },[])

    const getCartItems=async()=>{
        const cartItemList_=await GlobalApi.getCartItems(user.id,jwt);
        //console.log(cartItemLists_);
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_);
  
      }

    useEffect(()=>{
        let totalpoint=0;
        cartItemList.forEach(element => {
            totalpoint = totalpoint + parseInt(element.productPoint)
        });
        setTotalPoint(totalpoint)
    },[cartItemList])
  
    useEffect(()=>{
          let total=0;
          cartItemList.forEach(element => {
              total = total + parseInt(element.amount)
          });
          setSubTotal(total)
      },[cartItemList])
      
      const calculateTotalAmount=()=>{
        const totalAmount=subtotal+150;
        return totalAmount;
      }



      const onOrderInfo=(amounts)=>{
        const orderinfo={
            data:{
                totalOrderAmount:amounts,
                username:username,
                email:email,
                phone:phone,
                zip:zip,
                address:address,
                orderItemList:cartItemList,
                userId:user.id,
                orderStatus:'Pending',
                totalorderpoint:totalPoint,
                paymentmethod:paymentmethod,
                paymentid:paymentid,

                
            }
        }
        setLoader(true)
        GlobalApi.createOrder(orderinfo,jwt).then(resp=>{
            //console.log(resp);
            toast("Order Submited")
            // cartItemList.forEach((item,index)=>{
            //     GlobalApi.afterDeleteCartItem(item.id).then(resp=>{
            //         console.log("deleting item!!")
            //     })
            // })
            setLoader(false)
            router.replace('/')
        })
    }


    return (
        <div className=''>
            <h2 className='p-3 bg-primary text-xl font-bold text-center'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
                <div className='  md:col-span-2 mx-10 mb-10'>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='flex flex-col gap-4 mt-3'>
                        <Input placeholder='Name' onChange={(e)=>setUsername(e.target.value)} />
                        <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-4 mt-3'>
                        <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
                        <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)}/>
                    </div>
                    <div className=' mt-3 '>
                        <Input placeholder='Address' onChange={(e)=>setAddress(e.target.value)}  />
                    </div>

                </div>

                <div className='mx-10 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'> SubTotal: <span>{subtotal}</span></h2>
                        <hr></hr>
                        <h2 className='flex justify-between'> Delivery: <span>150</span></h2>
                        <h2 className='flex justify-between'> Point: <span>{totalPoint}</span></h2>
                        <hr></hr>
                        <h2 className='font-bold flex justify-between'> Total: <span>{calculateTotalAmount()}</span></h2>
                        
                        <RadioGroup defaultValue="bkash" className='flex items-center gap-1' value={paymentmethod} onValueChange={setPaymentmethod}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bkash" id="bkash" />
                                
                                <Label htmlFor="bkash">bKash</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nagad" id="nagad" />
                                
                                <Label htmlFor="nagad">Nagad</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rocket" id="rocket" />
                                
                                <Label htmlFor="rocket">Rocket</Label>
                                {/* <Image src={'/bkash.png'}
                                alt='logo' 
                                width={20}
                                height={20}
                                /> */}
                            </div>

                        </RadioGroup>
                        <h2>Cast out {calculateTotalAmount()} to this {payerNumb} number and give your transission id</h2>
                        <Input placeholder='Txn Id' onChange={(e)=>setPaymentid(e.target.value)} />
                        <Button disabled={!(username && email && phone && zip && address && paymentid)} onClick={()=>onOrderInfo(calculateTotalAmount())} >{loader? <LoaderIcon className="animate-spin" />:'Payment'} <ArrowBigRight/> </Button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Checkout
"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';
import { Search } from 'lucide-react';
import Link from 'next/link'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CartItemList from './CartItemList';

  


function Header() {


  if(typeof window !== undefined) {
    window.sessionStorage.getItem("jwt");
  }
      
    useEffect(() => {
      // Perform localStorage action
      const item = localStorage.getItem('jwt')
      const jwt = sessionStorage.getItem('jwt');

    }, [])

    const [categoryList,setCategoryList] = useState([]);

    const jwt = sessionStorage.getItem('jwt');
    const isLogin = sessionStorage.getItem('jwt')?true:false;
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    
   
   

    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);
    const [totalCartItem,setTotalCartItem] = useState(0);
    const [cartItemList,setCartItemList] = useState([]);
    const [subtotal,setSubTotal]=useState(0);
    const [totalPoint,setTotalPoint]=useState(0);
    const router = useRouter();
    

    useEffect(()=>{
      getCategoryList();
      
    },[]);

    useEffect(()=>{
      getCartItems();
    },[updateCart])

    useEffect(()=>{
      let total=0;
      cartItemList.forEach(element => {
          total = total + parseInt(element.amount)
      });
      setSubTotal(total)
  },[cartItemList])


  useEffect(()=>{
      let totalpoint=0;
      cartItemList.forEach(element => {
          totalpoint = totalpoint + parseInt(element.productPoint)
      });
      setTotalPoint(totalpoint)
  },[cartItemList])
  
    const getCategoryList=()=>{
      GlobalApi.getCategory().then(resp=>{
        setCategoryList(resp.data.data);
      })
    }

    const getCartItems=async()=>{
      if(jwt){
        const cartItemList_= await GlobalApi.getCartItems(user.id,jwt);
        console.log(cartItemList_);
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_);
      }
      

    }
  
    const onSignOut=()=>{
      sessionStorage.clear();
      router.push('/sign-in');
    }

    const onDeleteItem=(id)=>{
        GlobalApi.deleteCartItem(id,jwt).then(resp=>{
            toast('Item removed!');
            getCartItems();
        })

    }

    const onProfile=()=>{
      router.push('/profile')
    }
  
 

    

  

    

  return (
    <div className='p-2 shadow-md flex justify-between '>
        <div className='flex items-center gap-4'>
          <Link href={'/'}>
            <Image src="/logo.png" alt='logo' 
            width={120}
            height={100}
            />
          </Link>
 
          <DropdownMenu>
            <DropdownMenuTrigger asChild><h2 className='hidden md:flex gap-2 items-center cursor-pointer border rounded-full p-2 px-7 bg-slate-200' >  <LayoutGrid className='h-5 w-5' /> Catagory </h2></DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>Browse Catagory</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              {categoryList.map((category,index)=>(

                <Link key={index}
                href={'/products-category/'+category.attributes.Name}>
                
                  <DropdownMenuItem className='flex gap-4 items-center cursor-pointer'>

                    <Image src={ 
                      //process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
                      category.attributes?.Icon?.data?.attributes?.url}
                      unoptimized={true}

                    alt='icon'
                    width={27}
                    height={27}
                    />

                    <h2 className='text-lg'>{category?.attributes?.Name}</h2>


                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div className=' md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
            <Search />
            <input type="text" placeholder='Search' className=' outline-none ' />
          </div> */}

          
          {/* {topinfoList.map((topinfo,index)=>(
            <div className=' md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
              <h2 className='text-lg'>{topinfo?.attributes?.name}</h2>
            </div>
          ))}
           */}
        
        </div>  
        <div className='flex items-center gap-3 '>
          
        {!jwt? 
            <Link href={'/sign-in'}>
              <Button>Login</Button>
            </Link>
            :<DropdownMenu>
              <DropdownMenuTrigger asChild><CircleUserRound className='bg-green-100 p-2 rounded-full cursor-pointer text-primary h-10 w-10' /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>onProfile()}>Profile</DropdownMenuItem>
                <Link href={'/my-order'}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }

          <Sheet>
            <SheetTrigger>
              <h2 className='flex items-center gap-2'> <ShoppingBag /> {totalCartItem} </h2>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                <SheetDescription>
                  <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem}/>
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <div className='absolute w-[90%] bottom-6 flex flex-col'>
                    <h2 className='text-lg font-bold flex justify-between'>Total Price: <span>{subtotal}</span></h2>
                    <h2 className='text-lg font-bold flex justify-between'>Total Point: <span>{totalPoint}</span></h2>
                    <Button onClick={()=>router.push(jwt?'/checkout':'/sign-in')}>View Cart</Button>
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>

          
        </div>
      </div>
  )
}

export default Header
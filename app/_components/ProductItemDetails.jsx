"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoaderCircle, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { UpdateCartContext } from '../_context/UpdateCartContext';

function ProductItemDetails({product}) {

    const jwt = sessionStorage.getItem('jwt');

    const user = JSON.parse(sessionStorage.getItem('user'));

    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);

    const router=useRouter();

    const [productTotalPrice,setProductTotalPrice]=useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp
    )

    const [productTotalPoint,setProductTotalPoint]=useState(
        product.attributes.productPoint
    )
    

    const [quantity,setQuantity]=useState(1);

    const [loading,setLoading]=useState(false);

    const addToCart=()=>{
        setLoading(true)
            if(!jwt){
                router.push('/sign-in');
                setLoading(false)
                return ;
            }

            const data={
                data:{
                    quantity:quantity,
                    amount:(quantity*productTotalPrice),
                    products:product.id,
                    users_permissions_users:user.id,
                    userId:user.id,
                    userPoint:(quantity*productTotalPoint)
                }
        
            };

            console.log(data);
            GlobalApi.addToCart(data,jwt).then(resp=>{
                console.log(resp)
                toast('Added to cart')
                setUpdateCart(!updateCart);
                setLoading(false)
            },(e)=>{
                console.log(e)
                toast('Error to add cart')
                setLoading(false)
            })
    }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-5 bg-white text-black object-contain'>
        <Image src={product.attributes?.images?.data[0]?.attributes?.url} 
        width={300} 
        height={300}
        alt={product.attributes?.name}
        className='bg-slate-200 md:p-5 sm:3-p h-[150px] w-[150px] md:h-[300px] md:w-[300px] object-contain rounded-lg'
        />
        <div className='flex flex-col gap-3 sm:gap-2'>
            <h2 className='font-bold text-2xl sm:text-xl'>{product.attributes.name}</h2>
            <h2 className='text-gray-500 text-sm'>{product.attributes.description}</h2>
            {/* <div className='flex gap-3'>
                
                {product.attributes.sellingPrice&& 
                <h2 className='font-blod text-3xl'>৳{product.attributes.sellingPrice}</h2>}
                <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice&&'line-through text-gray-500'}`}>{product.attributes?.mrp}</h2>
            
            </div> */}
            
            <div className='flex flex-col items-baseline gap-3'>
                <h2 className='font-medium text-lg'>Quantity ({product.attributes.itemQuantityType&&'0'})</h2>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 border flex gap-10 items-center px-5'>
                        <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
                        <h2>{quantity}</h2>
                        <button onClick={()=>setQuantity(quantity+1)}>+</button>
                    </div>
                    <h2 className='font-bold text-2xl'> = {(quantity*productTotalPrice).toFixed(2)}৳</h2>
                </div>
                <h2 className='font-medium'> Point: {quantity*productTotalPoint}</h2>
                <Button disabled={loading} className="flex gap-3" onClick={()=>addToCart()}>
                    <ShoppingBag />
                    {loading? <LoaderCircle className='animate-spin'/>:'Add To Cart'}
                </Button>
                <h2><span className='font-bold'>Category:</span> {product.attributes.categories.data[0].attributes.Name}</h2>
            </div>
        </div>
    </div>
  )
}

export default ProductItemDetails
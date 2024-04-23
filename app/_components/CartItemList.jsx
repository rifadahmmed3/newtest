import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartItemList({cartItemList,onDeleteItem}) {

    

  return (
    <div>
        <div className='h-[400px] overflow-auto '> 
            {cartItemList.map((cart,index)=>(

                <div key={index} className='flex justify-between items-center p-2 mb-5 '>
                    <div className='flex items-center gap-6 '>
                        <Image src={cart.image} width={90} height={90} alt={cart.name} className='border p-2' />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <div className='flex items-center gap-2'>
                                <h2 className=''>Quantity: {cart.quantity},</h2>
                                <h2> Point: {cart.productPoint} </h2>
                            </div>
                            <h2 className='text-lg font-bold'> {cart.amount}৳</h2>
                        </div>
                    </div>
                    <TrashIcon className=' cursor-pointer' onClick={()=>onDeleteItem(cart.id)}/>
                </div>

            ))}
        </div>
        
    </div>
    
  )
}

export default CartItemList
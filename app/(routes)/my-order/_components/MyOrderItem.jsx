import Image from 'next/image'
import React from 'react'

function MyOrderItem({orderItem}) {


    

  return (

    <div className='grid grid-cols-5 w-[100%] mt-3 items-center rounded border'>
        <Image src={orderItem.product.data.attributes.images.data[0].attributes.url} 
        width={80}
        height={80}
        alt='img' 
        className='bg-gray-100 p-5 rounded-md border'
        />
        <div className='col-span-2'>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
        </div>
        <h2>Quantity: {orderItem.quantity}</h2>
        <h2>Price: {orderItem.amount}</h2>
       
    </div> 
  )
}

export default MyOrderItem
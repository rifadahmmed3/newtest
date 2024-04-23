
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';

  

function ProductItem({product}) {

  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer'>

        <Image src={product.attributes?.images?.data[0]?.attributes?.url} 
        width={100} 
        height={100}
        alt={product.attributes?.name}
        className='h-[200px] w-[200px] object-contain'
        />
        <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
        <div className='flex justify-between gap-2'>
            <h2 className='font-blod'>Price:</h2>
            {product.attributes.sellingPrice&& 
            <h2 className='font-blod '>{product.attributes.sellingPrice}৳ </h2>}
            <h2 className={`font-bold ${product.attributes.sellingPrice&&'line-through text-gray-500'}`}>{product.attributes?.mrp} ৳</h2>
        </div> 
        <h2 className='font-blod'>Point: {product.attributes.productPoint}</h2>

        <Dialog>
            <DialogTrigger asChild><Button variant="outline"
            className='text-primary hover:text-white hover:bg-primary'
            >Add to Cart</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                <DialogDescription>
                    <ProductItemDetails product={product}/>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>

  )
}

export default ProductItem
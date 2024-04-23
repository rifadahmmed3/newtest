import React from 'react'
import ProductItem from './ProductItem'

function ProductsList({allProductList}) {
  return (
    <div className='mt-10'>
        <h2 className='text-green-600 font-bold text-2xl'>Propular Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
            {allProductList.map((product,index)=>index<16&&(
                <ProductItem product={product}/>
            ))}
        </div>

    </div>
  )
}

export default ProductsList
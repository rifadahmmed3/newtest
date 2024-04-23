import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function CategoryList({categoryList}) {
  return (
    <div className='mt-5'>
        <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'> 
            {categoryList.map((category,index)=>(
                <Link href={'/products-category/'+category.attributes.Name} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                    <Image src={category.attributes?.Icon?.data?.attributes?.url}
                    alt='icon'
                    width={70}
                    height={70}
                    className='group-hover:scale-125 transition-all ease-in-out mt-2'
                    />
                    <h2 className='text-green-800'>{category.attributes.Name}</h2>
                </Link>
            ))}
            
        </div>
    </div>
  )
}

export default CategoryList
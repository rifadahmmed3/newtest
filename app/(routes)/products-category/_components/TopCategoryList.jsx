import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function TopCategoryList({categoryList,selectedCategory}) {
  return (
    <div className='flex gap-5 mt-5 overflow-auto mx-7 md:mx-20 justify-center no-scrollbar'> 
            {categoryList.map((category,index)=>(
                <Link href={'/products-category/'+category.attributes.Name} className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px] ${selectedCategory==category.attributes.Name&&'bg-green-600 text-white'}`}>
                    <Image src={category.attributes?.Icon?.data?.attributes?.url}
                    alt='icon'
                    width={70}
                    height={70}
                    className='group-hover:scale-125 transition-all ease-in-out mt-2'
                    />
                    <h2 className={`text-green-800 ${selectedCategory==category.attributes.Name&&' text-white'}`}>{category.attributes.Name}</h2>
                </Link>
            ))}
            
        </div>
  )
}

export default TopCategoryList
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductsList from '@/app/_components/ProductsList';
import ProductForCategory from '@/app/_components/ProductForCategory';

async function ProductCategory({params}) {

  const productList= await GlobalApi.getProductByCategory(params?.categoryName);
  const categoryList= await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{params.categoryName}</h2>
      
      <TopCategoryList categoryList={categoryList}  selectedCategory={params.categoryList}/>
      
      <div className='p-5 md:p-10'>
        <ProductForCategory productList={productList}/>
        {/* <ProductsList productList={productList}/> */}
      </div>
      
    </div>
  )
}

export default ProductCategory
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from './_utils/GlobalApi';
import CategoryList from "./_components/CategoryList";
import ProductsList from "./_components/ProductsList";
import Footer from "./_components/Footer";

export default async function Home() {

  const sliderList= await GlobalApi.getSliders();
  const categoryList= await GlobalApi.getCategoryList();
  const allProductList= await GlobalApi.getAllProductList();
  
  return (
    <div className="p-10 px-5 md:px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Category List */}
      <CategoryList categoryList={categoryList}/>
      {/* Products List */}
      <ProductsList allProductList={allProductList}/>
      {/* Banner */}
      <Image src='/banner.png' 

      width={1000} 
      height={300}
      alt='banner'
      className="w-full h-[400px] object-contain mt-2"
      />
      {/* Footer */}
      <Footer />

    </div>
  );
}

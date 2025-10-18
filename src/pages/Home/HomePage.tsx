import './HomePage.css'
import { CategoriesSection, HeroSection, Layout, DiscountBanner } from '../../components';
import { useEffect } from 'react';
import axios from 'axios';
import useProductStore from '@/store/productStore';
import ContentContainer from '@/components/ContentContainer';

function HomePage() {
  // Usa el hook de Zustand para acceder al estado y las funciones
  const { products, setProducts } = useProductStore();

useEffect(() => {
  const handleProducts = async () => {
    try {
      const response = await axios.get('https://server.blacksheepclothing.es/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleProducts();
}, [setProducts]);



  return (
    <Layout>
      <HeroSection />
      <ContentContainer className="">
        <CategoriesSection products={products} />
      </ContentContainer>
      <DiscountBanner />
    </Layout>
  )
}

export default HomePage
import './HomePage.css'
import { CategoriesSection, HeroSection, Layout, DiscountBanner } from '../../components';

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <DiscountBanner />
    </Layout>
  )
}

export default HomePage
import './HomePage.css'
import { CategoriesSection, HeroSection, Layout } from '../../components';

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
    </Layout>
  )
}

export default HomePage
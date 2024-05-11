import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Header />
      <main className='flex-grow container mx-auto py-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
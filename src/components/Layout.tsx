import PreHeader from './PreHeader';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className='min-h-screen flex flex-col items-center text-sm'>
      <PreHeader />
      <Header />
      <main className='flex-grow container max-w-[1600px] mx-auto px-0'>
        {children}
      </main>
      <Footer />
      <PreHeader />
    </div>
  );
}

export default Layout;
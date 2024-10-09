import PreHeader from './PreHeader';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className='min-h-screen flex flex-col items-center text-sm'>
      <PreHeader />
      <Header />
      <main className='flex-grow w-full'>
        {children}
      </main>
      <Footer />
      <PreHeader />
    </div>
  );
}

export default Layout;
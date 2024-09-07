'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '../icons/ShoppingCart'
import Bars from '../icons/Bars'

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className='whitespace-nowrap'>
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className='bg-primary text-white hover:bg-hoverbutton rounded-full px-6 py-2'>
          Logout
        </button>
      </>
    )
  }
  if (status !== 'authenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className='bg-primary text-white hover:bg-hoverbutton rounded-full px-6 py-2'>REGISTER</Link>
      </>
    )
  }

}

export default function Header() {
  const session = useSession();
  // console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <header>
      <div className="flex md:hidden justify-between items-center">
        <Link className='text-primary font-semibold font-serif text-2xl' href={'/'}> Sugary Dreams </Link>
        <div className='flex gap-6 items-center'>
          <Link href={'/cart'} className='relative'>
            <ShoppingCart className='w-8 h-8' />
            {cartProducts?.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3'>
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <Bars />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className='md:hidden p-4 rounded-2xl mt-4 bg-back flex flex-col gap-2 text-center font-bold text-lg text-hunter'>
          <Link href={'/'} className='hover:text-hoverbutton active:'>Home</Link>
          <Link href={'/menu'} className='hover:text-hoverbutton'>Menu</Link>
          <Link href={'/#about'} className='hover:text-hoverbutton'>About</Link>
          <Link href={'/#contact'} className='hover:text-hoverbutton'>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        <nav className=' flex gap-8 text-hunter font-semibold items-center '>
          <Link className='text-primary font-semibold font-serif text-2xl' href={'/'}> Sugary Dreams </Link>
          <Link href={'/'} className='hover:text-hoverbutton active:'>Home</Link>
          <Link href={'/menu'} className='hover:text-hoverbutton'>Menu</Link>
          <Link href={'/#about'} className='hover:text-hoverbutton'>About</Link>
          <Link href={'/#contact'} className='hover:text-hoverbutton'>Contact</Link>
        </nav>

        <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className='relative'>
            <ShoppingCart className='w-8 h-8' />
            {cartProducts?.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3'>
                {cartProducts.length}
              </span>
            )}
          </Link>

        </nav>
      </div>

    </header>
  );
}
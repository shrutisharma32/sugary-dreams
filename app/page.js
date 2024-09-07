// import Image from "next/image";
// import Header from '@/components/layout/Header';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero'
// import Hero from '@/components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeader from '../components/layout/SectionHeader';
export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className='text-center my-16' id='about'>
        <SectionHeader
          subHeader={'Our Story'}
          mainHeader={'About us'}
        />
        <div className="mt-4 text-gray-500 mx-auto max-w-md flex flex-col gap-4">
        <p className=''>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, beatae eius. Veritatis, aut velit? Dolorem asperiores modi tenetur saepe error quaerat accusamus temporibus iste necessitatibus voluptas! Facilis, 
        </p>
        <p className=''>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, beatae eius. Veritatis, aut velit? Dolorem asperiores modi tenetur saepe error quaerat accusamus temporibus iste necessitatibus voluptas! Facilis, 
        </p>
        <p className=''>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, beatae eius. Veritatis, aut velit? 
        </p>
        </div>
        
      </section>

      <section className='text-center my-16' id='contact'>
        <SectionHeader
           subHeader={'Don\'t hesitate'}
           mainHeader={'Contact us'}
          />
          <div className="mt-8 text-gray-600 font-semibold">
            <a href="tel:+917746096296" className="text-4xl underline">
              +91 77460-96296
            </a>
          </div>
      </section>
      
    </>
  );
}

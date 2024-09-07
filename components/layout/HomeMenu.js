'use client';
import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import SectionHeader from "./SectionHeader"
import { useEffect, useState } from "react";

export default function HomeMenu() {

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(0, 3));
      })
    })
  }, [])

  return (
    <section>
      {/* <div>
               <div>
                  <Image src={'/biscuit.png'} width={109} height={189} alt={'sallad'}/>
               </div>
            </div> */}
      <div className="text-center pb-4">

        <SectionHeader
          subHeader={'Check out our'}
          mainHeader={'Bestsellers'}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item} />
        ))}
      </div>
    </section>
  )
}
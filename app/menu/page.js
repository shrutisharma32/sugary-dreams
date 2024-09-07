'use client';
import SectionHeader from "@/components/layout/SectionHeader";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react"

export default function MenuPage() {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        })
    }, [])

    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id} className="mt-8">
                    <div className="text-center mb-3">
                        <SectionHeader mainHeader={c.name} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-14">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <div><MenuItem key={item._id} {...item} /></div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
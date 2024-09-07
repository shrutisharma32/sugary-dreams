'use client';
import { useProfile } from '@/components/UseProfile'
import Right from '@/components/icons/Right';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, []);

    if (loading) {
        return <div className="text-center mt-32 text-gray-500">Loading User Info...</div>
    }
    if (!data.admin) {
        return <div className="text-center mt-16 text-gray-500">Not an Admin</div>
    }
    return (
        <section className='mt-16 max-w-2xl mx-auto'>
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className='button'
                    href={'/menu-items/new'}>
                    Add a new Menu Item
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8 mb-1">Edit Menu Item:</h2>
                <div className="grid grid-cols-3 gap-3">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link
                            key={item._id}
                            href={'/menu-items/edit/' + item._id}
                            className="bg-back rounded-lg p-4"
                        >

                            <div className="relative">
                                <Image src={item.image} alt={''} width={200} height={200}
                                    className='rounded-md' />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
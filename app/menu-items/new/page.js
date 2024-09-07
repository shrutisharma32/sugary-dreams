'use client';
import { useProfile } from '@/components/UseProfile'
import UserTabs from '../../../components/layout/UserTabs'
import MenuItemForm from '@/components/layout/MenuItemForm';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import { redirect } from 'next/navigation';

export default function NewMenuPage() {
    const { loading, data } = useProfile();
    
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(event, data) {
        event.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            })
            if(response.ok) resolve();
            else reject();
        })
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        })

        setRedirectToItems(true);
    }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if (loading) {
        return <div className="text-center mt-16 text-gray-500">Loading User Info...</div>
    }
    if (!data.admin) {
        return <div className="text-center mt-16 text-gray-500">Not an Admin</div>
    }
    return (
        <section className="mt-16">
            <UserTabs isAdmin={true} />
            <div className='max-w-2xl mx-auto mt-8'>
                <Link href={'/menu-items'} className='button'>
                    <Left/>
                    <span>Show all Menu Items</span>
                    
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    )
}
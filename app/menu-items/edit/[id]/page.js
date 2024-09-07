'use client';
import { useProfile } from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import MenuItemForm from '../../../../components/layout/MenuItemForm'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import { redirect, useParams } from 'next/navigation';
import DeleteButton from '../../../../components/DeleteButton';

export default function EditMenuItemPage () {

    const {id} = useParams();
    const { loading, data } = useProfile();
    const [menuItem, setMenuItem] = useState(null)
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(() => {

        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item)
            })
        })

    }, [])

    async function handleFormSubmit(event, data) {
        event.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE',
            })
            if(res.ok) resolve();
            else reject();
        })

        await toast.promise(promise, {
            loading: 'Deleting',
            success: 'Deleted',
            error: 'Oops!ERROR'
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="max-w-md mx-auto mt-3">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton label={"Delete this menu item"} onDelete={handleDeleteClick}/>
                </div>
            </div>
        </section>
    )
}
'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from '../../components/layout/UserTabs';
import toast from "react-hot-toast";
import UserForm from '../../components/layout/UserForm';
import Image from "next/image";
import InfoBox from '../../components/layout/InfoBox';
import SuccessBox from '../../components/layout/SuccessBox'
import Link from "next/link";
import EditableImage from '../../components/layout/EditableImage';

export default function ProfilePage() {

    const session = useSession();
    const [user, setUser] = useState(null);
    const [saved, setSaved] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [session, status])

    async function handleProfileInfoUpdate(event, data) {
        event.preventDefault();
        setSaved(false);
        // setIsSaving(true);
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (response.ok) resolve();
            else reject();
        })

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: "Profile saved!",
            error: "Error"
        })

        // setIsSaving(false);
    }

    if (status === 'loading' || !profileFetched) {
        const ret = <div className="text-center mt-32 text-gray-500"> Loading...</div>
        return ret;
    }
    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const userImage = session.data.user.image;

    return (
        <section className="mt-16">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    )
}
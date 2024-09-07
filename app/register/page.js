"use client";
import { set } from "mongoose";
// The "use client" directive in React is used to mark a component as a Client Component. This means that the component will only be rendered on the client side, and not on the server side. is used to declare a boundary between a Server and Client Component modules. This means that by defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle.
// import SectionHeader from "@/components/layout/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const[creatingUser, setCreatingUser] = useState(false);
    const[userCreated, setUserCreated] = useState(false);
    const[error, setError] = useState(false);

    async function handleFormSubmit(event) {
        event.preventDefault();
        setCreatingUser(true);
        
        setUserCreated(false);
        setError(false);

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            setUserCreated(true);
        }
        else{
            setError(true);
        }
        setCreatingUser(false);
    }
    return(
        <section className="mt-16">
            <h1 className="text-center font-semibold text-primary text-4xl ">Register</h1>

            {userCreated && (
                <div className="my-4 text-center text-gray-500">
                    User created. <br/> Now you can {' '}
                    <Link href={'/login'} className="underline font-semibold">Login &raquo;</Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center text-gray-500">
                    An error has occured. <br/> Please go to Login if your email is already registered.
                </div>
            )}
            <form onSubmit={handleFormSubmit} className="block mx-auto max-w-xs mt-6">
                <input type="email" placeholder="Email" name="" id="" 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    disabled={creatingUser}
                />
                <input type="password" placeholder="Password" name="" id="" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}
                    disabled={creatingUser}
                />
                <button type="submit" disabled={creatingUser}>REGISTER</button>
                <div className="text-center mt-4 my-2 text-gray-400 ">or Register with provider</div>
                <button
                onClick={() => signIn('google', {callbackUrl: '/'})}
                 className="flex gap-4 justify-center">
                  <Image src={'/google.png'} alt={''} width={24} height={24}/>
                Register with Google instead
                </button>
                <div className="my-4 text-center text-gray-500 border-t pt-4">
                    Existing account? {' '}
                    <Link href={'/login'} className="underline">Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}
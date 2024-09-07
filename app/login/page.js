'use client';
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(event) {
        event.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }
    return (
        <section className="mt-16">
            <h1 className="text-center font-semibold text-primary text-4xl ">Login</h1>

            <form className="mx-auto max-w-xs mt-6" onSubmit={handleFormSubmit} >
                <input type="email" placeholder="Email" name="email" id=""
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    disabled={loginInProgress}
                />
                <input type="password" placeholder="Password" name="password" id=""
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    disabled={loginInProgress}
                />
                <button type="submit" disabled={loginInProgress} >LOGIN</button>
                <div className="text-center mt-4 my-2 text-gray-400 ">or Login with provider</div>
                <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                 className="flex gap-4 justify-center">
                  <Image src={'/google.png'} alt={''} width={24} height={24}/>
                Login with Google instead
                </button>
            </form>
        </section>
    )
}
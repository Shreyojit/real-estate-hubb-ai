'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'; // Don't forget to import useState
import { signIn } from 'next-auth/react'; // Import signIn if you're using it

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault(); 
        setCreatingUser(true);
        setError(false);
        setUserCreated(false)
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            setUserCreated(true);
          }
          else {
            setError(true);
          }
          setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again later.
                </div>
            )}
            <form onSubmit={handleFormSubmit} className="mx-auto block max-w-xs">
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)}
                    className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)}
                    className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
                />
                <button
                    type="submit"
                    disabled={creatingUser}
                    className={`flex w-full justify-center gap-2 text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 ${
                        creatingUser ? 'cursor-not-allowed bg-red-400' : 'bg-primary text-white'
                    }`}
                >
                    Register
                </button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className={`flex w-full gap-4 justify-center font-semibold border border-gray-300 rounded-xl px-6 py-2 ${
                        creatingUser ? 'cursor-not-allowed bg-red-400' : 'bg-white'
                    }`}
                    disabled={creatingUser}
                >
                    <Image src={'/google.png'} alt={'Google logo'} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}

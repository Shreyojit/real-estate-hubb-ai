'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react'; // Ensure this is imported correctly
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form onSubmit={handleFormSubmit} className="max-w-xs mx-auto">
        <label htmlFor="email" className='text-gray-500 text-sm leading-tight'>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled={loginInProgress}
          className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
        />
        <label htmlFor="password" className='text-gray-500 text-sm leading-tight'>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          disabled={loginInProgress}
          className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
        />
        <button
          disabled={loginInProgress}
          type="submit"
          className={`flex w-full justify-center gap-2 text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 ${
            loginInProgress ? 'cursor-not-allowed bg-red-400' : 'bg-primary text-white'
          }`}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
            or login with Provider
        </div>
        <button
  disabled={loginInProgress} // This will disable the button if login is in progress
  className={`flex w-full gap-4 justify-center font-semibold border border-gray-300 rounded-xl px-6 py-2 ${
    loginInProgress ? 'cursor-not-allowed bg-red-400' : 'bg-white'
  }`}
>
  <Image src={'/google.png'} alt={'Google logo'} width={24} height={24} />
  Login with Google
</button>
      </form>
    </section>
  );
}

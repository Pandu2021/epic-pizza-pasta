'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRegisterForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isLogin) {
        // Jika login berhasil, redirect ke halaman utama
        router.push('/');
        router.refresh(); // Refresh untuk memperbarui state header
      } else {
        // Jika register berhasil, tampilkan pesan sukses dan ganti ke mode login
        setSuccess('Registration successful! Please log in.');
        setIsLogin(true);
        setPassword('');
      }

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-full font-bold hover:bg-red-700 transition-colors">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
      <p className="text-center mt-6">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)} className="text-red-600 font-semibold ml-2 hover:underline">
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

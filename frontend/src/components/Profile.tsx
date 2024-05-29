import { component$, useStore, useTask$, $ } from '@builder.io/qwik';
import { Link,useNavigate } from '@builder.io/qwik-city';

export const Profile = component$(() => {
    const state = useStore({ name: '', email: '', address: '', message: '', isAuthenticated: false });
    const navigate = useNavigate();

    useTask$(() => {
        const fetchData = $(async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                state.message = 'Not authenticated';
                state.isAuthenticated = false;
                return;
            }

            state.isAuthenticated = true;

            const response = await fetch('http://localhost:8080/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                state.name = user.name;
                state.email = user.email;
                state.address = user.address;
            } else {
                state.message = 'Failed to fetch profile';
            }
        });

        fetchData();
    });

    const updateUser = $(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            state.message = 'Not authenticated';
            return;
        }

        fetch('http://localhost:8080/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                address: state.address
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                state.message = 'Profile updated successfully!';
            } else {
                state.message = 'Failed to update profile';
            }
        })
        .catch(() => {
            state.message = 'Failed to update profile';
        });
    });

    const logoutUser = $(() => {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        navigate('/');
    });

    const loginUser = $(() => {
        navigate('/login');
    });

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <header class="w-full py-6 bg-opacity-75 backdrop-blur-md shadow-md">
                <div class="container mx-auto flex justify-between items-center px-6">
                    <h1 class="text-3xl font-bold">Profile</h1>
                    <nav class="flex space-x-4">
                        <Link class="btn btn-outline btn-sm" href="/">Home</Link>
                        <button class="btn btn-outline btn-sm" onClick$={logoutUser}>Logout</button>
                    </nav>
                </div>
            </header>
            <main class="flex-grow container mx-auto flex flex-col items-center justify-center px-6 py-12">
                <div class="bg-white text-black p-8 rounded shadow-md w-full max-w-md">
                    <h2 class="text-2xl font-bold mb-4">Your Profile</h2>
                    {state.message && <p class="text-red-500 mb-4">{state.message}</p>}
                    {state.isAuthenticated ? (
                        <>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1" for="name">Name</label>
                                <input 
                                    class="input input-bordered w-full" 
                                    type="text" 
                                    id="name" 
                                    value={state.name} 
                                    onInput$={(e) => (state.name = (e.target as HTMLInputElement).value)} 
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1" for="email">Email</label>
                                <input 
                                    class="input input-bordered w-full" 
                                    type="email" 
                                    id="email" 
                                    value={state.email} 
                                    onInput$={(e) => (state.email = (e.target as HTMLInputElement).value)} 
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1" for="address">Address</label>
                                <input 
                                    class="input input-bordered w-full" 
                                    type="text" 
                                    id="address" 
                                    value={state.address} 
                                    onInput$={(e) => (state.address = (e.target as HTMLInputElement).value)} 
                                />
                            </div>
                            <button class="btn btn-primary w-full mb-4" onClick$={updateUser}>Update Profile</button>
                        </>
                    ) : (
                        <button class="btn btn-primary" onClick$={loginUser}>Login</button>
                    )}
                </div>
            </main>
            <footer class="w-full py-6 bg-opacity-75 backdrop-blur-md shadow-md">
                <div class="container mx-auto text-center text-sm">
                    © 2024 Qwik-Go App. All rights reserved.
                </div>
            </footer>
        </div>
    );
});

import { component$, useStore, useTask$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export const Users = component$(() => {
    const state = useStore({ users: [], message: '', isAuthenticated: false });
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

            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                state.users = await response.json();
            } else {
                state.message = 'Failed to fetch users';
            }
        });

        fetchData();
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
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div class="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h1 class="text-2xl font-bold mb-4">Users</h1>
                {state.message && <p class="text-red-500 mb-4">{state.message}</p>}
                {state.isAuthenticated ? (
                    <>
                        <ul class="list-disc pl-5">
                            {state.users.map((user: any) => (
                                <li key={user.ID} class="mb-2">{user.Name} ({user.Email})</li>
                            ))}
                        </ul>
                        <button class="btn btn-secondary mt-4" onClick$={logoutUser}>Logout</button>
                    </>
                ) : (
                    <button class="btn btn-primary" onClick$={loginUser}>Login</button>
                )}
            </div>
        </div>
    );
});

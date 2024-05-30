import { component$, useStore, $ } from '@builder.io/qwik';
import { useNavigate, Link } from '@builder.io/qwik-city';

export const Login = component$(() => {
    const state = useStore({ email: '', password: '', message: '' });
    const navigate = useNavigate();

    const loginUser = $(async () => {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            state.message = 'Login successful!';
            navigate('/users');
        } else {
            state.message = 'Login failed!';
        }
    });

    return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-xs">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          class="input input-bordered w-full mb-2"
          placeholder="Email"
          value={state.email}
          onInput$={(e) => (state.email = (e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          class="input input-bordered w-full mb-4"
          placeholder="Password"
          value={state.password}
          onInput$={(e) => (state.password = (e.target as HTMLInputElement).value)}
        />
        <button class="btn btn-primary w-full mb-4" onClick$={loginUser}>Login</button>
        <p class="text-red-500">{state.message}</p>
        <p class="text-sm">
          Don't have an account? <Link class="link" href="/register">Register</Link>
        </p>
      </div>
    </div>
    );
});
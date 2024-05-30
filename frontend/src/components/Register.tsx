import { component$, useStore, $ } from '@builder.io/qwik';
import { useNavigate, Link } from '@builder.io/qwik-city';

export const Register = component$(() => {
    const state = useStore({ name: '', email: '', password: '', message: '' });
    const navigate = useNavigate();

    const registerUser = $(async () => {
        if (!state.name || !state.email || !state.password) {
            state.message = 'All fields are required';
            return;
        }

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })
        });

        if (response.ok) {
            state.message = 'Registration successful!';
            navigate('/login');
        } else {
            state.message = 'Registration failed!';
        }
    });

    return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-xs">
        <h1 class="text-2xl font-bold mb-4">Register</h1>
        <input
          type="text"
          class="input input-bordered w-full mb-2"
          placeholder="Name"
          value={state.name}
          onInput$={(e) => (state.name = (e.target as HTMLInputElement).value)}
        />
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
        <button
          class="btn btn-primary w-full"
          onClick$={registerUser}
        >
          Register
        </button>
        <p class="mt-4 text-center">
          Already have an account? <Link href="/login" class="text-blue-500">Log in</Link>
        </p>
        {state.message && <p class="mt-4 text-red-500">{state.message}</p>}
      </div>
    </div>
  );
});

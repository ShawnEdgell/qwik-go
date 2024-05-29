import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header class="w-full py-6 bg-opacity-75 backdrop-blur-md shadow-md">
        <div class="container mx-auto flex justify-between items-center px-6">
          <h1 class="text-3xl font-bold">
            Qwik-Go App
          </h1>
          <nav class="flex space-x-4">
            <Link class="btn btn-outline btn-sm" href="/register">Register</Link>
            <Link class="btn btn-outline btn-sm" href="/login">Login</Link>
            <Link class="btn btn-outline btn-sm" href="/users">Users</Link>
          </nav>
        </div>
      </header>
      <main class="flex-grow container mx-auto flex flex-col items-center justify-center px-6 py-12">
        <h2 class="text-5xl font-bold mb-6">Welcome to Qwik-Go App</h2>
        <p class="text-lg mb-8">
          Your ultimate solution for efficient and rapid application development.
        </p>
        <nav class="flex space-x-4">
          <Link class="btn btn-primary" href="/register">Get Started</Link>
          <Link class="btn btn-secondary" href="/login">Sign In</Link>
        </nav>
      </main>
      <footer class="w-full py-6 bg-opacity-75 backdrop-blur-md shadow-md">
        <div class="container mx-auto text-center text-sm">
          © 2024 Qwik-Go App. All rights reserved.
        </div>
      </footer>
    </div>
  );
});

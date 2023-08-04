<script>
    import { enhance } from "$app/forms";
    import { Toast } from "flowbite-svelte";
    import { fly } from "svelte/transition";

    export let form;
</script>

<svelte:head>
    <title>Laundry Kit - Login</title>
</svelte:head>

{#if form?.failed}
    <Toast
        transition={fly}
        params={{ x: 200 }}
        class="fixed"
        position="bottom-right"
        color="red"
    >
        <svelte:fragment slot="icon">
            <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                /></svg
            >
            <span class="sr-only">Error icon</span>
        </svelte:fragment>
        {form?.message}
    </Toast>
{/if}
<section class="bg-white dark:bg-gray-900">
    <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
        <a
            href="/"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
            <img class="w-14 h-w-14 mr-2" src="/images/logo.png" alt="logo" />
            Laundry Kit
        </a>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                >
                    Login dengan akun anda
                </h1>
                <form
                    class="space-y-4 md:space-y-6"
                    method="post"
                    action=""
                    use:enhance
                >
                    <div>
                        <label
                            for="username"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Username</label
                        >
                        <input
                            type="text"
                            name="username"
                            id="username"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >Masuk</button
                    >
                    <p
                        class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >
                        Tidak punya akun? <a
                            href="/register"
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >Daftar</a
                        >
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
    import { enhance } from "$app/forms";
    import { Card, FloatingLabelInput, Button } from "flowbite-svelte";

    /** @type {import('./$types').PageData} */
    export let data;

    $: ({ user } = data);
</script>

<svelte:head>
    <title>Laundry Kit - Profile</title>
</svelte:head>

<div class="flex justify-between items-center mb-5">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Data Profile
    </h1>
</div>

<div class="grid grid-cols-2 gap-6">
    <Card class="max-w-none w-full">
        <form action="?/update_data&id={user.id}" method="post" use:enhance>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="name"
                    name="name"
                    type="text"
                    label="Nama"
                    required
                    value={user.name}
                />
            </div>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    required
                    value={user.username}
                />
            </div>
            <Button class="w-full mb-4" type="submit">Ubah Profile</Button>
        </form>
    </Card>
    <Card class="max-w-none w-full">
        <form action="?/update_password&id={user.id}" method="post" use:enhance>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    required
                />
            </div>
            <Button color="blue" class="w-full mb-4" type="submit"
                >Ubah Password</Button
            >
        </form>
    </Card>
</div>

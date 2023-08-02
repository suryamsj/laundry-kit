<script>
    import { enhance } from "$app/forms";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Button,
        Toast,
        Modal,
    } from "flowbite-svelte";
    import { fly } from "svelte/transition";

    let popupModal = false;

    /** @type {import('./$types').PageData} */
    export let data;

    export let form;

    $: ({ costumers } = data);
</script>

<svelte:head>
    <title>Laundry Kit - Data Pelanggan</title>
</svelte:head>

{#if form?.success}
    <Toast
        transition={fly}
        params={{ x: 200 }}
        class="fixed"
        position="bottom-right"
        color="green"
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
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                /></svg
            >
            <span class="sr-only">Check icon</span>
        </svelte:fragment>
        {form?.message}
    </Toast>
{/if}
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

<Modal bind:open={popupModal} size="sm" autoclose outsideclose>
    <div class="text-center">
        <svg
            class="text-red-500 dark:text-red-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
            /></svg
        >
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah kamu yakin ingin menghapus data ini?
        </h3>
        <Button on:click={() => form.requestSubmit()} color="red" class="mr-2"
            >Ya, yakin!</Button
        >
        <Button color="alternative">Tidak</Button>
    </div>
</Modal>

<div class="flex justify-between items-center mb-5">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Data Pelanggan
    </h1>
    <Button href="/costumer/add">Tambah Data Pelanggan</Button>
</div>
<Table striped={true} hoverable={true} shadow>
    <TableHead>
        <TableHeadCell>#</TableHeadCell>
        <TableHeadCell>Nama Pelanggan</TableHeadCell>
        <TableHeadCell>Aksi</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each costumers as costumer, i}
            <TableBodyRow>
                <TableBodyCell>{(i += 1)}</TableBodyCell>
                <TableBodyCell>{costumer.name}</TableBodyCell>
                <TableBodyCell>
                    <div class="flex gap-2">
                        <Button href="/costumer/{costumer.id}" color="blue"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                                />
                            </svg></Button
                        >
                        <form
                            bind:this={form}
                            action="?/delete&id={costumer.id}"
                            method="post"
                            use:enhance
                        >
                            <Button
                                on:click={() => (popupModal = true)}
                                color="red"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                                    />
                                </svg>
                            </Button>
                        </form>
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        {:else}
            <TableBodyRow>
                <TableBodyCell colspan="3" class="text-center"
                    >Data tidak ada</TableBodyCell
                >
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>

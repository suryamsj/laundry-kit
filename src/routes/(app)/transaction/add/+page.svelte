<script>
    import { enhance } from "$app/forms";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Card,
        Button,
        FloatingLabelInput,
        Helper,
        Toast,
    } from "flowbite-svelte";
    import { fly, slide } from "svelte/transition";

    let num = 1;
    let weight = 0;

    const addField = () => {
        num += 1;
    };

    const removeField = () => {
        num -= 1;
    };

    /** @type {import('./$types').PageData} */
    export let data;

    export let form;

    // export let form;

    $: ({ prices } = data);
    $: ({ costumers } = data);
</script>

<svelte:head>
    <title>Laundry Kit - Tambah Data Transaksi</title>
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
<div class="flex justify-between items-center mb-5">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Tambah Data Transaksi
    </h1>
    <Button href="/transaction">Kembali</Button>
</div>

<div class="grid lg:gap-8 xl:gap-6 lg:py-16 lg:grid-cols-2">
    <Card class="max-w-none w-full">
        <form method="post" use:enhance>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="costumer_id"
                    name="costumer_id"
                    type="text"
                    label="ID Pelanggan"
                    required
                />
            </div>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="weight"
                    name="weight"
                    type="number"
                    label="Berat"
                    bind:value={weight}
                    required
                />
            </div>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="transaction_price"
                    name="transaction_price"
                    type="text"
                    label="Harga"
                    value={prices[0].price * weight}
                    readonly
                    required
                />
            </div>
            <div class="mb-4">
                <FloatingLabelInput
                    style="outlined"
                    id="transaction_finish_date"
                    name="transaction_finish_date"
                    type="date"
                    label="Tanggal Selesai"
                    required
                />
            </div>
            <hr class="mb-4" />
            {#each Array(num) as _, i}
                <div
                    in:slide={{ y: 300, duration: 500 }}
                    out:slide={{ x: 300 }}
                    class="grid gap-6 mb-4 md:grid-cols-2"
                >
                    <FloatingLabelInput
                        style="outlined"
                        id="clothing_type"
                        name="clothing_type"
                        type="text"
                        label="Jenis Pakaian"
                        required
                    />
                    <FloatingLabelInput
                        style="outlined"
                        id="clothing_amount"
                        name="clothing_amount"
                        type="number"
                        label="Jumlah Pakaian"
                        required
                    />
                </div>
            {/each}
            <div class="flex justify-between gap-6">
                <Button class="w-full mb-4" on:click={addField}
                    >Tambah Pakaian</Button
                >
                {#if num > 1}
                    <Button
                        color="red"
                        class="w-full mb-4"
                        on:click={removeField}>Hapus Pakaian</Button
                    >
                {/if}
            </div>
            <Button color="blue" class="w-full mb-4" type="submit"
                >Submit</Button
            >
        </form>
    </Card>
    <Table class="max-md:mt-8" striped={true} hoverable={true} shadow>
        <TableHead>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Nama Pelanggan</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#each costumers as costumer, i}
                <TableBodyRow>
                    <TableBodyCell>{costumer.id}</TableBodyCell>
                    <TableBodyCell>{costumer.name}</TableBodyCell>
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
</div>

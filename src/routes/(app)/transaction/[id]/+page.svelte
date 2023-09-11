<script>
  import { enhance } from "$app/forms";
  import {
    Card,
    Button,
    FloatingLabelInput,
    Helper,
    Toast,
  } from "flowbite-svelte";
  import { fly } from "svelte/transition";

  /** @type {import('./$types').PageData} */
  export let data;

  export let form;

  $: ({ transaction } = data);
</script>

<svelte:head>
  <title>Laundry Kit - Ubah Data Transaksi</title>
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
{#if form?.error}
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
    Ubah Data Transaksi
  </h1>
  <Button href="/transaction">Kembali</Button>
</div>

<Card class="max-w-none w-full">
  <form method="post" use:enhance>
    <div class="mb-4">
      <FloatingLabelInput
        style="outlined"
        id="transaction_status"
        name="transaction_status"
        type="text"
        label="Status"
        value={transaction.transaction_status}
        required
      />
    </div>
    <div class="mb-4">
      <FloatingLabelInput
        style="outlined"
        id="transaction_finish_date"
        name="transaction_finish_date"
        type="datetime-local"
        label="Tanggal Selesai"
        value={transaction.transaction_finish_date}
        required
      />
    </div>
    <Button color="blue" class="w-full mb-4" type="submit">Submit</Button>
  </form>
</Card>

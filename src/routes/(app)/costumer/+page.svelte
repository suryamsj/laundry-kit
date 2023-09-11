<script>
  import { Button, Toast } from "flowbite-svelte";
  import { fly } from "svelte/transition";
  import { html } from "gridjs";
  import Grid from "gridjs-svelte";
  import { idID } from "gridjs/l10n";

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
    class="fixed z-50"
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
    class="fixed z-50"
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
    Data Pelanggan
  </h1>
  <Button href="/costumer/add">Tambah Data Pelanggan</Button>
</div>

<Grid
  data={costumers}
  pagination={{ limit: 5 }}
  search={true}
  language={idID}
  columns={[
    {
      name: "id",
      hidden: true,
    },
    {
      name: "Nama",
      data: (row) => row.name,
    },
    {
      name: "Nomor Hp",
      data: (row) => row.phone_number,
    },
    {
      name: "Alamat",
      data: (row) => row.address,
    },
    {
      name: "Aksi",
      formatter: (cell, row) => [
        html(`
        <div class="flex gap-2">
          <a href="/costumer/${row.cells[0].data}" class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg">
          <svg
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
              </svg></a>
              <form action="?/delete&id=${row.cells[0].data}" method="post">
              <button type="submit" class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900 rounded-lg">
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
              </button>
            </form>
        </div>
        `),
      ],
    },
  ]}
/>

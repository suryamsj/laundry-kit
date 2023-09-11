<script>
  import { enhance } from "$app/forms";
  import {
    Select,
    Label,
    Card,
    Button,
    FloatingLabelInput,
    Toast,
  } from "flowbite-svelte";
  import { fly, slide } from "svelte/transition";
  import Grid from "gridjs-svelte";
  import { idID } from "gridjs/l10n";
  import { h } from "gridjs";

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

  let selected;

  const formattedPackages = data.packages.map((items) => {
    return {
      value: items.id,
      name: items.name,
    };
  });

  function findMatchedValue(packages, selected) {
    let matchedData = null;

    packages.forEach((items) => {
      if (items.id === selected) {
        matchedData = items.price;
      }
    });

    return matchedData;
  }

  $: ({ packages } = data);
  $: ({ costumers } = data);
  $: costumerId = "";
</script>

<svelte:head>
  <title>Laundry Kit - Tambah Data Transaksi</title>
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
          id="costumersId"
          name="costumersId"
          type="text"
          label="Nama Pelanggan"
          value={costumerId}
          required
          readonly
        />
      </div>
      <div class="mb-4">
        <Label>
          Pilih Paket
          <Select
            class="mt-2"
            items={formattedPackages}
            bind:value={selected}
            name="packagesId"
          />
        </Label>
      </div>
      <div class="mb-4">
        <FloatingLabelInput
          style="outlined"
          id="weight"
          name="weight"
          type="number"
          label="Berat / Kg"
          bind:value={weight}
          required
        />
      </div>
      <div class="mb-4">
        <FloatingLabelInput
          style="outlined"
          id="transaction_price"
          name="transaction_price"
          type="number"
          label="Total Harga"
          value={weight * findMatchedValue(packages, selected)}
          required
          readonly
        />
      </div>
      <div class="mb-4">
        <FloatingLabelInput
          style="outlined"
          id="transaction_finish_date"
          name="transaction_finish_date"
          type="datetime-local"
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
        <Button class="w-full mb-4" on:click={addField}>Tambah Pakaian</Button>
        {#if num > 1}
          <Button color="red" class="w-full mb-4" on:click={removeField}
            >Hapus Pakaian</Button
          >
        {/if}
      </div>
      <Button color="blue" class="w-full mb-4" type="submit">Submit</Button>
    </form>
  </Card>
  <div>
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
          name: "Aksi",
          formatter: (cell, row) => {
            return h(
              "button",
              {
                className:
                  "text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg",
                onClick: () => (costumerId = row.cells[0].data),
              },
              "Pilih"
            );
          },
        },
      ]}
    />
  </div>
</div>

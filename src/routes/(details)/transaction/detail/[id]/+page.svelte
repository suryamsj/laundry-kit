<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Badge,
    Button,
  } from "flowbite-svelte";
  import { formatDate } from "$lib/utils/datetime";
  import { formatNumberToCurrency } from "$lib/utils/rupiah";

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({ transaction } = data);
</script>

<div class="container mx-auto my-6 max-sm:px-3">
  <div class="flex justify-between items-center mb-5">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
      Data Transaksi
    </h1>
    <div id="btn">
      <Button on:click={() => window.print()}>Print</Button>
      <Button href="/transaction" color="blue">Kembali</Button>
    </div>
  </div>
  <Table>
    <TableBody class="divide-y">
      <TableBodyRow>
        <TableBodyCell class="text-center">Nama Pelanggan :</TableBodyCell>
        <TableBodyCell class="text-center"
          >{transaction.costumer.name}</TableBodyCell
        >
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-center">Tanggal Transaksi :</TableBodyCell>
        <TableBodyCell class="text-center"
          >{formatDate(transaction.transaction_date)}</TableBodyCell
        >
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-center">Tanggal Selesai :</TableBodyCell>
        <TableBodyCell class="text-center"
          >{formatDate(transaction.transaction_finish_date)}</TableBodyCell
        >
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-center">Status :</TableBodyCell>
        <TableBodyCell class="text-center">
          {#if transaction.transaction_status === "proses"}
            <Badge color="yellow">{transaction.transaction_status}</Badge>
          {:else if transaction.transaction_status === "cuci"}
            <Badge color="indigo">{transaction.transaction_status}</Badge>
          {:else}
            <Badge color="green">{transaction.transaction_status}</Badge>
          {/if}
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell class="text-center">Berat Pakaian :</TableBodyCell>
        <TableBodyCell class="text-center"
          >{transaction.weight} Kg</TableBodyCell
        >
      </TableBodyRow>
    </TableBody>
  </Table>

  <Table class="mt-5">
    <TableHead>
      <TableHeadCell>#</TableHeadCell>
      <TableHeadCell>Jenis Pakaian</TableHeadCell>
      <TableHeadCell>Jumlah Pakaian</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each transaction.clothes as item, i}
        <TableBodyRow>
          <TableBodyCell>{(i += 1)}</TableBodyCell>
          <TableBodyCell>{item.clothing_type}</TableBodyCell>
          <TableBodyCell>{item.clothing_amount}</TableBodyCell>
        </TableBodyRow>
      {:else}
        <TableBodyRow>
          <TableBodyCell colspan="8" class="text-center"
            >Data tidak ada</TableBodyCell
          >
        </TableBodyRow>
      {/each}
      <TableBodyRow>
        <TableBodyCell colspan="2">Total Harga</TableBodyCell>
        <TableBodyCell colspan="1"
          >{formatNumberToCurrency(
            transaction.transaction_price
          )}</TableBodyCell
        >
      </TableBodyRow>
    </TableBody>
  </Table>
</div>

<style>
  @media print {
    #btn {
      display: none !important;
    }
  }
</style>

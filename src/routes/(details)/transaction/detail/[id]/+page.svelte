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
    import {
        formatDateToDDMMYYYY,
        formatDateReverse,
    } from "$lib/utils/datetime";
    import { formatNumberToCurrency } from "$lib/utils/rupiah";

    /** @type {import('./$types').PageData} */
    export let data;

    // Objek untuk menyimpan hasil penggabungan
    const mergedData = {};

    // Iterasi melalui array transaction
    data.transaction.forEach((transaction) => {
        // Cek apakah objek dengan id_t dan customer_name tertentu sudah ada dalam mergedData
        const key = `${transaction.id_t}-${transaction.customer_name}`;
        if (!mergedData[key]) {
            // Jika belum ada, tambahkan objek baru dengan properti yang sama dari transaction
            mergedData[key] = {
                id_t: transaction.id_t,
                trans_date: transaction.trans_date,
                customer_id: transaction.customer_id,
                weight: transaction.weight,
                finish_date: transaction.finish_date,
                status: transaction.status,
                price: transaction.price,
                customer_name: transaction.customer_name,
                clothing: [], // Inisialisasi array clothing
            };
        }
        // Tambahkan properti clothing_type dan clothing_amount ke dalam array clothing
        mergedData[key].clothing.push({
            type: transaction.clothing_type,
            amount: transaction.clothing_amount,
        });
    });

    // Konversi objek menjadi array hasil penggabungan
    const mergedDataDetail = Object.values(mergedData);
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
                <TableBodyCell class="text-center"
                    >Nama Pelanggan :</TableBodyCell
                >
                <TableBodyCell class="text-center"
                    >{mergedDataDetail[0].customer_name}</TableBodyCell
                >
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell class="text-center"
                    >Tanggal Transaksi :</TableBodyCell
                >
                <TableBodyCell class="text-center"
                    >{formatDateToDDMMYYYY(
                        new Date(parseInt(mergedDataDetail[0].trans_date))
                    )}</TableBodyCell
                >
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell class="text-center"
                    >Tanggal Selesai :</TableBodyCell
                >
                <TableBodyCell class="text-center"
                    >{formatDateReverse(
                        mergedDataDetail[0].finish_date
                    )}</TableBodyCell
                >
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell class="text-center">Status :</TableBodyCell>
                <TableBodyCell class="text-center">
                    {#if mergedDataDetail[0].status === "proses"}
                        <Badge color="yellow"
                            >{mergedDataDetail[0].status}</Badge
                        >
                    {:else if mergedDataDetail[0].status === "cuci"}
                        <Badge color="indigo"
                            >{mergedDataDetail[0].status}</Badge
                        >
                    {:else}
                        <Badge color="green">{mergedDataDetail[0].status}</Badge
                        >
                    {/if}
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell class="text-center"
                    >Berat Pakaian :</TableBodyCell
                >
                <TableBodyCell class="text-center"
                    >{mergedDataDetail[0].weight} Kg</TableBodyCell
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
            {#each mergedDataDetail[0].clothing as item, i}
                <TableBodyRow>
                    <TableBodyCell>{(i += 1)}</TableBodyCell>
                    <TableBodyCell>{item.type}</TableBodyCell>
                    <TableBodyCell>{item.amount}</TableBodyCell>
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
                        mergedDataDetail[0].price
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

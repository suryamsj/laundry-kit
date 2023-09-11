import { selectTransaction, deleteTransaction } from '$lib/server/transaction';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    console.log(await selectTransaction());
    return { transactions: await selectTransaction() };
};

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ url }) => {
        const id = String(url.searchParams.get('id'));
        const res = await deleteTransaction(id);
        return { success: true, message: 'Data berhasil dihapus', data: res }
    }
};
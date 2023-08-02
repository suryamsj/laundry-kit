import { selectJoinTransaction, deleteData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return { transactions: selectJoinTransaction() };
};

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ url }) => {
        const id = String(url.searchParams.get('id'));
        return await deleteData('transactions', id) === 1 ? { success: true, message: 'Data berhasil dihapus' } : { failed: true, message: 'Data gagal dihapus' };
    }
};
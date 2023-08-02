import { selectAll, deleteData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        costumers: await selectAll('costumers')
    };
};

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ url }) => {
        const id = String(url.searchParams.get('id'));
        return await deleteData('costumers', id) === 1 ? { success: true, message: 'Data berhasil dihapus' } : { failed: true, message: 'Data gagal dihapus' };
    }
};
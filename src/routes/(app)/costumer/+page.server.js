import { selectCostumer } from '$lib/server/costumer';
import { fail } from '@sveltejs/kit';
import { deleteCostumer } from '$lib/server/costumer';


/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {

        costumers: await selectCostumer()
    };
};

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ url }) => {
        try {
            const id = String(url.searchParams.get('id'));
            await deleteCostumer(id);
            return { success: true, message: 'Data Pelanggan berhasil dihapus' }
        } catch (error) {
            return fail(500, { error: true, message: 'Data Pelanggan gagal dihapus' })
        }
    }
};
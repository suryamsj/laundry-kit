import { selectCostumerById, updateCostumer } from '$lib/server/costumer';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;
    const costumer = await selectCostumerById(id);
    return { costumer };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        try {
            const id = params.id;
            const formData = await request.formData();

            const name = formData.get("name");
            const phone_number = formData.get("phone_number");
            const address = formData.get("address");

            const res = await updateCostumer(id, {
                name, phone_number, address
            })
            return { success: true, message: 'Data Pelanggan berhasil diubah', data: res }
        } catch (error) {
            return fail(500, { error: true, message: 'Data Pelanggan gagal diubah' })
        }
    }
};
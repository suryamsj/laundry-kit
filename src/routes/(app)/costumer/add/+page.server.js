import { createCostumer } from '$lib/server/costumer';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            const name = formData.get("name");
            const phone_number = formData.get("phone_number");
            const address = formData.get("address");

            const res = await createCostumer({
                name, phone_number, address
            })
            return { success: true, message: 'Data Pelanggan berhasil ditambahkan', data: res }
        } catch (error) {
            return fail(500, { error: true, message: 'Data Pelanggan gagal ditambahkan' })
        }
    }
};
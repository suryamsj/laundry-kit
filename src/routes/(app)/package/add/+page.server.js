import { createPackage } from '$lib/server/package';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            const name = formData.get("name");
            const price = parseInt(formData.get("price"));

            const res = await createPackage({
                name, price
            });
            return { success: true, message: "Data Paket berhasil ditambahkan", data: res }
        } catch (error) {
            return fail(500, {
                error: true, message: "Data Paket gagal ditambahkan"
            })
        }
    }
};
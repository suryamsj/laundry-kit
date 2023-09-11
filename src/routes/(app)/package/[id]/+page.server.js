import { selectPackageById, updatePackage } from '$lib/server/package';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const id = params.id;
        const packages = await selectPackageById(id);
        return { packages };
    } catch (error) {
        return fail(500, { error: true, message: "Server Error" });
    }
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        try {
            const id = params.id;
            const formData = await request.formData();

            const name = formData.get("name");
            const price = parseInt(formData.get("price"));

            const res = await updatePackage(id, {
                name, price
            });
            return { success: true, message: 'Data Paket berhasil diubah', data: res };
        } catch (error) {
            return fail(500, { error: true, message: 'Data Paket gagal diubah' })
        }
    }
};
import { selectOneData, updateData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;
    const price = await selectOneData('prices', 'id', id);

    if (price === undefined) {
        return { error: true };
    }

    return { price };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const id = params.id;
        const formData = await request.formData();

        const price = formData.get("price");

        const res = await updateData({ price }, 'prices', 'id', id);

        return res[0] === 0 ? { failed: true, message: 'Data gagal diubah' } : { success: true, message: 'Data berhasil diubah' };
    }
};
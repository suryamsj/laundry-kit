import { selectOneData, updateData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;
    const costumer = await selectOneData('costumers', 'id', id);

    if (costumer === undefined) {
        return { error: true };
    }

    return { costumer };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const id = params.id;
        const formData = await request.formData();

        const name = formData.get("name");
        const phone_number = formData.get("phone_number");
        const address = formData.get("address");

        const res = await updateData({ name, phone_number, address }, 'costumers', 'id', id);

        return res[0] === 0 ? { failed: true, message: 'Data gagal diubah' } : { success: true, message: 'Data berhasil diubah' };
    }
};
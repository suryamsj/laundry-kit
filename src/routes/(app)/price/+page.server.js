import { selectAll, insertData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return { prices: selectAll('prices') };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const price = formData.get("price");

        const res = await insertData({ price }, 'prices', 'price');

        return await res[0] === 0 ? { failed: true } : { success: true };
    }
};
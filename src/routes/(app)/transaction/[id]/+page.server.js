import { selectAll, selectOneData, updateData } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;
    const transaction = await selectOneData('transactions', 'id', id);

    if (transaction === undefined) {
        return { error: true };
    }

    return { transaction };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const id = params.id;
        const formData = await request.formData();

        const transaction_status = formData.get("transaction_status");
        const transaction_finish_date = formData.get("transaction_finish_date");

        const res = await updateData({ transaction_status, transaction_finish_date }, 'transactions', 'id', id);

        return res[0] === 0 ? { failed: true, message: 'Data gagal dihapus' } : { success: true, message: 'Data berhasil dihapus' };
    }
};
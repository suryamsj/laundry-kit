import { selectTransactionById, updateTransaction } from '$lib/server/transaction';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;
    const transaction = await selectTransactionById(id);

    return { transaction };
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        try {
            const id = params.id;
            const formData = await request.formData();

            const transaction_status = formData.get("transaction_status");
            const transaction_finish_date = new Date(formData.get("transaction_finish_date"));

            const res = await updateTransaction(id, {
                transaction_status, transaction_finish_date
            })
            return { success: true, message: "Data Transaksi berhasil diubah", data: res }
        } catch (error) {
            return fail(500, {
                error: true,
                message: "Data Transaksi gagal diubah"
            })
        }
    }
};
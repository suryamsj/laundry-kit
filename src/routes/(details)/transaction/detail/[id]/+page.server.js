import { selectTransactionById } from '$lib/server/transaction';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id
    return { transaction: await selectTransactionById(id) };
};
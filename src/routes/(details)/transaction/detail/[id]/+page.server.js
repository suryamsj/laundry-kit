import { selectDetailTransaction } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return { transaction: selectDetailTransaction() };
};
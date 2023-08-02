import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies, locals }) {
    if (!locals.user) {
        throw redirect(301, '/')
    } else {
        cookies.delete('user');
        throw redirect(301, '/')
    }
}
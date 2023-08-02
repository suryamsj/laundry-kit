import { selectOneData } from '$lib/server/db';
import { cookieDecrypted } from '$lib/utils/hash';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    const username = locals.user;
    const username_decrypt = cookieDecrypted(username);
    const user = await selectOneData('users', 'username', username_decrypt);

    if (user) {
        return { user }
    }

    return { user: [] }
}
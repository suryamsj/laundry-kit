import { selectOneData, updateData } from '$lib/server/db';
import { cookieDecrypted } from '$lib/utils/hash';
import { redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/utils/hash';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    const username = locals.user;
    const username_decrypt = cookieDecrypted(username);
    const user = await selectOneData('users', 'username', username_decrypt);

    return { user }
}

/** @type {import('./$types').Actions} */
export const actions = {
    update_data: async ({ request, url }) => {
        const id = String(url.searchParams.get('id'));
        const form = await request.formData();

        const name = form.get('name');
        const username = form.get('username');

        const res = await updateData({ name, username }, 'users', 'id', id);
        return res[0] === 0 ? { failed: true, message: 'Data profile gagal diubah' } : { success: true, message: 'Data profile berhasil diubah' };
    },
    update_password: async ({ request, url }) => {
        const id = String(url.searchParams.get('id'));
        const form = await request.formData();

        const password = hashPassword(form.get("password"));

        const res = await updateData({ password }, 'users', 'id', id);
        if (res[0] === 0) {
            return { failed: true, message: 'Password gagal diubah' }
        } else {
            throw redirect(301, '/logout');
        }
    }
};
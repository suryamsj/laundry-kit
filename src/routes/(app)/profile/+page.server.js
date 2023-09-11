import { selectUserByUsername } from '$lib/server/user';
import { cookieDecrypted } from '$lib/utils/hash';
import { fail, redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/utils/hash';
import { updateUser, updateUserPassword } from '$lib/server/user';

/** @type {import('./$types').Actions} */
export const actions = {
    update_data: async ({ locals, request }) => {

        try {
            const usernameHash = cookieDecrypted(locals.user);
            const user = await selectUserByUsername(usernameHash);
            const id = user.id;

            const form = await request.formData();

            const name = form.get('name');
            const username = form.get('username');

            const res = await updateUser(id, {
                name, username
            });

            return { success: true, message: 'Data Profile berhasil diubah', data: res }
        } catch (error) {
            return fail(500, {
                error: true, message: 'Data Profile gagal diubah'
            })
        }
    },
    update_password: async ({ locals, request }) => {
        try {
            const usernameHash = cookieDecrypted(locals.user);
            const user = await selectUserByUsername(usernameHash);
            const id = user.id;

            const form = await request.formData();

            const password = hashPassword(form.get("password"));

            const res = await updateUserPassword(id, { password })
            return { success: true, message: "Berhasil merubah password", data: res }
        } catch (error) {
            return fail(500, {
                error: true, message: "Gagal merubah password"
            })
        } finally {
            throw redirect(301, '/logout');
        }
    }
};
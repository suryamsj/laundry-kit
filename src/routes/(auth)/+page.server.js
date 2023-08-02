import { selectOneData } from '$lib/server/db';
import { hashPassword } from '$lib/utils/hash';
import { redirect } from '@sveltejs/kit';
import { cookieEncrypted } from '$lib/utils/hash';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (locals.user) {
        throw redirect(301, 'home')
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();

        const username = form.get('username');
        const password = hashPassword(form.get("password"));
        const user = await selectOneData('users', 'username', username);

        if (user) {
            if (user.password === password) {
                const hashPassword = cookieEncrypted(username);
                cookies.set("user", hashPassword, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    secure: '!dev',
                    maxAge: 60 * 60 * 24 * 7,
                })
                throw redirect(301, '/home');
            } else {
                return { failed: true, message: 'Password yang anda masukkan salah' }
            }
        } else {
            return { failed: true, message: 'Akun anda tidak di temukan' }
        }
    }
};
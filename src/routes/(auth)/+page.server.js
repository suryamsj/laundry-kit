import { hashPassword } from '$lib/utils/hash';
import { fail, redirect } from '@sveltejs/kit';
import { cookieEncrypted } from '$lib/utils/hash';
import { selectUserByUsername } from '$lib/server/user';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
    if (locals.user) {
        throw redirect(301, 'home')
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        try {
            const form = await request.formData();

            const username = form.get('username');
            const password = hashPassword(form.get("password"));
            const user = await selectUserByUsername(username);

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
                } else {
                    return fail(401, { error: true, message: 'Password yang anda masukkan salah' })
                }
            } else {
                return fail(401, { error: true, message: 'Akun anda tidak di temukan' })
            }
        } catch (error) {
            return fail(500, {
                error: true,
                message: "Server Error"
            })
        }
    }
};
import { createUser } from '$lib/server/user';
import { hashPassword } from '$lib/utils/hash';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            const name = formData.get("name");
            const username = formData.get("username");
            const password = hashPassword(formData.get("password"));

            const res = await createUser({
                name, username, password
            });
            return { success: true, message: "Berhasil melakukan registrasi. Silahkan login", data: res }
        } catch (error) {
            return fail(500, { error: true, message: "Data gagal tersimpan" })
        }
    }
};
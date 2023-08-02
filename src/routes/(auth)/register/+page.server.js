import { insertData } from '$lib/server/db';
import { hashPassword } from '$lib/utils/hash';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get("name");
        const username = formData.get("username");
        const password = hashPassword(formData.get("password"));

        const res = await insertData({ name, username, password }, 'users', 'username');

        return await res[0] === 0 ? { failed: true, message: 'Username sudah di gunakan' } : { success: true, message: 'Berhasil melakukan registrasi' };
    }
};
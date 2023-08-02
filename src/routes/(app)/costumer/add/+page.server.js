import { insertData } from '$lib/server/db';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get("name");
        const phone_number = formData.get("phone_number");
        const address = formData.get("address");

        const res = await insertData({ name, phone_number, address }, 'costumers', 'phone_number');

        return await res[0] === 0 ? { failed: true, message: 'Data gagal ditambahkan. Nomor yang dimasukkan sudah terdaftar' } : { success: true, message: 'Data berhasil ditambahkan' };
    }
};
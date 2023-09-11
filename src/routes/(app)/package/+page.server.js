import { selectPackage, deletePackage } from '$lib/server/package';
import { fail } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return { packages: await selectPackage() };
};

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ url }) => {
        try {
            const id = String(url.searchParams.get('id'));
            const res = await deletePackage(id);
            return { success: true, message: 'Data Paket berhasil dihapus', data: res }
        } catch (error) {
            return fail(500, {
                error: true, message: 'Data Paket gagal dihapus'
            })
        }
    }
};
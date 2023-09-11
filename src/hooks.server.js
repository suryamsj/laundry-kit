import { authenticateUser } from "$lib/server/cekUser";
import { redirect } from "@sveltejs/kit";

const unProtectedRoutes = ['/', '/logout', '/register'];

export const handle = async ({ event, resolve, cookies }) => {
    event.locals.user = await authenticateUser(event)

    if (!unProtectedRoutes.includes(event.url.pathname)) {
        if (!event.locals.user) {
            cookies.delete('user');
            throw redirect(303, "/")
        }
    }

    const response = await resolve(event)
    return response
}
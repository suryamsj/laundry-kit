import { selectOneData } from '$lib/server/db';
import { cookieDecrypted } from '$lib/utils/hash';

export const authenticateUser = async (event) => {
    const { cookies } = event
    const user = cookies.get("user");

    if (user) {
        const user_decrypt = cookieDecrypted(user);
        const response = await selectOneData('users', 'username', user_decrypt);

        if (response) {
            return user;
        }
        return null;
    }
    return null;
}
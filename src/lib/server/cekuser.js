import { cookieDecrypted } from '$lib/utils/hash';
import { selectUserByUsername } from './user';

export const authenticateUser = async (event) => {
    const { cookies } = event
    const user = cookies.get("user");

    if (user) {
        const user_decrypt = cookieDecrypted(user);
        const response = await selectUserByUsername(user_decrypt);

        if (response) {
            return user;
        }
        return null;
    }
    return null;
}
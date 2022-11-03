import Cookies from 'js-cookie';

const DEFAULT_TOKEN_KEY = 'dms_cftk';

export function useToken(tokenKey: string = DEFAULT_TOKEN_KEY) {

    return {
        get() {
            return Cookies.get(tokenKey);
        },
        set(token: string) {
            return Cookies.set(tokenKey, token);
        },
        remove() {
            return Cookies.remove(tokenKey);
        }
    };
}

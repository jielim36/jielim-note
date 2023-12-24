import storage from "local-storage-fallback";
import { JWT_COOKIE } from "./configuration";

const TOKEN:string | undefined = JWT_COOKIE;

export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);
export const clearToken = () => storage.removeItem(TOKEN);

export const isAuthenticated = (): boolean => {
    try {
            
        const token = getToken();
        if(!token) return false;

        // 分割 JWT 为头部、载荷和签名
        const [header, payload, signature] = token.split('.');

        // 解码头部和载荷
        const decodedHeader = JSON.parse(atob(header));
        const decodedPayload = JSON.parse(atob(payload));

        // 获取 exp 值
        const expValue = decodedPayload.exp;

        // console.log('JWT Header:', decodedHeader);
        // console.log('JWT Payload:', decodedPayload);
        // console.log('JWT Signature:', signature);
        // console.log('Expiration Time (exp):', expValue);
        const expDate = new Date(expValue * 1000);
        const currentDate = new Date();
        
        if (expDate < currentDate) {
            //expired
            return false;
        }
            
    } catch (error) {
        return false;
    }

    
    return true;
}

export const isAuthenticatedWithPromise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
    try {
        const result = isAuthenticated();
        resolve(result);
    } catch (error) {
        reject(error);
    }
});

export const  destructToken = (authHeader: string) => {
    const token = authHeader.replace('Bearer ', "");
    return token;
} 
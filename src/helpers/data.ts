export const response = (message: string = "", status: string = 'success', extra: any = {}) => {
    return JSON.parse(
        JSON.stringify({
            status: status,
            message: message,
            ...extra
        }));
}
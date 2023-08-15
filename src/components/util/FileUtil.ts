export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to convert file to Base64'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read the file'));
        };

        reader.readAsDataURL(file);
    });
};
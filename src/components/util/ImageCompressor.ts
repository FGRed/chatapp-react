class ImageCompressor {
    static compressImage(file: File, targetSizeInMB: number, callback: (compressedBlob: Blob) => void): void {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxDimension = Math.max(img.width, img.height);
                let scale = 1;

                if (maxDimension > 1024) {
                    scale = 1024 / maxDimension;
                }

                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    throw new Error('Could not get canvas 2D context.');
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                let quality = 0.7; // Adjust the quality value as needed (0.0 to 1.0)

                let dataURL = canvas.toDataURL('image/jpeg', quality);

                while (dataURL.length / 1024 / 1024 > targetSizeInMB && quality > 0.1) {
                    quality -= 0.1;
                    dataURL = canvas.toDataURL('image/jpeg', quality);
                }

                const blob = ImageCompressor.dataURLtoBlob(dataURL);
                callback(blob);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    }

    static dataURLtoBlob(dataURL: string): Blob {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    static base64ToFile(base64String:string, filename:string) {
        // Extract the base64 data
        const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            throw new Error("Invalid base64 string format");
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        // Decode the base64 data
        const binaryData = atob(base64Data);

        // Create a Blob
        const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: mimeType });

        // Create a File
        const file = new File([blob], filename, { type: mimeType });

        return file;
    }

}

export default ImageCompressor;

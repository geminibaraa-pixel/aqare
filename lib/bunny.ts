import axios from 'axios';

const STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE_NAME;
const ACCESS_KEY = process.env.BUNNY_ACCESS_KEY;
const STORAGE_API_HOST = process.env.BUNNY_STORAGE_API_HOST || 'storage.bunnycdn.com';

interface BunnyUploadResult {
    success: boolean;
    url?: string;
    error?: any;
}

export async function uploadFileToBunny(file: File, folder: string = ''): Promise<BunnyUploadResult> {
    if (!STORAGE_ZONE_NAME || !ACCESS_KEY) {
        console.error("Bunny.net credentials missing");
        return { success: false, error: "Server configuration error" };
    }

    const fileName = `${Date.now()}-${file.name}`;
    const path = folder ? `${folder}/${fileName}` : fileName;
    const url = `https://${STORAGE_API_HOST}/${STORAGE_ZONE_NAME}/${path}`;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await axios.put(url, buffer, {
            headers: {
                AccessKey: ACCESS_KEY,
                'Content-Type': 'application/octet-stream',
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        });

        return { success: true, url: fileName }; // Return filename to store in DB
    } catch (error) {
        console.error("Bunny upload failed:", error);
        return { success: false, error };
    }
}

export async function deleteFileFromBunny(fileName: string, folder: string = ''): Promise<boolean> {
    if (!STORAGE_ZONE_NAME || !ACCESS_KEY) {
        return false;
    }

    const path = folder ? `${folder}/${fileName}` : fileName;
    const url = `https://${STORAGE_API_HOST}/${STORAGE_ZONE_NAME}/${path}`;

    try {
        await axios.delete(url, {
            headers: {
                AccessKey: ACCESS_KEY,
            },
        });
        return true;
    } catch (error) {
        console.error("Bunny delete failed:", error);
        return false;
    }
}

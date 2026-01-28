'use server';

import prisma from '@/lib/prisma';
import { uploadFileToBunny } from '@/lib/bunny';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitProperty(prevState: any, formData: FormData) {
    try {
        const type = formData.get('type') as string;
        const listingType = formData.get('listingType') as string;
        const price = parseFloat(formData.get('price') as string);
        const area = parseFloat(formData.get('area') as string);
        const district = formData.get('district') as string;
        const description = formData.get('description') as string;
        const sellerPhone = formData.get('sellerPhone') as string;
        const sellerWhatsapp = formData.get('sellerWhatsapp') as string;
        const floorRaw = formData.get('floor');
        const floor = floorRaw ? parseInt(floorRaw as string) : null;

        // Location
        const latRaw = formData.get('latitude');
        const lngRaw = formData.get('longitude');
        const latitude = latRaw ? parseFloat(latRaw as string) : null;
        const longitude = lngRaw ? parseFloat(lngRaw as string) : null;

        // File Uploads
        let titleDeedPath = null;
        const titleDeedFile = formData.get('titleDeed') as File;
        if (titleDeedFile && titleDeedFile.size > 0) {
            const result = await uploadFileToBunny(titleDeedFile, 'deeds');
            if (result.success) titleDeedPath = result.url;
        }

        let videoPath = null;
        const videoFile = formData.get('video') as File;
        if (videoFile && videoFile.size > 0) {
            const result = await uploadFileToBunny(videoFile, 'videos');
            if (result.success) videoPath = result.url;
        }

        // Images
        const imageFiles = formData.getAll('images') as File[];
        const uploadedImages: string[] = [];

        for (const file of imageFiles) {
            if (file.size > 0) {
                const result = await uploadFileToBunny(file, 'images');
                if (result.success && result.url) {
                    uploadedImages.push(result.url);
                }
            }
        }

        // Save to DB
        const property = await prisma.property.create({
            data: {
                type,
                listingType,
                price,
                area,
                district,
                description,
                sellerPhone,
                sellerWhatsapp,
                floor,
                latitude,
                longitude,
                titleDeedPath,
                videoPath,
                status: 'PENDING',
                images: {
                    create: uploadedImages.map(path => ({ path }))
                }
            }
        });

        revalidatePath('/');
        return { success: true, message: 'Property submitted successfully pending approval' };

    } catch (error) {
        console.error('Submission error:', error);
        return { success: false, message: 'Failed to submit property' };
    }
}

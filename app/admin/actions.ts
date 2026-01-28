'use server';

import prisma from '@/lib/prisma';
import { deleteFileFromBunny } from '@/lib/bunny';
import { revalidatePath } from 'next/cache';

export async function approveProperty(id: string) {
    await prisma.property.update({
        where: { id },
        data: { status: 'APPROVED' },
    });
    revalidatePath('/admin');
    revalidatePath('/buyer');
}

export async function rejectProperty(id: string) {
    // First get the property to find files to delete
    const property = await prisma.property.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!property) return;

    // Delete from Bunny
    if (property.titleDeedPath) await deleteFileFromBunny(property.titleDeedPath, 'deeds');
    if (property.videoPath) await deleteFileFromBunny(property.videoPath, 'videos');
    for (const img of property.images) {
        await deleteFileFromBunny(img.path, 'images');
    }

    // Delete from DB
    await prisma.property.delete({
        where: { id },
    });

    revalidatePath('/admin');
    revalidatePath('/buyer');
}

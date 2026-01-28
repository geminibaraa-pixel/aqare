import prisma from '@/lib/prisma';
import AdminCard from './AdminCard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const pendingProperties = await prisma.property.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Approvals</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingProperties.length === 0 ? (
                        <p>No pending properties.</p>
                    ) : (
                        pendingProperties.map((p) => <AdminCard key={p.id} property={p} />)
                    )}
                </div>
            </div>
        </div>
    );
}

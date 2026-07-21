import KitchenForm from '@/components/kitchen-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Kitchen } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    kitchen: Kitchen;
}

export default function EditKitchen({ kitchen }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'My Kitchens', href: '/my-kitchens' },
        { title: `Edit: ${kitchen.name}`, href: `/kitchens/${kitchen.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${kitchen.name}`} />
            <div className="mx-auto w-full max-w-2xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Edit Kitchen</h1>
                <KitchenForm kitchen={kitchen} />
            </div>
        </AppLayout>
    );
}

import KitchenForm from '@/components/kitchen-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Kitchens', href: '/my-kitchens' },
    { title: 'Add Kitchen', href: '/kitchens/create' },
];

export default function CreateKitchen() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Kitchen" />
            <div className="mx-auto w-full max-w-2xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Add a Kitchen</h1>
                <KitchenForm />
            </div>
        </AppLayout>
    );
}

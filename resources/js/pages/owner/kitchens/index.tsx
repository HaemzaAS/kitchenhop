import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Kitchen } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Pencil, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'My Kitchens', href: '/my-kitchens' }];

interface Props {
    kitchens: Kitchen[];
}

export default function MyKitchens({ kitchens }: Props) {
    const destroy = (kitchen: Kitchen) => {
        if (window.confirm(`Delete "${kitchen.name}"? This cannot be undone.`)) {
            router.delete(route('kitchens.destroy', kitchen.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Kitchens" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Kitchens</h1>
                        <p className="text-muted-foreground text-sm">Manage your kitchen listings</p>
                    </div>
                    <Button asChild>
                        <Link href={route('kitchens.create')}>
                            <Plus className="mr-1 h-4 w-4" /> Add Kitchen
                        </Link>
                    </Button>
                </div>

                {kitchens.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center">
                        <p className="text-4xl">🏠</p>
                        <p className="mt-2 font-medium">No kitchens yet</p>
                        <p className="text-muted-foreground text-sm">List your first kitchen to start receiving bookings.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {kitchens.map((kitchen) => (
                            <div key={kitchen.id} className="overflow-hidden rounded-xl border">
                                <div className="bg-muted aspect-video">
                                    {kitchen.images[0] ? (
                                        <img
                                            src={`/storage/${kitchen.images[0].path}`}
                                            alt={kitchen.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-4xl">🍳</div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold">{kitchen.name}</h3>
                                        <span className="font-semibold whitespace-nowrap">
                                            €{Number(kitchen.hourly_price).toFixed(0)}
                                            <span className="text-muted-foreground text-sm font-normal">/hr</span>
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                                        <MapPin className="h-3.5 w-3.5" /> {kitchen.city}
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('kitchens.edit', kitchen.id)}>
                                                <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => destroy(kitchen)}>
                                            <Trash2 className="mr-1 h-3.5 w-3.5 text-red-500" /> Delete
                                        </Button>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={route('kitchens.show', kitchen.id)}>View</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Kitchen, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarClock, MapPin, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    kitchen: Kitchen;
}

export default function KitchenShow({ kitchen }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [active, setActive] = useState(0);
    const images = kitchen.images;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Browse Kitchens', href: '/kitchens' },
        { title: kitchen.name, href: `/kitchens/${kitchen.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={kitchen.name} />
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="bg-muted aspect-video overflow-hidden rounded-xl border">
                            {images.length > 0 ? (
                                <img
                                    src={`/storage/${images[active].path}`}
                                    alt={kitchen.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-6xl">🍳</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="mt-2 flex gap-2 overflow-x-auto">
                                {images.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActive(i)}
                                        className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 ${
                                            i === active ? 'border-primary' : 'border-transparent'
                                        }`}
                                    >
                                        <img src={`/storage/${img.path}`} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl border p-5">
                        <div>
                            <h1 className="text-2xl font-bold">{kitchen.name}</h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                                <MapPin className="h-4 w-4" /> {kitchen.address}, {kitchen.city}
                            </p>
                            {kitchen.owner && (
                                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                                    <UserIcon className="h-4 w-4" /> Listed by {kitchen.owner.name}
                                </p>
                            )}
                        </div>

                        <div className="text-3xl font-bold">
                            €{Number(kitchen.hourly_price).toFixed(2)}
                            <span className="text-muted-foreground text-base font-normal"> / hour</span>
                        </div>

                        {auth.user.role === 'chef' && (
                            <Button size="lg" className="w-full" asChild>
                                <Link href={route('bookings.create', kitchen.id)}>
                                    <CalendarClock className="mr-1 h-4 w-4" /> Book this kitchen
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border p-5">
                    <h2 className="mb-2 text-lg font-semibold">About this kitchen</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{kitchen.description}</p>
                </div>
            </div>
        </AppLayout>
    );
}

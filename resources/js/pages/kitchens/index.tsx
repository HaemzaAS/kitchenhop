import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Kitchen, type Paginated } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Search } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Browse Kitchens', href: '/kitchens' }];

interface Props {
    kitchens: Paginated<Kitchen>;
    cities: string[];
    filters: { city?: string; search?: string };
}

function KitchenCard({ kitchen }: { kitchen: Kitchen }) {
    const cover = kitchen.images[0];

    return (
        <Link
            href={route('kitchens.show', kitchen.id)}
            className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
        >
            <div className="bg-muted aspect-video w-full overflow-hidden">
                {cover ? (
                    <img
                        src={`/storage/${cover.path}`}
                        alt={kitchen.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl">🍳</div>
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
            </div>
        </Link>
    );
}

export default function KitchensIndex({ kitchens, cities, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [city, setCity] = useState(filters.city ?? '');

    const applyFilters = (nextCity = city, nextSearch = search) => {
        router.get(
            route('kitchens.index'),
            { search: nextSearch || undefined, city: nextCity || undefined },
            { preserveState: true, replace: true },
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Browse Kitchens" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Browse Kitchens</h1>
                        <p className="text-muted-foreground text-sm">
                            {kitchens.total} professional kitchen{kitchens.total === 1 ? '' : 's'} available for rent
                        </p>
                    </div>
                    <form onSubmit={submit} className="flex flex-wrap gap-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input
                                className="w-56 pl-8"
                                placeholder="Search kitchens..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                applyFilters(e.target.value);
                            }}
                            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                        >
                            <option value="">All cities</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <Button type="submit">Search</Button>
                    </form>
                </div>

                {kitchens.data.length === 0 ? (
                    <div className="text-muted-foreground rounded-xl border border-dashed p-12 text-center">
                        No kitchens match your filters.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {kitchens.data.map((kitchen) => (
                            <KitchenCard key={kitchen.id} kitchen={kitchen} />
                        ))}
                    </div>
                )}

                {kitchens.last_page > 1 && (
                    <div className="flex flex-wrap justify-center gap-1">
                        {kitchens.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

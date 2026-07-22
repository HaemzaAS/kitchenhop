import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Kitchen } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, MapPin } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    kitchen: Kitchen;
}

type BookingFormData = {
    kitchen_id: number;
    date: string;
    start_time: string;
    end_time: string;
};

function hoursBetween(start: string, end: string): number {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const diff = eh * 60 + em - (sh * 60 + sm);
    return diff > 0 ? diff / 60 : 0;
}

export default function CreateBooking({ kitchen }: Props) {
    const { data, setData, post, processing, errors } = useForm<BookingFormData>({
        kitchen_id: kitchen.id,
        date: '',
        start_time: '',
        end_time: '',
    });

    const hours = hoursBetween(data.start_time, data.end_time);
    const total = hours * Number(kitchen.hourly_price);
    const today = new Date().toISOString().split('T')[0];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Browse Kitchens', href: '/kitchens' },
        { title: kitchen.name, href: `/kitchens/${kitchen.id}` },
        { title: 'Book', href: `/kitchens/${kitchen.id}/book` },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Book ${kitchen.name}`} />
            <div className="mx-auto w-full max-w-xl p-4">
                <h1 className="text-2xl font-bold">Book this kitchen</h1>

                <div className="mt-4 flex items-center gap-3 rounded-xl border p-4">
                    <div className="bg-muted h-14 w-20 shrink-0 overflow-hidden rounded-md">
                        {kitchen.images[0] ? (
                            <img src={kitchen.images[0].url} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xl">🍳</div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-semibold">{kitchen.name}</p>
                        <p className="text-muted-foreground flex items-center gap-1 text-sm">
                            <MapPin className="h-3.5 w-3.5" /> {kitchen.city} · €{Number(kitchen.hourly_price).toFixed(2)}/hour
                        </p>
                    </div>
                </div>

                <form className="mt-6 flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            min={today}
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            disabled={processing}
                            required
                            className="max-w-48"
                        />
                        <InputError message={errors.date} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start_time">Start time</Label>
                            <Input
                                id="start_time"
                                type="time"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                disabled={processing}
                                required
                            />
                            <InputError message={errors.start_time} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end_time">End time</Label>
                            <Input
                                id="end_time"
                                type="time"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                disabled={processing}
                                required
                            />
                            <InputError message={errors.end_time} />
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span>{hours > 0 ? `${hours.toFixed(2).replace(/\.00$/, '')} hour(s)` : '—'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Hourly rate</span>
                            <span>€{Number(kitchen.hourly_price).toFixed(2)}</span>
                        </div>
                        <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
                            <span>Total</span>
                            <span>{hours > 0 ? `€${total.toFixed(2)}` : '—'}</span>
                        </div>
                    </div>

                    <Button type="submit" size="lg" disabled={processing || hours <= 0}>
                        {processing && <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />}
                        Send booking request
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

import BookingStatusBadge from '@/components/booking-status-badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type Booking, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CalendarDays, Check, Clock, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Booking Requests', href: '/booking-requests' }];

interface Props {
    bookings: Booking[];
}

export default function BookingRequests({ bookings }: Props) {
    const decide = (booking: Booking, status: 'approved' | 'rejected') => {
        router.patch(route('bookings.update', booking.id), { status });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Booking Requests" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Booking Requests</h1>
                    <p className="text-muted-foreground text-sm">Requests from chefs for your kitchens</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center">
                        <p className="text-4xl">📥</p>
                        <p className="mt-2 font-medium">No booking requests yet</p>
                        <p className="text-muted-foreground text-sm">When chefs request your kitchens, they'll appear here.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{booking.kitchen?.name}</p>
                                        <BookingStatusBadge status={booking.status} />
                                    </div>
                                    <p className="text-sm">
                                        Requested by <span className="font-medium">{booking.chef?.name}</span>{' '}
                                        <span className="text-muted-foreground">({booking.chef?.email})</span>
                                    </p>
                                    <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3.5 w-3.5" /> {booking.date.split('T')[0]}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" /> {booking.start_time.slice(0, 5)}–{booking.end_time.slice(0, 5)} (
                                            {Number(booking.hours)}h)
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-lg font-bold">€{Number(booking.total_price).toFixed(2)}</p>
                                    {booking.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={() => decide(booking, 'approved')}>
                                                <Check className="mr-1 h-3.5 w-3.5" /> Approve
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => decide(booking, 'rejected')}>
                                                <X className="mr-1 h-3.5 w-3.5" /> Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

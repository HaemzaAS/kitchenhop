import BookingStatusBadge from '@/components/booking-status-badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type Booking, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarCheck, CalendarDays, ChefHat, Clock, Euro, Inbox, Plus, Search, ShieldCheck, Store, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    chefStats?: { total: number; pending: number; approved: number };
    recentBookings?: Booking[];
    ownerStats?: { kitchens: number; pending: number; revenue: number };
    recentRequests?: Booking[];
    adminStats?: { users: number; kitchens: number; bookings: number };
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border p-4">
            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}

function BookingRow({ booking, showChef }: { booking: Booking; showChef?: boolean }) {
    return (
        <div className="flex items-center justify-between gap-2 border-b p-3 text-sm last:border-0">
            <div className="min-w-0">
                <p className="truncate font-medium">
                    {booking.kitchen?.name}
                    {showChef && booking.chef && <span className="text-muted-foreground font-normal"> — {booking.chef.name}</span>}
                </p>
                <p className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {booking.date.split('T')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {booking.start_time.slice(0, 5)}–{booking.end_time.slice(0, 5)}
                    </span>
                </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <span className="font-semibold">€{Number(booking.total_price).toFixed(2)}</span>
                <BookingStatusBadge status={booking.status} />
            </div>
        </div>
    );
}

export default function Dashboard({ chefStats, recentBookings, ownerStats, recentRequests, adminStats }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {auth.user.name} 👋</h1>
                    <p className="text-muted-foreground text-sm capitalize">{auth.user.role} account</p>
                </div>

                {/* Chef dashboard */}
                {chefStats && (
                    <>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <StatCard icon={CalendarDays} label="Total bookings" value={chefStats.total} />
                            <StatCard icon={Clock} label="Pending" value={chefStats.pending} />
                            <StatCard icon={CalendarCheck} label="Approved" value={chefStats.approved} />
                        </div>
                        <div className="rounded-xl border">
                            <div className="flex items-center justify-between border-b p-3">
                                <h2 className="font-semibold">Recent bookings</h2>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={route('bookings.index')}>View all</Link>
                                </Button>
                            </div>
                            {recentBookings && recentBookings.length > 0 ? (
                                recentBookings.map((b) => <BookingRow key={b.id} booking={b} />)
                            ) : (
                                <p className="text-muted-foreground p-6 text-center text-sm">No bookings yet.</p>
                            )}
                        </div>
                        <Button size="lg" className="w-fit" asChild>
                            <Link href={route('kitchens.index')}>
                                <Search className="mr-1 h-4 w-4" /> Find a kitchen
                            </Link>
                        </Button>
                    </>
                )}

                {/* Owner dashboard */}
                {ownerStats && (
                    <>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <StatCard icon={Store} label="My kitchens" value={ownerStats.kitchens} />
                            <StatCard icon={Inbox} label="Pending requests" value={ownerStats.pending} />
                            <StatCard icon={Euro} label="Approved revenue" value={`€${ownerStats.revenue.toFixed(2)}`} />
                        </div>
                        <div className="rounded-xl border">
                            <div className="flex items-center justify-between border-b p-3">
                                <h2 className="font-semibold">Recent requests</h2>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={route('bookings.requests')}>View all</Link>
                                </Button>
                            </div>
                            {recentRequests && recentRequests.length > 0 ? (
                                recentRequests.map((b) => <BookingRow key={b.id} booking={b} showChef />)
                            ) : (
                                <p className="text-muted-foreground p-6 text-center text-sm">No requests yet.</p>
                            )}
                        </div>
                        <Button size="lg" className="w-fit" asChild>
                            <Link href={route('kitchens.create')}>
                                <Plus className="mr-1 h-4 w-4" /> Add a kitchen
                            </Link>
                        </Button>
                    </>
                )}

                {/* Admin dashboard */}
                {adminStats && (
                    <>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <StatCard icon={Users} label="Users" value={adminStats.users} />
                            <StatCard icon={ChefHat} label="Kitchens" value={adminStats.kitchens} />
                            <StatCard icon={CalendarDays} label="Bookings" value={adminStats.bookings} />
                        </div>
                        <Button size="lg" className="w-fit" asChild>
                            <Link href={route('admin.index')}>
                                <ShieldCheck className="mr-1 h-4 w-4" /> Open admin dashboard
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        </AppLayout>
    );
}

import BookingStatusBadge from '@/components/booking-status-badge';
import AppLayout from '@/layouts/app-layout';
import { type Booking, type BreadcrumbItem, type Kitchen, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, ChefHat, Euro, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin', href: '/admin' }];

interface Props {
    stats: { users: number; kitchens: number; bookings: number; revenue: number };
    users: User[];
    kitchens: (Kitchen & { owner?: { id: number; name: string } })[];
    bookings: (Booking & { chef?: { id: number; name: string }; kitchen?: { id: number; name: string } })[];
}

type Tab = 'users' | 'kitchens' | 'bookings';

const roleStyles: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    owner: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    chef: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

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

export default function AdminIndex({ stats, users, kitchens, bookings }: Props) {
    const [tab, setTab] = useState<Tab>('users');

    const tabs: { key: Tab; label: string; count: number }[] = [
        { key: 'users', label: 'Users', count: users.length },
        { key: 'kitchens', label: 'Kitchens', count: kitchens.length },
        { key: 'bookings', label: 'Bookings', count: bookings.length },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm">Platform overview</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={Users} label="Users" value={stats.users} />
                    <StatCard icon={ChefHat} label="Kitchens" value={stats.kitchens} />
                    <StatCard icon={CalendarDays} label="Bookings" value={stats.bookings} />
                    <StatCard icon={Euro} label="Approved revenue" value={`€${stats.revenue.toFixed(2)}`} />
                </div>

                <div className="border-b">
                    <div className="flex gap-1">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`-mb-px rounded-t-md border-b-2 px-4 py-2 text-sm font-medium ${
                                    tab === t.key
                                        ? 'border-primary text-foreground'
                                        : 'text-muted-foreground hover:text-foreground border-transparent'
                                }`}
                            >
                                {t.label} <span className="text-muted-foreground ml-1 text-xs">({t.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                    {tab === 'users' && (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-3 font-medium">ID</th>
                                    <th className="p-3 font-medium">Name</th>
                                    <th className="p-3 font-medium">Email</th>
                                    <th className="p-3 font-medium">Role</th>
                                    <th className="p-3 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-muted/50 border-b last:border-0">
                                        <td className="text-muted-foreground p-3">{u.id}</td>
                                        <td className="p-3 font-medium">{u.name}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleStyles[u.role] ?? ''}`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="text-muted-foreground p-3">{String(u.created_at).split('T')[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {tab === 'kitchens' && (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-3 font-medium">ID</th>
                                    <th className="p-3 font-medium">Name</th>
                                    <th className="p-3 font-medium">City</th>
                                    <th className="p-3 font-medium">Owner</th>
                                    <th className="p-3 font-medium">Price/hr</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kitchens.map((k) => (
                                    <tr key={k.id} className="hover:bg-muted/50 border-b last:border-0">
                                        <td className="text-muted-foreground p-3">{k.id}</td>
                                        <td className="p-3 font-medium">{k.name}</td>
                                        <td className="p-3">{k.city}</td>
                                        <td className="p-3">{k.owner?.name ?? '—'}</td>
                                        <td className="p-3">€{Number(k.hourly_price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {tab === 'bookings' && (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-3 font-medium">ID</th>
                                    <th className="p-3 font-medium">Chef</th>
                                    <th className="p-3 font-medium">Kitchen</th>
                                    <th className="p-3 font-medium">Date</th>
                                    <th className="p-3 font-medium">Time</th>
                                    <th className="p-3 font-medium">Total</th>
                                    <th className="p-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => (
                                    <tr key={b.id} className="hover:bg-muted/50 border-b last:border-0">
                                        <td className="text-muted-foreground p-3">{b.id}</td>
                                        <td className="p-3 font-medium">{b.chef?.name ?? '—'}</td>
                                        <td className="p-3">{b.kitchen?.name ?? '—'}</td>
                                        <td className="p-3">{b.date.split('T')[0]}</td>
                                        <td className="text-muted-foreground p-3">
                                            {b.start_time.slice(0, 5)}–{b.end_time.slice(0, 5)}
                                        </td>
                                        <td className="p-3">€{Number(b.total_price).toFixed(2)}</td>
                                        <td className="p-3">
                                            <BookingStatusBadge status={b.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

import { Button } from '@/components/ui/button';
import { type Kitchen, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CalendarCheck, ChefHat, MapPin, Search, Store, UtensilsCrossed } from 'lucide-react';

interface Props {
    featured: Kitchen[];
    stats: { kitchens: number; cities: number; bookings: number };
}

function KitchenCard({ kitchen }: { kitchen: Kitchen }) {
    const cover = kitchen.images[0];

    return (
        <Link
            href={route('kitchens.show', kitchen.id)}
            className="group bg-background overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
            <div className="bg-muted aspect-video w-full overflow-hidden">
                {cover ? (
                    <img
                        src={cover.url}
                        alt={kitchen.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">🍳</div>
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

export default function Welcome({ featured, stats }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Rent professional kitchens by the hour" />
            <div className="bg-background text-foreground min-h-screen">
                {/* Nav */}
                <header className="sticky top-0 z-20 border-b backdrop-blur-md">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                                <UtensilsCrossed className="h-4 w-4" />
                            </span>
                            KitchenHop
                        </Link>
                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={route('dashboard')}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={route('login')}>Log in</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={route('register')}>Sign up</Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="from-primary/10 via-background to-background absolute inset-0 bg-gradient-to-b" />
                    <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:pt-28">
                        <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
                            The kitchen rental marketplace
                        </p>
                        <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
                            Rent professional kitchens <span className="text-primary">by the hour</span>
                        </h1>
                        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                            KitchenHop connects chefs, caterers and food startups with fully equipped professional
                            kitchens — book by the hour, cook without limits.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button size="lg" asChild className="w-full sm:w-auto">
                                <Link href={auth.user ? route('kitchens.index') : route('register')}>
                                    <Search className="mr-1 h-4 w-4" /> Find a kitchen
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                                <Link href={auth.user ? route('dashboard') : route('register')}>
                                    <Store className="mr-1 h-4 w-4" /> List your kitchen
                                </Link>
                            </Button>
                        </div>

                        <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4">
                            {[
                                { value: stats.kitchens, label: 'Kitchens' },
                                { value: stats.cities, label: 'Cities' },
                                { value: stats.bookings, label: 'Bookings' },
                            ].map((s) => (
                                <div key={s.label} className="rounded-2xl border p-4">
                                    <p className="text-2xl font-extrabold">{s.value}</p>
                                    <p className="text-muted-foreground text-sm">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured kitchens */}
                {featured.length > 0 && (
                    <section className="mx-auto max-w-6xl px-4 py-16">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <h2 className="text-2xl font-bold sm:text-3xl">Featured kitchens</h2>
                                <p className="text-muted-foreground mt-1">Freshly listed spaces ready to book</p>
                            </div>
                            <Button variant="ghost" asChild className="hidden sm:inline-flex">
                                <Link href={auth.user ? route('kitchens.index') : route('register')}>
                                    View all <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {featured.map((kitchen) => (
                                <KitchenCard key={kitchen.id} kitchen={kitchen} />
                            ))}
                        </div>
                    </section>
                )}

                {/* How it works */}
                <section className="border-y">
                    <div className="mx-auto max-w-6xl px-4 py-16">
                        <h2 className="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
                        <div className="mt-10 grid gap-8 sm:grid-cols-3">
                            {[
                                {
                                    icon: Search,
                                    title: 'Find your kitchen',
                                    text: 'Browse professional kitchens by city, compare equipment and hourly rates.',
                                },
                                {
                                    icon: CalendarCheck,
                                    title: 'Book your hours',
                                    text: 'Pick a date and time slot. The total price is calculated instantly.',
                                },
                                {
                                    icon: ChefHat,
                                    title: 'Cook without limits',
                                    text: 'The owner approves your request and the kitchen is yours for the session.',
                                },
                            ].map((step, i) => (
                                <div key={step.title} className="text-center">
                                    <div className="bg-primary/10 text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-muted-foreground mt-4 text-sm font-semibold">Step {i + 1}</p>
                                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-sm">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Owner CTA */}
                <section className="mx-auto max-w-6xl px-4 py-16">
                    <div className="bg-primary text-primary-foreground flex flex-col items-center justify-between gap-6 rounded-3xl p-8 text-center sm:flex-row sm:p-12 sm:text-left">
                        <div>
                            <h2 className="text-2xl font-bold sm:text-3xl">Own a professional kitchen?</h2>
                            <p className="mt-2 opacity-90">
                                Turn your idle hours into income. List your kitchen for free and start receiving
                                booking requests today.
                            </p>
                        </div>
                        <Button size="lg" variant="secondary" asChild className="shrink-0">
                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                List your kitchen <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t">
                    <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm sm:flex-row">
                        <p className="flex items-center gap-2">
                            <UtensilsCrossed className="h-4 w-4" /> KitchenHop — kitchens by the hour
                        </p>
                        <p>Built as a technical evaluation MVP. Inspired by kitchenhop.de</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

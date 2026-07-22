import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CalendarDays, ChefHat, Inbox, LayoutGrid, ShieldCheck, Store } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Browse Kitchens',
            url: '/kitchens',
            icon: ChefHat,
        },
        ...(role === 'chef'
            ? [
                  {
                      title: 'My Bookings',
                      url: '/my-bookings',
                      icon: CalendarDays,
                  },
              ]
            : []),
        ...(role === 'owner'
            ? [
                  {
                      title: 'My Kitchens',
                      url: '/my-kitchens',
                      icon: Store,
                  },
                  {
                      title: 'Booking Requests',
                      url: '/booking-requests',
                      icon: Inbox,
                  },
              ]
            : []),
        ...(role === 'admin'
            ? [
                  {
                      title: 'Admin',
                      url: '/admin',
                      icon: ShieldCheck,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

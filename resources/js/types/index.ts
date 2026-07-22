import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface KitchenImage {
    id: number;
    kitchen_id: number;
    path: string;
    url: string;
}

export interface Kitchen {
    id: number;
    user_id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    hourly_price: string;
    images: KitchenImage[];
    owner?: Pick<User, 'id' | 'name'>;
    created_at: string;
    updated_at: string;
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Booking {
    id: number;
    user_id: number;
    kitchen_id: number;
    date: string;
    start_time: string;
    end_time: string;
    hours: string;
    total_price: string;
    status: BookingStatus;
    kitchen?: Pick<Kitchen, 'id' | 'name' | 'city'>;
    chef?: Pick<User, 'id' | 'name' | 'email'>;
    created_at: string;
    updated_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

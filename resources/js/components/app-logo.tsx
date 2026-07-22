import { UtensilsCrossed } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <UtensilsCrossed className="size-4" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">KitchenHop</span>
            </div>
        </>
    );
}

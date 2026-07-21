import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Kitchen } from '@/types';
import { useForm } from '@inertiajs/react';
import { ImagePlus, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type KitchenFormData = {
    name: string;
    description: string;
    address: string;
    city: string;
    hourly_price: string;
    images: File[];
};

export default function KitchenForm({ kitchen }: { kitchen?: Kitchen }) {
    const { data, setData, post, processing, errors, progress, transform } = useForm<KitchenFormData>({
        name: kitchen?.name ?? '',
        description: kitchen?.description ?? '',
        address: kitchen?.address ?? '',
        city: kitchen?.city ?? '',
        hourly_price: kitchen?.hourly_price ?? '',
        images: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (kitchen) {
            // Inertia can't send files over PUT, so we POST with a method override.
            transform((d) => ({ ...d, _method: 'put' }));
            post(route('kitchens.update', kitchen.id), { forceFormData: true });
        } else {
            post(route('kitchens.store'), { forceFormData: true });
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Kitchen name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. Berlin Central Prep Kitchen"
                    disabled={processing}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Equipment, size, access hours, what makes this kitchen great..."
                    disabled={processing}
                    required
                    rows={5}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-1 focus-visible:outline-none disabled:opacity-50"
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Street and number"
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.address} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        placeholder="e.g. Berlin"
                        disabled={processing}
                        required
                    />
                    <InputError message={errors.city} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="hourly_price">Hourly price (€)</Label>
                <Input
                    id="hourly_price"
                    type="number"
                    min="1"
                    step="0.01"
                    value={data.hourly_price}
                    onChange={(e) => setData('hourly_price', e.target.value)}
                    placeholder="25.00"
                    disabled={processing}
                    required
                    className="max-w-40"
                />
                <InputError message={errors.hourly_price} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="images">{kitchen ? 'Add more photos' : 'Photos (at least one)'}</Label>

                {kitchen && kitchen.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {kitchen.images.map((img) => (
                            <img
                                key={img.id}
                                src={`/storage/${img.path}`}
                                alt=""
                                className="h-16 w-24 rounded-md border object-cover"
                            />
                        ))}
                    </div>
                )}

                <label
                    htmlFor="images"
                    className="border-input hover:bg-accent flex cursor-pointer flex-col items-center gap-1 rounded-md border border-dashed p-6 text-sm"
                >
                    <ImagePlus className="text-muted-foreground h-6 w-6" />
                    <span>{data.images.length > 0 ? `${data.images.length} file(s) selected` : 'Click to choose images'}</span>
                    <span className="text-muted-foreground text-xs">JPG, PNG or WebP — max 4 MB each, up to 5</span>
                </label>
                <input
                    id="images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => setData('images', Array.from(e.target.files ?? []))}
                />

                {data.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {data.images.map((file, i) => (
                            <img
                                key={i}
                                src={URL.createObjectURL(file)}
                                alt=""
                                className="h-16 w-24 rounded-md border object-cover"
                            />
                        ))}
                    </div>
                )}

                <InputError message={errors.images} />
            </div>

            {progress && (
                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full transition-all" style={{ width: `${progress.percentage}%` }} />
                </div>
            )}

            <Button type="submit" disabled={processing} className="w-fit">
                {processing && <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />}
                {kitchen ? 'Save changes' : 'Create kitchen'}
            </Button>
        </form>
    );
}

import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12">
            <div className="mb-8">
                <Link href="/">
                    <img
                        src="/images/Logo_MESC.png"
                        alt="Logo MESC"
                        className="h-20 object-contain"
                    />
                </Link>
            </div>
            <div className="w-full max-w-md overflow-hidden rounded-xl bg-white px-8 py-8 shadow-sm">
                {children}
            </div>
        </div>
    );
}
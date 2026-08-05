import { Footer } from '@/shared/Footer';
import Header from '@/shared/Header';
import Hero from '@/shared/Hero';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ heroStatus=true, HeaderStatus=true, FooterStatus=true, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            {HeaderStatus && <Header />}
            {heroStatus && <Hero />}

            <main>{children}</main>
            {FooterStatus && <Footer />}
        </div>
    );
}

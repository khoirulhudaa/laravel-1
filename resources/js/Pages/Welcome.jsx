import { Footer } from '@/shared/Footer';
import Header from '@/shared/Header';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Header />
            <Footer />
        </>
    );
}

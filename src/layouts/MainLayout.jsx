import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <NavBar />
            <main className='min-h-screen max-w-screen mx-auto font-primary'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
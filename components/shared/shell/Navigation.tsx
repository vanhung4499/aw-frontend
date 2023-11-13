import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserNavigation from './UserNavigation';

const Navigation = () => {
    const { asPath, isReady, query } = useRouter();
    const [activePathname, setActivePathname] = useState<null | string>(null);

    const { slug } = query as { slug: string };

    useEffect(() => {
        if (isReady && asPath) {
            const activePathname = new URL(asPath, location.href).pathname;
            setActivePathname(activePathname);
        }
    }, [asPath, isReady]);

    const Navigation = () => {
        if (slug) {
        } else {
            return <UserNavigation activePathname={activePathname} />;
        }
    };

    return (
        <nav className="flex flex-1 flex-col">
            <Navigation />
        </nav>
    );
};

export default Navigation;

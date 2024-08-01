'use client';

import NextTopLoader from 'nextjs-toploader';

const BarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <NextTopLoader color="#BEF264" showSpinner={false} />
        </>
    );
};

export default BarProvider;
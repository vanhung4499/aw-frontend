import type { GetServerSidePropsContext } from 'next';
import type { ReactElement } from 'react';

const VerifyEmailToken = () => {
    return <></>;
};

VerifyEmailToken.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};

export const getServerSideProps = async ({
                                             query,
                                         }: GetServerSidePropsContext) => {
    const { token } = query as { token: string };

    if (!token) {
        return {
            notFound: true,
        };
    }

    // TODO: Verify token

    return {
        redirect: {
            destination: '/auth/login?success=email-verified',
            permanent: false,
        },
    };
};

export default VerifyEmailToken;

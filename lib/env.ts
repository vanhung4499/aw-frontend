const env = {
    apiUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    appUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
    product: 'aw',
    redirectIfAuthenticated: '/dashboard',

    // NextAuth configuration
    nextAuth: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    //Social login: Github
    github: {
        clientId: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    },

    //Social login: Google
    google: {
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    },

    // Users will need to confirm their email before accessing the app feature
    confirmEmail: process.env.CONFIRM_EMAIL === 'true',


    disableNonBusinessEmailSignup:
        process.env.DISABLE_NON_BUSINESS_EMAIL_SIGNUP === 'true' ? true : false,

    authProviders: process.env.AUTH_PROVIDERS || 'github,credentials',

    hideLandingPage: process.env.HIDE_LANDING_PAGE === 'true' ? true : false,

    darkModeEnabled: process.env.NEXT_PUBLIC_DARK_MODE === 'false' ? false : true,

    recaptcha: {
        siteKey: process.env.RECAPTCHA_SITE_KEY || null,
        secretKey: process.env.RECAPTCHA_SECRET_KEY || null,
    },
};

export default env;

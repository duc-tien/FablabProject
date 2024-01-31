import config from '~/config';

// Public routes
const publicRoutes = [
    { path: config.path.home, page: config.page.home },
    { path: config.path.detail, page: config.page.detail },
    { path: config.path.login, page: config.page.login },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

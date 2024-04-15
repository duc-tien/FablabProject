import config from '~/config';

// Public routes
const publicRoutes = [
    { path: config.path.home, page: config.page.home,header:'TỔNG QUAN' },
    { path: config.path.machine, page: config.page.machine, header:'GIÁM SÁT MÁY' },
    { path: config.path.project, page: config.page.project, header:'THEO DÕI DỰ ÁN' },
    { path: config.path.history, page: config.page.history,header:'TRUY XUẤT DỮ LIỆU' },
    { path: config.path.report, page: config.page.report, header:'BÁO CÁO' },

];

const privateRoutes = [
    { path: config.path.home, page: config.page.home,header:'TỔNG QUAN' },
    { path: config.path.worker, page: config.page.worker, header:'CẬP NHẬT CÔNG NHÂN' },
    { path: config.path.machine, page: config.page.machine, header:'GIÁM SÁT MÁY' },
    { path: config.path.updateproject, page: config.page.updateproject, header:'CẬP NHẬT DỰ ÁN' },
    // { path: config.path.project, page: config.page.project, header:'THEO DÕI DỰ ÁN' },
    { path: config.path.history, page: config.page.history,header:'TRUY XUẤT DỮ LIỆU' },
    { path: config.path.warehouse, page: config.page.warehouse,header:'XÁC NHẬN NHẬP KHO' },
    // { path: config.path.report, page: config.page.report, header:'BÁO CÁO' },
];

export { publicRoutes, privateRoutes };

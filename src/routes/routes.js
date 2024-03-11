import config from '~/config';

// Public routes
const publicRoutes = [
    { path: config.path.home, page: config.page.home,header:'TỔNG QUAN' },
    { path: config.path.history, page: config.page.history,header:'TRUY XUẤT DỮ LIỆU' },
    { path: config.path.project, page: config.page.project, header:'GIÁM SÁT DỰ ÁN' },
    { path: config.path.machine, page: config.page.machine, header:'GIÁM SÁT MÁY' },
    { path: config.path.updateproject, page: config.page.updateproject, header:'CẬP NHẬT DỰ ÁN' },
    { path: config.path.report, page: config.page.report, header:'BÁO CÁO' },
    { path: config.path.order, page: config.page.order, header:'TẠO ĐƠN HÀNG' },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

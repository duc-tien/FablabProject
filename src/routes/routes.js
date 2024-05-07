import config from '~/config';

// Public routes
const publicRoutes = [
    { path: config.path.home, page: config.page.home,header:'TỔNG QUAN' },
    { path: config.path.machine, page: config.page.machine, header:'GIÁM SÁT MÁY' },
    { path: config.path.history, page: config.page.history,header:'TRUY XUẤT DỮ LIỆU' },

];

const privateRoutes = [
    { path: config.path.home, page: config.page.home,header:'TỔNG QUAN' },
    { path: config.path.machine, page: config.page.machine, header:'GIÁM SÁT MÁY' },
    { path: config.path.history, page: config.page.history,header:'TRUY XUẤT DỮ LIỆU' },
    { path: config.path.update, page: config.page.update, header:'QUẢN LÝ DỮ LIỆU' },
    // { path: config.path.warehouse, page: config.page.warehouse,header:'XÁC NHẬN CHI TIẾT' },
    { path: config.path.maintenance, page: config.page.maintenance,header:'QUẢN LÝ BẢO TRÌ' },
];

export { publicRoutes, privateRoutes };

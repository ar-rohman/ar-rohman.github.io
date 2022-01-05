import Main from '../views/pages/main';
import AssetsSource from '../views/pages/assets-source';
import PortfolioDetail from '../views/pages/portfolio-detail';

const routes = {
    '/': Main,
    '/portfolio/:id': PortfolioDetail,
    '/assets-source': AssetsSource,
};

export default routes;

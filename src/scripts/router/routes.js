import Page from '../views/pages/page';
import AssetsSource from '../views/pages/assets-source';
import PortfolioDetail from '../views/pages/portfolio-detail';

const routes = {
    '/': Page,
    '/portfolio/:id': PortfolioDetail,
    '/assets-source': AssetsSource,
};

export default routes;

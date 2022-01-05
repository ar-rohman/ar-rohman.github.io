import Page from '../views/pages/page';
import AssetsSource from '../views/pages/assets-source';
import Glow from '../views/pages/detail/glow-detail';
// import DomainAvailability from '../views/pages/domain-availability';
// import IpGeolocation from '../views/pages/ip-geolocation';
// import EmailVerification from '../views/pages/email-verification';
// import About from '../views/pages/about';

const routes = {
    '/': Page, // default page
    '/assets-source': AssetsSource,
    '/glow-detail': Glow,
//     '/ip-geolocation': IpGeolocation,
//     '/email-verification': EmailVerification,
//     '/about': About,
};

export default routes;

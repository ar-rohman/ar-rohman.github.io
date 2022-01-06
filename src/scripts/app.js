// import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from './router/url-parser';
import routes from './router/routes';
// import ActiveNav from './utils/active-nav';

// import ActiveMenu from '../utils/active-menu';

class App {
    constructor(content, navLink) {
        this.content = content;
        this.navLink = navLink;
        // this.initialAppShell();
    }

    // initialAppShell() {
    // DrawerInitiator.init({
    //     hamburger: this.hamburger,
    //     navigation: this.navigation,
    //     drawer: this.drawer,
    // });

    // ActiveNav.click(this.navLink);
    // }

    async renderPage() {
        const url = UrlParser.parseUrlWithCombiner();
        const page = routes[url];
        this.content.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;

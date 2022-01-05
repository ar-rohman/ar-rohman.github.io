// import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from './router/url-parser';
import routes from './router/routes';
// import ActiveMenu from '../utils/active-menu';

class App {
    constructor(content) {
        this.content = content;
        // this.initialAppShell();
    }

    // initialAppShell() {
    //     DrawerInitiator.init({
    //         hamburger: this.hamburger,
    //         navigation: this.navigation,
    //         drawer: this.drawer,
    //     });

    //     ActiveMenu.click({
    //         clickedLinks: this.clickedLinks,
    //         links: this.links,
    //         navigation: this.navigation,
    //     });
    // }

    async renderPage() {
        const url = UrlParser.parseUrlWithCombiner();
        const page = routes[url];
        this.content.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;

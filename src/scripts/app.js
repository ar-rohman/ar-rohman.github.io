import UrlParser from './router/url-parser';
import routes from './router/routes';

class App {
    constructor(content, navLink) {
        this.content = content;
        this.navLink = navLink;
    }

    async renderPage() {
        const url = UrlParser.parseUrlWithCombiner();
        const page = routes[url];
        this.content.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;

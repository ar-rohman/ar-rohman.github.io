import data from '@/scripts/data';
import UrlParser from '@/scripts/router/url-parser';
import '../components/back-header';
import '../components/detail-page';
import '../components/section/footer-section';

export default {
    render() {
        return `
            <back-header></back-header>
            <div id="js-detail-page"></div>
            <footer-section></footer-section>
        `;
    },

    afterRender() {
        window.scrollTo({ top: 0, behavior: 'instant' });
        const slug = UrlParser.parseUrl();
        const detailData = data.filter((item) => item.slug === slug.id)[0];
        document.title = `${detailData.title} Detail - ArRohman`;
        const detailPage = document.getElementById('js-detail-page');
        const element = document.createElement('detail-page');
        element.data = detailData;
        detailPage.appendChild(element);
    },
};

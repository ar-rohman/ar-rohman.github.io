import UrlParser from '../../router/url-parser';
import data from '../../data';
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
        const slug = UrlParser.parseUrl();
        const detailData = data.filter((item) => item.slug === slug.id)[0];
        document.title = `${detailData.title} Detail - ArRohman`;
        const detailPage = document.getElementById('js-detail-page');
        const element = document.createElement('detail-page');
        element.data = detailData;
        detailPage.appendChild(element);
    },
};

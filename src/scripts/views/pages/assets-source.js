import '../components/back-header';
import assetSourceIllustration from '../../../assets/illustrations/asset-source.svg';
import '../components/section/footer-section';

const Page = {
    async render() {
        return `
           <div id="js-asset-source-header"></div>
            <main>
                <div class="asset-source">
                    <div class="max-content">
                        <div class="asset-source-content">
                            <div>
                                <div class="detail-summary">Assets used in this website</div>
                                <div class="detail-list-header">Icon</div>
                                <div class="detail-list">
                                    <ul>
                                        <li>
                                            <a href="https://heroicons.com/" target="_blank" rel="noopener" class="link">heroicons</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="detail-list-header">Illustrations</div>
                                <div class="detail-list">
                                    <ul>
                                        <li>
                                            <a href="https://drawkit.com/product/grape-illustration-pack" target="_blank" rel="noopener" class="link">
                                                DrawKit
                                            </a>
                                            (with some changes)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <img src="${assetSourceIllustration}" alt="Asset Source" class="asset-source-illustration">
                        </div>
                    </div>
                </div>
            </main>
            <footer-section></footer-section>
        `;
    },

    async afterRender() {
        document.title = 'Asset Source - ArRohman';
        const assetSource = document.getElementById('js-asset-source-header');
        const backHeader = document.createElement('back-header');
        backHeader.backHeaderTitle = 'Asset Source';
        assetSource.appendChild(backHeader);
    },
};

export default Page;

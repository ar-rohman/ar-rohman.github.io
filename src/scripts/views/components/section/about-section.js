import aboutIllustration from '@/assets/illustrations/about.svg';

class AboutSection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="about" class="about">
                <div class="max-content">
                    <div class="about-section">About</div>
                    <div class="about-content">
                        <img src="${aboutIllustration}" alt="About" class="about-illustration">
                        <div class="about-text">
                            <p>
                                I am web developer based in Jakarta, ID
                                who passionate about building excellent software
                                that improves the lives of those around me.
                            </p>
                            <p>
                                In my spare time I like to tinker on side projects for clients
                                ranging from individuals and small businesses
                                the way to large enterprise corporations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('about-section', AboutSection);

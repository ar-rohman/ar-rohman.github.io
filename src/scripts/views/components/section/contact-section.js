import contactIllustration from '@/assets/illustrations/contact.svg';

class ContactSection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="contact" class="contact">
                <div class="max-content">
                    <div class="contact-section">Contact</div>
                    <div class="contact-content">
                        <div>
                            <p>If you wanna get in touch,</p> <p>talk to me about a project or just say hi,</p>
                            <p>feel free to contact me via email at</p>
                            <a href="mailto:kontak.rohman@gmail.com" class="link">kontak.rohman@gmail.com</a>
                        </div>
                        <img src="${contactIllustration}" alt="Contact" class="contact-illustration">
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('contact-section', ContactSection);

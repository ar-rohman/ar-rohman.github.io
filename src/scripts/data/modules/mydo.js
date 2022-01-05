import portfolioImage from '../../../assets/portfolio/mydo.png';

const projectTitle = 'MyDo';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectSlug,
    description: 'MyDo is an application that provides domain and email information.',
    image: portfolioImage,
    features: [
        'Whois Lookup',
        'Domain Availability Check',
        'IP Geolocation Lookup',
        'Email Verification Check',
    ],
    technologies: [
        'Javascript',
        'Webpack',
        'SPA (Single Page Application)',
    ],
    hastag: 'Javascript',
    demoLink: 'https://ar-rohman.github.io/mydo',
    detailLink: `#/portfolio/${projectSlug}`,
    repoLink: 'https://github.com/ar-rohman/mydo',
};

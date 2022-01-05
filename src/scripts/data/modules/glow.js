import portfolioImage from '../../../assets/portfolio/glow-maskable.png';

const projectTitle = 'Glow';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectSlug,
    description: 'Glow (Global Weather) is an application that provides weather data for any location on Earth.',
    image: portfolioImage,
    features: [
        'Current weather forecast',
        'Hourly weather forecast',
        'Daily weather forecast',
        'Search weather forecast by city',
        'Set default city &amp; temperature',
        'Support dark mode',
        'Bilingual',
    ],
    technologies: [
        'Vue',
        'Tailwind',
        'Progressive Web App (PWA)',
        'Indexed DB',
        'Local Storage',
    ],
    hastag: 'Vue',
    demoLink: 'https://glow-forecast.web.app',
    detailLink: `#/portfolio/${projectSlug}`,
    repoLink: '',
};

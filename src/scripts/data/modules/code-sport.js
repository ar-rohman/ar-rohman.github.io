import portfolioImage from '@/assets/portfolio/code-sport.png';

const projectTitle = 'Code Sport';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectSlug,
    description: 'Provides information about Champions League.',
    image: portfolioImage,
    features: [
        'Matches',
        'Standings',
        'Teams',
        'Scorers',
    ],
    technologies: [
        'Vue',
        'Tailwind',
        'Progressive Web Application (PWA)',
        'SPA (Single Page Application)',
    ],
    hastag: 'Vue',
    demoLink: 'https://code-sport.web.app',
    detailLink: `#/portfolio/${projectSlug}`,
    repoLink: 'https://github.com/ar-rohman/code-sport',
};

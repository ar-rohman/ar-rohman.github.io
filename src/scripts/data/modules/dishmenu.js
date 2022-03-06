import portfolioImage from '@/assets/portfolio/dishmenu.png';

const projectTitle = 'dishmenu';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectSlug,
    description: 'Dish information and review (dummy).',
    image: portfolioImage,
    features: [
        'Dish list',
        'Dish Review',
    ],
    technologies: [
        'Javascript',
        'Webpack',
        'Progressive Web Application (PWA)',
        'SPA (Single Page Application)',
        'Indexed DB',
    ],
    hastag: 'Javascript',
    demoLink: '',
    detailLink: `#/portfolio/${projectSlug}`,
    repoLink: 'https://github.com/ar-rohman/dishmenu',
};

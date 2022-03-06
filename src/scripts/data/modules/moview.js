import portfolioImage from '@/assets/portfolio/moview.png';

const projectTitle = 'MOVIEW';
const projectSlug = projectTitle.toLowerCase().replace(/\s/g, '-');

export default {
    title: projectTitle,
    slug: projectSlug,
    description: 'Moview is where people find their favorite movies and discover movies around the world.',
    image: portfolioImage,
    features: [
        'Discover movies',
        'Play trailers',
        'Share movies',
        'Add / remove favorite movies',
        'Dark mode',
    ],
    technologies: [
        'Vue 3',
        'Tailwindcss',
        'Pinia',
        'Indexed DB',
        'Local Storage',
    ],
    hastag: 'Vue',
    demoLink: 'https://moview-app.vercel.app',
    detailLink: `#/portfolio/${projectSlug}`,
    repoLink: '',
};

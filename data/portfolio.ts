import eosImage from '~/assets/images/E-OS/E-OS.jpeg';
import eosContentsImage from '~/assets/images/E-OS/E-os_contents.jpeg';
import itms from '~/assets/images/itms/itms.jpeg';
import itms1 from '~/assets/images/itms/itms-1.jpeg';
import itms2 from '~/assets/images/itms/itms-2.jpeg';
import internhub from '~/assets/images/internhub-portal/internhub.png';
import internhub1 from '~/assets/images/internhub-portal/Internhub-content.jpeg';
import internhubcms from '~/assets/images/internhub-cms/Internhub-cms.png';
import internhubcms1 from '~/assets/images/internhub-cms/Internhub-cms1.png';
import cms from '~/assets/images/internhub-cms/cms.png';
import ppid from '~/assets/images/PPID/ppid.png';
import ppid1 from '~/assets/images/PPID/ppid-content.png';

export const PROFILE = {
	brand: 'LOCIO',
	name: 'Teguh Rinaldi',
	firstName: 'Teguh',
	lastName: 'Rinaldi',
	role: 'Front End Developer',
	portrait:
		'https://customer-assets-4nw71qhi.emergentagent.net/job_4fdae0bd-d443-4df0-8952-2646f42322ab/artifacts/xfi0vnb6_poto_teguh_-removebg-preview.png',
	tagline:
		"An enthusiastic front end developer breathing life into code — crafting interfaces that don't just capture attention, they mesmerize.",
	about:
		"Hey there! I'm Teguh Rinaldi, a dedicated front end developer fueled by creativity and a knack for tackling challenges head-on. With a fusion of technical expertise and a user-focused mindset, I'm committed to crafting seamless digital solutions that resonate with your audience. Let's team up and turn your ideas into reality.",
	resume: '#',
};

export const NAV_LINKS = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Work', href: '#work' },
	{ label: 'Contact', href: '#contact' },
];

export const SKILLS = [
	'Rapid Prototyping',
	'User Testing',
	'Design Systems',
	'Graphic Design',
	'SEO Craft',
	'Motion Design',
	'React',
	'TypeScript',
	'Tailwind CSS',
	'Framer Motion',
];

export const MANIFESTO = [
	{
		num: '01',
		title: 'Precision',
		body: 'Pixel-honest layouts and a typographic system that holds its rhythm on every screen.',
	},
	{
		num: '02',
		title: 'Motion',
		body: 'Purposeful animation that guides the eye and gives interfaces a living, tactile pulse.',
	},
	{
		num: '03',
		title: 'Emotion',
		body: 'Interfaces built to be felt — details that turn a first visit into a lasting impression.',
	},
];

export const STATS = [
	{ value: '5+', label: 'Years of Design Experience' },
	{ value: '50+', label: 'Overall Global Customers' },
	{ value: '90+', label: 'Projects Worked On' },
];

export const PROJECTS = [
	{
		id: 'e-os',
		title: 'E-OS',
		category: 'Web App',
		year: '2025',
		images: [eosImage, eosContentsImage],
		span: 'lg:col-span-7',
	},

	{
		id: 'itms',
		title: 'ITMS',
		category: 'Web App',
		year: '2025',
		images: [itms, itms1, itms2],
		span: 'lg:col-span-5',
	},

	{
		id: 'internhub',
		title: 'Portal-Internhub',
		category: 'Web App · Internship Portal',
		year: '2025',
		images: [internhub, internhub1],
		span: 'lg:col-span-5',
	},

	{
		id: 'InternhubCMS',
		title: 'Internhub CMS',
		category: 'web App · Internship CMS',
		year: '2025',
		images: [cms, internhubcms, internhubcms1],
		span: 'lg:col-span-7',
	},
	{
		id: 'PPID',
		title: 'PPID',
		category: 'web App · Information Management',
		year: '2025',
		images: [ppid, ppid1],
		span: 'lg:col-span-7',
	},
];

export const SOCIAL = [
	{ label: 'LinkedIn', href: '#' },
	{ label: 'Behance', href: '#' },
	{ label: 'Dribbble', href: '#' },
	{ label: 'Figma', href: '#' },
];

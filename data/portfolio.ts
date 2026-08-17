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
import gamifikasi from '~/assets/images/gamifikasi/gamifikasi.png';
import foto from '~/assets/images/poto_teguh.jpeg';
import heroFoto from '~/assets/images/poto_teguh1.png';
import brandSignature from '~/assets/images/ttd_teguh.png';
import resumePdf from '~/assets/CV_TeguhRinaldi.pdf';

export const PROFILE = {
	brand: 'TR',
	brandLogo: brandSignature,
	name: 'Teguh Rinaldi',
	firstName: 'Teguh',
	lastName: 'Rinaldi',
	role: 'Front End Developer',
	portrait: foto,
	heroPortrait: heroFoto,
	tagline:
		'I turn ideas and designs into interfaces that feel right — from pixels and layouts to production-ready code.',
	about:
		"I'm Teguh Rinaldi, a frontend engineer focused on turning UI/UX designs and business requirements into real, usable products. I enjoy figuring out how a design should translate into components, layouts, and a frontend architecture that can actually grow with the product. I've built enterprise applications from scratch using React, Next.js, and TypeScript, while working with APIs, state management, authentication, and complex data-driven interfaces.",
	resume: resumePdf,
};

export const NAV_LINKS = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Work', href: '#work' },
	{ label: 'Contact', href: '#contact' },
];

export const SKILLS = [
	'Frontend Architecture',
	'UI Implementation',
	'Responsive Design',
	'React',
	'Next.js',
	'TypeScript',
	'Tailwind CSS',
	'Shadcn UI',
	'REST API Integration',
	'TanStack Query',
];

export const MANIFESTO = [
	{
		num: '01',
		title: 'UI',
		body: 'I enjoy turning Figma designs into responsive interfaces where layout, spacing, and positioning actually feel right.',
	},
	{
		num: '02',
		title: 'Architecture',
		body: 'I think about the structure behind the interface — reusable components, state, API integration, and a codebase that can grow with the product.',
	},
	{
		num: '03',
		title: 'Ownership',
		body: 'From an empty repository to deployment, I enjoy taking ownership and figuring out how things should work along the way.',
	},
];

export const STATS = [
	{ value: '3+', label: 'Years of FrontEnd Engineer' },
	{ value: '3+', label: 'Company Work With' },
	{ value: '8+', label: 'Projects Worked On' },
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
	{
		id: 'Gamifikasi',
		title: 'Gamifikasi live Tracking',
		category: 'web App · Gamifikasi live Tracking',
		year: '2024',
		images: [gamifikasi],
		span: 'lg:col-span-5',
	},
];

export const SOCIAL = [
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/teguh-rinaldi-a1a58717b/',
	},
	{ label: 'Instagram', href: 'https://www.instagram.com/teguhrinaldi/' },
	{ label: 'Github', href: 'https://github.com/teguhrinaldi' },
	{
		label: 'Figma',
		href: 'https://www.figma.com/files/team/1303303339286753940/recents-and-sharing/recently-viewed?fuid=1001361561339573843',
	},
];

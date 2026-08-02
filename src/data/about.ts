export const aboutIntro = [
	'You may be wondering "Who is this person that is blabbing on this website, and why should I care?". Well, my name is Darko Mesaros, or Darko Meszaros, or even Дарко Месарош. Depends who you ask and in what piece od document you look at.',
	"I am a computer person who writes Rust, breaks things on AWS, and collects computers older than most of my audience. By title I'm a Distinguished Developer Advocate, by practice I'm live-coding on Twitch or convincing a 1974 minicomputer to do something useful. I build CLI tools nobody asked for but everyone ends up using, blog about Rust and cloud development right here, and firmly believe the terminal is the best UI ever made. I'm happiest when a demo works on the first try, which almost never happens.",
	"I also care deeply about developer productivity and coding assistants. I spend an unreasonable amount of time teaching AI agents to be better coding companions, building MCP servers, and automating everything that stands still long enough. If there's a way to make developers faster and happier, I'm probably already tinkering with it.",
	'Oh, and I collect old computers. Like, a lot of them. From Commodore 64s to a 1974 Data General minicomputer that used to belong to NOAA. I like making them do things they were never meant to do - like deploying AWS infrastructure through a teletype. Ask me about an old computer you loved, and I likely have it at home!'
];

export const aboutProjects = [
	{
		name: 'bedrust',
		href: 'https://github.com/darko-mesaros/bedrust',
		description: 'CLI tool for interacting with Amazon Bedrock models'
	},
	{
		name: 'shuk',
		href: 'https://github.com/darko-mesaros/shuk',
		description: 'share files from S3 via presigned URLs'
	},
	{
		name: 'krtk',
		href: 'https://github.com/darko-mesaros/krtk.rs',
		description: 'serverless URL shortener built with Rust Lambda + CDK'
	},
	{
		name: 'pristup',
		href: 'https://github.com/darko-mesaros/pristup',
		description: 'generates temporary AWS Console sign-in URLs'
	},
	{
		name: 'tweetpad',
		href: 'https://github.com/darko-mesaros/tweetpad',
		description: 'pads videos to Twitter/X aspect ratios using ffmpeg'
	},
	{
		name: 'statusbar_tools',
		href: 'https://github.com/darko-mesaros/statusbar_tools',
		description: 'Rust tools for window manager status bars'
	},
	{
		name: 'grimoire-mcp',
		href: 'https://github.com/darko-mesaros/grimoire-mcp',
		description: 'MCP server for managing dev patterns as markdown files'
	},
	{
		name: 'tools',
		href: 'https://github.com/darko-mesaros/tools',
		description: 'misc utilities for blog and content workflows'
	}
];

export const aboutLinks = [
	{ label: 'Website', href: 'https://rup12.net' },
	{ label: 'GitHub', href: 'https://github.com/darko-mesaros' },
	{ label: 'Bluesky', href: 'https://bsky.app/profile/darko.rup12.net' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/darko-mesaros/' },
	{ label: 'Discord', href: 'https://discord.gg/kZymEnmYrB' }
];

export const aboutMarkdown = () => `# Darko Mesaros

Also written as Darko Meszaros, and sometimes as Darko Mesaros in different documents.

${aboutIntro.slice(1).join('\n\n')}

## Projects

${aboutProjects.map((project) => `- [${project.name}](${project.href}) - ${project.description}`).join('\n')}

## Links

${aboutLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}

Terminal is still the best UI.
`;

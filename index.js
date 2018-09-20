const path = require('path')

const Gitlab = require('gitlab/dist/es5').default
const cmd = require('node-cmd-promise')
// import Gitlab from 'gitlab'

function error(msg) {
	console.error(msg)
	process.exit(1)
}

async function main(args) {
	const api = new Gitlab({
		url: args.url,
		token: args.token
	})

	const allGroups = await api.Groups.all()

	const matchingGroups = allGroups.filter((g) => g.name === args.group)	
	if (matchingGroups.length === 0) error(`Didn't find a group named ${args.group}!`)

	const group = matchingGroups[0]

	const projects = await api.GroupProjects.all(group.id)

	for (const project of projects) {
		await cloneProject(project, args.method, args.folder)
	}
}

function cloneProject(project, method, folder) {
	const url = project[`${method}_url_to_repo`]
	const dest = path.join(folder, project.name)
	console.log(`Cloning ${project.name} from '${url}'...`)
	return cmd(`git clone ${url} ${dest}`).catch((e) => console.error('Could not clone:', e))
}

const options = {
	'token': {
		alias: 't',
		demandOption: true,
		description: 'GitLab personal API token (generate one from your profile)',
		type: 'string',
	},
	'url': {
		alias: 'u',
		description: 'the URL of the GitLab server (defaults to gitlab.com)',
		default: 'http://gitlab.com/',
		type: 'string'
	},
	'group': {
		alias: 'g',
		demandOption: true,
		description: 'the name of the group to clone',
		type: 'string',
	},
	'method': {
		alias: 'm',
		choices: ['http', 'ssh'],
		default: 'http',
		description: 'the method used to clone the project',
		type: 'string'
	},
	'folder': {
		alias: 'f',
		default: 'cloned',
		description: 'the folder to put the cloned repos into',
		type: 'string'
	}
}

const args = require('yargs')
	.options(options)
	.argv

main(args)



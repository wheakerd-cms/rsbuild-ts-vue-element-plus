import * as path from "node:path";
import {ensureDir, readJSON} from 'fs-extra';
import {writeFileSync} from "node:fs";
import chalk from "chalk";
import pkg from '../package.json';

const toCamelCase = (str: string): string => {
	return str
		.split('-')
		.map((word, index) => {
			if (index === 0) return word.toLowerCase();
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join('');
};

const log = (message: string) => console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)} - ${message}`);

const loadJSON = async (filePath: string) => {
	try {
		return await readJSON(filePath);
	} catch (error) {
		log(`Error reading JSON file at ${filePath}: ${error.message}`);
		return null;
	}
};

(async () => {
	// noinspection SpellCheckingInspection
	const dir: string = path.resolve(process.cwd(), 'node_modules/@iconify/json');
	const raw = await loadJSON(path.join(dir, 'collections.json'));

	if (!raw) {
		log("Failed to load collections.json");
		return;
	}

	const collections: Array<Record<string, any>> = Object.entries(raw).map(
		([id, v]: [
			id: string,
			v: Record<string, any>
		]) => ({
			...(v as Record<string, unknown>),
			id,
		})
	);

	const outputDir: string = path.resolve(process.cwd(), 'src/components/svg-icons-picker/src/data/src');
	const outputFile: string = path.resolve(process.cwd(), 'src/components/svg-icons-picker/src/data/index.ts');
	await ensureDir(outputDir);

	const prefixList: Array<string> = [];

	for (const info of collections) {
		const data = await loadJSON(path.join(dir, 'json', `${info.id}.json`));
		if (!data) continue;

		const {prefix, icons} = data as { prefix: string; icons: Record<string, { body: string }> };
		const iconList: Array<string> = Object.keys(icons).map(icon => `${prefix}:${icon}`);

		writeFileSync(
			path.join(outputDir, `${prefix}.icons.ts`),
			`export default ${
				JSON.stringify({name: info.name, prefix, icons: iconList}, null, 4)
					.replace(/"([^"]+)":/g, '$1:')
			}`
		);

		prefixList.push(prefix);
	}

	const iconsList: string = (
		(list: string []) => {
			let data: string = '// noinspection ES6UnusedImports,SpellCheckingInspection,JSUnusedGlobalSymbols\n\n';
			list.map(item => {

				const name = item.includes('-') ? toCamelCase(item) : item;

				data += `import ${name} from \'./src/${item}.icons\';\n`;
			})

			data += '\nexport default {\n';

			list.map(item => {

				const name = item.includes('-') ? toCamelCase(item) : item;

				data += `\t${name},\n`;
			});

			data += '};';

			return data;
		}
	)(prefixList);

	writeFileSync(
		outputFile,
		iconsList,
	);

	log(`Icons generated successfully for all sets: [${prefixList.join(", ")}]`);
})();
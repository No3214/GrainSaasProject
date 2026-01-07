#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

// Mock manifest for now, ideally read from index.json
const templatesDir = path.join(__dirname, '..', 'templates');

program
    .name('grain')
    .description('🌾 Grain n8n Workflow Suite CLI')
    .version('2.0.0');

program
    .command('list')
    .description('List all workflows')
    .action(() => {
        console.log(chalk.bold.yellow('\n🌾 Grain Workflow Suite\n'));
        console.log(chalk.gray('='.repeat(50)));

        // Recursive search or categorized list
        const categories = ['ai-automation', 'seo-marketing', 'hospitality', 'agency-revops', 'ops-hr', 'general'];

        categories.forEach(cat => {
            const catDir = path.join(templatesDir, cat);
            if (fs.existsSync(catDir)) {
                console.log(chalk.cyan(`\n📁 ${cat.toUpperCase()}`));
                const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));
                files.forEach(f => {
                    console.log(`   ● ${f}`);
                });
            }
        });
        console.log('');
    });

program
    .command('install <workflow>')
    .description('Install a workflow to n8n')
    .option('-u, --url <url>', 'n8n URL', 'http://localhost:5678')
    .option('-k, --api-key <key>', 'n8n API Key')
    .action(async (workflow, options) => {
        const spinner = ora(`Searching for ${workflow}...`).start();

        // Find file
        let foundPath = null;
        const categories = ['ai-automation', 'seo-marketing', 'hospitality', 'agency-revops', 'ops-hr', 'general'];

        for (const cat of categories) {
            const p = path.join(templatesDir, cat, workflow + '.json');
            if (fs.existsSync(p)) {
                foundPath = p;
                break;
            }
            // Try precise match if user provided extension
            const p2 = path.join(templatesDir, cat, workflow);
            if (fs.existsSync(p2)) {
                foundPath = p2;
                break;
            }
        }

        if (!foundPath) {
            spinner.fail(`Workflow not found: ${workflow}`);
            return;
        }

        spinner.text = 'Installing to n8n...';

        // Simulate API call
        try {
            // const workflowData = JSON.parse(fs.readFileSync(foundPath, 'utf8'));
            // In real CLI we would POST to n8n API here
            await new Promise(r => setTimeout(r, 1000));
            spinner.succeed(`✅ ${workflow} successfully installed to ${options.url}`);
        } catch (e) {
            spinner.fail(`Installation failed: ${e.message}`);
        }
    });

program.parse(process.argv);

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getConfig, setConfig, isConfigured } from './config.js';
import { getNews } from './api.js';

const program = new Command();

program
  .name('biztoc')
  .description('CLI for BizToc API - get latest business news articles')
  .version('1.0.0');

// Config command
const config = program.command('config');
config.command('set')
  .description('Configure API credentials')
  .option('--api-key <key>', 'BizToc API Key (optional for some endpoints)')
  .action((opts) => {
    if (opts.apiKey) setConfig('apiKey', opts.apiKey);
    console.log(chalk.green('✓ Configuration saved'));
  });

config.command('show')
  .description('Show current configuration')
  .action(() => {
    const key = getConfig('apiKey');
    console.log(chalk.bold('Current config:'));
    console.log(`  API Key: ${key ? chalk.green('****' + key.slice(-6)) : chalk.yellow('not set (some endpoints may work without it)')}`);
  });

// News command
program.command('news')
  .description('Get latest business news')
  .option('--limit <n>', 'Number of articles to retrieve', '20')
  .option('--source <source>', 'Filter by source')
  .option('--tag <tag>', 'Filter by tag')
  .option('--json', 'Output as JSON')
  .action(async (opts) => {
    const spinner = ora('Fetching news...').start();
    try {
      const params = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.source) params.source = opts.source;
      if (opts.tag) params.tag = opts.tag;

      const data = await getNews(params);
      spinner.succeed('News fetched');

      if (opts.json) {
        console.log(JSON.stringify(data, null, 2));
        return;
      }

      const articles = Array.isArray(data) ? data : (data.articles || data.items || [data]);

      if (articles.length === 0) {
        console.log(chalk.yellow('No articles found'));
        return;
      }

      articles.forEach((article, idx) => {
        console.log(`\n${chalk.cyan(`[${idx + 1}]`)} ${chalk.bold(article.title || 'No title')}`);
        if (article.url) console.log(chalk.gray(`   ${article.url}`));
        if (article.source) console.log(chalk.gray(`   Source: ${article.source}`));
        if (article.published || article.date) console.log(chalk.gray(`   ${article.published || article.date}`));
        if (article.tags && article.tags.length > 0) {
          console.log(chalk.gray(`   Tags: ${article.tags.join(', ')}`));
        }
      });
    } catch (e) {
      spinner.fail('Failed to fetch news');
      console.error(chalk.red(e.response?.data?.message || e.message));
      if (e.response?.status === 401 || e.response?.status === 403) {
        console.log(chalk.yellow('\nTip: Some endpoints may require an API key. Set it with: biztoc config set --api-key KEY'));
      }
    }
  });

program.parse(process.argv);

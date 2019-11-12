const stats = require('sysstats')();

const MAX_MEM_COEF = 0.8; // use 80% of total memory for nodejs process
const TRESHOLD_COEF = 0.9; // limit cluster subprocess to 90% of 80% RAM/CPUs

const maxMem = Math.round(MAX_MEM_COEF * (stats.mem().total / (stats.cpus().length * (1024 ** 2))));
const restartMemTreshold = Math.round(maxMem * TRESHOLD_COEF);

module.exports = {
  apps: [
    {
      name: 'api',
      script: './src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,

      // @ref https://github.com/Unitech/pm2/issues/3017#issuecomment-315075000
      max_memory_restart: `${ restartMemTreshold }M`,
      node_args: `--max_old_space_size=${ maxMem }`,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

// eslint-disable-next-line no-console
console.info(JSON.stringify(module.exports.apps[0], null, '  '));

stats.unref();

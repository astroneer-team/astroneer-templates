const { spawnSync } = require('child_process')
const { readdirSync, statSync } = require('fs')
const path = require('path')

function updateDependencies(project) {
  const { dependencies } = require(path.join(project, 'package.json'))
  const _dependencies = Object.keys(dependencies).map(dependency => `${dependency}@latest`)

  spawnSync('npm', ['install', _dependencies.join(' ')], {
    cwd: project,
    stdio: 'inherit',
    shell: true
  })
}

const dir = readdirSync(process.cwd())
for (const project of dir) {
  if (project === 'node_modules') continue
  if (!statSync(project).isDirectory()) continue
  if (project.startsWith('.')) continue
  updateDependencies(path.resolve(process.cwd(), project))
}
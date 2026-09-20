var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('当前运行环境不满足本项目的版本要求:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    // 本项目的构建链停留在 webpack 2 + node-sass 4.x 时代，node-sass 的原生模块
    // 在 Node 9 及以上没有预编译产物，装依赖这一步就会失败。与其让人对着
    // node-sass 的编译错误排查半天，不如在这里把原因说清楚。
    console.log(chalk.yellow('  提示: 请使用 Node 8.x（推荐 nvm install 8 && nvm use 8）。'))
    console.log(chalk.yellow('        原因与背景见 README 的"环境要求"一节。'))
    console.log()
    process.exit(1)
  }
}

/**
 * 语法检查。
 *
 * 本项目的完整构建只能在 Node 8 上跑（webpack 2 + node-sass 4.x），
 * 而 CI 环境里装不上这套依赖，所以退一步：至少保证所有源码文件语法是合法的。
 * 这个脚本不依赖任何三方包，在现代 Node 上也能跑。
 *
 *   node build/check-syntax.js
 *
 * 检查内容：
 *   - build/ 和 config/ 下的 CommonJS 脚本
 *   - src/ 下的 ES module
 *   - .vue 文件里的 <script> 块
 *   - 所有 .json 文件能否正常解析
 */
var fs = require('fs')
var path = require('path')
var execFileSync = require('child_process').execFileSync

var ROOT = path.join(__dirname, '..')
var SKIP_DIRS = ['node_modules', 'dist', '.git', 'static']
// 第三方压缩脚本，不是本项目维护的源码，跳过
var SKIP_FILES = ['src/public/js/stomp.js', 'src/public/js/stomp-client.js']

var failures = []
var checked = 0

function walk (dir, onFile) {
  fs.readdirSync(dir).forEach(function (name) {
    var full = path.join(dir, name)
    var rel = path.relative(ROOT, full)
    if (fs.statSync(full).isDirectory()) {
      if (SKIP_DIRS.indexOf(name) === -1) {
        walk(full, onFile)
      }
    } else if (SKIP_FILES.indexOf(rel.split(path.sep).join('/')) === -1) {
      onFile(full, rel)
    }
  })
}

/** 用子进程做语法解析，避免真的执行到文件里的代码 */
function parse (source, mode, label) {
  checked++
  try {
    execFileSync(process.execPath, ['--input-type=' + mode, '--check'], {
      input: source,
      stdio: ['pipe', 'pipe', 'pipe']
    })
  } catch (e) {
    failures.push(label + '\n    ' + String(e.stderr || e.message).trim().split('\n')[0])
  }
}

walk(ROOT, function (full, rel) {
  var ext = path.extname(full)
  var source

  if (ext === '.json') {
    checked++
    try {
      JSON.parse(fs.readFileSync(full, 'utf8'))
    } catch (e) {
      failures.push(rel + '\n    ' + e.message)
    }
    return
  }

  if (ext === '.js') {
    source = fs.readFileSync(full, 'utf8')
    // build/ 和 config/ 是给 Node 直接 require 的 CommonJS，src/ 走 ESM
    var isCommonJs = rel.indexOf('build' + path.sep) === 0 || rel.indexOf('config' + path.sep) === 0
    parse(source, isCommonJs ? 'commonjs' : 'module', rel)
    return
  }

  if (ext === '.vue') {
    source = fs.readFileSync(full, 'utf8')
    var match = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)
    if (match) {
      parse(match[1], 'module', rel + ' (<script>)')
    }
  }
})

if (failures.length) {
  console.error('\n语法检查未通过：\n')
  failures.forEach(function (f) {
    console.error('  ✗ ' + f)
  })
  console.error('\n共检查 ' + checked + ' 个文件，' + failures.length + ' 个失败。\n')
  process.exit(1)
}

console.log('语法检查通过，共检查 ' + checked + ' 个文件。')

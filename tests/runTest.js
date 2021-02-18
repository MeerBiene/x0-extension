const { version } = require('../package.json')

const manifest = require('../js_version/manifest.json')

const showError = (msg, code = 1) => {
  console.log(msg)
  process.exit(code)
}

manifest.version != version
  ? showError('Manifest and package version do not match.')
  : process.exit(0)

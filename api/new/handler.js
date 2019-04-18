const os = require('os')
const path = require('path')
const archiver = require('archiver')
const cli = require('@koopjs/cli')

const isValidSpec = require('./is-valid-spec')

module.exports = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'no Koop app specification provided'
    })
  }

  const spec = req.body

  if (!isValidSpec(spec)) {
    return res.status(400).json({
      message: 'Koop app specification is invalid'
    })
  }

  const temp = os.tmpdir()

  try {
    await cli.new(temp, spec.type, spec.name, {
      config: spec.config,
      skipGit: true,
      skipInstall: true
    })

    const appPath = path.join(temp, spec.name)

    if (Array.isArray(spec.plugins)) {
      for (const plugin of spec.plugins) {
        await cli.add(appPath, plugin.type, plugin.name, {
          skipInstall: true
        })
      }
    }

    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    archive.pipe(res)
    archive.directory(`${appPath}/`, spec.name)
    archive.finalize()
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

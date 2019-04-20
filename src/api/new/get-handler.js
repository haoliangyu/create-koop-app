const os = require('os')
const path = require('path')
const archiver = require('archiver')
const cli = require('@koopjs/cli')

module.exports = async (req, res) => {
  const temp = os.tmpdir()

  try {
    const appPath = path.join(temp, req.params.name)

    await cli.new(temp, req.params.type, req.params.name, {
      skipGit: true,
      skipInstall: true
    })

    res.set('Content-Type', 'application/zip')
    res.set('Content-Disposition', `attachment; filename=${req.params.name}.zip`)

    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    archive.pipe(res)
    archive.directory(`${appPath}/`, req.params.name)
    archive.finalize()
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

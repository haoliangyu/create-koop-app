module.exports = (spec) => {
  if (!spec.name || !spec.type) {
    return false
  }

  if (Array.isArray(spec.plugins)) {
    for (const plugin of spec.plugins) {
      if (!plugin.name || !plugin.type) {
        return false
      }
    }
  }

  return true
}

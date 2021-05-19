module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'My Awesome Company'
      }
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    }
  ]
}

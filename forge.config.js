module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Alpha018',
          name: 'hue-csgo-reload'
        }
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    }
  ]
}

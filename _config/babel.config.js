module.exports = {
  plugins: ["lodash"],
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: { esmodules: true },
        polyfills: []
      }
    ]
  ]
}

/**
 * Hi, astroneer! 👋
 *
 * This is an astroneer config file. You can use it to configure astroneer.
 *
 * Astroneer is currently in development so some customizations are not available yet.
 * You can learn more about astroneer at https://astroneer.dev/
 *
 * If you need to change the default compiler (ESBuild) to another one, keep in mind that you'll loose the bundle optimization feature.
 */
const { defineConfig } = require('@astroneer/config');

module.exports = defineConfig({
  compiler: {
    type: 'swc',
  },
});

#!/usr/bin/env node

const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/start.js')

const createDevServerConfig = defaults.__get__('createDevServerConfig')
defaults.__set__('createDevServerConfig', (...args) => ({
    ...createDevServerConfig(...args),
    writeToDisk: true,
}))
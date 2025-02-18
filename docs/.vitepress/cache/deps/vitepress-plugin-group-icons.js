import {
  createFilter,
  require_assert,
  require_buffer,
  require_child_process,
  require_crypto,
  require_http,
  require_https,
  require_main,
  require_module,
  require_net,
  require_node_assert,
  require_node_buffer,
  require_node_child_process,
  require_node_crypto,
  require_node_dns,
  require_node_events,
  require_node_readline,
  require_node_stream,
  require_node_string_decoder,
  require_node_util,
  require_node_v8,
  require_node_worker_threads,
  require_node_zlib,
  require_querystring,
  require_tls,
  require_zlib,
} from './chunk-GHKL7M7S.js'
import { require_url } from './chunk-NLSDCWQO.js'
import { require_events, require_node_os, require_os, require_stream, require_util } from './chunk-GN57YAIH.js'
import { require_fs } from './chunk-QZAH7VNE.js'
import { require_node_fs, require_node_perf_hooks, require_promises, require_tty } from './chunk-RCZZDYYZ.js'
import { require_path } from './chunk-LXBZCEIU.js'
import { require_node_http } from './chunk-MM644HQJ.js'
import { require_node_https } from './chunk-NZWVDDZC.js'
import { require_node_module, require_node_url } from './chunk-J74MCUS5.js'
import { require_node_path } from './chunk-OYZR2EBP.js'
import { __commonJS, __toESM } from './chunk-SNAQBZPT.js'

// ../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  '../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js'(exports, module) {
    var s = 1e3
    var m = s * 60
    var h = m * 60
    var d = h * 24
    var w = d * 7
    var y = d * 365.25
    module.exports = function (val, options) {
      options = options || {}
      var type = typeof val
      if (type === 'string' && val.length > 0) {
        return parse(val)
      } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val)
      }
      throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
    }
    function parse(str) {
      str = String(str)
      if (str.length > 100) {
        return
      }
      var match =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str,
        )
      if (!match) {
        return
      }
      var n = parseFloat(match[1])
      var type = (match[2] || 'ms').toLowerCase()
      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y
        case 'weeks':
        case 'week':
        case 'w':
          return n * w
        case 'days':
        case 'day':
        case 'd':
          return n * d
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n
        default:
          return void 0
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms)
      if (msAbs >= d) {
        return Math.round(ms / d) + 'd'
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + 'h'
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + 'm'
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + 's'
      }
      return ms + 'ms'
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms)
      if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day')
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour')
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute')
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second')
      }
      return ms + ' ms'
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5
      return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '')
    }
  },
})

// ../node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/common.js
var require_common = __commonJS({
  '../node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/common.js'(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug
      createDebug.default = createDebug
      createDebug.coerce = coerce
      createDebug.disable = disable
      createDebug.enable = enable
      createDebug.enabled = enabled
      createDebug.humanize = require_ms()
      createDebug.destroy = destroy
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key]
      })
      createDebug.names = []
      createDebug.skips = []
      createDebug.formatters = {}
      function selectColor(namespace) {
        let hash = 0
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i)
          hash |= 0
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length]
      }
      createDebug.selectColor = selectColor
      function createDebug(namespace) {
        let prevTime
        let enableOverride = null
        let namespacesCache
        let enabledCache
        function debug3(...args) {
          if (!debug3.enabled) {
            return
          }
          const self = debug3
          const curr = Number(/* @__PURE__ */ new Date())
          const ms = curr - (prevTime || curr)
          self.diff = ms
          self.prev = prevTime
          self.curr = curr
          prevTime = curr
          args[0] = createDebug.coerce(args[0])
          if (typeof args[0] !== 'string') {
            args.unshift('%O')
          }
          let index = 0
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === '%%') {
              return '%'
            }
            index++
            const formatter = createDebug.formatters[format]
            if (typeof formatter === 'function') {
              const val = args[index]
              match = formatter.call(self, val)
              args.splice(index, 1)
              index--
            }
            return match
          })
          createDebug.formatArgs.call(self, args)
          const logFn = self.log || createDebug.log
          logFn.apply(self, args)
        }
        debug3.namespace = namespace
        debug3.useColors = createDebug.useColors()
        debug3.color = createDebug.selectColor(namespace)
        debug3.extend = extend
        debug3.destroy = createDebug.destroy
        Object.defineProperty(debug3, 'enabled', {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces
              enabledCache = createDebug.enabled(namespace)
            }
            return enabledCache
          },
          set: (v) => {
            enableOverride = v
          },
        })
        if (typeof createDebug.init === 'function') {
          createDebug.init(debug3)
        }
        return debug3
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace)
        newDebug.log = this.log
        return newDebug
      }
      function enable(namespaces) {
        createDebug.save(namespaces)
        createDebug.namespaces = namespaces
        createDebug.names = []
        createDebug.skips = []
        const split = (typeof namespaces === 'string' ? namespaces : '')
          .trim()
          .replace(' ', ',')
          .split(',')
          .filter(Boolean)
        for (const ns of split) {
          if (ns[0] === '-') {
            createDebug.skips.push(ns.slice(1))
          } else {
            createDebug.names.push(ns)
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0
        let templateIndex = 0
        let starIndex = -1
        let matchIndex = 0
        while (searchIndex < search.length) {
          if (
            templateIndex < template.length &&
            (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')
          ) {
            if (template[templateIndex] === '*') {
              starIndex = templateIndex
              matchIndex = searchIndex
              templateIndex++
            } else {
              searchIndex++
              templateIndex++
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1
            matchIndex++
            searchIndex = matchIndex
          } else {
            return false
          }
        }
        while (templateIndex < template.length && template[templateIndex] === '*') {
          templateIndex++
        }
        return templateIndex === template.length
      }
      function disable() {
        const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => '-' + namespace)].join(',')
        createDebug.enable('')
        return namespaces
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true
          }
        }
        return false
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message
        }
        return val
      }
      function destroy() {
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
        )
      }
      createDebug.enable(createDebug.load())
      return createDebug
    }
    module.exports = setup
  },
})

// ../node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  '../node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/browser.js'(exports, module) {
    exports.formatArgs = formatArgs
    exports.save = save
    exports.load = load
    exports.useColors = useColors
    exports.storage = localstorage()
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false
      return () => {
        if (!warned) {
          warned = true
          console.warn(
            'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
          )
        }
      }
    })()
    exports.colors = [
      '#0000CC',
      '#0000FF',
      '#0033CC',
      '#0033FF',
      '#0066CC',
      '#0066FF',
      '#0099CC',
      '#0099FF',
      '#00CC00',
      '#00CC33',
      '#00CC66',
      '#00CC99',
      '#00CCCC',
      '#00CCFF',
      '#3300CC',
      '#3300FF',
      '#3333CC',
      '#3333FF',
      '#3366CC',
      '#3366FF',
      '#3399CC',
      '#3399FF',
      '#33CC00',
      '#33CC33',
      '#33CC66',
      '#33CC99',
      '#33CCCC',
      '#33CCFF',
      '#6600CC',
      '#6600FF',
      '#6633CC',
      '#6633FF',
      '#66CC00',
      '#66CC33',
      '#9900CC',
      '#9900FF',
      '#9933CC',
      '#9933FF',
      '#99CC00',
      '#99CC33',
      '#CC0000',
      '#CC0033',
      '#CC0066',
      '#CC0099',
      '#CC00CC',
      '#CC00FF',
      '#CC3300',
      '#CC3333',
      '#CC3366',
      '#CC3399',
      '#CC33CC',
      '#CC33FF',
      '#CC6600',
      '#CC6633',
      '#CC9900',
      '#CC9933',
      '#CCCC00',
      '#CCCC33',
      '#FF0000',
      '#FF0033',
      '#FF0066',
      '#FF0099',
      '#FF00CC',
      '#FF00FF',
      '#FF3300',
      '#FF3333',
      '#FF3366',
      '#FF3399',
      '#FF33CC',
      '#FF33FF',
      '#FF6600',
      '#FF6633',
      '#FF9900',
      '#FF9933',
      '#FFCC00',
      '#FFCC33',
    ]
    function useColors() {
      if (
        typeof window !== 'undefined' &&
        window.process &&
        (window.process.type === 'renderer' || window.process.__nwjs)
      ) {
        return true
      }
      if (
        typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false
      }
      let m
      return (
        (typeof document !== 'undefined' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) || // Is firebug? http://stackoverflow.com/a/398120/376773
        (typeof window !== 'undefined' &&
          window.console &&
          (window.console.firebug || (window.console.exception && window.console.table))) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
          parseInt(m[1], 10) >= 31) || // Double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      )
    }
    function formatArgs(args) {
      args[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        args[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        module.exports.humanize(this.diff)
      if (!this.useColors) {
        return
      }
      const c = 'color: ' + this.color
      args.splice(1, 0, c, 'color: inherit')
      let index = 0
      let lastC = 0
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === '%%') {
          return
        }
        index++
        if (match === '%c') {
          lastC = index
        }
      })
      args.splice(lastC, 0, c)
    }
    exports.log = console.debug || console.log || (() => {})
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem('debug', namespaces)
        } else {
          exports.storage.removeItem('debug')
        }
      } catch (error) {}
    }
    function load() {
      let r
      try {
        r = exports.storage.getItem('debug')
      } catch (error) {}
      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG
      }
      return r
    }
    function localstorage() {
      try {
        return localStorage
      } catch (error) {}
    }
    module.exports = require_common()(exports)
    var { formatters } = module.exports
    formatters.j = function (v) {
      try {
        return JSON.stringify(v)
      } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message
      }
    }
  },
})

// ../node_modules/.pnpm/vitepress-plugin-group-icons@1.3.5/node_modules/vitepress-plugin-group-icons/dist/index.mjs
var import_node_fs2 = __toESM(require_node_fs(), 1)
var import_node_path2 = __toESM(require_node_path(), 1)
var import_node_url2 = __toESM(require_node_url(), 1)

// ../node_modules/.pnpm/vite@5.4.10_@types+node@18.19.50_sass@1.83.4/node_modules/vite/dist/node/index.js
var import_esbuild = __toESM(require_main())
var import_node_fs = __toESM(require_node_fs())

// ../node_modules/.pnpm/vite@5.4.10_@types+node@18.19.50_sass@1.83.4/node_modules/vite/dist/node/runtime.js
var SOURCEMAPPING_URL = 'sourceMa'
SOURCEMAPPING_URL += 'ppingURL'
var isWindows = typeof process < 'u' && process.platform === 'win32'
var AsyncFunction = async function () {}.constructor
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var intToChar = new Uint8Array(64)
var charToInt = new Uint8Array(128)
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i)
  ;(intToChar[i] = c), (charToInt[c] = i)
}
var VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(`//# ${SOURCEMAPPING_URL}=data:application/json;base64,(.+)`)
var retrieveFileHandlers = /* @__PURE__ */ new Set()
var retrieveSourceMapHandlers = /* @__PURE__ */ new Set()
var createExecHandlers =
  (handlers) =>
  (...args) => {
    for (const handler of handlers) {
      const result = handler(...args)
      if (result) return result
    }
    return null
  }
var retrieveFileFromHandlers = createExecHandlers(retrieveFileHandlers)
var retrieveSourceMapFromHandlers = createExecHandlers(retrieveSourceMapHandlers)
var originalPrepare = Error.prepareStackTrace

// ../node_modules/.pnpm/vite@5.4.10_@types+node@18.19.50_sass@1.83.4/node_modules/vite/dist/node/index.js
var import_promises = __toESM(require_promises())
var import_node_path = __toESM(require_node_path())
var import_node_url = __toESM(require_node_url())
var import_node_util = __toESM(require_node_util())
var import_node_perf_hooks = __toESM(require_node_perf_hooks())
var import_node_module = __toESM(require_node_module())
var import_tty = __toESM(require_tty())
var import_path = __toESM(require_path())
var import_fs = __toESM(require_fs())
var import_node_events = __toESM(require_node_events())
var import_node_stream = __toESM(require_node_stream())
var import_node_string_decoder = __toESM(require_node_string_decoder())
var import_node_child_process = __toESM(require_node_child_process())
var import_node_http = __toESM(require_node_http())
var import_node_https = __toESM(require_node_https())
var import_util = __toESM(require_util())
var import_net = __toESM(require_net())
var import_events = __toESM(require_events())
var import_url = __toESM(require_url())
var import_http = __toESM(require_http())
var import_stream = __toESM(require_stream())
var import_os = __toESM(require_os())
var import_child_process = __toESM(require_child_process())
var import_node_os = __toESM(require_node_os())
var import_node_crypto = __toESM(require_node_crypto())
var import_node_dns = __toESM(require_node_dns())
var import_crypto = __toESM(require_crypto())
var import_module = __toESM(require_module())
var import_node_assert = __toESM(require_node_assert())
var import_node_v8 = __toESM(require_node_v8())
var import_node_worker_threads = __toESM(require_node_worker_threads())
var import_node_buffer = __toESM(require_node_buffer())
var import_querystring = __toESM(require_querystring())
var import_node_readline = __toESM(require_node_readline())
var import_zlib = __toESM(require_zlib())
var import_buffer = __toESM(require_buffer())
var import_https = __toESM(require_https())
var import_tls = __toESM(require_tls())
var import_assert = __toESM(require_assert())
var import_node_zlib = __toESM(require_node_zlib())

// ../node_modules/.pnpm/vitepress-plugin-group-icons@1.3.5/node_modules/vitepress-plugin-group-icons/dist/index.mjs
var import_node_module2 = __toESM(require_node_module(), 1)

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon/defaults.mjs
var defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
})
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false,
})
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations,
})
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: '',
  hidden: false,
})

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/customisations/defaults.mjs
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null,
})
var defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations,
})

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon/transformations.mjs
function mergeIconTransformations(obj1, obj2) {
  const result = {}
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4
  if (rotate) {
    result.rotate = rotate
  }
  return result
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon/merge.mjs
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child)
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key]
      }
    } else if (key in child) {
      result[key] = child[key]
    } else if (key in parent) {
      result[key] = parent[key]
    }
  }
  return result
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon-set/tree.mjs
function getIconsTree(data, names) {
  const icons = data.icons
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null)
  const resolved = /* @__PURE__ */ Object.create(null)
  function resolve2(name) {
    if (icons[name]) {
      return (resolved[name] = [])
    }
    if (!(name in resolved)) {
      resolved[name] = null
      const parent = aliases[name] && aliases[name].parent
      const value = parent && resolve2(parent)
      if (value) {
        resolved[name] = [parent].concat(value)
      }
    }
    return resolved[name]
  }
  ;(names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve2)
  return resolved
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon-set/get-icon.mjs
function internalGetIconData(data, name, tree) {
  const icons = data.icons
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null)
  let currentProps = {}
  function parse(name2) {
    currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps)
  }
  parse(name)
  tree.forEach(parse)
  return mergeIconData(data, currentProps)
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, [])
  }
  const tree = getIconsTree(data, [name])[name]
  return tree ? internalGetIconData(data, name, tree) : null
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon-set/validate-basic.mjs
var optionalPropertyDefaults = {
  provider: '',
  aliases: {},
  not_found: {},
  ...defaultIconDimensions,
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/icon-set/get-icons.mjs
var propsToCopy = Object.keys(defaultIconDimensions).concat(['provider'])

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/size.mjs
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size
  }
  precision = precision || 100
  if (typeof size === 'number') {
    return Math.ceil(size * ratio * precision) / precision
  }
  if (typeof size !== 'string') {
    return size
  }
  const oldParts = size.split(unitsSplit)
  if (oldParts === null || !oldParts.length) {
    return size
  }
  const newParts = []
  let code = oldParts.shift()
  let isNumber = unitsTest.test(code)
  while (true) {
    if (isNumber) {
      const num = parseFloat(code)
      if (isNaN(num)) {
        newParts.push(code)
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision)
      }
    } else {
      newParts.push(code)
    }
    code = oldParts.shift()
    if (code === void 0) {
      return newParts.join('')
    }
    isNumber = !isNumber
  }
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/defs.mjs
function splitSVGDefs(content, tag = 'defs') {
  let defs = ''
  const index = content.indexOf('<' + tag)
  while (index >= 0) {
    const start = content.indexOf('>', index)
    const end = content.indexOf('</' + tag)
    if (start === -1 || end === -1) {
      break
    }
    const endEnd = content.indexOf('>', end)
    if (endEnd === -1) {
      break
    }
    defs += content.slice(start + 1, end).trim()
    content = content.slice(0, index).trim() + content.slice(endEnd + 1)
  }
  return {
    defs,
    content,
  }
}
function mergeDefsAndContent(defs, content) {
  return defs ? '<defs>' + defs + '</defs>' + content : content
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body)
  return mergeDefsAndContent(split.defs, start + split.content + end)
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/build.mjs
var isUnsetKeyword = (value) => value === 'unset' || value === 'undefined' || value === 'none'
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon,
  }
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations,
  }
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height,
  }
  let body = fullIcon.body
  ;[fullIcon, fullCustomisations].forEach((props) => {
    const transformations = []
    const hFlip = props.hFlip
    const vFlip = props.vFlip
    let rotation = props.rotate
    if (hFlip) {
      if (vFlip) {
        rotation += 2
      } else {
        transformations.push('translate(' + (box.width + box.left).toString() + ' ' + (0 - box.top).toString() + ')')
        transformations.push('scale(-1 1)')
        box.top = box.left = 0
      }
    } else if (vFlip) {
      transformations.push('translate(' + (0 - box.left).toString() + ' ' + (box.height + box.top).toString() + ')')
      transformations.push('scale(1 -1)')
      box.top = box.left = 0
    }
    let tempValue
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4
    }
    rotation = rotation % 4
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top
        transformations.unshift('rotate(90 ' + tempValue.toString() + ' ' + tempValue.toString() + ')')
        break
      case 2:
        transformations.unshift(
          'rotate(180 ' + (box.width / 2 + box.left).toString() + ' ' + (box.height / 2 + box.top).toString() + ')',
        )
        break
      case 3:
        tempValue = box.width / 2 + box.left
        transformations.unshift('rotate(-90 ' + tempValue.toString() + ' ' + tempValue.toString() + ')')
        break
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left
        box.left = box.top
        box.top = tempValue
      }
      if (box.width !== box.height) {
        tempValue = box.width
        box.width = box.height
        box.height = tempValue
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(body, '<g transform="' + transformations.join(' ') + '">', '</g>')
    }
  })
  const customisationsWidth = fullCustomisations.width
  const customisationsHeight = fullCustomisations.height
  const boxWidth = box.width
  const boxHeight = box.height
  let width
  let height
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? '1em' : customisationsHeight === 'auto' ? boxHeight : customisationsHeight
    width = calculateSize(height, boxWidth / boxHeight)
  } else {
    width = customisationsWidth === 'auto' ? boxWidth : customisationsWidth
    height =
      customisationsHeight === null
        ? calculateSize(width, boxHeight / boxWidth)
        : customisationsHeight === 'auto'
          ? boxHeight
          : customisationsHeight
  }
  const attributes = {}
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString()
    }
  }
  setAttr('width', width)
  setAttr('height', height)
  const viewBox = [box.left, box.top, boxWidth, boxHeight]
  attributes.viewBox = viewBox.join(' ')
  return {
    attributes,
    viewBox,
    body,
  }
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/id.mjs
var randomPrefix = 'IconifyId' + Date.now().toString(16) + ((Math.random() * 16777216) | 0).toString(16)

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/url.mjs
function encodeSVGforURL(svg) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/encode-svg-for-css.mjs
function encodeSvgForCss(svg) {
  let useSvg = svg.startsWith('<svg>') ? svg.replace('<svg>', '<svg >') : svg
  if (!useSvg.includes(' xmlns:xlink=') && useSvg.includes(' xlink:')) {
    useSvg = useSvg.replace('<svg ', '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
  }
  if (!useSvg.includes(' xmlns=')) {
    useSvg = useSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
  }
  return encodeSVGforURL(useSvg)
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/svg/html.mjs
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"'
  for (const attr in attributes) {
    renderAttribsHTML += ' ' + attr + '="' + attributes[attr] + '"'
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + '>' + body + '</svg>'
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/colors/keywords.mjs
var colorKeywords = {
  transparent: {
    type: 'transparent',
  },
  none: {
    type: 'none',
  },
  currentcolor: {
    type: 'current',
  },
}
function add(keyword, colors) {
  const type = 'rgb'
  const r = colors[0]
  const length = colors.length
  colorKeywords[keyword] = {
    type,
    r,
    g: length > 1 ? colors[1] : r,
    b: length > 2 ? colors[2] : r,
    alpha: length > 3 ? colors[3] : 1,
  }
}
add('silver', [192])
add('gray', [128])
add('white', [255])
add('maroon', [128, 0, 0])
add('red', [255, 0, 0])
add('purple', [128, 0])
add('fuchsia', [255, 0])
add('green', [0, 128])
add('lime', [0, 255])
add('olive', [128, 128, 0])
add('yellow', [255, 255, 0])
add('navy', [0, 0, 128])
add('blue', [0, 0, 255])
add('teal', [0, 128, 128])
add('aqua', [0, 255, 255])
add('aliceblue', [240, 248, 255])
add('antiquewhite', [250, 235, 215])
add('aqua', [0, 255, 255])
add('aquamarine', [127, 255, 212])
add('azure', [240, 255, 255])
add('beige', [245, 245, 220])
add('bisque', [255, 228, 196])
add('black', [0])
add('blanchedalmond', [255, 235, 205])
add('blue', [0, 0, 255])
add('blueviolet', [138, 43, 226])
add('brown', [165, 42, 42])
add('burlywood', [222, 184, 135])
add('cadetblue', [95, 158, 160])
add('chartreuse', [127, 255, 0])
add('chocolate', [210, 105, 30])
add('coral', [255, 127, 80])
add('cornflowerblue', [100, 149, 237])
add('cornsilk', [255, 248, 220])
add('crimson', [220, 20, 60])
add('cyan', [0, 255, 255])
add('darkblue', [0, 0, 139])
add('darkcyan', [0, 139, 139])
add('darkgoldenrod', [184, 134, 11])
add('darkgray', [169])
add('darkgreen', [0, 100])
add('darkgrey', [169])
add('darkkhaki', [189, 183, 107])
add('darkmagenta', [139, 0])
add('darkolivegreen', [85, 107, 47])
add('darkorange', [255, 140, 0])
add('darkorchid', [153, 50, 204])
add('darkred', [139, 0, 0])
add('darksalmon', [233, 150, 122])
add('darkseagreen', [143, 188])
add('darkslateblue', [72, 61, 139])
add('darkslategray', [47, 79, 79])
add('darkslategrey', [47, 79, 79])
add('darkturquoise', [0, 206, 209])
add('darkviolet', [148, 0, 211])
add('deeppink', [255, 20, 147])
add('deepskyblue', [0, 191, 255])
add('dimgray', [105])
add('dimgrey', [105])
add('dodgerblue', [30, 144, 255])
add('firebrick', [178, 34, 34])
add('floralwhite', [255, 250, 240])
add('forestgreen', [34, 139])
add('fuchsia', [255, 0])
add('gainsboro', [220])
add('ghostwhite', [248, 248, 255])
add('gold', [255, 215, 0])
add('goldenrod', [218, 165, 32])
add('gray', [128])
add('green', [0, 128])
add('greenyellow', [173, 255, 47])
add('grey', [128])
add('honeydew', [240, 255])
add('hotpink', [255, 105, 180])
add('indianred', [205, 92, 92])
add('indigo', [75, 0, 130])
add('ivory', [255, 255, 240])
add('khaki', [240, 230, 140])
add('lavender', [230, 230, 250])
add('lavenderblush', [255, 240, 245])
add('lawngreen', [124, 252, 0])
add('lemonchiffon', [255, 250, 205])
add('lightblue', [173, 216, 230])
add('lightcoral', [240, 128, 128])
add('lightcyan', [224, 255, 255])
add('lightgoldenrodyellow', [250, 250, 210])
add('lightgray', [211])
add('lightgreen', [144, 238])
add('lightgrey', [211])
add('lightpink', [255, 182, 193])
add('lightsalmon', [255, 160, 122])
add('lightseagreen', [32, 178, 170])
add('lightskyblue', [135, 206, 250])
add('lightslategray', [119, 136, 153])
add('lightslategrey', [119, 136, 153])
add('lightsteelblue', [176, 196, 222])
add('lightyellow', [255, 255, 224])
add('lime', [0, 255])
add('limegreen', [50, 205])
add('linen', [250, 240, 230])
add('magenta', [255, 0])
add('maroon', [128, 0, 0])
add('mediumaquamarine', [102, 205, 170])
add('mediumblue', [0, 0, 205])
add('mediumorchid', [186, 85, 211])
add('mediumpurple', [147, 112, 219])
add('mediumseagreen', [60, 179, 113])
add('mediumslateblue', [123, 104, 238])
add('mediumspringgreen', [0, 250, 154])
add('mediumturquoise', [72, 209, 204])
add('mediumvioletred', [199, 21, 133])
add('midnightblue', [25, 25, 112])
add('mintcream', [245, 255, 250])
add('mistyrose', [255, 228, 225])
add('moccasin', [255, 228, 181])
add('navajowhite', [255, 222, 173])
add('navy', [0, 0, 128])
add('oldlace', [253, 245, 230])
add('olive', [128, 128, 0])
add('olivedrab', [107, 142, 35])
add('orange', [255, 165, 0])
add('orangered', [255, 69, 0])
add('orchid', [218, 112, 214])
add('palegoldenrod', [238, 232, 170])
add('palegreen', [152, 251])
add('paleturquoise', [175, 238, 238])
add('palevioletred', [219, 112, 147])
add('papayawhip', [255, 239, 213])
add('peachpuff', [255, 218, 185])
add('peru', [205, 133, 63])
add('pink', [255, 192, 203])
add('plum', [221, 160])
add('powderblue', [176, 224, 230])
add('purple', [128, 0])
add('rebeccapurple', [102, 51, 153])
add('red', [255, 0, 0])
add('rosybrown', [188, 143, 143])
add('royalblue', [65, 105, 225])
add('saddlebrown', [139, 69, 19])
add('salmon', [250, 128, 114])
add('sandybrown', [244, 164, 96])
add('seagreen', [46, 139, 87])
add('seashell', [255, 245, 238])
add('sienna', [160, 82, 45])
add('silver', [192])
add('skyblue', [135, 206, 235])
add('slateblue', [106, 90, 205])
add('slategray', [112, 128, 144])
add('slategrey', [112, 128, 144])
add('snow', [255, 250, 250])
add('springgreen', [0, 255, 127])
add('steelblue', [70, 130, 180])
add('tan', [210, 180, 140])
add('teal', [0, 128, 128])
add('thistle', [216, 191])
add('tomato', [255, 99, 71])
add('turquoise', [64, 224, 208])
add('violet', [238, 130])
add('wheat', [245, 222, 179])
add('white', [255])
add('whitesmoke', [245])
add('yellow', [255, 255, 0])
add('yellowgreen', [154, 205, 50])

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/css/icons.mjs
var commonSelector = '.icon--{prefix}'
var iconSelector = '.icon--{prefix}--{name}'
var defaultSelectors = {
  commonSelector,
  iconSelector,
  overrideSelector: commonSelector + iconSelector,
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/loader/custom.mjs
var import_debug = __toESM(require_browser(), 1)
var debug = (0, import_debug.default)('@iconify-loader:custom')

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/loader/modern.mjs
var import_debug2 = __toESM(require_browser(), 1)
var debug2 = (0, import_debug2.default)('@iconify-loader:icon')

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/loader/loader.mjs
var import_debug3 = __toESM(require_browser(), 1)

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/emoji/format.mjs
var defaultUnicodeOptions = {
  prefix: '',
  separator: '',
  case: 'lower',
  format: 'utf-32',
  add0: false,
  throwOnError: true,
}
var defaultSequenceOptions = {
  ...defaultUnicodeOptions,
  separator: '-',
}

// ../node_modules/.pnpm/@iconify+utils@2.2.1/node_modules/@iconify/utils/lib/index.mjs
var import_debug4 = __toESM(require_browser(), 1)

// ../node_modules/.pnpm/vitepress-plugin-group-icons@1.3.5/node_modules/vitepress-plugin-group-icons/dist/index.mjs
function localIconLoader(url, path) {
  return (0, import_node_fs2.readFileSync)(
    (0, import_node_path2.resolve)((0, import_node_path2.dirname)((0, import_node_url2.fileURLToPath)(url)), path),
    'utf-8',
  )
}
function groupIconMdPlugin(md, options) {
  const _options = options || { titleBar: { includeSnippet: false } }
  const labelRE = /<label\b(?![^>]+\bdata-title\b)[^>]*>(.*?)<\/label>/g
  const codeGroupOpenRule = md.renderer.rules['container_code-group_open']
  if (codeGroupOpenRule) {
    md.renderer.rules['container_code-group_open'] = (...args) => {
      return codeGroupOpenRule(...args).replace(
        labelRE,
        (match, label) => `<label data-title="${md.utils.escapeHtml(label)}"${match.slice(6)}`,
      )
    }
  }
  const fenceRule = md.renderer.rules.fence
  if (fenceRule) {
    md.renderer.rules.fence = (...args) => {
      const [tokens, idx] = args
      const token = tokens[idx]
      let isOnCodeGroup = false
      for (let i = idx - 1; i >= 0; i--) {
        if (tokens[i].type === 'container_code-group_open') {
          isOnCodeGroup = true
          break
        }
        if (tokens[i].type === 'container_code-group_close') {
          break
        }
      }
      const title = token.info.match(/\[(.*?)\]/)
      const isIncludedSnippet = _options.titleBar.includeSnippet
      if (!isOnCodeGroup && title && (!token.src || isIncludedSnippet)) {
        return `<div class="vp-code-block-title">
      <div class="vp-code-block-title-bar">
          <span class="vp-code-block-title-text" data-title="${md.utils.escapeHtml(title[1])}">${title[1]}</span>
      </div>
        ${fenceRule(...args)}
      </div>
      `
      }
      return fenceRule(...args)
    }
  }
}
var builtinIcons = {
  // package managers
  pnpm: 'vscode-icons:file-type-light-pnpm',
  npm: 'vscode-icons:file-type-npm',
  yarn: 'vscode-icons:file-type-yarn',
  bun: 'vscode-icons:file-type-bun',
  deno: 'vscode-icons:file-type-deno',
  // frameworks
  vue: 'vscode-icons:file-type-vue',
  svelte: 'vscode-icons:file-type-svelte',
  angular: 'vscode-icons:file-type-angular',
  react: 'vscode-icons:file-type-reactjs',
  next: 'vscode-icons:file-type-light-next',
  nuxt: 'vscode-icons:file-type-nuxt',
  solid: 'logos:solidjs-icon',
  astro: 'vscode-icons:file-type-light-astro',
  // bundlers
  rollup: 'vscode-icons:file-type-rollup',
  webpack: 'vscode-icons:file-type-webpack',
  vite: 'vscode-icons:file-type-vite',
  esbuild: 'vscode-icons:file-type-esbuild',
  // configuration files
  'package.json': 'vscode-icons:file-type-node',
  'tsconfig.json': 'vscode-icons:file-type-tsconfig',
  '.npmrc': 'vscode-icons:file-type-npm',
  '.editorconfig': 'vscode-icons:file-type-editorconfig',
  '.eslintrc': 'vscode-icons:file-type-eslint',
  '.eslintignore': 'vscode-icons:file-type-eslint',
  'eslint.config': 'vscode-icons:file-type-eslint',
  '.gitignore': 'vscode-icons:file-type-git',
  '.gitattributes': 'vscode-icons:file-type-git',
  '.env': 'vscode-icons:file-type-dotenv',
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.vscode': 'vscode-icons:file-type-vscode',
  'tailwind.config': 'vscode-icons:file-type-tailwind',
  'uno.config': 'vscode-icons:file-type-unocss',
  'unocss.config': 'vscode-icons:file-type-unocss',
  '.oxlintrc': 'vscode-icons:file-type-oxlint',
  // filename extensions
  '.ts': 'vscode-icons:file-type-typescript',
  '.tsx': 'vscode-icons:file-type-typescript',
  '.mjs': 'vscode-icons:file-type-js',
  '.cjs': 'vscode-icons:file-type-js',
  '.json': 'vscode-icons:file-type-json',
  '.js': 'vscode-icons:file-type-js',
  '.jsx': 'vscode-icons:file-type-js',
  '.md': 'vscode-icons:file-type-markdown',
  '.py': 'vscode-icons:file-type-python',
  '.ico': 'vscode-icons:file-type-favicon',
  '.html': 'vscode-icons:file-type-html',
  '.css': 'vscode-icons:file-type-css',
  '.scss': 'vscode-icons:file-type-scss',
  '.yml': 'vscode-icons:file-type-light-yaml',
  '.yaml': 'vscode-icons:file-type-light-yaml',
}
async function generateCSS(labels, options) {
  const baseCSS = `
.vp-code-block-title [data-title]::before,
.vp-code-group [data-title]::before {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  margin-bottom: -0.2em;
  background: var(--icon) no-repeat center / contain;
}

.vp-code-block-title-bar {
  position: relative;
  margin: 16px -24px 0 -24px;
  background-color: var(--vp-code-block-bg);
  overflow-x: auto;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-code-tab-text-color);
  white-space: nowrap;
  transition: background-color 0.5s;
  border-radius: 8px 8px 0 0;
  padding:0 12px;
  box-shadow: inset 0 -1px var(--vp-code-tab-divider);
}

.custom-block .vp-code-block-title-bar {
  margin: 16px 0 0 0;
}

@media (min-width: 640px) {
  .vp-code-block-title-bar {
    margin: 16px 0 0 0;
  }
}

.vp-code-block-title-text {
  padding: 0 12px;
  line-height: 48px;
}


.vp-code-block-title div[class*=language-] {
  margin-top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
`
  const mergedIcons = { ...builtinIcons, ...options.customIcon }
  const matched = getMatchedLabels(labels, mergedIcons)
  const css = baseCSS + (await generateIconCSS(matched))
  return { css }
}
function getMatchedLabels(labels, icons) {
  const matched = {}
  const sortedKeys = Object.keys(icons).sort((a, b) => b.length - a.length)
  for (const label of labels) {
    const key = sortedKeys.find((k) => (label == null ? void 0 : label.toLowerCase().includes(k)))
    if (key) {
      matched[icons[key]] = (matched[icons[key]] || []).concat(label)
    }
  }
  return matched
}
async function generateIconCSS(matched) {
  const iconCSS = await Promise.all(
    Object.entries(matched).map(async ([icon, labels]) => {
      const svg = await getSVG(icon)
      const selector = labels.map((label) => `[data-title='${label}']::before`).join(',')
      return `
${selector} {
  content: '';
  --icon: url("data:image/svg+xml,${svg}");
}`
    }),
  )
  return iconCSS.join('')
}
async function getSVG(icon) {
  if (icon.startsWith('<svg')) {
    return encodeSvgForCss(icon)
  }
  if (/^https?:\/\//.test(icon)) {
    try {
      const raw = await fetch(icon)
      const iconContent = await raw.text()
      return encodeSvgForCss(iconContent)
    } catch {
      console.warn(`[vitepress-plugin-group-icons]: Failed to fetch icon: ${icon}`)
      return ''
    }
  }
  const [collection, iconName] = icon.split(':')
  try {
    const { icons } = (0, import_node_module2.createRequire)(import.meta.url)(`@iconify-json/${collection}`)
    const iconData = getIconData(icons, iconName)
    if (iconData) {
      const { attributes, body } = iconToSVG(iconData)
      const svg = iconToHTML(body, attributes)
      return encodeSvgForCss(svg)
    }
    return ''
  } catch {
    console.warn(
      `[vitepress-plugin-group-icons]: Icon set \`${collection}\` not found. Please install \`@iconify-json/${collection}\` first`,
    )
    return ''
  }
}
function isSetEqual(set1, set2) {
  try {
    if (set1.size !== set2.size) {
      return false
    }
    for (const item of set1) {
      if (!set2.has(item)) {
        return false
      }
    }
    return true
  } catch {
    return false
  }
}
var filter = createFilter([/\.md$/, /\.md\?vue/, /\.md\?v=/])
function groupIconVitePlugin(options) {
  const virtualCssId = 'virtual:group-icons.css'
  const resolvedVirtualCssId = `\0${virtualCssId}`
  const combinedRegex = /\bdata-title=\\"([^"]*)\\"|\bdata-title="([^"]*)"|"data-title":\s*"([^"]*)"/g
  const matches = /* @__PURE__ */ new Set()
  let oldMatches
  let server
  options = options || { customIcon: {} }
  function handleUpdateModule() {
    const mod = server == null ? void 0 : server.moduleGraph.getModuleById(resolvedVirtualCssId)
    if (mod) {
      server.moduleGraph.invalidateModule(mod)
      server.reloadModule(mod)
    }
  }
  return {
    name: 'vitepress-plugin-group-icons',
    enforce: 'post',
    resolveId(id) {
      if (id === virtualCssId) {
        return resolvedVirtualCssId
      }
      return void 0
    },
    configureServer(_server) {
      server = _server
    },
    async load(id) {
      if (id === resolvedVirtualCssId) {
        const { css } = await generateCSS(matches, options)
        oldMatches = new Set(matches)
        return css
      }
      return void 0
    },
    transform(code, id) {
      if (!filter(id)) return
      while (true) {
        const match = combinedRegex.exec(code)
        if (!match) break
        matches.add(match[1] || match[2] || match[3])
      }
      if (!isSetEqual(matches, oldMatches)) {
        handleUpdateModule()
      }
    },
  }
}
export { groupIconMdPlugin, groupIconVitePlugin, localIconLoader }
//# sourceMappingURL=vitepress-plugin-group-icons.js.map

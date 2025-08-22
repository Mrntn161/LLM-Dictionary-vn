var __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __defNormalProp = (e, t, n) =>
    t in e
      ? __defProp(e, t, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: n,
        })
      : (e[t] = n),
  __commonJS = (e, t) =>
    function () {
      return (
        t || (0, e[__getOwnPropNames(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      )
    },
  __export = (e, t) => {
    for (var n in t)
      __defProp(e, n, {
        get: t[n],
        enumerable: true,
      })
  },
  __copyProps = (e, t, n, i) => {
    if ((t && 'object' == typeof t) || 'function' == typeof t) {
      for (let s of __getOwnPropNames(t))
        __hasOwnProp.call(e, s) ||
          s === n ||
          __defProp(e, s, {
            get: () => t[s],
            enumerable: !(i = __getOwnPropDesc(t, s)) || i.enumerable,
          })
    }
    return e
  },
  __toESM = (e, t, n) => (
    (n = null != e ? __create(__getProtoOf(e)) : {}),
    __copyProps(
      !t && e && e.__esModule
        ? n
        : __defProp(n, 'default', {
            value: e,
            enumerable: true,
          }),
      e
    )
  ),
  __toCommonJS = (e) =>
    __copyProps(__defProp({}, '__esModule', { value: true }), e),
  __publicField = (e, t, n) => (
    __defNormalProp(e, 'symbol' != typeof t ? t + '' : t, n), n
  ),
  __accessCheck = (e, t, n) => {
    if (!t.has(e)) {
      throw TypeError('Cannot ' + n)
    }
  },
  __privateAdd = (e, t, n) => {
    if (t.has(e)) {
      throw TypeError('Cannot add the same private member more than once')
    }
    t instanceof WeakSet ? t.add(e) : t.set(e, n)
  },
  __privateMethod = (e, t, n) => (
    __accessCheck(e, t, 'access private method'), n
  ),
  require_stream = __commonJS({
    'node_modules/ws/lib/stream.js'(e, t) {
      'use strict'
      var { Duplex: n } = require('stream')
      function i(e) {
        e.emit('close')
      }
      function s() {
        !this.destroyed && this._writableState.finished && this.destroy()
      }
      function r(e) {
        this.removeListener('error', r)
        this.destroy()
        0 === this.listenerCount('error') && this.emit('error', e)
      }
      t.exports = function (e, t) {
        let a = true
        const o = new n({
          ...t,
          autoDestroy: false,
          emitClose: false,
          objectMode: false,
          writableObjectMode: false,
        })
        return (
          e.on('message', function (t, n) {
            const i = !n && o._readableState.objectMode ? t.toString() : t
            o.push(i) || e.pause()
          }),
          e.once('error', function (e) {
            o.destroyed || ((a = false), o.destroy(e))
          }),
          e.once('close', function () {
            o.destroyed || o.push(null)
          }),
          (o._destroy = function (t, n) {
            if (e.readyState === e.CLOSED) {
              return n(t), void process.nextTick(i, o)
            }
            let s = false
            e.once('error', function (e) {
              s = true
              n(e)
            })
            e.once('close', function () {
              s || n(t)
              process.nextTick(i, o)
            })
            a && e.terminate()
          }),
          (o._final = function (t) {
            e.readyState !== e.CONNECTING
              ? null !== e._socket &&
                (e._socket._writableState.finished
                  ? (t(), o._readableState.endEmitted && o.destroy())
                  : (e._socket.once('finish', function () {
                      t()
                    }),
                    e.close()))
              : e.once('open', function () {
                  o._final(t)
                })
          }),
          (o._read = function () {
            e.isPaused && e.resume()
          }),
          (o._write = function (t, n, i) {
            e.readyState !== e.CONNECTING
              ? e.send(t, i)
              : e.once('open', function () {
                  o._write(t, n, i)
                })
          }),
          o.on('end', s),
          o.on('error', r),
          o
        )
      }
    },
  }),
  require_constants = __commonJS({
    'node_modules/ws/lib/constants.js'(e, t) {
      'use strict'
      var n = ['nodebuffer', 'arraybuffer', 'fragments'],
        i = 'undefined' != typeof Blob
      i && n.push('blob')
      t.exports = {
        BINARY_TYPES: n,
        EMPTY_BUFFER: Buffer.alloc(0),
        GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
        hasBlob: i,
        kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
        kListener: Symbol('kListener'),
        kStatusCode: Symbol('status-code'),
        kWebSocket: Symbol('websocket'),
        NOOP: () => {},
      }
    },
  }),
  require_buffer_util = __commonJS({
    'node_modules/ws/lib/buffer-util.js'(e, t) {
      'use strict'
      var { EMPTY_BUFFER: n } = require_constants(),
        i = Buffer[Symbol.species]
      function s(e, t, n, i, s) {
        for (let r = 0; r < s; r++) {
          n[i + r] = e[r] ^ t[3 & r]
        }
      }
      function r(e, t) {
        for (let n = 0; n < e.length; n++) {
          e[n] ^= t[3 & n]
        }
      }
      if (
        ((t.exports = {
          concat: function (e, t) {
            if (0 === e.length) {
              return n
            }
            if (1 === e.length) {
              return e[0]
            }
            const s = Buffer.allocUnsafe(t)
            let r = 0
            for (let t = 0; t < e.length; t++) {
              const n = e[t]
              s.set(n, r)
              r += n.length
            }
            return r < t ? new i(s.buffer, s.byteOffset, r) : s
          },
          mask: s,
          toArrayBuffer: function (e) {
            return e.length === e.buffer.byteLength
              ? e.buffer
              : e.buffer.slice(e.byteOffset, e.byteOffset + e.length)
          },
          toBuffer: function e(t) {
            if (((e.readOnly = true), Buffer.isBuffer(t))) {
              return t
            }
            let n
            return (
              t instanceof ArrayBuffer
                ? (n = new i(t))
                : ArrayBuffer.isView(t)
                ? (n = new i(t.buffer, t.byteOffset, t.byteLength))
                : ((n = Buffer.from(t)), (e.readOnly = false)),
              n
            )
          },
          unmask: r,
        }),
        !process.env.WS_NO_BUFFER_UTIL)
      ) {
        try {
          const e = require('bufferutil')
          t.exports.mask = function (t, n, i, r, a) {
            a < 48 ? s(t, n, i, r, a) : e.mask(t, n, i, r, a)
          }
          t.exports.unmask = function (t, n) {
            t.length < 32 ? r(t, n) : e.unmask(t, n)
          }
        } catch (e) {}
      }
    },
  }),
  require_limiter = __commonJS({
    'node_modules/ws/lib/limiter.js'(e, t) {
      'use strict'
      var n = Symbol('kDone'),
        i = Symbol('kRun')
      t.exports = class {
        constructor(e) {
          this[n] = () => {
            this.pending--
            this[i]()
          }
          this.concurrency = e || 1e400
          this.jobs = []
          this.pending = 0
        }
        add(e) {
          this.jobs.push(e)
          this[i]()
        }
        [i]() {
          if (this.pending !== this.concurrency && this.jobs.length) {
            const e = this.jobs.shift()
            this.pending++
            e(this[n])
          }
        }
      }
    },
  }),
  require_permessage_deflate = __commonJS({
    'node_modules/ws/lib/permessage-deflate.js'(e, t) {
      'use strict'
      var n,
        i = require('zlib'),
        s = require_buffer_util(),
        r = require_limiter(),
        { kStatusCode: a } = require_constants(),
        o = Buffer[Symbol.species],
        l = Buffer.from([0, 0, 255, 255]),
        c = Symbol('permessage-deflate'),
        h = Symbol('total-length'),
        d = Symbol('callback'),
        u = Symbol('buffers'),
        p = Symbol('error')
      function f(e) {
        this[u].push(e)
        this[h] += e.length
      }
      function m(e) {
        this[h] += e.length
        this[c]._maxPayload < 1 || this[h] <= this[c]._maxPayload
          ? this[u].push(e)
          : ((this[p] = new RangeError('Max payload size exceeded')),
            (this[p].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'),
            (this[p][a] = 1009),
            this.removeListener('data', m),
            this.reset())
      }
      function g(e) {
        this[c]._inflate = null
        this[d](e)
      }
      t.exports = class {
        constructor(e, t, i) {
          if (
            ((this._maxPayload = 0 | i),
            (this._options = e || {}),
            (this._threshold =
              void 0 !== this._options.threshold
                ? this._options.threshold
                : 1024),
            (this._isServer = !!t),
            (this._deflate = null),
            (this._inflate = null),
            (this.params = null),
            !n)
          ) {
            const e =
              void 0 !== this._options.concurrencyLimit
                ? this._options.concurrencyLimit
                : 10
            n = new r(e)
          }
        }
        static get extensionName() {
          return 'permessage-deflate'
        }
        offer() {
          const e = {
            a: 1007,
            t: n,
          }
          return (
            this._options.serverNoContextTakeover &&
              (e.server_no_context_takeover = true),
            this._options.clientNoContextTakeover &&
              (e.client_no_context_takeover = true),
            this._options.serverMaxWindowBits &&
              (e.server_max_window_bits = this._options.serverMaxWindowBits),
            this._options.clientMaxWindowBits
              ? (e.client_max_window_bits = this._options.clientMaxWindowBits)
              : null == this._options.clientMaxWindowBits &&
                (e.client_max_window_bits = true),
            e
          )
        }
        accept(e) {
          return (
            (e = this.normalizeParams(e)),
            (this.params = this._isServer
              ? this.acceptAsServer(e)
              : this.acceptAsClient(e)),
            this.params
          )
        }
        cleanup() {
          if (
            (this._inflate && (this._inflate.close(), (this._inflate = null)),
            this._deflate)
          ) {
            const e = this._deflate[d]
            this._deflate.close()
            this._deflate = null
            e &&
              e(
                new Error(
                  'The deflate stream was closed while data was being processed'
                )
              )
          }
        }
        acceptAsServer(e) {
          const t = this._options,
            n = e.find(
              (e) =>
                !(
                  (false === t.serverNoContextTakeover &&
                    e.server_no_context_takeover) ||
                  (e.server_max_window_bits &&
                    (false === t.serverMaxWindowBits ||
                      ('number' == typeof t.serverMaxWindowBits &&
                        t.serverMaxWindowBits > e.server_max_window_bits))) ||
                  ('number' == typeof t.clientMaxWindowBits &&
                    !e.client_max_window_bits)
                )
            )
          if (!n) {
            throw new Error('None of the extension offers can be accepted')
          }
          return (
            t.serverNoContextTakeover && (n.server_no_context_takeover = true),
            t.clientNoContextTakeover && (n.client_no_context_takeover = true),
            'number' == typeof t.serverMaxWindowBits &&
              (n.server_max_window_bits = t.serverMaxWindowBits),
            'number' == typeof t.clientMaxWindowBits
              ? (n.client_max_window_bits = t.clientMaxWindowBits)
              : (true !== n.client_max_window_bits &&
                  false !== t.clientMaxWindowBits) ||
                delete n.client_max_window_bits,
            n
          )
        }
        acceptAsClient(e) {
          const t = e[0]
          if (
            false === this._options.clientNoContextTakeover &&
            t.client_no_context_takeover
          ) {
            throw new Error('Unexpected parameter "client_no_context_takeover"')
          }
          if (t.client_max_window_bits) {
            if (
              false === this._options.clientMaxWindowBits ||
              ('number' == typeof this._options.clientMaxWindowBits &&
                t.client_max_window_bits > this._options.clientMaxWindowBits)
            ) {
              throw new Error(
                'Unexpected or invalid parameter "client_max_window_bits"'
              )
            }
          } else {
            'number' == typeof this._options.clientMaxWindowBits &&
              (t.client_max_window_bits = this._options.clientMaxWindowBits)
          }
          return t
        }
        normalizeParams(e) {
          return (
            e.forEach((e) => {
              Object.keys(e).forEach((t) => {
                let n = e[t]
                if (n.length > 1) {
                  throw new Error(
                    `Parameter "${t}" must have only a single value`
                  )
                }
                if (((n = n[0]), 'client_max_window_bits' === t)) {
                  if (true !== n) {
                    const e = +n
                    if (!Number.isInteger(e) || e < 8 || e > 15) {
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${n}`
                      )
                    }
                    n = e
                  } else {
                    if (!this._isServer) {
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${n}`
                      )
                    }
                  }
                } else {
                  if ('server_max_window_bits' === t) {
                    const e = +n
                    if (!Number.isInteger(e) || e < 8 || e > 15) {
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${n}`
                      )
                    }
                    n = e
                  } else {
                    if (
                      'client_no_context_takeover' !== t &&
                      'server_no_context_takeover' !== t
                    ) {
                      throw new Error(`Unknown parameter "${t}"`)
                    }
                    if (true !== n) {
                      throw new TypeError(
                        `Invalid value for parameter "${t}": ${n}`
                      )
                    }
                  }
                }
              })
            }),
            e
          )
        }
        decompress(e, t, i) {
          n.add((n) => {
            this._decompress(e, t, (e, t) => {
              n()
              i(e, t)
            })
          })
        }
        compress(e, t, i) {
          n.add((n) => {
            this._compress(e, t, (e, t) => {
              n()
              i(e, t)
            })
          })
        }
        _decompress(e, t, n) {
          const r = this._isServer ? 'client' : 'server'
          if (!this._inflate) {
            const e = `${r}_max_window_bits`,
              t =
                'number' != typeof this.params[e]
                  ? i.Z_DEFAULT_WINDOWBITS
                  : this.params[e]
            this._inflate = i.createInflateRaw({
              ...this._options.zlibInflateOptions,
              windowBits: t,
            })
            this._inflate[c] = this
            this._inflate[h] = 0
            this._inflate[u] = []
            this._inflate.on('error', g)
            this._inflate.on('data', m)
          }
          this._inflate[d] = n
          this._inflate.write(e)
          t && this._inflate.write(l)
          this._inflate.flush(() => {
            const e = this._inflate[p]
            if (e) {
              return this._inflate.close(), (this._inflate = null), void n(e)
            }
            const i = s.concat(this._inflate[u], this._inflate[h])
            this._inflate._readableState.endEmitted
              ? (this._inflate.close(), (this._inflate = null))
              : ((this._inflate[h] = 0),
                (this._inflate[u] = []),
                t &&
                  this.params[`${r}_no_context_takeover`] &&
                  this._inflate.reset())
            n(null, i)
          })
        }
        _compress(e, t, n) {
          const r = this._isServer ? 'server' : 'client'
          if (!this._deflate) {
            const e = `${r}_max_window_bits`,
              t =
                'number' != typeof this.params[e]
                  ? i.Z_DEFAULT_WINDOWBITS
                  : this.params[e]
            this._deflate = i.createDeflateRaw({
              ...this._options.zlibDeflateOptions,
              windowBits: t,
            })
            this._deflate[h] = 0
            this._deflate[u] = []
            this._deflate.on('data', f)
          }
          this._deflate[d] = n
          this._deflate.write(e)
          this._deflate.flush(i.Z_SYNC_FLUSH, () => {
            if (!this._deflate) {
              return
            }
            let e = s.concat(this._deflate[u], this._deflate[h])
            t && (e = new o(e.buffer, e.byteOffset, e.length - 4))
            this._deflate[d] = null
            this._deflate[h] = 0
            this._deflate[u] = []
            t &&
              this.params[`${r}_no_context_takeover`] &&
              this._deflate.reset()
            n(null, e)
          })
        }
      }
    },
  }),
  require_validation = __commonJS({
    'node_modules/ws/lib/validation.js'(e, t) {
      'use strict'
      var { isUtf8: n } = require('buffer'),
        { hasBlob: i } = require_constants()
      function s(e) {
        const t = e.length
        let n = 0
        for (; n < t; ) {
          if (0 == (128 & e[n])) {
            n++
          } else {
            if (192 == (224 & e[n])) {
              if (
                n + 1 === t ||
                128 != (192 & e[n + 1]) ||
                192 == (254 & e[n])
              ) {
                return false
              }
              n += 2
            } else {
              if (224 == (240 & e[n])) {
                if (
                  n + 2 >= t ||
                  128 != (192 & e[n + 1]) ||
                  128 != (192 & e[n + 2]) ||
                  (224 === e[n] && 128 == (224 & e[n + 1])) ||
                  (237 === e[n] && 160 == (224 & e[n + 1]))
                ) {
                  return false
                }
                n += 3
              } else {
                if (240 != (248 & e[n])) {
                  return false
                }
                if (
                  n + 3 >= t ||
                  128 != (192 & e[n + 1]) ||
                  128 != (192 & e[n + 2]) ||
                  128 != (192 & e[n + 3]) ||
                  (240 === e[n] && 128 == (240 & e[n + 1])) ||
                  (244 === e[n] && e[n + 1] > 143) ||
                  e[n] > 244
                ) {
                  return false
                }
                n += 4
              }
            }
          }
        }
        return true
      }
      if (
        ((t.exports = {
          isBlob: function (e) {
            return (
              i &&
              'object' == typeof e &&
              'function' == typeof e.arrayBuffer &&
              'string' == typeof e.type &&
              'function' == typeof e.stream &&
              ('Blob' === e[Symbol.toStringTag] ||
                'File' === e[Symbol.toStringTag])
            )
          },
          isValidStatusCode: function (e) {
            return (
              (e >= 1000 &&
                e <= 1014 &&
                1004 !== e &&
                1005 !== e &&
                1006 !== e) ||
              (e >= 3000 && e <= 4999)
            )
          },
          isValidUTF8: s,
          tokenChars: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
          ],
        }),
        n)
      ) {
        t.exports.isValidUTF8 = function (e) {
          return e.length < 24 ? s(e) : n(e)
        }
      } else {
        if (!process.env.WS_NO_UTF_8_VALIDATE) {
          try {
            const e = require('utf-8-validate')
            t.exports.isValidUTF8 = function (t) {
              return t.length < 32 ? s(t) : e(t)
            }
          } catch (e) {}
        }
      }
    },
  }),
  require_receiver = __commonJS({
    'node_modules/ws/lib/receiver.js'(e, t) {
      'use strict'
      var { Writable: n } = require('stream'),
        i = require_permessage_deflate(),
        {
          BINARY_TYPES: s,
          EMPTY_BUFFER: r,
          kStatusCode: a,
          kWebSocket: o,
        } = require_constants(),
        { concat: l, toArrayBuffer: c, unmask: h } = require_buffer_util(),
        { isValidStatusCode: d, isValidUTF8: u } = require_validation(),
        p = Buffer[Symbol.species]
      t.exports = class extends n {
        constructor(e = {}) {
          super()
          this._allowSynchronousEvents =
            void 0 === e.allowSynchronousEvents || e.allowSynchronousEvents
          this._binaryType = e.binaryType || s[0]
          this._extensions = e.extensions || {}
          this._isServer = !!e.isServer
          this._maxPayload = 0 | e.maxPayload
          this._skipUTF8Validation = !!e.skipUTF8Validation
          this[o] = void 0
          this._bufferedBytes = 0
          this._buffers = []
          this._compressed = false
          this._payloadLength = 0
          this._mask = void 0
          this._fragmented = 0
          this._masked = false
          this._fin = false
          this._opcode = 0
          this._totalPayloadLength = 0
          this._messageLength = 0
          this._fragments = []
          this._errored = false
          this._loop = false
          this._state = 0
        }
        _write(e, t, n) {
          if (8 === this._opcode && 0 == this._state) {
            return n()
          }
          this._bufferedBytes += e.length
          this._buffers.push(e)
          this.startLoop(n)
        }
        consume(e) {
          if (((this._bufferedBytes -= e), e === this._buffers[0].length)) {
            return this._buffers.shift()
          }
          if (e < this._buffers[0].length) {
            const t = this._buffers[0]
            return (
              (this._buffers[0] = new p(
                t.buffer,
                t.byteOffset + e,
                t.length - e
              )),
              new p(t.buffer, t.byteOffset, e)
            )
          }
          const t = Buffer.allocUnsafe(e)
          do {
            const n = this._buffers[0],
              i = t.length - e
            e >= n.length
              ? t.set(this._buffers.shift(), i)
              : (t.set(new Uint8Array(n.buffer, n.byteOffset, e), i),
                (this._buffers[0] = new p(
                  n.buffer,
                  n.byteOffset + e,
                  n.length - e
                )))
            e -= n.length
          } while (e > 0)
          return t
        }
        startLoop(e) {
          this._loop = true
          do {
            switch (this._state) {
              case 0:
                this.getInfo(e)
                break
              case 1:
                this.getPayloadLength16(e)
                break
              case 2:
                this.getPayloadLength64(e)
                break
              case 3:
                this.getMask()
                break
              case 4:
                this.getData(e)
                break
              case 5:
              case 6:
                return void (this._loop = false)
            }
          } while (this._loop)
          this._errored || e()
        }
        getInfo(e) {
          if (this._bufferedBytes < 2) {
            return void (this._loop = false)
          }
          const t = this.consume(2)
          if (0 != (48 & t[0])) {
            return void e(
              this.createError(
                RangeError,
                'RSV2 and RSV3 must be clear',
                true,
                1002,
                'WS_ERR_UNEXPECTED_RSV_2_3'
              )
            )
          }
          const n = 64 == (64 & t[0])
          if (!n || this._extensions[i.extensionName]) {
            if (
              ((this._fin = 128 == (128 & t[0])),
              (this._opcode = 15 & t[0]),
              (this._payloadLength = 127 & t[1]),
              0 === this._opcode)
            ) {
              if (n) {
                return void e(
                  this.createError(
                    RangeError,
                    'RSV1 must be clear',
                    true,
                    1002,
                    'WS_ERR_UNEXPECTED_RSV_1'
                  )
                )
              }
              if (!this._fragmented) {
                return void e(
                  this.createError(
                    RangeError,
                    'invalid opcode 0',
                    true,
                    1002,
                    'WS_ERR_INVALID_OPCODE'
                  )
                )
              }
              this._opcode = this._fragmented
            } else {
              if (1 === this._opcode || 2 === this._opcode) {
                if (this._fragmented) {
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid opcode ${this._opcode}`,
                      true,
                      1002,
                      'WS_ERR_INVALID_OPCODE'
                    )
                  )
                }
                this._compressed = n
              } else {
                if (!(this._opcode > 7 && this._opcode < 11)) {
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid opcode ${this._opcode}`,
                      true,
                      1002,
                      'WS_ERR_INVALID_OPCODE'
                    )
                  )
                }
                if (!this._fin) {
                  return void e(
                    this.createError(
                      RangeError,
                      'FIN must be set',
                      true,
                      1002,
                      'WS_ERR_EXPECTED_FIN'
                    )
                  )
                }
                if (n) {
                  return void e(
                    this.createError(
                      RangeError,
                      'RSV1 must be clear',
                      true,
                      1002,
                      'WS_ERR_UNEXPECTED_RSV_1'
                    )
                  )
                }
                if (
                  this._payloadLength > 125 ||
                  (8 === this._opcode && 1 === this._payloadLength)
                ) {
                  return void e(
                    this.createError(
                      RangeError,
                      `invalid payload length ${this._payloadLength}`,
                      true,
                      1002,
                      'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
                    )
                  )
                }
              }
            }
            if (
              (this._fin ||
                this._fragmented ||
                (this._fragmented = this._opcode),
              (this._masked = 128 == (128 & t[1])),
              this._isServer)
            ) {
              if (!this._masked) {
                return void e(
                  this.createError(
                    RangeError,
                    'MASK must be set',
                    true,
                    1002,
                    'WS_ERR_EXPECTED_MASK'
                  )
                )
              }
            } else {
              if (this._masked) {
                return void e(
                  this.createError(
                    RangeError,
                    'MASK must be clear',
                    true,
                    1002,
                    'WS_ERR_UNEXPECTED_MASK'
                  )
                )
              }
            }
            126 === this._payloadLength
              ? (this._state = 1)
              : 127 === this._payloadLength
              ? (this._state = 2)
              : this.haveLength(e)
          } else {
            e(
              this.createError(
                RangeError,
                'RSV1 must be clear',
                true,
                1002,
                'WS_ERR_UNEXPECTED_RSV_1'
              )
            )
          }
        }
        getPayloadLength16(e) {
          this._bufferedBytes < 2
            ? (this._loop = false)
            : ((this._payloadLength = this.consume(2).readUInt16BE(0)),
              this.haveLength(e))
        }
        getPayloadLength64(e) {
          if (this._bufferedBytes < 8) {
            return void (this._loop = false)
          }
          const t = this.consume(8),
            n = t.readUInt32BE(0)
          if (n > Math.pow(2, 21) - 1) {
            e(
              this.createError(
                RangeError,
                'Unsupported WebSocket frame: payload length > 2^53 - 1',
                false,
                1009,
                'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
              )
            )
          } else {
            this._payloadLength = n * Math.pow(2, 32) + t.readUInt32BE(4)
            this.haveLength(e)
          }
        }
        haveLength(e) {
          if (
            this._payloadLength &&
            this._opcode < 8 &&
            ((this._totalPayloadLength += this._payloadLength),
            this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)
          ) {
            e(
              this.createError(
                RangeError,
                'Max payload size exceeded',
                false,
                1009,
                'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
              )
            )
          } else {
            this._masked ? (this._state = 3) : (this._state = 4)
          }
        }
        getMask() {
          this._bufferedBytes < 4
            ? (this._loop = false)
            : ((this._mask = this.consume(4)), (this._state = 4))
        }
        getData(e) {
          let t = r
          if (this._payloadLength) {
            if (this._bufferedBytes < this._payloadLength) {
              return void (this._loop = false)
            }
            t = this.consume(this._payloadLength)
            this._masked &&
              0 !=
                (this._mask[0] |
                  this._mask[1] |
                  this._mask[2] |
                  this._mask[3]) &&
              h(t, this._mask)
          }
          if (this._opcode > 7) {
            this.controlMessage(t, e)
          } else {
            if (this._compressed) {
              return (this._state = 5), void this.decompress(t, e)
            }
            t.length &&
              ((this._messageLength = this._totalPayloadLength),
              this._fragments.push(t))
            this.dataMessage(e)
          }
        }
        decompress(e, t) {
          this._extensions[i.extensionName].decompress(e, this._fin, (e, n) => {
            if (e) {
              return t(e)
            }
            if (n.length) {
              if (
                ((this._messageLength += n.length),
                this._messageLength > this._maxPayload && this._maxPayload > 0)
              ) {
                const e = this.createError(
                  RangeError,
                  'Max payload size exceeded',
                  false,
                  1009,
                  'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
                )
                return void t(e)
              }
              this._fragments.push(n)
            }
            this.dataMessage(t)
            0 === this._state && this.startLoop(t)
          })
        }
        dataMessage(e) {
          if (!this._fin) {
            return void (this._state = 0)
          }
          const t = this._messageLength,
            n = this._fragments
          if (
            ((this._totalPayloadLength = 0),
            (this._messageLength = 0),
            (this._fragmented = 0),
            (this._fragments = []),
            2 === this._opcode)
          ) {
            let i
            i =
              'nodebuffer' === this._binaryType
                ? l(n, t)
                : 'arraybuffer' === this._binaryType
                ? c(l(n, t))
                : 'blob' === this._binaryType
                ? new Blob(n)
                : n
            this._allowSynchronousEvents
              ? (this.emit('message', i, true), (this._state = 0))
              : ((this._state = 6),
                setImmediate(() => {
                  this.emit('message', i, true)
                  this._state = 0
                  this.startLoop(e)
                }))
          } else {
            const i = l(n, t)
            if (!this._skipUTF8Validation && !u(i)) {
              const t = this.createError(
                Error,
                'invalid UTF-8 sequence',
                true,
                1007,
                'WS_ERR_INVALID_UTF8'
              )
              return void e(t)
            }
            5 === this._state || this._allowSynchronousEvents
              ? (this.emit('message', i, false), (this._state = 0))
              : ((this._state = 6),
                setImmediate(() => {
                  this.emit('message', i, false)
                  this._state = 0
                  this.startLoop(e)
                }))
          }
        }
        controlMessage(e, t) {
          if (8 !== this._opcode) {
            this._allowSynchronousEvents
              ? (this.emit(9 === this._opcode ? 'ping' : 'pong', e),
                (this._state = 0))
              : ((this._state = 6),
                setImmediate(() => {
                  this.emit(9 === this._opcode ? 'ping' : 'pong', e)
                  this._state = 0
                  this.startLoop(t)
                }))
          } else {
            if (0 === e.length) {
              this._loop = false
              this.emit('conclude', 1005, r)
              this.end()
            } else {
              const n = e.readUInt16BE(0)
              if (!d(n)) {
                const e = this.createError(
                  RangeError,
                  `invalid status code ${n}`,
                  true,
                  1002,
                  'WS_ERR_INVALID_CLOSE_CODE'
                )
                return void t(e)
              }
              const i = new p(e.buffer, e.byteOffset + 2, e.length - 2)
              if (!this._skipUTF8Validation && !u(i)) {
                const e = this.createError(
                  Error,
                  'invalid UTF-8 sequence',
                  true,
                  1007,
                  'WS_ERR_INVALID_UTF8'
                )
                return void t(e)
              }
              this._loop = false
              this.emit('conclude', n, i)
              this.end()
            }
            this._state = 0
          }
        }
        createError(e, t, n, i, s) {
          this._loop = false
          this._errored = true
          const r = new e(n ? `Invalid WebSocket frame: ${t}` : t)
          return (
            Error.captureStackTrace(r, this.createError),
            (r.code = s),
            (r[a] = i),
            r
          )
        }
      }
    },
  }),
  require_sender = __commonJS({
    'node_modules/ws/lib/sender.js'(e, t) {
      'use strict'
      var n,
        { Duplex: i } = require('stream'),
        { randomFillSync: s } = require('crypto'),
        r = require_permessage_deflate(),
        { EMPTY_BUFFER: a, kWebSocket: o, NOOP: l } = require_constants(),
        { isBlob: c, isValidStatusCode: h } = require_validation(),
        { mask: d, toBuffer: u } = require_buffer_util(),
        p = Symbol('kByteLength'),
        f = Buffer.alloc(4),
        g = 8192,
        _ = class {
          constructor(e, t, n) {
            this._extensions = t || {}
            n &&
              ((this._generateMask = n), (this._maskBuffer = Buffer.alloc(4)))
            this._socket = e
            this._firstFragment = true
            this._compress = false
            this._bufferedBytes = 0
            this._queue = []
            this._state = 0
            this.onerror = l
            this[o] = void 0
          }
          static frame(e, t) {
            let i,
              r,
              a = false,
              o = 2,
              l = false
            t.mask &&
              ((i = t.maskBuffer || f),
              t.generateMask
                ? t.generateMask(i)
                : (g === 8192 &&
                    (void 0 === n && (n = Buffer.alloc(8192)),
                    s(n, 0, 8192),
                    (g = 0)),
                  (i[0] = n[g++]),
                  (i[1] = n[g++]),
                  (i[2] = n[g++]),
                  (i[3] = n[g++])),
              (l = 0 == (i[0] | i[1] | i[2] | i[3])),
              (o = 6))
            'string' == typeof e
              ? (r =
                  (t.mask && !l) || void 0 === t[p]
                    ? (e = Buffer.from(e)).length
                    : t[p])
              : ((r = e.length), (a = t.mask && t.readOnly && !l))
            let c = r
            r >= 65536
              ? ((o += 8), (c = 127))
              : r > 125 && ((o += 2), (c = 126))
            const h = Buffer.allocUnsafe(a ? r + o : o)
            return (
              (h[0] = t.fin ? 128 | t.opcode : t.opcode),
              t.rsv1 && (h[0] |= 64),
              (h[1] = c),
              126 === c
                ? h.writeUInt16BE(r, 2)
                : 127 === c && ((h[2] = h[3] = 0), h.writeUIntBE(r, 4, 6)),
              t.mask
                ? ((h[1] |= 128),
                  (h[o - 4] = i[0]),
                  (h[o - 3] = i[1]),
                  (h[o - 2] = i[2]),
                  (h[o - 1] = i[3]),
                  l
                    ? [h, e]
                    : a
                    ? (d(e, i, h, o, r), [h])
                    : (d(e, i, e, 0, r), [h, e]))
                : [h, e]
            )
          }
          close(e, t, n, i) {
            let s
            if (void 0 === e) {
              s = a
            } else {
              if ('number' != typeof e || !h(e)) {
                throw new TypeError(
                  'First argument must be a valid error code number'
                )
              }
              if (void 0 !== t && t.length) {
                const n = Buffer.byteLength(t)
                if (n > 123) {
                  throw new RangeError(
                    'The message must not be greater than 123 bytes'
                  )
                }
                s = Buffer.allocUnsafe(2 + n)
                s.writeUInt16BE(e, 0)
                'string' == typeof t ? s.write(t, 2) : s.set(t, 2)
              } else {
                s = Buffer.allocUnsafe(2)
                s.writeUInt16BE(e, 0)
              }
            }
            const r = {
              [p]: s.length,
              fin: true,
              generateMask: this._generateMask,
              mask: n,
              maskBuffer: this._maskBuffer,
              opcode: 8,
              readOnly: false,
              rsv1: false,
            }
            0 !== this._state
              ? this.enqueue([this.dispatch, s, false, r, i])
              : this.sendFrame(_.frame(s, r), i)
          }
          ping(e, t, n) {
            let i, s
            if (
              ('string' == typeof e
                ? ((i = Buffer.byteLength(e)), (s = false))
                : c(e)
                ? ((i = e.size), (s = false))
                : ((i = (e = u(e)).length), (s = u.readOnly)),
              i > 125)
            ) {
              throw new RangeError(
                'The data size must not be greater than 125 bytes'
              )
            }
            const r = {
              [p]: i,
              fin: true,
              generateMask: this._generateMask,
              mask: t,
              maskBuffer: this._maskBuffer,
              opcode: 9,
              readOnly: s,
              rsv1: false,
            }
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, false, r, n])
                : this.getBlobData(e, false, r, n)
              : 0 !== this._state
              ? this.enqueue([this.dispatch, e, false, r, n])
              : this.sendFrame(_.frame(e, r), n)
          }
          pong(e, t, n) {
            let i, s
            if (
              ('string' == typeof e
                ? ((i = Buffer.byteLength(e)), (s = false))
                : c(e)
                ? ((i = e.size), (s = false))
                : ((i = (e = u(e)).length), (s = u.readOnly)),
              i > 125)
            ) {
              throw new RangeError(
                'The data size must not be greater than 125 bytes'
              )
            }
            const r = {
              [p]: i,
              fin: true,
              generateMask: this._generateMask,
              mask: t,
              maskBuffer: this._maskBuffer,
              opcode: 10,
              readOnly: s,
              rsv1: false,
            }
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, false, r, n])
                : this.getBlobData(e, false, r, n)
              : 0 !== this._state
              ? this.enqueue([this.dispatch, e, false, r, n])
              : this.sendFrame(_.frame(e, r), n)
          }
          send(e, t, n) {
            const i = this._extensions[r.extensionName]
            let s,
              a,
              o = t.binary ? 2 : 1,
              l = t.compress
            'string' == typeof e
              ? ((s = Buffer.byteLength(e)), (a = false))
              : c(e)
              ? ((s = e.size), (a = false))
              : ((s = (e = u(e)).length), (a = u.readOnly))
            this._firstFragment
              ? ((this._firstFragment = false),
                l &&
                  i &&
                  i.params[
                    i._isServer
                      ? 'server_no_context_takeover'
                      : 'client_no_context_takeover'
                  ] &&
                  (l = s >= i._threshold),
                (this._compress = l))
              : ((l = false), (o = 0))
            t.fin && (this._firstFragment = true)
            const h = {
              [p]: s,
              fin: t.fin,
              generateMask: this._generateMask,
              mask: t.mask,
              maskBuffer: this._maskBuffer,
              opcode: o,
              readOnly: a,
              rsv1: l,
            }
            c(e)
              ? 0 !== this._state
                ? this.enqueue([this.getBlobData, e, this._compress, h, n])
                : this.getBlobData(e, this._compress, h, n)
              : 0 !== this._state
              ? this.enqueue([this.dispatch, e, this._compress, h, n])
              : this.dispatch(e, this._compress, h, n)
          }
          getBlobData(e, t, n, i) {
            this._bufferedBytes += n[p]
            this._state = 2
            e.arrayBuffer()
              .then((e) => {
                if (this._socket.destroyed) {
                  const e = new Error(
                    'The socket was closed while the blob was being read'
                  )
                  return void process.nextTick(k, this, e, i)
                }
                this._bufferedBytes -= n[p]
                const s = u(e)
                t
                  ? this.dispatch(s, t, n, i)
                  : ((this._state = 0),
                    this.sendFrame(_.frame(s, n), i),
                    this.dequeue())
              })
              .catch((e) => {
                process.nextTick(b, this, e, i)
              })
          }
          dispatch(e, t, n, i) {
            if (!t) {
              return void this.sendFrame(_.frame(e, n), i)
            }
            const s = this._extensions[r.extensionName]
            this._bufferedBytes += n[p]
            this._state = 1
            s.compress(e, n.fin, (e, t) => {
              if (this._socket.destroyed) {
                k(
                  this,
                  new Error(
                    'The socket was closed while data was being compressed'
                  ),
                  i
                )
              } else {
                this._bufferedBytes -= n[p]
                this._state = 0
                n.readOnly = false
                this.sendFrame(_.frame(t, n), i)
                this.dequeue()
              }
            })
          }
          dequeue() {
            for (; 0 === this._state && this._queue.length; ) {
              const e = this._queue.shift()
              this._bufferedBytes -= e[3][p]
              Reflect.apply(e[0], this, e.slice(1))
            }
          }
          enqueue(e) {
            this._bufferedBytes += e[3][p]
            this._queue.push(e)
          }
          sendFrame(e, t) {
            2 === e.length
              ? (this._socket.cork(),
                this._socket.write(e[0]),
                this._socket.write(e[1], t),
                this._socket.uncork())
              : this._socket.write(e[0], t)
          }
        }
      function k(e, t, n) {
        'function' == typeof n && n(t)
        for (let n = 0; n < e._queue.length; n++) {
          const i = e._queue[n],
            s = i[i.length - 1]
          'function' == typeof s && s(t)
        }
      }
      function b(e, t, n) {
        k(e, t, n)
        e.onerror(t)
      }
      t.exports = _
    },
  }),
  require_event_target = __commonJS({
    'node_modules/ws/lib/event-target.js'(e, t) {
      'use strict'
      var { kForOnEventAttribute: n, kListener: i } = require_constants(),
        s = Symbol('kCode'),
        r = Symbol('kData'),
        a = Symbol('kError'),
        o = Symbol('kMessage'),
        l = Symbol('kReason'),
        c = Symbol('kTarget'),
        h = Symbol('kType'),
        d = Symbol('kWasClean'),
        u = class {
          constructor(e) {
            this[c] = null
            this[h] = e
          }
          get target() {
            return this[c]
          }
          get type() {
            return this[h]
          }
        }
      Object.defineProperty(u.prototype, 'target', { enumerable: true })
      Object.defineProperty(u.prototype, 'type', { enumerable: true })
      var p = class extends u {
        constructor(e, t = {}) {
          super(e)
          this[s] = void 0 === t.code ? 0 : t.code
          this[l] = void 0 === t.reason ? '' : t.reason
          this[d] = void 0 !== t.wasClean && t.wasClean
        }
        get code() {
          return this[s]
        }
        get reason() {
          return this[l]
        }
        get wasClean() {
          return this[d]
        }
      }
      Object.defineProperty(p.prototype, 'code', { enumerable: true })
      Object.defineProperty(p.prototype, 'reason', { enumerable: true })
      Object.defineProperty(p.prototype, 'wasClean', { enumerable: true })
      var f = class extends u {
        constructor(e, t = {}) {
          super(e)
          this[a] = void 0 === t.error ? null : t.error
          this[o] = void 0 === t.message ? '' : t.message
        }
        get error() {
          return this[a]
        }
        get message() {
          return this[o]
        }
      }
      Object.defineProperty(f.prototype, 'error', { enumerable: true })
      Object.defineProperty(f.prototype, 'message', { enumerable: true })
      var m = class extends u {
        constructor(e, t = {}) {
          super(e)
          this[r] = void 0 === t.data ? null : t.data
        }
        get data() {
          return this[r]
        }
      }
      Object.defineProperty(m.prototype, 'data', { enumerable: true })
      var g = {
        addEventListener(e, t, s = {}) {
          for (const r of this.listeners(e))
            if (!s[n] && r[i] === t && !r[n]) {
              return
            }
          let r
          if ('message' === e) {
            r = function (e, n) {
              const i = new m('message', { data: n ? e : e.toString() })
              i[c] = this
              _(t, this, i)
            }
          } else {
            if ('close' === e) {
              r = function (e, n) {
                const i = new p('close', {
                  code: e,
                  reason: n.toString(),
                  wasClean: this._closeFrameReceived && this._closeFrameSent,
                })
                i[c] = this
                _(t, this, i)
              }
            } else {
              if ('error' === e) {
                r = function (e) {
                  const n = new f('error', {
                    error: e,
                    message: e.message,
                  })
                  n[c] = this
                  _(t, this, n)
                }
              } else {
                if ('open' !== e) {
                  return
                }
                r = function () {
                  const e = new u('open')
                  e[c] = this
                  _(t, this, e)
                }
              }
            }
          }
          r[n] = !!s[n]
          r[i] = t
          s.once ? this.once(e, r) : this.on(e, r)
        },
        removeEventListener(e, t) {
          for (const s of this.listeners(e))
            if (s[i] === t && !s[n]) {
              this.removeListener(e, s)
              break
            }
        },
      }
      function _(e, t, n) {
        'object' == typeof e && e.handleEvent
          ? e.handleEvent.call(e, n)
          : e.call(t, n)
      }
      t.exports = {
        CloseEvent: p,
        ErrorEvent: f,
        Event: u,
        EventTarget: g,
        MessageEvent: m,
      }
    },
  }),
  require_extension = __commonJS({
    'node_modules/ws/lib/extension.js'(e, t) {
      'use strict'
      var { tokenChars: n } = require_validation()
      function i(e, t, n) {
        void 0 === e[t] ? (e[t] = [n]) : e[t].push(n)
      }
      t.exports = {
        format: function (e) {
          return Object.keys(e)
            .map((t) => {
              let n = e[t]
              return (
                Array.isArray(n) || (n = [n]),
                n
                  .map((e) =>
                    [t]
                      .concat(
                        Object.keys(e).map((t) => {
                          let n = e[t]
                          return (
                            Array.isArray(n) || (n = [n]),
                            n
                              .map((e) => (true === e ? t : `${t}=${e}`))
                              .join('; ')
                          )
                        })
                      )
                      .join('; ')
                  )
                  .join(', ')
              )
            })
            .join(', ')
        },
        parse: function (e) {
          const t = Object.create(null)
          let s,
            r,
            a = Object.create(null),
            o = false,
            l = false,
            c = false,
            h = -1,
            d = -1,
            u = -1,
            p = 0
          for (; p < e.length; p++) {
            if (((d = e.charCodeAt(p)), void 0 === s)) {
              if (-1 === u && 1 === n[d]) {
                ;-1 === h && (h = p)
              } else {
                if (0 === p || (32 !== d && 9 !== d)) {
                  if (59 !== d && 44 !== d) {
                    throw new SyntaxError(`Unexpected character at index ${p}`)
                  }
                  {
                    if (-1 === h) {
                      throw new SyntaxError(
                        `Unexpected character at index ${p}`
                      )
                    }
                    ;-1 === u && (u = p)
                    const n = e.slice(h, u)
                    44 === d ? (i(t, n, a), (a = Object.create(null))) : (s = n)
                    h = u = -1
                  }
                } else {
                  ;-1 === u && -1 !== h && (u = p)
                }
              }
            } else {
              if (void 0 === r) {
                if (-1 === u && 1 === n[d]) {
                  ;-1 === h && (h = p)
                } else {
                  if (32 === d || 9 === d) {
                    ;-1 === u && -1 !== h && (u = p)
                  } else {
                    if (59 === d || 44 === d) {
                      if (-1 === h) {
                        throw new SyntaxError(
                          `Unexpected character at index ${p}`
                        )
                      }
                      ;-1 === u && (u = p)
                      i(a, e.slice(h, u), true)
                      44 === d &&
                        (i(t, s, a), (a = Object.create(null)), (s = void 0))
                      h = u = -1
                    } else {
                      if (61 !== d || -1 === h || -1 !== u) {
                        throw new SyntaxError(
                          `Unexpected character at index ${p}`
                        )
                      }
                      r = e.slice(h, p)
                      h = u = -1
                    }
                  }
                }
              } else {
                if (l) {
                  if (1 !== n[d]) {
                    throw new SyntaxError(`Unexpected character at index ${p}`)
                  }
                  ;-1 === h ? (h = p) : o || (o = true)
                  l = false
                } else {
                  if (c) {
                    if (1 === n[d]) {
                      ;-1 === h && (h = p)
                    } else {
                      if (34 === d && -1 !== h) {
                        c = false
                        u = p
                      } else {
                        if (92 !== d) {
                          throw new SyntaxError(
                            `Unexpected character at index ${p}`
                          )
                        }
                        l = true
                      }
                    }
                  } else {
                    if (34 === d && 61 === e.charCodeAt(p - 1)) {
                      c = true
                    } else {
                      if (-1 === u && 1 === n[d]) {
                        ;-1 === h && (h = p)
                      } else {
                        if (-1 === h || (32 !== d && 9 !== d)) {
                          if (59 !== d && 44 !== d) {
                            throw new SyntaxError(
                              `Unexpected character at index ${p}`
                            )
                          }
                          {
                            if (-1 === h) {
                              throw new SyntaxError(
                                `Unexpected character at index ${p}`
                              )
                            }
                            ;-1 === u && (u = p)
                            let n = e.slice(h, u)
                            o && ((n = n.replace(/\\/g, '')), (o = false))
                            i(a, r, n)
                            44 === d &&
                              (i(t, s, a),
                              (a = Object.create(null)),
                              (s = void 0))
                            r = void 0
                            h = u = -1
                          }
                        } else {
                          ;-1 === u && (u = p)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (-1 === h || c || 32 === d || 9 === d) {
            throw new SyntaxError('Unexpected end of input')
          }
          ;-1 === u && (u = p)
          const f = e.slice(h, u)
          return (
            void 0 === s
              ? i(t, f, a)
              : (void 0 === r
                  ? i(a, f, true)
                  : i(a, r, o ? f.replace(/\\/g, '') : f),
                i(t, s, a)),
            t
          )
        },
      }
    },
  }),
  require_websocket = __commonJS({
    'node_modules/ws/lib/websocket.js'(e, t) {
      'use strict'
      var n = require('events'),
        i = require('https'),
        s = require('http'),
        r = require('net'),
        a = require('tls'),
        { randomBytes: o, createHash: l } = require('crypto'),
        { Duplex: c, Readable: h } = require('stream'),
        { URL: d } = require('url'),
        u = require_permessage_deflate(),
        p = require_receiver(),
        f = require_sender(),
        { isBlob: m } = require_validation(),
        {
          BINARY_TYPES: g,
          EMPTY_BUFFER: _,
          GUID: k,
          kForOnEventAttribute: b,
          kListener: y,
          kStatusCode: v,
          kWebSocket: x,
          NOOP: w,
        } = require_constants(),
        {
          EventTarget: { addEventListener: S, removeEventListener: E },
        } = require_event_target(),
        { format: T, parse: I } = require_extension(),
        { toBuffer: N } = require_buffer_util(),
        L = Symbol('kAborted'),
        C = [8, 13],
        O = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'],
        $ = class extends n {
          constructor(e, t, n) {
            super()
            this._binaryType = g[0]
            this._closeCode = 1006
            this._closeFrameReceived = false
            this._closeFrameSent = false
            this._closeMessage = _
            this._closeTimer = null
            this._errorEmitted = false
            this._extensions = {}
            this._paused = false
            this._protocol = ''
            this._readyState = $.CONNECTING
            this._receiver = null
            this._sender = null
            this._socket = null
            null !== e
              ? ((this._bufferedAmount = 0),
                (this._isServer = false),
                (this._redirects = 0),
                void 0 === t
                  ? (t = [])
                  : Array.isArray(t) ||
                    ('object' == typeof t && null !== t
                      ? ((n = t), (t = []))
                      : (t = [t])),
                P(this, e, t, n))
              : ((this._autoPong = n.autoPong), (this._isServer = true))
          }
          get binaryType() {
            return this._binaryType
          }
          set binaryType(e) {
            g.includes(e) &&
              ((this._binaryType = e),
              this._receiver && (this._receiver._binaryType = e))
          }
          get bufferedAmount() {
            return this._socket
              ? this._socket._writableState.length + this._sender._bufferedBytes
              : this._bufferedAmount
          }
          get extensions() {
            return Object.keys(this._extensions).join()
          }
          get isPaused() {
            return this._paused
          }
          get onclose() {
            return null
          }
          get onerror() {
            return null
          }
          get onopen() {
            return null
          }
          get onmessage() {
            return null
          }
          get protocol() {
            return this._protocol
          }
          get readyState() {
            return this._readyState
          }
          get url() {
            return this._url
          }
          setSocket(e, t, n) {
            const i = new p({
                allowSynchronousEvents: n.allowSynchronousEvents,
                binaryType: this.binaryType,
                extensions: this._extensions,
                isServer: this._isServer,
                maxPayload: n.maxPayload,
                skipUTF8Validation: n.skipUTF8Validation,
              }),
              s = new f(e, this._extensions, n.generateMask)
            this._receiver = i
            this._sender = s
            this._socket = e
            i[x] = this
            s[x] = this
            e[x] = this
            i.on('conclude', q)
            i.on('drain', U)
            i.on('error', j)
            i.on('message', W)
            i.on('ping', V)
            i.on('pong', J)
            s.onerror = G
            e.setTimeout && e.setTimeout(0)
            e.setNoDelay && e.setNoDelay()
            t.length > 0 && e.unshift(t)
            e.on('close', K)
            e.on('data', Y)
            e.on('end', Q)
            e.on('error', X)
            this._readyState = $.OPEN
            this.emit('open')
          }
          emitClose() {
            if (!this._socket) {
              return (
                (this._readyState = $.CLOSED),
                void this.emit('close', this._closeCode, this._closeMessage)
              )
            }
            this._extensions[u.extensionName] &&
              this._extensions[u.extensionName].cleanup()
            this._receiver.removeAllListeners()
            this._readyState = $.CLOSED
            this.emit('close', this._closeCode, this._closeMessage)
          }
          close(e, t) {
            if (this.readyState !== $.CLOSED) {
              if (this.readyState !== $.CONNECTING) {
                this.readyState !== $.CLOSING
                  ? ((this._readyState = $.CLOSING),
                    this._sender.close(e, t, !this._isServer, (e) => {
                      e ||
                        ((this._closeFrameSent = true),
                        (this._closeFrameReceived ||
                          this._receiver._writableState.errorEmitted) &&
                          this._socket.end())
                    }),
                    Z(this))
                  : this._closeFrameSent &&
                    (this._closeFrameReceived ||
                      this._receiver._writableState.errorEmitted) &&
                    this._socket.end()
              } else {
                const e =
                  'WebSocket was closed before the connection was established'
                D(this, this._req, e)
              }
            }
          }
          pause() {
            this.readyState !== $.CONNECTING &&
              this.readyState !== $.CLOSED &&
              ((this._paused = true), this._socket.pause())
          }
          ping(e, t, n) {
            if (this.readyState === $.CONNECTING) {
              throw new Error(
                'WebSocket is not open: readyState 0 (CONNECTING)'
              )
            }
            'function' == typeof e
              ? ((n = e), (e = t = void 0))
              : 'function' == typeof t && ((n = t), (t = void 0))
            'number' == typeof e && (e = e.toString())
            this.readyState === $.OPEN
              ? (void 0 === t && (t = !this._isServer),
                this._sender.ping(e || _, t, n))
              : F(this, e, n)
          }
          pong(e, t, n) {
            if (this.readyState === $.CONNECTING) {
              throw new Error(
                'WebSocket is not open: readyState 0 (CONNECTING)'
              )
            }
            'function' == typeof e
              ? ((n = e), (e = t = void 0))
              : 'function' == typeof t && ((n = t), (t = void 0))
            'number' == typeof e && (e = e.toString())
            this.readyState === $.OPEN
              ? (void 0 === t && (t = !this._isServer),
                this._sender.pong(e || _, t, n))
              : F(this, e, n)
          }
          resume() {
            this.readyState !== $.CONNECTING &&
              this.readyState !== $.CLOSED &&
              ((this._paused = false),
              this._receiver._writableState.needDrain || this._socket.resume())
          }
          send(e, t, n) {
            if (this.readyState === $.CONNECTING) {
              throw new Error(
                'WebSocket is not open: readyState 0 (CONNECTING)'
              )
            }
            if (
              ('function' == typeof t && ((n = t), (t = {})),
              'number' == typeof e && (e = e.toString()),
              this.readyState !== $.OPEN)
            ) {
              return void F(this, e, n)
            }
            const i = {
              binary: 'string' != typeof e,
              mask: !this._isServer,
              compress: true,
              fin: true,
              ...t,
            }
            this._extensions[u.extensionName] || (i.compress = false)
            this._sender.send(e || _, i, n)
          }
          terminate() {
            if (this.readyState !== $.CLOSED) {
              if (this.readyState !== $.CONNECTING) {
                this._socket &&
                  ((this._readyState = $.CLOSING), this._socket.destroy())
              } else {
                const e =
                  'WebSocket was closed before the connection was established'
                D(
                  this,
                  this._req,
                  'WebSocket was closed before the connection was established'
                )
              }
            }
          }
        }
      function P(e, t, n, r) {
        const a = {
          allowSynchronousEvents: true,
          autoPong: true,
          protocolVersion: C[1],
          maxPayload: 104857600,
          skipUTF8Validation: false,
          perMessageDeflate: true,
          followRedirects: false,
          maxRedirects: 10,
          ...r,
          socketPath: void 0,
          hostname: void 0,
          protocol: void 0,
          timeout: void 0,
          method: 'GET',
          host: void 0,
          path: void 0,
          port: void 0,
        }
        if (((e._autoPong = a.autoPong), !C.includes(a.protocolVersion))) {
          throw new RangeError(
            `Unsupported protocol version: ${
              a.protocolVersion
            } (supported versions: ${C.join(', ')})`
          )
        }
        let c
        if (t instanceof d) {
          c = t
        } else {
          try {
            c = new d(t)
          } catch (e) {
            throw new SyntaxError(`Invalid URL: ${t}`)
          }
        }
        'http:' === c.protocol
          ? (c.protocol = 'ws:')
          : 'https:' === c.protocol && (c.protocol = 'wss:')
        e._url = c.href
        const h = 'wss:' === c.protocol,
          p = 'ws+unix:' === c.protocol
        let f
        if (
          ('ws:' === c.protocol || h || p
            ? p && !c.pathname
              ? (f = "The URL's pathname is empty")
              : c.hash && (f = 'The URL contains a fragment identifier')
            : (f =
                'The URL\'s protocol must be one of "ws:", "wss:", "http:", "https", or "ws+unix:"'),
          f)
        ) {
          const t = new SyntaxError(f)
          if (0 === e._redirects) {
            throw t
          }
          return void R(e, t)
        }
        const m = h ? 443 : 80,
          g = o(16).toString('base64'),
          _ = h ? i.request : s.request,
          b = new Set()
        let y, v
        if (
          ((a.createConnection = a.createConnection || (h ? B : M)),
          (a.defaultPort = a.defaultPort || m),
          (a.port = c.port || m),
          (a.host = c.hostname.startsWith('[')
            ? c.hostname.slice(1, -1)
            : c.hostname),
          (a.headers = {
            ...a.headers,
            'Sec-WebSocket-Version': a.protocolVersion,
            'Sec-WebSocket-Key': g,
            Connection: 'Upgrade',
            Upgrade: 'websocket',
          }),
          (a.path = c.pathname + c.search),
          (a.timeout = a.handshakeTimeout),
          a.perMessageDeflate &&
            ((y = new u(
              true !== a.perMessageDeflate ? a.perMessageDeflate : {},
              false,
              a.maxPayload
            )),
            (a.headers['Sec-WebSocket-Extensions'] = T({
              [u.extensionName]: y.offer(),
            }))),
          n.length)
        ) {
          for (const e of n) {
            if (
              'string' != typeof e ||
              !/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/.test(e) ||
              b.has(e)
            ) {
              throw new SyntaxError(
                'An invalid or duplicated subprotocol was specified'
              )
            }
            b.add(e)
          }
          a.headers['Sec-WebSocket-Protocol'] = n.join(',')
        }
        if (
          (a.origin &&
            (a.protocolVersion < 13
              ? (a.headers['Sec-WebSocket-Origin'] = a.origin)
              : (a.headers.Origin = a.origin)),
          (c.username || c.password) &&
            (a.auth = `${c.username}:${c.password}`),
          p)
        ) {
          const e = a.path.split(':')
          a.socketPath = e[0]
          a.path = e[1]
        }
        if (a.followRedirects) {
          if (0 === e._redirects) {
            e._originalIpc = p
            e._originalSecure = h
            e._originalHostOrSocketPath = p ? a.socketPath : c.host
            const t = r && r.headers
            if (
              ((r = {
                ...r,
                headers: {},
              }),
              t)
            ) {
              for (const [e, n] of Object.entries(t))
                r.headers[e.toLowerCase()] = n
            }
          } else {
            if (0 === e.listenerCount('redirect')) {
              const t = p
                ? !!e._originalIpc &&
                  a.socketPath === e._originalHostOrSocketPath
                : !e._originalIpc && c.host === e._originalHostOrSocketPath
              ;(!t || (e._originalSecure && !h)) &&
                (delete a.headers.authorization,
                delete a.headers.cookie,
                t || delete a.headers.host,
                (a.auth = void 0))
            }
          }
          a.auth &&
            !r.headers.authorization &&
            (r.headers.authorization =
              'Basic ' + Buffer.from(a.auth).toString('base64'))
          v = e._req = _(a)
          e._redirects && e.emit('redirect', e.url, v)
        } else {
          v = e._req = _(a)
        }
        a.timeout &&
          v.on('timeout', () => {
            D(e, v, 'Opening handshake has timed out')
          })
        v.on('error', (t) => {
          null === v || v[L] || ((v = e._req = null), R(e, t))
        })
        v.on('response', (i) => {
          const s = i.headers.location,
            o = i.statusCode
          if (s && a.followRedirects && o >= 300 && o < 400) {
            if (++e._redirects > a.maxRedirects) {
              return void D(e, v, 'Maximum redirects exceeded')
            }
            let i
            v.abort()
            try {
              i = new d(s, t)
            } catch (t) {
              const n = new SyntaxError(`Invalid URL: ${s}`)
              return void R(e, n)
            }
            P(e, i, n, r)
          } else {
            e.emit('unexpected-response', v, i) ||
              D(e, v, `Unexpected server response: ${i.statusCode}`)
          }
        })
        v.on('upgrade', (t, n, i) => {
          if ((e.emit('upgrade', t), e.readyState !== $.CONNECTING)) {
            return
          }
          v = e._req = null
          const s = t.headers.upgrade
          if (void 0 === s || 'websocket' !== s.toLowerCase()) {
            return void D(e, n, 'Invalid Upgrade header')
          }
          const r = l('sha1')
            .update(g + k)
            .digest('base64')
          if (t.headers['sec-websocket-accept'] !== r) {
            return void D(e, n, 'Invalid Sec-WebSocket-Accept header')
          }
          const o = t.headers['sec-websocket-protocol']
          let c
          if (
            (void 0 !== o
              ? b.size
                ? b.has(o) || (c = 'Server sent an invalid subprotocol')
                : (c = 'Server sent a subprotocol but none was requested')
              : b.size && (c = 'Server sent no subprotocol'),
            c)
          ) {
            return void D(e, n, c)
          }
          o && (e._protocol = o)
          const h = t.headers['sec-websocket-extensions']
          if (void 0 !== h) {
            if (!y) {
              return void D(
                e,
                n,
                'Server sent a Sec-WebSocket-Extensions header but no extension was requested'
              )
            }
            let t
            try {
              t = I(h)
            } catch (t) {
              return void D(e, n, 'Invalid Sec-WebSocket-Extensions header')
            }
            const i = Object.keys(t)
            if (1 !== i.length || i[0] !== u.extensionName) {
              return void D(
                e,
                n,
                'Server indicated an extension that was not requested'
              )
            }
            try {
              y.accept(t[u.extensionName])
            } catch (t) {
              return void D(e, n, 'Invalid Sec-WebSocket-Extensions header')
            }
            e._extensions[u.extensionName] = y
          }
          e.setSocket(n, i, {
            allowSynchronousEvents: a.allowSynchronousEvents,
            generateMask: a.generateMask,
            maxPayload: a.maxPayload,
            skipUTF8Validation: a.skipUTF8Validation,
          })
        })
        a.finishRequest ? a.finishRequest(v, e) : v.end()
      }
      function R(e, t) {
        e._readyState = $.CLOSING
        e._errorEmitted = true
        e.emit('error', t)
        e.emitClose()
      }
      function M(e) {
        return (e.path = e.socketPath), r.connect(e)
      }
      function B(e) {
        return (
          (e.path = void 0),
          e.servername ||
            '' === e.servername ||
            (e.servername = r.isIP(e.host) ? '' : e.host),
          a.connect(e)
        )
      }
      function D(e, t, n) {
        e._readyState = $.CLOSING
        const i = new Error(n)
        Error.captureStackTrace(i, D)
        t.setHeader
          ? ((t[L] = true),
            t.abort(),
            t.socket && !t.socket.destroyed && t.socket.destroy(),
            process.nextTick(R, e, i))
          : (t.destroy(i),
            t.once('error', e.emit.bind(e, 'error')),
            t.once('close', e.emitClose.bind(e)))
      }
      function F(e, t, n) {
        if (t) {
          const n = m(t) ? t.size : N(t).length
          e._socket ? (e._sender._bufferedBytes += n) : (e._bufferedAmount += n)
        }
        if (n) {
          const t = new Error(
            `WebSocket is not open: readyState ${e.readyState} (${
              O[e.readyState]
            })`
          )
          process.nextTick(n, t)
        }
      }
      function q(e, t) {
        const n = this[x]
        n._closeFrameReceived = true
        n._closeMessage = t
        n._closeCode = e
        void 0 !== n._socket[x] &&
          (n._socket.removeListener('data', Y),
          process.nextTick(H, n._socket),
          1005 === e ? n.close() : n.close(e, t))
      }
      function U() {
        const e = this[x]
        e.isPaused || e._socket.resume()
      }
      function j(e) {
        const t = this[x]
        void 0 !== t._socket[x] &&
          (t._socket.removeListener('data', Y),
          process.nextTick(H, t._socket),
          t.close(e[v]))
        t._errorEmitted || ((t._errorEmitted = true), t.emit('error', e))
      }
      function z() {
        this[x].emitClose()
      }
      function W(e, t) {
        this[x].emit('message', e, t)
      }
      function V(e) {
        const t = this[x]
        t._autoPong && t.pong(e, !this._isServer, w)
        t.emit('ping', e)
      }
      function J(e) {
        this[x].emit('pong', e)
      }
      function H(e) {
        e.resume()
      }
      function G(e) {
        const t = this[x]
        t.readyState !== $.CLOSED &&
          (t.readyState === $.OPEN && ((t._readyState = $.CLOSING), Z(t)),
          this._socket.end(),
          t._errorEmitted || ((t._errorEmitted = true), t.emit('error', e)))
      }
      function Z(e) {
        e._closeTimer = setTimeout(e._socket.destroy.bind(e._socket), 30000)
      }
      function K() {
        const e = this[x]
        let t
        this.removeListener('close', K)
        this.removeListener('data', Y)
        this.removeListener('end', Q)
        e._readyState = $.CLOSING
        this._readableState.endEmitted ||
          e._closeFrameReceived ||
          e._receiver._writableState.errorEmitted ||
          null === (t = e._socket.read()) ||
          e._receiver.write(t)
        e._receiver.end()
        this[x] = void 0
        clearTimeout(e._closeTimer)
        e._receiver._writableState.finished ||
        e._receiver._writableState.errorEmitted
          ? e.emitClose()
          : (e._receiver.on('error', z), e._receiver.on('finish', z))
      }
      function Y(e) {
        this[x]._receiver.write(e) || this.pause()
      }
      function Q() {
        const e = this[x]
        e._readyState = $.CLOSING
        e._receiver.end()
        this.end()
      }
      function X() {
        const e = this[x]
        this.removeListener('error', X)
        this.on('error', w)
        e && ((e._readyState = $.CLOSING), this.destroy())
      }
      Object.defineProperty($, 'CONNECTING', {
        enumerable: true,
        value: O.indexOf('CONNECTING'),
      })
      Object.defineProperty($.prototype, 'CONNECTING', {
        enumerable: true,
        value: O.indexOf('CONNECTING'),
      })
      Object.defineProperty($, 'OPEN', {
        enumerable: true,
        value: O.indexOf('OPEN'),
      })
      Object.defineProperty($.prototype, 'OPEN', {
        enumerable: true,
        value: O.indexOf('OPEN'),
      })
      Object.defineProperty($, 'CLOSING', {
        enumerable: true,
        value: O.indexOf('CLOSING'),
      })
      Object.defineProperty($.prototype, 'CLOSING', {
        enumerable: true,
        value: O.indexOf('CLOSING'),
      })
      Object.defineProperty($, 'CLOSED', {
        enumerable: true,
        value: O.indexOf('CLOSED'),
      })
      Object.defineProperty($.prototype, 'CLOSED', {
        enumerable: true,
        value: O.indexOf('CLOSED'),
      })
      ;[
        'binaryType',
        'bufferedAmount',
        'extensions',
        'isPaused',
        'protocol',
        'readyState',
        'url',
      ].forEach((e) => {
        Object.defineProperty($.prototype, e, { enumerable: true })
      })
      ;['open', 'error', 'close', 'message'].forEach((e) => {
        Object.defineProperty($.prototype, `on${e}`, {
          enumerable: true,
          get() {
            for (const t of this.listeners(e))
              if (t[b]) {
                return t[y]
              }
            return null
          },
          set(t) {
            for (const t of this.listeners(e))
              if (t[b]) {
                this.removeListener(e, t)
                break
              }
            'function' == typeof t && this.addEventListener(e, t, { [b]: true })
          },
        })
      })
      $.prototype.addEventListener = S
      $.prototype.removeEventListener = E
      t.exports = $
    },
  }),
  require_subprotocol = __commonJS({
    'node_modules/ws/lib/subprotocol.js'(e, t) {
      'use strict'
      var { tokenChars: n } = require_validation()
      t.exports = {
        parse: function (e) {
          const t = new Set()
          let i = -1,
            s = -1,
            r = 0
          for (; r < e.length; r++) {
            const a = e.charCodeAt(r)
            if (-1 === s && 1 === n[a]) {
              ;-1 === i && (i = r)
            } else {
              if (0 === r || (32 !== a && 9 !== a)) {
                if (44 !== a) {
                  throw new SyntaxError(`Unexpected character at index ${r}`)
                }
                {
                  if (-1 === i) {
                    throw new SyntaxError(`Unexpected character at index ${r}`)
                  }
                  ;-1 === s && (s = r)
                  const n = e.slice(i, s)
                  if (t.has(n)) {
                    throw new SyntaxError(
                      `The "${n}" subprotocol is duplicated`
                    )
                  }
                  t.add(n)
                  i = s = -1
                }
              } else {
                ;-1 === s && -1 !== i && (s = r)
              }
            }
          }
          if (-1 === i || -1 !== s) {
            throw new SyntaxError('Unexpected end of input')
          }
          const a = e.slice(i, r)
          if (t.has(a)) {
            throw new SyntaxError(`The "${a}" subprotocol is duplicated`)
          }
          return t.add(a), t
        },
      }
    },
  }),
  require_websocket_server = __commonJS({
    'node_modules/ws/lib/websocket-server.js'(e, t) {
      'use strict'
      var n = require('events'),
        i = require('http'),
        { Duplex: s } = require('stream'),
        { createHash: r } = require('crypto'),
        a = require_extension(),
        o = require_permessage_deflate(),
        l = require_subprotocol(),
        c = require_websocket(),
        { GUID: h, kWebSocket: d } = require_constants()
      function p(e) {
        e._state = 2
        e.emit('close')
      }
      function f() {
        this.destroy()
      }
      function m(e, t, n, s) {
        n = n || i.STATUS_CODES[t]
        s = {
          Connection: 'close',
          'Content-Type': 'text/html',
          'Content-Length': Buffer.byteLength(n),
          ...s,
        }
        e.once('finish', e.destroy)
        e.end(
          `HTTP/1.1 ${t} ${i.STATUS_CODES[t]}\r\n` +
            Object.keys(s)
              .map((e) => `${e}: ${s[e]}`)
              .join('\r\n') +
            '\r\n\r\n' +
            n
        )
      }
      function g(e, t, n, i, s) {
        if (e.listenerCount('wsClientError')) {
          const i = new Error(s)
          Error.captureStackTrace(i, g)
          e.emit('wsClientError', i, n, t)
        } else {
          m(n, i, s)
        }
      }
      t.exports = class extends n {
        constructor(e, t) {
          if (
            (super(),
            (null ==
              (e = {
                allowSynchronousEvents: true,
                autoPong: true,
                maxPayload: 104857600,
                skipUTF8Validation: false,
                perMessageDeflate: false,
                handleProtocols: null,
                clientTracking: true,
                verifyClient: null,
                noServer: false,
                backlog: null,
                server: null,
                host: null,
                path: null,
                port: null,
                WebSocket: c,
                ...e,
              }).port &&
              !e.server &&
              !e.noServer) ||
              (null != e.port && (e.server || e.noServer)) ||
              (e.server && e.noServer))
          ) {
            throw new TypeError(
              'One and only one of the "port", "server", or "noServer" options must be specified'
            )
          }
          if (
            (null != e.port
              ? ((this._server = i.createServer((e, t) => {
                  const n = i.STATUS_CODES[426]
                  t.writeHead(426, {
                    'Content-Length': n.length,
                    'Content-Type': 'text/plain',
                  })
                  t.end(n)
                })),
                this._server.listen(e.port, e.host, e.backlog, t))
              : e.server && (this._server = e.server),
            this._server)
          ) {
            const e = this.emit.bind(this, 'connection')
            this._removeListeners = (function (e, t) {
              for (const n of Object.keys(t)) e.on(n, t[n])
              return function () {
                for (const n of Object.keys(t)) e.removeListener(n, t[n])
              }
            })(this._server, {
              listening: this.emit.bind(this, 'listening'),
              error: this.emit.bind(this, 'error'),
              upgrade: (t, n, i) => {
                this.handleUpgrade(t, n, i, e)
              },
            })
          }
          true === e.perMessageDeflate && (e.perMessageDeflate = {})
          e.clientTracking &&
            ((this.clients = new Set()), (this._shouldEmitClose = false))
          this.options = e
          this._state = 0
        }
        address() {
          if (this.options.noServer) {
            throw new Error('The server is operating in "noServer" mode')
          }
          return this._server ? this._server.address() : null
        }
        close(e) {
          if (2 === this._state) {
            return (
              e &&
                this.once('close', () => {
                  e(new Error('The server is not running'))
                }),
              void process.nextTick(p, this)
            )
          }
          if ((e && this.once('close', e), 1 !== this._state)) {
            if (
              ((this._state = 1), this.options.noServer || this.options.server)
            ) {
              this._server &&
                (this._removeListeners(),
                (this._removeListeners = this._server = null))
              this.clients && this.clients.size
                ? (this._shouldEmitClose = true)
                : process.nextTick(p, this)
            } else {
              const e = this._server
              this._removeListeners()
              this._removeListeners = this._server = null
              e.close(() => {
                p(this)
              })
            }
          }
        }
        shouldHandle(e) {
          if (this.options.path) {
            const t = e.url.indexOf('?')
            if ((-1 !== t ? e.url.slice(0, t) : e.url) !== this.options.path) {
              return false
            }
          }
          return true
        }
        handleUpgrade(e, t, n, i) {
          t.on('error', f)
          const s = e.headers['sec-websocket-key'],
            r = e.headers.upgrade,
            c = +e.headers['sec-websocket-version']
          if ('GET' !== e.method) {
            return void g(this, e, t, 405, 'Invalid HTTP method')
          }
          if (void 0 === r || 'websocket' !== r.toLowerCase()) {
            return void g(this, e, t, 400, 'Invalid Upgrade header')
          }
          if (void 0 === s || !/^[+/0-9A-Za-z]{22}==$/.test(s)) {
            return void g(
              this,
              e,
              t,
              400,
              'Missing or invalid Sec-WebSocket-Key header'
            )
          }
          if (8 !== c && 13 !== c) {
            return void g(
              this,
              e,
              t,
              400,
              'Missing or invalid Sec-WebSocket-Version header'
            )
          }
          if (!this.shouldHandle(e)) {
            return void m(t, 400)
          }
          const h = e.headers['sec-websocket-protocol']
          let d = new Set()
          if (void 0 !== h) {
            try {
              d = l.parse(h)
            } catch (n) {
              return void g(
                this,
                e,
                t,
                400,
                'Invalid Sec-WebSocket-Protocol header'
              )
            }
          }
          const p = e.headers['sec-websocket-extensions'],
            _ = {}
          if (this.options.perMessageDeflate && void 0 !== p) {
            const n = new o(
              this.options.perMessageDeflate,
              true,
              this.options.maxPayload
            )
            try {
              const e = a.parse(p)
              e[o.extensionName] &&
                (n.accept(e[o.extensionName]), (_[o.extensionName] = n))
            } catch (n) {
              return void g(
                this,
                e,
                t,
                400,
                'Invalid or unacceptable Sec-WebSocket-Extensions header'
              )
            }
          }
          if (this.options.verifyClient) {
            const r = {
              origin:
                e.headers['' + (8 === c ? 'sec-websocket-origin' : 'origin')],
              secure: !(!e.socket.authorized && !e.socket.encrypted),
              req: e,
            }
            if (2 === this.options.verifyClient.length) {
              return void this.options.verifyClient(r, (r, a, o, l) => {
                if (!r) {
                  return m(t, a || 401, o, l)
                }
                this.completeUpgrade(_, s, d, e, t, n, i)
              })
            }
            if (!this.options.verifyClient(r)) {
              return m(t, 401)
            }
          }
          this.completeUpgrade(_, s, d, e, t, n, i)
        }
        completeUpgrade(e, t, n, i, s, l, c) {
          if (!s.readable || !s.writable) {
            return s.destroy()
          }
          if (s[d]) {
            throw new Error(
              'server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration'
            )
          }
          if (this._state > 0) {
            return m(s, 503)
          }
          const u = [
              'HTTP/1.1 101 Switching Protocols',
              'Upgrade: websocket',
              'Connection: Upgrade',
              `Sec-WebSocket-Accept: ${r('sha1')
                .update(t + h)
                .digest('base64')}`,
            ],
            g = new this.options.WebSocket(null, void 0, this.options)
          if (n.size) {
            const e = this.options.handleProtocols
              ? this.options.handleProtocols(n, i)
              : n.values().next().value
            e && (u.push(`Sec-WebSocket-Protocol: ${e}`), (g._protocol = e))
          }
          if (e[o.extensionName]) {
            const t = e[o.extensionName].params,
              n = a.format({ [o.extensionName]: [t] })
            u.push(`Sec-WebSocket-Extensions: ${n}`)
            g._extensions = e
          }
          this.emit('headers', u, i)
          s.write(u.concat('\r\n').join('\r\n'))
          s.removeListener('error', f)
          g.setSocket(s, l, {
            allowSynchronousEvents: this.options.allowSynchronousEvents,
            maxPayload: this.options.maxPayload,
            skipUTF8Validation: this.options.skipUTF8Validation,
          })
          this.clients &&
            (this.clients.add(g),
            g.on('close', () => {
              this.clients.delete(g)
              this._shouldEmitClose &&
                !this.clients.size &&
                process.nextTick(p, this)
            }))
          c(g, i)
        }
      }
    },
  }),
  require_mark = __commonJS({
    'node_modules/mark.js/dist/mark.js'(e, t) {
      var n, i
      n = e
      i = function () {
        'use strict'
        var e =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e
                },
          t = function (e, t) {
            if (!(e instanceof t)) {
              throw new TypeError('Cannot call a class as a function')
            }
          },
          n = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n]
                i.enumerable = i.enumerable || false
                i.configurable = true
                'value' in i && (i.writable = true)
                Object.defineProperty(e, i.key, i)
              }
            }
            return function (t, n, i) {
              return n && e(t.prototype, n), i && e(t, i), t
            }
          })(),
          i =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t]
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
              }
              return e
            },
          s = (function () {
            function e(n) {
              var i =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1],
                s =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : [],
                r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 5000
              t(this, e)
              this.ctx = n
              this.iframes = i
              this.exclude = s
              this.iframesTimeout = r
            }
            return (
              n(
                e,
                [
                  {
                    key: 'getContexts',
                    value: function () {
                      var e = []
                      return (
                        (void 0 !== this.ctx && this.ctx
                          ? NodeList.prototype.isPrototypeOf(this.ctx)
                            ? Array.prototype.slice.call(this.ctx)
                            : Array.isArray(this.ctx)
                            ? this.ctx
                            : 'string' == typeof this.ctx
                            ? Array.prototype.slice.call(
                                document.querySelectorAll(this.ctx)
                              )
                            : [this.ctx]
                          : []
                        ).forEach(function (t) {
                          var n =
                            e.filter(function (e) {
                              return e.contains(t)
                            }).length > 0
                          ;-1 !== e.indexOf(t) || n || e.push(t)
                        }),
                        e
                      )
                    },
                  },
                  {
                    key: 'getIframeContents',
                    value: function (e, t) {
                      var n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : function () {},
                        i = void 0
                      try {
                        var s = e.contentWindow
                        if (((i = s.document), !s || !i)) {
                          throw new Error('iframe inaccessible')
                        }
                      } catch (e) {
                        n()
                      }
                      i && t(i)
                    },
                  },
                  {
                    key: 'isIframeBlank',
                    value: function (e) {
                      var n = e.getAttribute('src').trim()
                      return (
                        e.contentWindow.location.href === 'about:blank' &&
                        n !== 'about:blank' &&
                        n
                      )
                    },
                  },
                  {
                    key: 'observeIframeLoad',
                    value: function (e, t, n) {
                      var i = this,
                        s = false,
                        r = null,
                        a = function a() {
                          if (!s) {
                            s = true
                            clearTimeout(r)
                            try {
                              i.isIframeBlank(e) ||
                                (e.removeEventListener('load', a),
                                i.getIframeContents(e, t, n))
                            } catch (e) {
                              n()
                            }
                          }
                        }
                      e.addEventListener('load', a)
                      r = setTimeout(a, this.iframesTimeout)
                    },
                  },
                  {
                    key: 'onIframeReady',
                    value: function (e, t, n) {
                      try {
                        'complete' === e.contentWindow.document.readyState
                          ? this.isIframeBlank(e)
                            ? this.observeIframeLoad(e, t, n)
                            : this.getIframeContents(e, t, n)
                          : this.observeIframeLoad(e, t, n)
                      } catch (e) {
                        n()
                      }
                    },
                  },
                  {
                    key: 'waitForIframes',
                    value: function (e, t) {
                      var n = this,
                        i = 0
                      this.forEachIframe(
                        e,
                        function () {
                          return true
                        },
                        function (e) {
                          i++
                          n.waitForIframes(
                            e.querySelector('html'),
                            function () {
                              --i || t()
                            }
                          )
                        },
                        function (e) {
                          e || t()
                        }
                      )
                    },
                  },
                  {
                    key: 'forEachIframe',
                    value: function (t, n, i) {
                      var s = this,
                        r =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : function () {},
                        a = t.querySelectorAll('iframe'),
                        o = a.length,
                        l = 0
                      a = Array.prototype.slice.call(a)
                      var c = function () {
                        --o <= 0 && r(l)
                      }
                      o || c()
                      a.forEach(function (t) {
                        e.matches(t, s.exclude)
                          ? c()
                          : s.onIframeReady(
                              t,
                              function (e) {
                                n(t) && (l++, i(e))
                                c()
                              },
                              c
                            )
                      })
                    },
                  },
                  {
                    key: 'createIterator',
                    value: function (e, t, n) {
                      return document.createNodeIterator(e, t, n, false)
                    },
                  },
                  {
                    key: 'createInstanceOnIframe',
                    value: function (t) {
                      return new e(t.querySelector('html'), this.iframes)
                    },
                  },
                  {
                    key: 'compareNodeIframe',
                    value: function (e, t, n) {
                      if (
                        e.compareDocumentPosition(n) &
                        Node.DOCUMENT_POSITION_PRECEDING
                      ) {
                        if (null === t) {
                          return true
                        }
                        if (
                          t.compareDocumentPosition(n) &
                          Node.DOCUMENT_POSITION_FOLLOWING
                        ) {
                          return true
                        }
                      }
                      return false
                    },
                  },
                  {
                    key: 'getIteratorNode',
                    value: function (e) {
                      var t = e.previousNode()
                      return {
                        prevNode: t,
                        node: (null === t || e.nextNode()) && e.nextNode(),
                      }
                    },
                  },
                  {
                    key: 'checkIframeFilter',
                    value: function (e, t, n, i) {
                      var s = false,
                        r = false
                      return (
                        i.forEach(function (e, t) {
                          e.val === n && ((s = t), (r = e.handled))
                        }),
                        this.compareNodeIframe(e, t, n)
                          ? (false !== s || r
                              ? false === s || r || (i[s].handled = true)
                              : i.push({
                                  val: n,
                                  handled: true,
                                }),
                            true)
                          : (false === s &&
                              i.push({
                                val: n,
                                handled: false,
                              }),
                            false)
                      )
                    },
                  },
                  {
                    key: 'handleOpenIframes',
                    value: function (e, t, n, i) {
                      var s = this
                      e.forEach(function (e) {
                        e.handled ||
                          s.getIframeContents(e.val, function (e) {
                            s.createInstanceOnIframe(e).forEachNode(t, n, i)
                          })
                      })
                    },
                  },
                  {
                    key: 'iterateThroughNodes',
                    value: function (e, t, n, i, s) {
                      for (
                        var r,
                          a = this,
                          o = this.createIterator(t, e, i),
                          l = [],
                          c = [],
                          h = void 0,
                          d = void 0;
                        (r = void 0),
                          (r = a.getIteratorNode(o)),
                          (d = r.prevNode),
                          (h = r.node);

                      ) {
                        this.iframes &&
                          this.forEachIframe(
                            t,
                            function (e) {
                              return a.checkIframeFilter(h, d, e, l)
                            },
                            function (t) {
                              a.createInstanceOnIframe(t).forEachNode(
                                e,
                                function (e) {
                                  return c.push(e)
                                },
                                i
                              )
                            }
                          )
                        c.push(h)
                      }
                      c.forEach(function (e) {
                        n(e)
                      })
                      this.iframes && this.handleOpenIframes(l, e, n, i)
                      s()
                    },
                  },
                  {
                    key: 'forEachNode',
                    value: function (e, t, n) {
                      var i = this,
                        s =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : function () {},
                        r = this.getContexts(),
                        a = r.length
                      a || s()
                      r.forEach(function (r) {
                        var o = function () {
                          i.iterateThroughNodes(e, r, t, n, function () {
                            --a <= 0 && s()
                          })
                        }
                        i.iframes ? i.waitForIframes(r, o) : o()
                      })
                    },
                  },
                ],
                [
                  {
                    key: 'matches',
                    value: function (e, t) {
                      var n = 'string' == typeof t ? [t] : t,
                        i =
                          e.matches ||
                          e.matchesSelector ||
                          e.msMatchesSelector ||
                          e.mozMatchesSelector ||
                          e.oMatchesSelector ||
                          e.webkitMatchesSelector
                      if (i) {
                        var s = false
                        return (
                          n.every(function (t) {
                            return !i.call(e, t) || ((s = true), false)
                          }),
                          s
                        )
                      }
                      return false
                    },
                  },
                ]
              ),
              e
            )
          })(),
          r = (function () {
            function r(e) {
              t(this, r)
              this.ctx = e
              this.ie = false
              var n = window.navigator.userAgent
              ;(n.indexOf('MSIE') > -1 || n.indexOf('Trident') > -1) &&
                (this.ie = true)
            }
            return (
              n(r, [
                {
                  key: 'log',
                  value: function (t) {
                    var n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 'debug',
                      i = this.opt.log
                    this.opt.debug &&
                      'object' === (void 0 === i ? 'undefined' : e(i)) &&
                      'function' == typeof i[n] &&
                      i[n]('mark.js: ' + t)
                  },
                },
                {
                  key: 'escapeStr',
                  value: function (e) {
                    return e.replace(
                      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                      '\\$&'
                    )
                  },
                },
                {
                  key: 'createRegExp',
                  value: function (e) {
                    return (
                      'disabled' !== this.opt.wildcards &&
                        (e = this.setupWildcardsRegExp(e)),
                      (e = this.escapeStr(e)),
                      Object.keys(this.opt.synonyms).length &&
                        (e = this.createSynonymsRegExp(e)),
                      (this.opt.ignoreJoiners ||
                        this.opt.ignorePunctuation.length) &&
                        (e = this.setupIgnoreJoinersRegExp(e)),
                      this.opt.diacritics &&
                        (e = this.createDiacriticsRegExp(e)),
                      (e = this.createMergedBlanksRegExp(e)),
                      (this.opt.ignoreJoiners ||
                        this.opt.ignorePunctuation.length) &&
                        (e = this.createJoinersRegExp(e)),
                      'disabled' !== this.opt.wildcards &&
                        (e = this.createWildcardsRegExp(e)),
                      (e = this.createAccuracyRegExp(e))
                    )
                  },
                },
                {
                  key: 'createSynonymsRegExp',
                  value: function (e) {
                    var t = this.opt.synonyms,
                      n = this.opt.caseSensitive ? '' : 'i',
                      i =
                        this.opt.ignoreJoiners ||
                        this.opt.ignorePunctuation.length
                          ? '\0'
                          : ''
                    for (var s in t)
                      if (t.hasOwnProperty(s)) {
                        var r = t[s],
                          a =
                            'disabled' !== this.opt.wildcards
                              ? this.setupWildcardsRegExp(s)
                              : this.escapeStr(s),
                          o =
                            'disabled' !== this.opt.wildcards
                              ? this.setupWildcardsRegExp(r)
                              : this.escapeStr(r)
                        '' !== a &&
                          '' !== o &&
                          (e = e.replace(
                            new RegExp(
                              '(' +
                                this.escapeStr(a) +
                                '|' +
                                this.escapeStr(o) +
                                ')',
                              'gm' + n
                            ),
                            i +
                              '(' +
                              this.processSynomyms(a) +
                              '|' +
                              this.processSynomyms(o) +
                              ')' +
                              i
                          ))
                      }
                    return e
                  },
                },
                {
                  key: 'processSynomyms',
                  value: function (e) {
                    return (
                      (this.opt.ignoreJoiners ||
                        this.opt.ignorePunctuation.length) &&
                        (e = this.setupIgnoreJoinersRegExp(e)),
                      e
                    )
                  },
                },
                {
                  key: 'setupWildcardsRegExp',
                  value: function (e) {
                    return (e = e.replace(/(?:\\)*\?/g, function (e) {
                      return '\\' === e.charAt(0) ? '?' : '\x01'
                    })).replace(/(?:\\)*\*/g, function (e) {
                      return '\\' === e.charAt(0) ? '*' : '\x02'
                    })
                  },
                },
                {
                  key: 'createWildcardsRegExp',
                  value: function (e) {
                    var t = 'withSpaces' === this.opt.wildcards
                    return e
                      .replace(/\u0001/g, t ? '[\\S\\s]?' : '\\S?')
                      .replace(/\u0002/g, t ? '[\\S\\s]*?' : '\\S*')
                  },
                },
                {
                  key: 'setupIgnoreJoinersRegExp',
                  value: function (e) {
                    return e.replace(/[^(|)\\]/g, function (e, t, n) {
                      var i = n.charAt(t + 1)
                      return /[(|)\\]/.test(i) || '' === i ? e : e + '\0'
                    })
                  },
                },
                {
                  key: 'createJoinersRegExp',
                  value: function (e) {
                    var t = [],
                      n = this.opt.ignorePunctuation
                    return (
                      Array.isArray(n) &&
                        n.length &&
                        t.push(this.escapeStr(n.join(''))),
                      this.opt.ignoreJoiners &&
                        t.push('\\u00ad\\u200b\\u200c\\u200d'),
                      t.length
                        ? e.split(/\u0000+/).join('[' + t.join('') + ']*')
                        : e
                    )
                  },
                },
                {
                  key: 'createDiacriticsRegExp',
                  value: function (e) {
                    var t = this.opt.caseSensitive ? '' : 'i',
                      n = this.opt.caseSensitive
                        ? [
                            'aàáảãạăằắẳẵặâầấẩẫậäåāą',
                            'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                            'cçćč',
                            'CÇĆČ',
                            'dđď',
                            'DĐĎ',
                            'eèéẻẽẹêềếểễệëěēę',
                            'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                            'iìíỉĩịîïī',
                            'IÌÍỈĨỊÎÏĪ',
                            'lł',
                            'LŁ',
                            'nñňń',
                            'NÑŇŃ',
                            'oòóỏõọôồốổỗộơởỡớờợöøō',
                            'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                            'rř',
                            'RŘ',
                            'sšśșş',
                            'SŠŚȘŞ',
                            'tťțţ',
                            'TŤȚŢ',
                            'uùúủũụưừứửữựûüůū',
                            'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                            'yýỳỷỹỵÿ',
                            'YÝỲỶỸỴŸ',
                            'zžżź',
                            'ZŽŻŹ',
                          ]
                        : [
                            'aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                            'cçćčCÇĆČ',
                            'dđďDĐĎ',
                            'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                            'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ',
                            'lłLŁ',
                            'nñňńNÑŇŃ',
                            'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                            'rřRŘ',
                            'sšśșşSŠŚȘŞ',
                            'tťțţTŤȚŢ',
                            'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                            'yýỳỷỹỵÿYÝỲỶỸỴŸ',
                            'zžżźZŽŻŹ',
                          ],
                      i = []
                    return (
                      e.split('').forEach(function (s) {
                        n.every(function (n) {
                          if (-1 !== n.indexOf(s)) {
                            if (i.indexOf(n) > -1) {
                              return false
                            }
                            e = e.replace(
                              new RegExp('[' + n + ']', 'gm' + t),
                              '[' + n + ']'
                            )
                            i.push(n)
                          }
                          return true
                        })
                      }),
                      e
                    )
                  },
                },
                {
                  key: 'createMergedBlanksRegExp',
                  value: function (e) {
                    return e.replace(/[\s]+/gim, '[\\s]+')
                  },
                },
                {
                  key: 'createAccuracyRegExp',
                  value: function (e) {
                    var t = this,
                      n = this.opt.accuracy,
                      i = 'string' == typeof n ? n : n.value,
                      s = 'string' == typeof n ? [] : n.limiters,
                      r = ''
                    switch (
                      (s.forEach(function (e) {
                        r += '|' + t.escapeStr(e)
                      }),
                      i)
                    ) {
                      case 'partially':
                      default:
                        return '()(' + e + ')'
                      case 'complementary':
                        return (
                          '()([^' +
                          (r =
                            '\\s' +
                            (r ||
                              this.escapeStr(
                                '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\xA1\xBF'
                              ))) +
                          ']*' +
                          e +
                          '[^' +
                          r +
                          ']*)'
                        )
                      case 'exactly':
                        return '(^|\\s' + r + ')(' + e + ')(?=$|\\s' + r + ')'
                    }
                  },
                },
                {
                  key: 'getSeparatedKeywords',
                  value: function (e) {
                    var t = this,
                      n = []
                    return (
                      e.forEach(function (e) {
                        t.opt.separateWordSearch
                          ? e.split(' ').forEach(function (e) {
                              e.trim() && -1 === n.indexOf(e) && n.push(e)
                            })
                          : e.trim() && -1 === n.indexOf(e) && n.push(e)
                      }),
                      {
                        keywords: n.sort(function (e, t) {
                          return t.length - e.length
                        }),
                        length: n.length,
                      }
                    )
                  },
                },
                {
                  key: 'isNumeric',
                  value: function (e) {
                    return Number(parseFloat(e)) == e
                  },
                },
                {
                  key: 'checkRanges',
                  value: function (e) {
                    var t = this
                    if (
                      !Array.isArray(e) ||
                      '[object Object]' !== Object.prototype.toString.call(e[0])
                    ) {
                      return (
                        this.log(
                          'markRanges() will only accept an array of objects'
                        ),
                        this.opt.noMatch(e),
                        []
                      )
                    }
                    var n = [],
                      i = 0
                    return (
                      e
                        .sort(function (e, t) {
                          return e.start - t.start
                        })
                        .forEach(function (e) {
                          var s = t.callNoMatchOnInvalidRanges(e, i),
                            r = s.start,
                            a = s.end
                          s.valid &&
                            ((e.start = r),
                            (e.length = a - r),
                            n.push(e),
                            (i = a))
                        }),
                      n
                    )
                  },
                },
                {
                  key: 'callNoMatchOnInvalidRanges',
                  value: function (e, t) {
                    var n = void 0,
                      i = void 0,
                      s = false
                    return (
                      e && void 0 !== e.start
                        ? ((i =
                            (n = parseInt(e.start, 10)) +
                            parseInt(e.length, 10)),
                          this.isNumeric(e.start) &&
                          this.isNumeric(e.length) &&
                          i - t > 0 &&
                          i - n > 0
                            ? (s = true)
                            : (this.log(
                                'Ignoring invalid or overlapping range: ' +
                                  JSON.stringify(e)
                              ),
                              this.opt.noMatch(e)))
                        : (this.log(
                            'Ignoring invalid range: ' + JSON.stringify(e)
                          ),
                          this.opt.noMatch(e)),
                      {
                        start: n,
                        end: i,
                        valid: s,
                      }
                    )
                  },
                },
                {
                  key: 'checkWhitespaceRanges',
                  value: function (e, t, n) {
                    var i = void 0,
                      s = true,
                      r = n.length,
                      a = t - r,
                      o = parseInt(e.start, 10) - a
                    return (
                      (i = (o = o > r ? r : o) + parseInt(e.length, 10)) > r &&
                        ((i = r),
                        this.log(
                          'End range automatically set to the max value of ' + r
                        )),
                      o < 0 || i - o < 0 || o > r || i > r
                        ? ((s = false),
                          this.log('Invalid range: ' + JSON.stringify(e)),
                          this.opt.noMatch(e))
                        : '' === n.substring(o, i).replace(/\s+/g, '') &&
                          ((s = false),
                          this.log(
                            'Skipping whitespace only range: ' +
                              JSON.stringify(e)
                          ),
                          this.opt.noMatch(e)),
                      {
                        start: o,
                        end: i,
                        valid: s,
                      }
                    )
                  },
                },
                {
                  key: 'getTextNodes',
                  value: function (e) {
                    var t = this,
                      n = '',
                      i = []
                    this.iterator.forEachNode(
                      NodeFilter.SHOW_TEXT,
                      function (e) {
                        i.push({
                          start: n.length,
                          end: (n += e.textContent).length,
                          node: e,
                        })
                      },
                      function (e) {
                        return t.matchesExclude(e.parentNode)
                          ? NodeFilter.FILTER_REJECT
                          : NodeFilter.FILTER_ACCEPT
                      },
                      function () {
                        e({
                          value: n,
                          nodes: i,
                        })
                      }
                    )
                  },
                },
                {
                  key: 'matchesExclude',
                  value: function (e) {
                    return s.matches(
                      e,
                      this.opt.exclude.concat([
                        'script',
                        'style',
                        'title',
                        'head',
                        'html',
                      ])
                    )
                  },
                },
                {
                  key: 'wrapRangeInTextNode',
                  value: function (e, t, n) {
                    var i = this.opt.element ? this.opt.element : 'mark',
                      s = e.splitText(t),
                      r = s.splitText(n - t),
                      a = document.createElement(i)
                    return (
                      a.setAttribute('data-markjs', 'true'),
                      this.opt.className &&
                        a.setAttribute('class', this.opt.className),
                      (a.textContent = s.textContent),
                      s.parentNode.replaceChild(a, s),
                      r
                    )
                  },
                },
                {
                  key: 'wrapRangeInMappedTextNode',
                  value: function (e, t, n, i, s) {
                    var r = this
                    e.nodes.every(function (a, o) {
                      var l = e.nodes[o + 1]
                      if (void 0 === l || l.start > t) {
                        if (!i(a.node)) {
                          return false
                        }
                        var c = t - a.start,
                          h = (n > a.end ? a.end : n) - a.start,
                          d = e.value.substr(0, a.start),
                          u = e.value.substr(h + a.start)
                        if (
                          ((a.node = r.wrapRangeInTextNode(a.node, c, h)),
                          (e.value = d + u),
                          e.nodes.forEach(function (t, n) {
                            n >= o &&
                              (e.nodes[n].start > 0 &&
                                n !== o &&
                                (e.nodes[n].start -= h),
                              (e.nodes[n].end -= h))
                          }),
                          (n -= h),
                          s(a.node.previousSibling, a.start),
                          !(n > a.end))
                        ) {
                          return false
                        }
                        t = a.end
                      }
                      return true
                    })
                  },
                },
                {
                  key: 'wrapMatches',
                  value: function (e, t, n, i, s) {
                    var r = this,
                      a = 0 === t ? 0 : t + 1
                    this.getTextNodes(function (t) {
                      t.nodes.forEach(function (t) {
                        t = t.node
                        for (
                          var s = void 0;
                          null !== (s = e.exec(t.textContent)) && '' !== s[a];

                        ) {
                          if (n(s[a], t)) {
                            var o = s.index
                            if (0 !== a) {
                              for (var l = 1; l < a; l++) {
                                o += s[l].length
                              }
                            }
                            t = r.wrapRangeInTextNode(t, o, o + s[a].length)
                            i(t.previousSibling)
                            e.lastIndex = 0
                          }
                        }
                      })
                      s()
                    })
                  },
                },
                {
                  key: 'wrapMatchesAcrossElements',
                  value: function (e, t, n, i, s) {
                    var r = this,
                      a = 0 === t ? 0 : t + 1
                    this.getTextNodes(function (t) {
                      for (
                        var o = void 0;
                        null !== (o = e.exec(t.value)) && '' !== o[a];

                      ) {
                        var l = o.index
                        if (0 !== a) {
                          for (var c = 1; c < a; c++) {
                            l += o[c].length
                          }
                        }
                        var h = l + o[a].length
                        r.wrapRangeInMappedTextNode(
                          t,
                          l,
                          h,
                          function (e) {
                            return n(o[a], e)
                          },
                          function (t, n) {
                            e.lastIndex = n
                            i(t)
                          }
                        )
                      }
                      s()
                    })
                  },
                },
                {
                  key: 'wrapRangeFromIndex',
                  value: function (e, t, n, i) {
                    var s = this
                    this.getTextNodes(function (r) {
                      var a = r.value.length
                      e.forEach(function (e, i) {
                        var o = s.checkWhitespaceRanges(e, a, r.value),
                          l = o.start,
                          c = o.end
                        o.valid &&
                          s.wrapRangeInMappedTextNode(
                            r,
                            l,
                            c,
                            function (n) {
                              return t(n, e, r.value.substring(l, c), i)
                            },
                            function (t) {
                              n(t, e)
                            }
                          )
                      })
                      i()
                    })
                  },
                },
                {
                  key: 'unwrapMatches',
                  value: function (e) {
                    for (
                      var t = e.parentNode,
                        n = document.createDocumentFragment();
                      e.firstChild;

                    ) {
                      n.appendChild(e.removeChild(e.firstChild))
                    }
                    t.replaceChild(n, e)
                    this.ie ? this.normalizeTextNode(t) : t.normalize()
                  },
                },
                {
                  key: 'normalizeTextNode',
                  value: function (e) {
                    if (e) {
                      if (3 === e.nodeType) {
                        for (
                          ;
                          e.nextSibling && 3 === e.nextSibling.nodeType;

                        ) {
                          e.nodeValue += e.nextSibling.nodeValue
                          e.parentNode.removeChild(e.nextSibling)
                        }
                      } else {
                        this.normalizeTextNode(e.firstChild)
                      }
                      this.normalizeTextNode(e.nextSibling)
                    }
                  },
                },
                {
                  key: 'markRegExp',
                  value: function (e, t) {
                    var n = this
                    this.opt = t
                    this.log('Searching with expression "' + e + '"')
                    var i = 0,
                      s = 'wrapMatches'
                    this.opt.acrossElements && (s = 'wrapMatchesAcrossElements')
                    this[s](
                      e,
                      this.opt.ignoreGroups,
                      function (e, t) {
                        return n.opt.filter(t, e, i)
                      },
                      function (e) {
                        i++
                        n.opt.each(e)
                      },
                      function () {
                        0 === i && n.opt.noMatch(e)
                        n.opt.done(i)
                      }
                    )
                  },
                },
                {
                  key: 'mark',
                  value: function (e, t) {
                    var n = this
                    this.opt = t
                    var i = 0,
                      s = 'wrapMatches',
                      r = this.getSeparatedKeywords(
                        'string' == typeof e ? [e] : e
                      ),
                      a = r.keywords,
                      o = r.length,
                      l = this.opt.caseSensitive ? '' : 'i'
                    this.opt.acrossElements && (s = 'wrapMatchesAcrossElements')
                    0 === o
                      ? this.opt.done(i)
                      : (function e(t) {
                          var r = new RegExp(n.createRegExp(t), 'gm' + l),
                            c = 0
                          n.log('Searching with expression "' + r + '"')
                          n[s](
                            r,
                            1,
                            function (e, s) {
                              return n.opt.filter(s, t, i, c)
                            },
                            function (e) {
                              c++
                              i++
                              n.opt.each(e)
                            },
                            function () {
                              0 === c && n.opt.noMatch(t)
                              a[o - 1] === t
                                ? n.opt.done(i)
                                : e(a[a.indexOf(t) + 1])
                            }
                          )
                        })(a[0])
                  },
                },
                {
                  key: 'markRanges',
                  value: function (e, t) {
                    var n = this
                    this.opt = t
                    var i = 0,
                      s = this.checkRanges(e)
                    s && s.length
                      ? (this.log(
                          'Starting to mark with the following ranges: ' +
                            JSON.stringify(s)
                        ),
                        this.wrapRangeFromIndex(
                          s,
                          function (e, t, i, s) {
                            return n.opt.filter(e, t, i, s)
                          },
                          function (e, t) {
                            i++
                            n.opt.each(e, t)
                          },
                          function () {
                            n.opt.done(i)
                          }
                        ))
                      : this.opt.done(i)
                  },
                },
                {
                  key: 'unmark',
                  value: function (e) {
                    var t = this
                    this.opt = e
                    var n = this.opt.element ? this.opt.element : '*'
                    n += '[data-markjs]'
                    this.opt.className && (n += '.' + this.opt.className)
                    this.log('Removal selector "' + n + '"')
                    this.iterator.forEachNode(
                      NodeFilter.SHOW_ELEMENT,
                      function (e) {
                        t.unwrapMatches(e)
                      },
                      function (e) {
                        var i = s.matches(e, n),
                          r = t.matchesExclude(e)
                        return !i || r
                          ? NodeFilter.FILTER_REJECT
                          : NodeFilter.FILTER_ACCEPT
                      },
                      this.opt.done
                    )
                  },
                },
                {
                  key: 'opt',
                  set: function (e) {
                    this._opt = i(
                      {},
                      {
                        element: '',
                        className: '',
                        exclude: [],
                        iframes: false,
                        iframesTimeout: 5000,
                        separateWordSearch: true,
                        diacritics: true,
                        synonyms: {},
                        accuracy: 'partially',
                        acrossElements: false,
                        caseSensitive: false,
                        ignoreJoiners: false,
                        ignoreGroups: 0,
                        ignorePunctuation: [],
                        wildcards: 'disabled',
                        each: function () {},
                        noMatch: function () {},
                        filter: function () {
                          return true
                        },
                        done: function () {},
                        debug: false,
                        log: window.console,
                      },
                      e
                    )
                  },
                  get: function () {
                    return this._opt
                  },
                },
                {
                  key: 'iterator',
                  get: function () {
                    return new s(
                      this.ctx,
                      this.opt.iframes,
                      this.opt.exclude,
                      this.opt.iframesTimeout
                    )
                  },
                },
              ]),
              r
            )
          })()
        return function (e) {
          var t = this,
            n = new r(e)
          return (
            (this.mark = function (e, i) {
              return n.mark(e, i), t
            }),
            (this.markRegExp = function (e, i) {
              return n.markRegExp(e, i), t
            }),
            (this.markRanges = function (e, i) {
              return n.markRanges(e, i), t
            }),
            (this.unmark = function (e) {
              return n.unmark(e), t
            }),
            this
          )
        }
      }
      'object' == typeof e && void 0 !== t
        ? (t.exports = i())
        : 'function' == typeof define && define.amd
        ? define(i)
        : (n.Mark = i())
    },
  }),
  main_exports = {}
__export(main_exports, { default: () => MyPlugin })
module.exports = __toCommonJS(main_exports)
var import_obsidian12 = require('obsidian'),
  import_node_buffer = require('buffer'),
  import_stream = __toESM(require_stream(), 1),
  import_receiver = __toESM(require_receiver(), 1),
  import_sender = __toESM(require_sender(), 1),
  import_websocket = __toESM(require_websocket(), 1),
  import_websocket_server = __toESM(require_websocket_server(), 1),
  baseUrl = 'speech.platform.bing.com/consumer/speech/synthesize/readaloud',
  token = '6A5AA1D4EAFF4E9FB37E23D68491D6F4',
  webSocketURL = `wss://${baseUrl}/edge/v1?TrustedClientToken=${token}`,
  voiceListUrl = `https://${baseUrl}/voices/list?trustedclienttoken=${token}`
async function getVoices() {
  const e = await fetch(voiceListUrl)
  return await e.json()
}
function uuid() {
  return crypto.randomUUID().replaceAll('-', '')
}
// function tts(e, t = {}) {
//   const {
//     voice: n = 'en-GB-SoniaNeural',
//     volume: i = '+0%',
//     rate: s = '+0%',
//     pitch: r = '+0Hz',
//   } = t
//   return new Promise((t, a) => {
//     const o = new import_websocket.default(
//         `${webSocketURL}&ConnectionId=${uuid()}`,
//         {
//           host: 'speech.platform.bing.com',
//           origin: 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
//           headers: {
//             'User-Agent':
//               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44',
//           },
//         }
//       ),
//       l = []
//     o.on('message', (e, n) => {
//       if (!n) {
//         return void (
//           e.toString('utf8').includes('turn.end') &&
//           (t(import_node_buffer.Buffer.concat(l)), o.close())
//         )
//       }
//       const i = e,
//         r = i.subarray(i.indexOf('Path:audio\r\n') + 12)
//       l.push(r)
//     })
//     o.on('error', a)
//     const c = JSON.stringify({
//         context: {
//           synthesis: {
//             audio: {
//               metadataoptions: {
//                 sentenceBoundaryEnabled: false,
//                 wordBoundaryEnabled: false,
//               },
//               outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
//             },
//           },
//         },
//       }),
//       h = `X-Timestamp:${Date()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${c}`
//     o.on('open', () =>
//       o.send(h, { compress: true }, (t) => {
//         t && a(t)
//         const l = `X-RequestId:${uuid()}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${Date()}Z\r\nPath:ssml\r\n\r\n<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${n}'><prosody pitch='${r}' rate='${s}' volume='${i}'>${e}</prosody></voice></speak>`
//         o.send(l, { compress: true }, (e) => {
//           e && a(e)
//         })
//       })
//     )
//   })
// }


async function tts_fix(text, voice) {
    await installCDN("https://cdn.jsdelivr.net/gh/Mrntn161/langki_anki/edge_tts.js", "edge_tts");
    let EdgeTTS = BrowserEdgeTTS
    const tts = new EdgeTTS(text, voice); // pick voice
    const result = await tts.synthesize();
    return result

    async function installCDN(link, tagId) {
        try {
            let isRun = (() => {
                let nameStore = `installCDN-${tagId}`
                const now = Date.now();
                const lastCall = parseInt(localStorage.getItem(nameStore) || '0', 10);
                
                if (now - lastCall < 100) {
                    return false;
                }
                
                localStorage.setItem(nameStore, now.toString());
                return true;
            })();
            if (!isRun) return
            if (document.getElementById(tagId)) return
            let url = link
            const response = await fetch(url);
            let scriptContent = await response.text();
            let script = document.createElement('script');
            script.setAttribute("id", tagId)
            script.text = scriptContent;
            document.body.prepend(script);
            return tagId
        } catch (e) {
            console.error(e)
        }
    }  
}
async function setupLang(e) {
  e.addOption('English', 'English')
  e.addOption('Chinese', 'Chinese')
  e.addOption('Japanese', 'Japanese')
  e.addOption('Korean', 'Korean')
}
async function setupVoice(e, t) {
  let n = await getVoices()
  t || (t = 'English')
  'English' == t
    ? (n = n.filter((e) => e.Locale.includes('en-')))
    : 'Chinese' == t
    ? (n = n.filter((e) => e.Locale.includes('zh-')))
    : 'Japanese' == t
    ? (n = n.filter((e) => e.Locale.includes('ja-')))
    : 'Korean' == t && (n = n.filter((e) => e.Locale.includes('ko-')))
  for (let t of n) e.addOption(t.ShortName, t.ShortName)
}
async function AIchat(e, t) {
  try {
    const n = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        headers: {
          Authorization: `Bearer ${e}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(t),
      }),
      i = (await n.text()).trim().split('\n')
    let s = ''
    return (
      i.forEach((e) => {
        const t = e.indexOf('{')
        if (-1 !== t) {
          const n = e.substring(t),
            i = JSON.parse(n).choices[0].delta.content || ''
          s += i
        }
      }),
      s
    )
  } catch (e) {
    console.error(e)
  }
}
var import_obsidian = require('obsidian')
async function textToSpeech(e, t) {
  try {
    // Generate text-to-speech audio

    let text = e
    let voice = t
    let a = await tts_fix(text, voice);
    let audioData = a.audio
    // Get or create the TTS container
    let container = document.getElementById("tts-container");
    if (!container) {
    container = document.createElement("div");
    container.style.display = "none";
    container.id = "tts-container";

    const appContainer = document.getElementsByClassName("app-container")[0];
    appContainer.appendChild(container);
    }

    // Create an object URL from the Blob
    const audioUrl = URL.createObjectURL(audioData);

    // Build audio element using the object URL
    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.autoplay = true;
    audioElement.src = audioUrl;

    // Clear previous content and append the new audio element
    container.innerHTML = "";
    container.appendChild(audioElement);
    // // Insert audio element with base64-encoded audio
    // container.innerHTML = `
    // <audio controls autoplay src="data:audio/ogg;base64,${audioData.toString("base64")}"></audio>
    // `;

  } catch (e) {
    console.error(e)
  }
}
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null,
  }
}
var _defaults = _getDefaults()
function changeDefaults(e) {
  _defaults = e
}
var escapeTest = /[&<>"']/,
  escapeReplace = new RegExp(escapeTest.source, 'g'),
  escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g'),
  escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  },
  getEscapeReplacement = (e) => escapeReplacements[e]
function escape$1(e, t) {
  if (t) {
    if (escapeTest.test(e)) {
      return e.replace(escapeReplace, getEscapeReplacement)
    }
  } else {
    if (escapeTestNoEncode.test(e)) {
      return e.replace(escapeReplaceNoEncode, getEscapeReplacement)
    }
  }
  return e
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
function unescape(e) {
  return e.replace(unescapeTest, (e, t) =>
    'colon' === (t = t.toLowerCase())
      ? ':'
      : '#' === t.charAt(0)
      ? 'x' === t.charAt(1)
        ? String.fromCharCode(parseInt(t.substring(2), 16))
        : String.fromCharCode(+t.substring(1))
      : ''
  )
}
var caret = /(^|[^\[])\^/g
function edit(e, t) {
  let n = 'string' == typeof e ? e : e.source
  t = t || ''
  const i = {
    replace: (e, t) => {
      let s = 'string' == typeof t ? t : t.source
      return (s = s.replace(caret, '$1')), (n = n.replace(e, s)), i
    },
    getRegex: () => new RegExp(n, t),
  }
  return i
}
function cleanUrl(e) {
  try {
    e = encodeURI(e).replace(/%25/g, '%')
  } catch (e) {
    return null
  }
  return e
}
var noopTest = { exec: () => null }
function splitCells(e, t) {
  const n = e
    .replace(/\|/g, (e, t, n) => {
      let i = false,
        s = t
      for (; --s >= 0 && '\\' === n[s]; ) {
        i = !i
      }
      return i ? '|' : ' |'
    })
    .split(/ \|/)
  let i = 0
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    t)
  ) {
    if (n.length > t) {
      n.splice(t)
    } else {
      for (; n.length < t; ) {
        n.push('')
      }
    }
  }
  for (; i < n.length; i++) {
    n[i] = n[i].trim().replace(/\\\|/g, '|')
  }
  return n
}
function rtrim(e, t, n) {
  const i = e.length
  if (0 === i) {
    return ''
  }
  let s = 0
  for (; s < i; ) {
    const r = e.charAt(i - s - 1)
    if (r !== t || n) {
      if (r === t || !n) {
        break
      }
      s++
    } else {
      s++
    }
  }
  return e.slice(0, i - s)
}
function findClosingBracket(e, t) {
  if (-1 === e.indexOf(t[1])) {
    return -1
  }
  let n = 0
  for (let i = 0; i < e.length; i++) {
    if ('\\' === e[i]) {
      i++
    } else {
      if (e[i] === t[0]) {
        n++
      } else {
        if (e[i] === t[1] && (n--, n < 0)) {
          return i
        }
      }
    }
  }
  return -1
}
function outputLink(e, t, n, i) {
  const s = t.href,
    r = t.title ? escape$1(t.title) : null,
    a = e[1].replace(/\\([\[\]])/g, '$1')
  if ('!' !== e[0].charAt(0)) {
    i.state.inLink = true
    const e = {
      type: 'link',
      raw: n,
      href: s,
      title: r,
      text: a,
      tokens: i.inlineTokens(a),
    }
    return (i.state.inLink = false), e
  }
  return {
    type: 'image',
    raw: n,
    href: s,
    title: r,
    text: escape$1(a),
  }
}
function indentCodeCompensation(e, t) {
  const n = e.match(/^(\s+)(?:```)/)
  if (null === n) {
    return t
  }
  const i = n[1]
  return t
    .split('\n')
    .map((e) => {
      const t = e.match(/^\s+/)
      if (null === t) {
        return e
      }
      const [n] = t
      return n.length >= i.length ? e.slice(i.length) : e
    })
    .join('\n')
}
var _convertRendererFunction,
  convertRendererFunction_fn,
  _parseMarkdown,
  parseMarkdown_fn,
  _onError,
  onError_fn,
  _Tokenizer = class {
    constructor(e) {
      __publicField(this, 'options')
      __publicField(this, 'rules')
      __publicField(this, 'lexer')
      this.options = e || _defaults
    }
    space(e) {
      const t = this.rules.block.newline.exec(e)
      if (t && t[0].length > 0) {
        return {
          type: 'space',
          raw: t[0],
        }
      }
    }
    code(e) {
      const t = this.rules.block.code.exec(e)
      if (t) {
        const e = t[0].replace(/^ {1,4}/gm, '')
        return {
          type: 'code',
          raw: t[0],
          codeBlockStyle: 'indented',
          text: this.options.pedantic ? e : rtrim(e, '\n'),
        }
      }
    }
    fences(e) {
      const t = this.rules.block.fences.exec(e)
      if (t) {
        const e = t[0],
          n = indentCodeCompensation(e, t[3] || '')
        return {
          type: 'code',
          raw: e,
          lang: t[2]
            ? t[2].trim().replace(this.rules.inline.anyPunctuation, '$1')
            : t[2],
          text: n,
        }
      }
    }
    heading(e) {
      const t = this.rules.block.heading.exec(e)
      if (t) {
        let e = t[2].trim()
        if (/#$/.test(e)) {
          const t = rtrim(e, '#')
          this.options.pedantic
            ? (e = t.trim())
            : (t && !/ $/.test(t)) || (e = t.trim())
        }
        return {
          type: 'heading',
          raw: t[0],
          depth: t[1].length,
          text: e,
          tokens: this.lexer.inline(e),
        }
      }
    }
    hr(e) {
      const t = this.rules.block.hr.exec(e)
      if (t) {
        return {
          type: 'hr',
          raw: rtrim(t[0], '\n'),
        }
      }
    }
    blockquote(e) {
      const t = this.rules.block.blockquote.exec(e)
      if (t) {
        let e = rtrim(t[0], '\n').split('\n'),
          n = '',
          i = ''
        const s = []
        for (; e.length > 0; ) {
          let t = false
          const r = []
          let a
          for (a = 0; a < e.length; a++) {
            if (/^ {0,3}>/.test(e[a])) {
              r.push(e[a])
              t = true
            } else {
              if (t) {
                break
              }
              r.push(e[a])
            }
          }
          e = e.slice(a)
          const o = r.join('\n'),
            l = o
              .replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, '\n    $1')
              .replace(/^ {0,3}>[ \t]?/gm, '')
          n = n ? `${n}\n${o}` : o
          i = i ? `${i}\n${l}` : l
          const c = this.lexer.state.top
          if (
            ((this.lexer.state.top = true),
            this.lexer.blockTokens(l, s, true),
            (this.lexer.state.top = c),
            0 === e.length)
          ) {
            break
          }
          const h = s[s.length - 1]
          if ('code' === (null == h ? void 0 : h.type)) {
            break
          }
          if ('blockquote' === (null == h ? void 0 : h.type)) {
            const t = h,
              r = t.raw + '\n' + e.join('\n'),
              a = this.blockquote(r)
            s[s.length - 1] = a
            n = n.substring(0, n.length - t.raw.length) + a.raw
            i = i.substring(0, i.length - t.text.length) + a.text
            break
          }
          if ('list' !== (null == h ? void 0 : h.type)) {
          } else {
            const t = h,
              r = t.raw + '\n' + e.join('\n'),
              a = this.list(r)
            s[s.length - 1] = a
            n = n.substring(0, n.length - h.raw.length) + a.raw
            i = i.substring(0, i.length - t.raw.length) + a.raw
            e = r.substring(s[s.length - 1].raw.length).split('\n')
          }
        }
        return {
          type: 'blockquote',
          raw: n,
          tokens: s,
          text: i,
        }
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e)
      if (t) {
        let n = t[1].trim()
        const i = n.length > 1,
          s = {
            type: 'list',
            raw: '',
            ordered: i,
            start: i ? +n.slice(0, -1) : '',
            loose: false,
            items: [],
          }
        n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`
        this.options.pedantic && (n = i ? n : '[*+-]')
        const r = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`)
        let a = false
        for (; e; ) {
          let n = false,
            i = '',
            o = ''
          if (!(t = r.exec(e))) {
            break
          }
          if (this.rules.block.hr.test(e)) {
            break
          }
          i = t[0]
          e = e.substring(i.length)
          let l = t[2]
              .split('\n', 1)[0]
              .replace(/^\t+/, (e) => ' '.repeat(3 * e.length)),
            c = e.split('\n', 1)[0],
            h = !l.trim(),
            d = 0
          if (
            (this.options.pedantic
              ? ((d = 2), (o = l.trimStart()))
              : h
              ? (d = t[1].length + 1)
              : ((d = t[2].search(/[^ ]/)),
                (d = d > 4 ? 1 : d),
                (o = l.slice(d)),
                (d += t[1].length)),
            h &&
              /^ *$/.test(c) &&
              ((i += c + '\n'), (e = e.substring(c.length + 1)), (n = true)),
            !n)
          ) {
            const t = new RegExp(
                `^ {0,${Math.min(
                  3,
                  d - 1
                )}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`
              ),
              n = new RegExp(
                `^ {0,${Math.min(
                  3,
                  d - 1
                )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
              ),
              s = new RegExp(`^ {0,${Math.min(3, d - 1)}}(?:\`\`\`|~~~)`),
              r = new RegExp(`^ {0,${Math.min(3, d - 1)}}#`)
            for (; e; ) {
              const a = e.split('\n', 1)[0]
              if (
                ((c = a),
                this.options.pedantic &&
                  (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
                s.test(c))
              ) {
                break
              }
              if (r.test(c)) {
                break
              }
              if (t.test(c)) {
                break
              }
              if (n.test(e)) {
                break
              }
              if (c.search(/[^ ]/) >= d || !c.trim()) {
                o += '\n' + c.slice(d)
              } else {
                if (h) {
                  break
                }
                if (l.search(/[^ ]/) >= 4) {
                  break
                }
                if (s.test(l)) {
                  break
                }
                if (r.test(l)) {
                  break
                }
                if (n.test(l)) {
                  break
                }
                o += '\n' + c
              }
              h || c.trim() || (h = true)
              i += a + '\n'
              e = e.substring(a.length + 1)
              l = c.slice(d)
            }
          }
          s.loose || (a ? (s.loose = true) : /\n *\n *$/.test(i) && (a = true))
          let u,
            p = null
          this.options.gfm &&
            ((p = /^\[[ xX]\] /.exec(o)),
            p && ((u = '[ ] ' !== p[0]), (o = o.replace(/^\[[ xX]\] +/, ''))))
          s.items.push({
            type: 'list_item',
            raw: i,
            task: !!p,
            checked: u,
            loose: false,
            text: o,
            tokens: [],
          })
          s.raw += i
        }
        s.items[s.items.length - 1].raw =
          s.items[s.items.length - 1].raw.trimEnd()
        s.items[s.items.length - 1].text =
          s.items[s.items.length - 1].text.trimEnd()
        s.raw = s.raw.trimEnd()
        for (let e = 0; e < s.items.length; e++) {
          if (
            ((this.lexer.state.top = false),
            (s.items[e].tokens = this.lexer.blockTokens(s.items[e].text, [])),
            !s.loose)
          ) {
            const t = s.items[e].tokens.filter((e) => 'space' === e.type),
              n = t.length > 0 && t.some((e) => /\n.*\n/.test(e.raw))
            s.loose = n
          }
        }
        if (s.loose) {
          for (let e = 0; e < s.items.length; e++) {
            s.items[e].loose = true
          }
        }
        return s
      }
    }
    html(e) {
      const t = this.rules.block.html.exec(e)
      if (t) {
        return {
          type: 'html',
          block: true,
          raw: t[0],
          pre: 'pre' === t[1] || 'script' === t[1] || 'style' === t[1],
          text: t[0],
        }
      }
    }
    def(e) {
      const t = this.rules.block.def.exec(e)
      if (t) {
        const e = t[1].toLowerCase().replace(/\s+/g, ' '),
          n = t[2]
            ? t[2]
                .replace(/^<(.*)>$/, '$1')
                .replace(this.rules.inline.anyPunctuation, '$1')
            : '',
          i = t[3]
            ? t[3]
                .substring(1, t[3].length - 1)
                .replace(this.rules.inline.anyPunctuation, '$1')
            : t[3]
        return {
          type: 'def',
          tag: e,
          raw: t[0],
          href: n,
          title: i,
        }
      }
    }
    table(e) {
      const t = this.rules.block.table.exec(e)
      if (!t) {
        return
      }
      if (!/[:|]/.test(t[2])) {
        return
      }
      const n = splitCells(t[1]),
        i = t[2].replace(/^\||\| *$/g, '').split('|'),
        s =
          t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, '').split('\n') : [],
        r = {
          type: 'table',
          raw: t[0],
          header: [],
          align: [],
          rows: [],
        }
      if (n.length === i.length) {
        for (const e of i)
          /^ *-+: *$/.test(e)
            ? r.align.push('right')
            : /^ *:-+: *$/.test(e)
            ? r.align.push('center')
            : /^ *:-+ *$/.test(e)
            ? r.align.push('left')
            : r.align.push(null)
        for (let e = 0; e < n.length; e++) {
          r.header.push({
            text: n[e],
            tokens: this.lexer.inline(n[e]),
            header: true,
            align: r.align[e],
          })
        }
        for (const e of s)
          r.rows.push(
            splitCells(e, r.header.length).map((e, t) => ({
              text: e,
              tokens: this.lexer.inline(e),
              header: false,
              align: r.align[t],
            }))
          )
        return r
      }
    }
    lheading(e) {
      const t = this.rules.block.lheading.exec(e)
      if (t) {
        return {
          type: 'heading',
          raw: t[0],
          depth: '=' === t[2].charAt(0) ? 1 : 2,
          text: t[1],
          tokens: this.lexer.inline(t[1]),
        }
      }
    }
    paragraph(e) {
      const t = this.rules.block.paragraph.exec(e)
      if (t) {
        const e =
          '\n' === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1]
        return {
          type: 'paragraph',
          raw: t[0],
          text: e,
          tokens: this.lexer.inline(e),
        }
      }
    }
    text(e) {
      const t = this.rules.block.text.exec(e)
      if (t) {
        return {
          type: 'text',
          raw: t[0],
          text: t[0],
          tokens: this.lexer.inline(t[0]),
        }
      }
    }
    escape(e) {
      const t = this.rules.inline.escape.exec(e)
      if (t) {
        return {
          type: 'escape',
          raw: t[0],
          text: escape$1(t[1]),
        }
      }
    }
    tag(e) {
      const t = this.rules.inline.tag.exec(e)
      if (t) {
        return (
          !this.lexer.state.inLink && /^<a /i.test(t[0])
            ? (this.lexer.state.inLink = true)
            : this.lexer.state.inLink &&
              /^<\/a>/i.test(t[0]) &&
              (this.lexer.state.inLink = false),
          !this.lexer.state.inRawBlock &&
          /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
            ? (this.lexer.state.inRawBlock = true)
            : this.lexer.state.inRawBlock &&
              /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
              (this.lexer.state.inRawBlock = false),
          {
            type: 'html',
            raw: t[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: false,
            text: t[0],
          }
        )
      }
    }
    link(e) {
      const t = this.rules.inline.link.exec(e)
      if (t) {
        const e = t[2].trim()
        if (!this.options.pedantic && /^</.test(e)) {
          if (!/>$/.test(e)) {
            return
          }
          const t = rtrim(e.slice(0, -1), '\\')
          if ((e.length - t.length) % 2 == 0) {
            return
          }
        } else {
          const e = findClosingBracket(t[2], '()')
          if (e > -1) {
            const n = (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + e
            t[2] = t[2].substring(0, e)
            t[0] = t[0].substring(0, n).trim()
            t[3] = ''
          }
        }
        let n = t[2],
          i = ''
        if (this.options.pedantic) {
          const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)
          e && ((n = e[1]), (i = e[3]))
        } else {
          i = t[3] ? t[3].slice(1, -1) : ''
        }
        return (
          (n = n.trim()),
          /^</.test(n) &&
            (n =
              this.options.pedantic && !/>$/.test(e)
                ? n.slice(1)
                : n.slice(1, -1)),
          outputLink(
            t,
            {
              href: n ? n.replace(this.rules.inline.anyPunctuation, '$1') : n,
              title: i ? i.replace(this.rules.inline.anyPunctuation, '$1') : i,
            },
            t[0],
            this.lexer
          )
        )
      }
    }
    reflink(e, t) {
      let n
      if (
        (n = this.rules.inline.reflink.exec(e)) ||
        (n = this.rules.inline.nolink.exec(e))
      ) {
        const e = t[(n[2] || n[1]).replace(/\s+/g, ' ').toLowerCase()]
        if (!e) {
          const e = n[0].charAt(0)
          return {
            type: 'text',
            raw: e,
            text: e,
          }
        }
        return outputLink(n, e, n[0], this.lexer)
      }
    }
    emStrong(e, t, n = '') {
      let i = this.rules.inline.emStrongLDelim.exec(e)
      if (!i) {
        return
      }
      if (i[3] && n.match(/[\p{L}\p{N}]/u)) {
        return
      }
      if (
        !(i[1] || i[2] || '') ||
        !n ||
        this.rules.inline.punctuation.exec(n)
      ) {
        const n = [...i[0]].length - 1
        let s,
          r,
          a = n,
          o = 0
        const l =
          '*' === i[0][0]
            ? this.rules.inline.emStrongRDelimAst
            : this.rules.inline.emStrongRDelimUnd
        for (
          l.lastIndex = 0, t = t.slice(-1 * e.length + n);
          null != (i = l.exec(t));

        ) {
          if (((s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6]), !s)) {
            continue
          }
          if (((r = [...s].length), i[3] || i[4])) {
            a += r
            continue
          }
          if ((i[5] || i[6]) && n % 3 && !((n + r) % 3)) {
            o += r
            continue
          }
          if (((a -= r), a > 0)) {
            continue
          }
          r = Math.min(r, r + a + o)
          const t = [...i[0]][0].length,
            l = e.slice(0, n + i.index + t + r)
          if (Math.min(n, r) % 2) {
            const e = l.slice(1, -1)
            return {
              type: 'em',
              raw: l,
              text: e,
              tokens: this.lexer.inlineTokens(e),
            }
          }
          const c = l.slice(2, -2)
          return {
            type: 'strong',
            raw: l,
            text: c,
            tokens: this.lexer.inlineTokens(c),
          }
        }
      }
    }
    codespan(e) {
      const t = this.rules.inline.code.exec(e)
      if (t) {
        let e = t[2].replace(/\n/g, ' ')
        const n = /[^ ]/.test(e),
          i = /^ /.test(e) && / $/.test(e)
        return (
          n && i && (e = e.substring(1, e.length - 1)),
          (e = escape$1(e, true)),
          {
            type: 'codespan',
            raw: t[0],
            text: e,
          }
        )
      }
    }
    br(e) {
      const t = this.rules.inline.br.exec(e)
      if (t) {
        return {
          type: 'br',
          raw: t[0],
        }
      }
    }
    del(e) {
      const t = this.rules.inline.del.exec(e)
      if (t) {
        return {
          type: 'del',
          raw: t[0],
          text: t[2],
          tokens: this.lexer.inlineTokens(t[2]),
        }
      }
    }
    autolink(e) {
      const t = this.rules.inline.autolink.exec(e)
      if (t) {
        let e, n
        return (
          '@' === t[2]
            ? ((e = escape$1(t[1])), (n = 'mailto:' + e))
            : ((e = escape$1(t[1])), (n = e)),
          {
            type: 'link',
            raw: t[0],
            text: e,
            href: n,
            tokens: [
              {
                type: 'text',
                raw: e,
                text: e,
              },
            ],
          }
        )
      }
    }
    url(e) {
      var t, n
      let i
      if ((i = this.rules.inline.url.exec(e))) {
        let e, s
        if ('@' === i[2]) {
          e = escape$1(i[0])
          s = 'mailto:' + e
        } else {
          let r
          do {
            r = i[0]
            i[0] =
              null !=
              (n =
                null == (t = this.rules.inline._backpedal.exec(i[0]))
                  ? void 0
                  : t[0])
                ? n
                : ''
          } while (r !== i[0])
          e = escape$1(i[0])
          s = 'www.' === i[1] ? 'http://' + i[0] : i[0]
        }
        return {
          type: 'link',
          raw: i[0],
          text: e,
          href: s,
          tokens: [
            {
              type: 'text',
              raw: e,
              text: e,
            },
          ],
        }
      }
    }
    inlineText(e) {
      const t = this.rules.inline.text.exec(e)
      if (t) {
        let e
        return (
          (e = this.lexer.state.inRawBlock ? t[0] : escape$1(t[0])),
          {
            type: 'text',
            raw: t[0],
            text: e,
          }
        )
      }
    }
  },
  newline = /^(?: *(?:\n|$))+/,
  blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  bullet = /(?:[*+-]|\d{1,9}[.)])/,
  lheading = edit(
    /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/
  )
    .replace(/bull/g, bullet)
    .replace(/blockCode/g, / {4}/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  _paragraph =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  blockText = /^[^\n]+/,
  _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  def = edit(
    /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/
  )
    .replace('label', _blockLabel)
    .replace(
      'title',
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    )
    .getRegex(),
  list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, bullet)
    .getRegex(),
  _tag =
    'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul',
  _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  html = edit(
    '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
    'i'
  )
    .replace('comment', _comment)
    .replace('tag', _tag)
    .replace(
      'attribute',
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex(),
  paragraph = edit(_paragraph)
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('|lheading', '')
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', _tag)
    .getRegex(),
  blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace('paragraph', paragraph)
    .getRegex(),
  blockNormal = {
    blockquote: blockquote,
    code: blockCode,
    def: def,
    fences: fences,
    heading: heading,
    hr: hr,
    html: html,
    lheading: lheading,
    list: list,
    newline: newline,
    paragraph: paragraph,
    table: noopTest,
    text: blockText,
  },
  gfmTable = edit(
    '^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)'
  )
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', _tag)
    .getRegex(),
  blockGfm = {
    ...blockNormal,
    table: gfmTable,
    paragraph: edit(_paragraph)
      .replace('hr', hr)
      .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
      .replace('|lheading', '')
      .replace('table', gfmTable)
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
      .replace(
        'html',
        '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
      )
      .replace('tag', _tag)
      .getRegex(),
  },
  blockPedantic = {
    ...blockNormal,
    html: edit(
      '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
    )
      .replace('comment', _comment)
      .replace(
        /tag/g,
        '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph)
      .replace('hr', hr)
      .replace('heading', ' *#{1,6} *[^\n]')
      .replace('lheading', lheading)
      .replace('|table', '')
      .replace('blockquote', ' {0,3}>')
      .replace('|fences', '')
      .replace('|list', '')
      .replace('|html', '')
      .replace('|tag', '')
      .getRegex(),
  },
  escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br = /^( {2,}|\\)\n(?!\s*$)/,
  inlineText =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  _punctuation = '\\p{P}\\p{S}',
  punctuation = edit(/^((?![*_])[\spunctuation])/, 'u')
    .replace(/punctuation/g, _punctuation)
    .getRegex(),
  blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
  emStrongLDelim = edit(
    /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    'u'
  )
    .replace(/punct/g, _punctuation)
    .getRegex(),
  emStrongRDelimAst = edit(
    '^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])',
    'gu'
  )
    .replace(/punct/g, _punctuation)
    .getRegex(),
  emStrongRDelimUnd = edit(
    '^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])',
    'gu'
  )
    .replace(/punct/g, _punctuation)
    .getRegex(),
  anyPunctuation = edit(/\\([punct])/, 'gu')
    .replace(/punct/g, _punctuation)
    .getRegex(),
  autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      'email',
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
    )
    .getRegex(),
  _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex(),
  tag = edit(
    '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'
  )
    .replace('comment', _inlineComment)
    .replace(
      'attribute',
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
    )
    .getRegex(),
  _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace('label', _inlineLabel)
    .replace('href', /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace(
      'title',
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/
    )
    .getRegex(),
  reflink = edit(/^!?\[(label)\]\[(ref)\]/)
    .replace('label', _inlineLabel)
    .replace('ref', _blockLabel)
    .getRegex(),
  nolink = edit(/^!?\[(ref)\](?:\[\])?/)
    .replace('ref', _blockLabel)
    .getRegex(),
  reflinkSearch = edit('reflink|nolink(?!\\()', 'g')
    .replace('reflink', reflink)
    .replace('nolink', nolink)
    .getRegex(),
  inlineNormal = {
    _backpedal: noopTest,
    anyPunctuation: anyPunctuation,
    autolink: autolink,
    blockSkip: blockSkip,
    br: br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim: emStrongLDelim,
    emStrongRDelimAst: emStrongRDelimAst,
    emStrongRDelimUnd: emStrongRDelimUnd,
    escape: escape,
    link: link,
    nolink: nolink,
    punctuation: punctuation,
    reflink: reflink,
    reflinkSearch: reflinkSearch,
    tag: tag,
    text: inlineText,
    url: noopTest,
  },
  inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/)
      .replace('label', _inlineLabel)
      .getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace('label', _inlineLabel)
      .getRegex(),
  },
  inlineGfm = {
    ...inlineNormal,
    escape: edit(escape).replace('])', '~|])').getRegex(),
    url: edit(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      'i'
    )
      .replace(
        'email',
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace('{2,}', '*').getRegex(),
    text: edit(inlineGfm.text)
      .replace('\\b_', '\\b_| {2,}\\n')
      .replace(/\{2,\}/g, '*')
      .getRegex(),
  },
  block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic,
  },
  inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic,
  },
  _Lexer = class {
    constructor(e) {
      __publicField(this, 'tokens')
      __publicField(this, 'options')
      __publicField(this, 'state')
      __publicField(this, 'tokenizer')
      __publicField(this, 'inlineQueue')
      this.tokens = []
      this.tokens.links = Object.create(null)
      this.options = e || _defaults
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer()
      this.tokenizer = this.options.tokenizer
      this.tokenizer.options = this.options
      this.tokenizer.lexer = this
      this.inlineQueue = []
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true,
      }
      const t = {
        block: block.normal,
        inline: inline.normal,
      }
      this.options.pedantic
        ? ((t.block = block.pedantic), (t.inline = inline.pedantic))
        : this.options.gfm &&
          ((t.block = block.gfm),
          this.options.breaks
            ? (t.inline = inline.breaks)
            : (t.inline = inline.gfm))
      this.tokenizer.rules = t
    }
    static get rules() {
      return {
        block: block,
        inline: inline,
      }
    }
    static lex(e, t) {
      return new _Lexer(t).lex(e)
    }
    static lexInline(e, t) {
      return new _Lexer(t).inlineTokens(e)
    }
    lex(e) {
      e = e.replace(/\r\n|\r/g, '\n')
      this.blockTokens(e, this.tokens)
      for (let e = 0; e < this.inlineQueue.length; e++) {
        const t = this.inlineQueue[e]
        this.inlineTokens(t.src, t.tokens)
      }
      return (this.inlineQueue = []), this.tokens
    }
    blockTokens(e, t = [], n = false) {
      let i, s, r
      for (
        e = this.options.pedantic
          ? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
          : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + '    '.repeat(n.length));
        e;

      ) {
        if (
          !(
            this.options.extensions &&
            this.options.extensions.block &&
            this.options.extensions.block.some(
              (n) =>
                !!(i = n.call({ lexer: this }, e, t)) &&
                ((e = e.substring(i.raw.length)), t.push(i), true)
            )
          )
        ) {
          if ((i = this.tokenizer.space(e))) {
            e = e.substring(i.raw.length)
            1 === i.raw.length && t.length > 0
              ? (t[t.length - 1].raw += '\n')
              : t.push(i)
          } else {
            if ((i = this.tokenizer.code(e))) {
              e = e.substring(i.raw.length)
              s = t[t.length - 1]
              !s || ('paragraph' !== s.type && 'text' !== s.type)
                ? t.push(i)
                : ((s.raw += '\n' + i.raw),
                  (s.text += '\n' + i.text),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = s.text))
            } else {
              if ((i = this.tokenizer.fences(e))) {
                e = e.substring(i.raw.length)
                t.push(i)
              } else {
                if ((i = this.tokenizer.heading(e))) {
                  e = e.substring(i.raw.length)
                  t.push(i)
                } else {
                  if ((i = this.tokenizer.hr(e))) {
                    e = e.substring(i.raw.length)
                    t.push(i)
                  } else {
                    if ((i = this.tokenizer.blockquote(e))) {
                      e = e.substring(i.raw.length)
                      t.push(i)
                    } else {
                      if ((i = this.tokenizer.list(e))) {
                        e = e.substring(i.raw.length)
                        t.push(i)
                      } else {
                        if ((i = this.tokenizer.html(e))) {
                          e = e.substring(i.raw.length)
                          t.push(i)
                        } else {
                          if ((i = this.tokenizer.def(e))) {
                            e = e.substring(i.raw.length)
                            s = t[t.length - 1]
                            !s || ('paragraph' !== s.type && 'text' !== s.type)
                              ? this.tokens.links[i.tag] ||
                                (this.tokens.links[i.tag] = {
                                  href: i.href,
                                  title: i.title,
                                })
                              : ((s.raw += '\n' + i.raw),
                                (s.text += '\n' + i.raw),
                                (this.inlineQueue[
                                  this.inlineQueue.length - 1
                                ].src = s.text))
                          } else {
                            if ((i = this.tokenizer.table(e))) {
                              e = e.substring(i.raw.length)
                              t.push(i)
                            } else {
                              if ((i = this.tokenizer.lheading(e))) {
                                e = e.substring(i.raw.length)
                                t.push(i)
                              } else {
                                if (
                                  ((r = e),
                                  this.options.extensions &&
                                    this.options.extensions.startBlock)
                                ) {
                                  let t = null
                                  const n = e.slice(1)
                                  let i
                                  this.options.extensions.startBlock.forEach(
                                    (e) => {
                                      i = e.call({ lexer: this }, n)
                                      'number' == typeof i &&
                                        i >= 0 &&
                                        (t = Math.min(t, i))
                                    }
                                  )
                                  t < null &&
                                    t >= 0 &&
                                    (r = e.substring(0, t + 1))
                                }
                                if (
                                  this.state.top &&
                                  (i = this.tokenizer.paragraph(r))
                                ) {
                                  s = t[t.length - 1]
                                  n &&
                                  'paragraph' === (null == s ? void 0 : s.type)
                                    ? ((s.raw += '\n' + i.raw),
                                      (s.text += '\n' + i.text),
                                      this.inlineQueue.pop(),
                                      (this.inlineQueue[
                                        this.inlineQueue.length - 1
                                      ].src = s.text))
                                    : t.push(i)
                                  n = r.length !== e.length
                                  e = e.substring(i.raw.length)
                                } else {
                                  if ((i = this.tokenizer.text(e))) {
                                    e = e.substring(i.raw.length)
                                    s = t[t.length - 1]
                                    s && 'text' === s.type
                                      ? ((s.raw += '\n' + i.raw),
                                        (s.text += '\n' + i.text),
                                        this.inlineQueue.pop(),
                                        (this.inlineQueue[
                                          this.inlineQueue.length - 1
                                        ].src = s.text))
                                      : t.push(i)
                                  } else {
                                    if (e) {
                                      const t =
                                        'Infinite loop on byte: ' +
                                        e.charCodeAt(0)
                                      if (this.options.silent) {
                                        console.error(t)
                                        break
                                      }
                                      throw new Error(t)
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return (this.state.top = true), t
    }
    inline(e, t = []) {
      return (
        this.inlineQueue.push({
          src: e,
          tokens: t,
        }),
        t
      )
    }
    inlineTokens(e, t = []) {
      let n,
        i,
        s,
        r,
        a,
        o,
        l = e
      if (this.tokens.links) {
        const e = Object.keys(this.tokens.links)
        if (e.length > 0) {
          for (
            ;
            null != (r = this.tokenizer.rules.inline.reflinkSearch.exec(l));

          ) {
            e.includes(r[0].slice(r[0].lastIndexOf('[') + 1, -1)) &&
              (l =
                l.slice(0, r.index) +
                '[' +
                'a'.repeat(r[0].length - 2) +
                ']' +
                l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
          }
        }
      }
      for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); ) {
        l =
          l.slice(0, r.index) +
          '[' +
          'a'.repeat(r[0].length - 2) +
          ']' +
          l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
      }
      for (
        ;
        null != (r = this.tokenizer.rules.inline.anyPunctuation.exec(l));

      ) {
        l =
          l.slice(0, r.index) +
          '++' +
          l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex)
      }
      for (; e; ) {
        if (
          (a || (o = ''),
          (a = false),
          !(
            this.options.extensions &&
            this.options.extensions.inline &&
            this.options.extensions.inline.some(
              (i) =>
                !!(n = i.call({ lexer: this }, e, t)) &&
                ((e = e.substring(n.raw.length)), t.push(n), true)
            )
          ))
        ) {
          if ((n = this.tokenizer.escape(e))) {
            e = e.substring(n.raw.length)
            t.push(n)
          } else {
            if ((n = this.tokenizer.tag(e))) {
              e = e.substring(n.raw.length)
              i = t[t.length - 1]
              i && 'text' === n.type && 'text' === i.type
                ? ((i.raw += n.raw), (i.text += n.text))
                : t.push(n)
            } else {
              if ((n = this.tokenizer.link(e))) {
                e = e.substring(n.raw.length)
                t.push(n)
              } else {
                if ((n = this.tokenizer.reflink(e, this.tokens.links))) {
                  e = e.substring(n.raw.length)
                  i = t[t.length - 1]
                  i && 'text' === n.type && 'text' === i.type
                    ? ((i.raw += n.raw), (i.text += n.text))
                    : t.push(n)
                } else {
                  if ((n = this.tokenizer.emStrong(e, l, o))) {
                    e = e.substring(n.raw.length)
                    t.push(n)
                  } else {
                    if ((n = this.tokenizer.codespan(e))) {
                      e = e.substring(n.raw.length)
                      t.push(n)
                    } else {
                      if ((n = this.tokenizer.br(e))) {
                        e = e.substring(n.raw.length)
                        t.push(n)
                      } else {
                        if ((n = this.tokenizer.del(e))) {
                          e = e.substring(n.raw.length)
                          t.push(n)
                        } else {
                          if ((n = this.tokenizer.autolink(e))) {
                            e = e.substring(n.raw.length)
                            t.push(n)
                          } else {
                            if (
                              this.state.inLink ||
                              !(n = this.tokenizer.url(e))
                            ) {
                              if (
                                ((s = e),
                                this.options.extensions &&
                                  this.options.extensions.startInline)
                              ) {
                                let t = null
                                const n = e.slice(1)
                                let i
                                this.options.extensions.startInline.forEach(
                                  (e) => {
                                    i = e.call({ lexer: this }, n)
                                    'number' == typeof i &&
                                      i >= 0 &&
                                      (t = Math.min(t, i))
                                  }
                                )
                                t < null &&
                                  t >= 0 &&
                                  (s = e.substring(0, t + 1))
                              }
                              if ((n = this.tokenizer.inlineText(s))) {
                                e = e.substring(n.raw.length)
                                '_' !== n.raw.slice(-1) && (o = n.raw.slice(-1))
                                a = true
                                i = t[t.length - 1]
                                i && 'text' === i.type
                                  ? ((i.raw += n.raw), (i.text += n.text))
                                  : t.push(n)
                              } else {
                                if (e) {
                                  const t =
                                    'Infinite loop on byte: ' + e.charCodeAt(0)
                                  if (this.options.silent) {
                                    console.error(t)
                                    break
                                  }
                                  throw new Error(t)
                                }
                              }
                            } else {
                              e = e.substring(n.raw.length)
                              t.push(n)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return t
    }
  },
  _Renderer = class {
    constructor(e) {
      __publicField(this, 'options')
      __publicField(this, 'parser')
      this.options = e || _defaults
    }
    space(e) {
      return ''
    }
    code({ text: e, lang: t, escaped: n }) {
      var i
      const s = null == (i = (t || '').match(/^\S*/)) ? void 0 : i[0],
        r = e.replace(/\n$/, '') + '\n'
      return s
        ? '<pre><code class="language-' +
            escape$1(s) +
            '">' +
            (n ? r : escape$1(r, true)) +
            '</code></pre>\n'
        : '<pre><code>' + (n ? r : escape$1(r, true)) + '</code></pre>\n'
    }
    blockquote({ tokens: e }) {
      return `<blockquote>\n${this.parser.parse(e)}</blockquote>\n`
    }
    html({ text: e }) {
      return e
    }
    heading({ tokens: e, depth: t }) {
      return `<h${t}>${this.parser.parseInline(e)}</h${t}>\n`
    }
    hr(e) {
      return '<hr>\n'
    }
    list(e) {
      const t = e.ordered,
        n = e.start
      let i = ''
      for (let t = 0; t < e.items.length; t++) {
        const n = e.items[t]
        i += this.listitem(n)
      }
      const s = t ? 'ol' : 'ul'
      return (
        '<' +
        s +
        (t && 1 !== n ? ' start="' + n + '"' : '') +
        '>\n' +
        i +
        '</' +
        s +
        '>\n'
      )
    }
    listitem(e) {
      let t = ''
      if (e.task) {
        const n = this.checkbox({ checked: !!e.checked })
        e.loose
          ? e.tokens.length > 0 && 'paragraph' === e.tokens[0].type
            ? ((e.tokens[0].text = n + ' ' + e.tokens[0].text),
              e.tokens[0].tokens &&
                e.tokens[0].tokens.length > 0 &&
                'text' === e.tokens[0].tokens[0].type &&
                (e.tokens[0].tokens[0].text =
                  n + ' ' + e.tokens[0].tokens[0].text))
            : e.tokens.unshift({
                type: 'text',
                raw: n + ' ',
                text: n + ' ',
              })
          : (t += n + ' ')
      }
      return (t += this.parser.parse(e.tokens, !!e.loose)), `<li>${t}</li>\n`
    }
    checkbox({ checked: e }) {
      return (
        '<input ' + (e ? 'checked="" ' : '') + 'disabled="" type="checkbox">'
      )
    }
    paragraph({ tokens: e }) {
      return `<p>${this.parser.parseInline(e)}</p>\n`
    }
    table(e) {
      let t = '',
        n = ''
      for (let t = 0; t < e.header.length; t++) {
        n += this.tablecell(e.header[t])
      }
      t += this.tablerow({ text: n })
      let i = ''
      for (let t = 0; t < e.rows.length; t++) {
        const s = e.rows[t]
        n = ''
        for (let e = 0; e < s.length; e++) {
          n += this.tablecell(s[e])
        }
        i += this.tablerow({ text: n })
      }
      return (
        i && (i = `<tbody>${i}</tbody>`),
        '<table>\n<thead>\n' + t + '</thead>\n' + i + '</table>\n'
      )
    }
    tablerow({ text: e }) {
      return `<tr>\n${e}</tr>\n`
    }
    tablecell(e) {
      const t = this.parser.parseInline(e.tokens),
        n = e.header ? 'th' : 'td'
      return (
        (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>\n`
      )
    }
    strong({ tokens: e }) {
      return `<strong>${this.parser.parseInline(e)}</strong>`
    }
    em({ tokens: e }) {
      return `<em>${this.parser.parseInline(e)}</em>`
    }
    codespan({ text: e }) {
      return `<code>${e}</code>`
    }
    br(e) {
      return '<br>'
    }
    del({ tokens: e }) {
      return `<del>${this.parser.parseInline(e)}</del>`
    }
    link({ href: e, title: t, tokens: n }) {
      const i = this.parser.parseInline(n),
        s = cleanUrl(e)
      if (null === s) {
        return i
      }
      let r = '<a href="' + (e = s) + '"'
      return t && (r += ' title="' + t + '"'), (r += '>' + i + '</a>'), r
    }
    image({ href: e, title: t, text: n }) {
      const i = cleanUrl(e)
      if (null === i) {
        return n
      }
      let s = `<img src="${(e = i)}" alt="${n}"`
      return t && (s += ` title="${t}"`), (s += '>'), s
    }
    text(e) {
      return 'tokens' in e && e.tokens
        ? this.parser.parseInline(e.tokens)
        : e.text
    }
  },
  _TextRenderer = class {
    strong({ text: e }) {
      return e
    }
    em({ text: e }) {
      return e
    }
    codespan({ text: e }) {
      return e
    }
    del({ text: e }) {
      return e
    }
    html({ text: e }) {
      return e
    }
    text({ text: e }) {
      return e
    }
    link({ text: e }) {
      return '' + e
    }
    image({ text: e }) {
      return '' + e
    }
    br() {
      return ''
    }
  },
  _Parser = class {
    constructor(e) {
      __publicField(this, 'options')
      __publicField(this, 'renderer')
      __publicField(this, 'textRenderer')
      this.options = e || _defaults
      this.options.renderer = this.options.renderer || new _Renderer()
      this.renderer = this.options.renderer
      this.renderer.options = this.options
      this.renderer.parser = this
      this.textRenderer = new _TextRenderer()
    }
    static parse(e, t) {
      return new _Parser(t).parse(e)
    }
    static parseInline(e, t) {
      return new _Parser(t).parseInline(e)
    }
    parse(e, t = true) {
      let n = ''
      for (let i = 0; i < e.length; i++) {
        const s = e[i]
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[s.type]
        ) {
          const e = s,
            t = this.options.extensions.renderers[e.type].call(
              { parser: this },
              e
            )
          if (
            false !== t ||
            ![
              'space',
              'hr',
              'heading',
              'code',
              'table',
              'blockquote',
              'list',
              'html',
              'paragraph',
              'text',
            ].includes(e.type)
          ) {
            n += t || ''
            continue
          }
        }
        const r = s
        switch (r.type) {
          case 'space':
            n += this.renderer.space(r)
            continue
          case 'hr':
            n += this.renderer.hr(r)
            continue
          case 'heading':
            n += this.renderer.heading(r)
            continue
          case 'code':
            n += this.renderer.code(r)
            continue
          case 'table':
            n += this.renderer.table(r)
            continue
          case 'blockquote':
            n += this.renderer.blockquote(r)
            continue
          case 'list':
            n += this.renderer.list(r)
            continue
          case 'html':
            n += this.renderer.html(r)
            continue
          case 'paragraph':
            n += this.renderer.paragraph(r)
            continue
          case 'text': {
            let s = r,
              a = this.renderer.text(s)
            for (; i + 1 < e.length && 'text' === e[i + 1].type; ) {
              s = e[++i]
              a += '\n' + this.renderer.text(s)
            }
            n += t
              ? this.renderer.paragraph({
                  type: 'paragraph',
                  raw: a,
                  text: a,
                  tokens: [
                    {
                      type: 'text',
                      raw: a,
                      text: a,
                    },
                  ],
                })
              : a
            continue
          }
          default: {
            const e = 'Token with "' + r.type + '" type was not found.'
            if (this.options.silent) {
              return console.error(e), ''
            }
            throw new Error(e)
          }
        }
      }
      return n
    }
    parseInline(e, t) {
      t = t || this.renderer
      let n = ''
      for (let i = 0; i < e.length; i++) {
        const s = e[i]
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[s.type]
        ) {
          const e = this.options.extensions.renderers[s.type].call(
            { parser: this },
            s
          )
          if (
            false !== e ||
            ![
              'escape',
              'html',
              'link',
              'image',
              'strong',
              'em',
              'codespan',
              'br',
              'del',
              'text',
            ].includes(s.type)
          ) {
            n += e || ''
            continue
          }
        }
        const r = s
        switch (r.type) {
          case 'escape':
          case 'text':
            n += t.text(r)
            break
          case 'html':
            n += t.html(r)
            break
          case 'link':
            n += t.link(r)
            break
          case 'image':
            n += t.image(r)
            break
          case 'strong':
            n += t.strong(r)
            break
          case 'em':
            n += t.em(r)
            break
          case 'codespan':
            n += t.codespan(r)
            break
          case 'br':
            n += t.br(r)
            break
          case 'del':
            n += t.del(r)
            break
          default: {
            const e = 'Token with "' + r.type + '" type was not found.'
            if (this.options.silent) {
              return console.error(e), ''
            }
            throw new Error(e)
          }
        }
      }
      return n
    }
  },
  _Hooks = class {
    constructor(e) {
      __publicField(this, 'options')
      this.options = e || _defaults
    }
    preprocess(e) {
      return e
    }
    postprocess(e) {
      return e
    }
    processAllTokens(e) {
      return e
    }
  }
__publicField(
  _Hooks,
  'passThroughHooks',
  new Set(['preprocess', 'postprocess', 'processAllTokens'])
)
var Marked = class {
  constructor(...e) {
    __privateAdd(this, _convertRendererFunction)
    __privateAdd(this, _parseMarkdown)
    __privateAdd(this, _onError)
    __publicField(this, 'defaults', _getDefaults())
    __publicField(this, 'options', this.setOptions)
    __publicField(
      this,
      'parse',
      __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(
        this,
        _Lexer.lex,
        _Parser.parse
      )
    )
    __publicField(
      this,
      'parseInline',
      __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(
        this,
        _Lexer.lexInline,
        _Parser.parseInline
      )
    )
    __publicField(this, 'Parser', _Parser)
    __publicField(this, 'Renderer', _Renderer)
    __publicField(this, 'TextRenderer', _TextRenderer)
    __publicField(this, 'Lexer', _Lexer)
    __publicField(this, 'Tokenizer', _Tokenizer)
    __publicField(this, 'Hooks', _Hooks)
    this.use(...e)
  }
  walkTokens(e, t) {
    var n, i
    let s = []
    for (const r of e)
      switch (((s = s.concat(t.call(this, r))), r.type)) {
        case 'table': {
          const e = r
          for (const n of e.header) s = s.concat(this.walkTokens(n.tokens, t))
          for (const n of e.rows)
            for (const e of n) s = s.concat(this.walkTokens(e.tokens, t))
          break
        }
        case 'list': {
          const e = r
          s = s.concat(this.walkTokens(e.items, t))
          break
        }
        default: {
          const e = r
          ;(
            null ==
            (i =
              null == (n = this.defaults.extensions) ? void 0 : n.childTokens)
              ? void 0
              : i[e.type]
          )
            ? this.defaults.extensions.childTokens[e.type].forEach((n) => {
                const i = e[n].flat(1e400)
                s = s.concat(this.walkTokens(i, t))
              })
            : e.tokens && (s = s.concat(this.walkTokens(e.tokens, t)))
        }
      }
    return s
  }
  use(...e) {
    const t = this.defaults.extensions || {
      renderers: {},
      childTokens: {},
    }
    return (
      e.forEach((e) => {
        const n = { ...e }
        if (
          ((n.async = this.defaults.async || n.async || false),
          e.extensions &&
            (e.extensions.forEach((e) => {
              if (!e.name) {
                throw new Error('extension name required')
              }
              if ('renderer' in e) {
                const n = t.renderers[e.name]
                t.renderers[e.name] = n
                  ? function (...t) {
                      let i = e.renderer.apply(this, t)
                      return false === i && (i = n.apply(this, t)), i
                    }
                  : e.renderer
              }
              if ('tokenizer' in e) {
                if (!e.level || ('block' !== e.level && 'inline' !== e.level)) {
                  throw new Error("extension level must be 'block' or 'inline'")
                }
                const n = t[e.level]
                n ? n.unshift(e.tokenizer) : (t[e.level] = [e.tokenizer])
                e.start &&
                  ('block' === e.level
                    ? t.startBlock
                      ? t.startBlock.push(e.start)
                      : (t.startBlock = [e.start])
                    : 'inline' === e.level &&
                      (t.startInline
                        ? t.startInline.push(e.start)
                        : (t.startInline = [e.start])))
              }
              'childTokens' in e &&
                e.childTokens &&
                (t.childTokens[e.name] = e.childTokens)
            }),
            (n.extensions = t)),
          e.renderer)
        ) {
          const t = this.defaults.renderer || new _Renderer(this.defaults)
          for (const n in e.renderer) {
            if (!(n in t)) {
              throw new Error(`renderer '${n}' does not exist`)
            }
            if (['options', 'parser'].includes(n)) {
              continue
            }
            const i = n
            let s = e.renderer[i]
            const r = t[i]
            t[i] = (...n) => {
              e.useNewRenderer ||
                (s = __privateMethod(
                  this,
                  _convertRendererFunction,
                  convertRendererFunction_fn
                ).call(this, s, i, t))
              let a = s.apply(t, n)
              return false === a && (a = r.apply(t, n)), a || ''
            }
          }
          n.renderer = t
        }
        if (e.tokenizer) {
          const t = this.defaults.tokenizer || new _Tokenizer(this.defaults)
          for (const n in e.tokenizer) {
            if (!(n in t)) {
              throw new Error(`tokenizer '${n}' does not exist`)
            }
            if (['options', 'rules', 'lexer'].includes(n)) {
              continue
            }
            const i = n,
              s = e.tokenizer[i],
              r = t[i]
            t[i] = (...e) => {
              let n = s.apply(t, e)
              return false === n && (n = r.apply(t, e)), n
            }
          }
          n.tokenizer = t
        }
        if (e.hooks) {
          const t = this.defaults.hooks || new _Hooks()
          for (const n in e.hooks) {
            if (!(n in t)) {
              throw new Error(`hook '${n}' does not exist`)
            }
            if ('options' === n) {
              continue
            }
            const i = n,
              s = e.hooks[i],
              r = t[i]
            _Hooks.passThroughHooks.has(n)
              ? (t[i] = (e) => {
                  if (this.defaults.async) {
                    return Promise.resolve(s.call(t, e)).then((e) =>
                      r.call(t, e)
                    )
                  }
                  const n = s.call(t, e)
                  return r.call(t, n)
                })
              : (t[i] = (...e) => {
                  let n = s.apply(t, e)
                  return false === n && (n = r.apply(t, e)), n
                })
          }
          n.hooks = t
        }
        if (e.walkTokens) {
          const t = this.defaults.walkTokens,
            i = e.walkTokens
          n.walkTokens = function (e) {
            let n = []
            return (
              n.push(i.call(this, e)), t && (n = n.concat(t.call(this, e))), n
            )
          }
        }
        this.defaults = {
          ...this.defaults,
          ...n,
        }
      }),
      this
    )
  }
  setOptions(e) {
    return (
      (this.defaults = {
        ...this.defaults,
        ...e,
      }),
      this
    )
  }
  lexer(e, t) {
    return _Lexer.lex(e, null != t ? t : this.defaults)
  }
  parser(e, t) {
    return _Parser.parse(e, null != t ? t : this.defaults)
  }
}
_convertRendererFunction = new WeakSet()
convertRendererFunction_fn = function (e, t, n) {
  switch (t) {
    case 'heading':
      return function (i) {
        return i.type && i.type === t
          ? e.call(
              this,
              n.parser.parseInline(i.tokens),
              i.depth,
              unescape(n.parser.parseInline(i.tokens, n.parser.textRenderer))
            )
          : e.apply(this, arguments)
      }
    case 'code':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, n.text, n.lang, !!n.escaped)
          : e.apply(this, arguments)
      }
    case 'table':
      return function (n) {
        if (!n.type || n.type !== t) {
          return e.apply(this, arguments)
        }
        let i = '',
          s = ''
        for (let e = 0; e < n.header.length; e++) {
          s += this.tablecell({
            text: n.header[e].text,
            tokens: n.header[e].tokens,
            header: true,
            align: n.align[e],
          })
        }
        i += this.tablerow({ text: s })
        let r = ''
        for (let e = 0; e < n.rows.length; e++) {
          const t = n.rows[e]
          s = ''
          for (let e = 0; e < t.length; e++) {
            s += this.tablecell({
              text: t[e].text,
              tokens: t[e].tokens,
              header: false,
              align: n.align[e],
            })
          }
          r += this.tablerow({ text: s })
        }
        return e.call(this, i, r)
      }
    case 'blockquote':
      return function (n) {
        if (!n.type || n.type !== t) {
          return e.apply(this, arguments)
        }
        const i = this.parser.parse(n.tokens)
        return e.call(this, i)
      }
    case 'list':
      return function (n) {
        if (!n.type || n.type !== t) {
          return e.apply(this, arguments)
        }
        const i = n.ordered,
          s = n.start,
          r = n.loose
        let a = ''
        for (let e = 0; e < n.items.length; e++) {
          const t = n.items[e],
            i = t.checked,
            s = t.task
          let o = ''
          if (t.task) {
            const e = this.checkbox({ checked: !!i })
            r
              ? t.tokens.length > 0 && 'paragraph' === t.tokens[0].type
                ? ((t.tokens[0].text = e + ' ' + t.tokens[0].text),
                  t.tokens[0].tokens &&
                    t.tokens[0].tokens.length > 0 &&
                    'text' === t.tokens[0].tokens[0].type &&
                    (t.tokens[0].tokens[0].text =
                      e + ' ' + t.tokens[0].tokens[0].text))
                : t.tokens.unshift({
                    type: 'text',
                    text: e + ' ',
                  })
              : (o += e + ' ')
          }
          o += this.parser.parse(t.tokens, r)
          a += this.listitem({
            type: 'list_item',
            raw: o,
            text: o,
            task: s,
            checked: !!i,
            loose: r,
            tokens: t.tokens,
          })
        }
        return e.call(this, a, i, s)
      }
    case 'html':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, n.text, n.block)
          : e.apply(this, arguments)
      }
    case 'paragraph':
    case 'strong':
    case 'em':
    case 'del':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, this.parser.parseInline(n.tokens))
          : e.apply(this, arguments)
      }
    case 'escape':
    case 'codespan':
    case 'text':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, n.text)
          : e.apply(this, arguments)
      }
    case 'link':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, n.href, n.title, this.parser.parseInline(n.tokens))
          : e.apply(this, arguments)
      }
    case 'image':
      return function (n) {
        return n.type && n.type === t
          ? e.call(this, n.href, n.title, n.text)
          : e.apply(this, arguments)
      }
  }
  return e
}
_parseMarkdown = new WeakSet()
parseMarkdown_fn = function (e, t) {
  return (n, i) => {
    const s = { ...i },
      r = {
        ...this.defaults,
        ...s,
      }
    true === this.defaults.async &&
      false === s.async &&
      (r.silent ||
        console.warn(
          'marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.'
        ),
      (r.async = true))
    const a = __privateMethod(this, _onError, onError_fn).call(
      this,
      !!r.silent,
      !!r.async
    )
    if (null == n) {
      return a(new Error('marked(): input parameter is undefined or null'))
    }
    if ('string' != typeof n) {
      return a(
        new Error(
          'marked(): input parameter is of type ' +
            Object.prototype.toString.call(n) +
            ', string expected'
        )
      )
    }
    if ((r.hooks && (r.hooks.options = r), r.async)) {
      return Promise.resolve(r.hooks ? r.hooks.preprocess(n) : n)
        .then((t) => e(t, r))
        .then((e) => (r.hooks ? r.hooks.processAllTokens(e) : e))
        .then((e) =>
          r.walkTokens
            ? Promise.all(this.walkTokens(e, r.walkTokens)).then(() => e)
            : e
        )
        .then((e) => t(e, r))
        .then((e) => (r.hooks ? r.hooks.postprocess(e) : e))
        .catch(a)
    }
    try {
      r.hooks && (n = r.hooks.preprocess(n))
      let i = e(n, r)
      r.hooks && (i = r.hooks.processAllTokens(i))
      r.walkTokens && this.walkTokens(i, r.walkTokens)
      let s = t(i, r)
      return r.hooks && (s = r.hooks.postprocess(s)), s
    } catch (e) {
      return a(e)
    }
  }
}
_onError = new WeakSet()
onError_fn = function (e, t) {
  return (n) => {
    if (
      ((n.message +=
        '\nPlease report this to https://github.com/markedjs/marked.'),
      e)
    ) {
      const e =
        '<p>An error occurred:</p><pre>' +
        escape$1(n.message + '', true) +
        '</pre>'
      return t ? Promise.resolve(e) : e
    }
    if (t) {
      return Promise.reject(n)
    }
    throw n
  }
}
var markedInstance = new Marked()
function marked(e, t) {
  return markedInstance.parse(e, t)
}
marked.options = marked.setOptions = function (e) {
  return (
    markedInstance.setOptions(e),
    (marked.defaults = markedInstance.defaults),
    changeDefaults(marked.defaults),
    marked
  )
}
marked.getDefaults = _getDefaults
marked.defaults = _defaults
marked.use = function (...e) {
  return (
    markedInstance.use(...e),
    (marked.defaults = markedInstance.defaults),
    changeDefaults(marked.defaults),
    marked
  )
}
marked.walkTokens = function (e, t) {
  return markedInstance.walkTokens(e, t)
}
marked.parseInline = markedInstance.parseInline
marked.Parser = _Parser
marked.parser = _Parser.parse
marked.Renderer = _Renderer
marked.TextRenderer = _TextRenderer
marked.Lexer = _Lexer
marked.lexer = _Lexer.lex
marked.Tokenizer = _Tokenizer
marked.Hooks = _Hooks
marked.parse = marked
var options = marked.options,
  setOptions = marked.setOptions,
  use = marked.use,
  walkTokens = marked.walkTokens,
  parseInline = marked.parseInline,
  parser = _Parser.parse,
  lexer = _Lexer.lex
async function getSource() {
  let e = this.app.workspace.getActiveFile()
  const t = window.getSelection(),
    n = t.getRangeAt(0)
  t.toString()
  let i =
      3 === n.commonAncestorContainer.nodeType
        ? n.commonAncestorContainer.parentNode
        : n.commonAncestorContainer,
    s = document.getElementsByClassName('callout')
  for (let e of s)
    if (e.contains(i)) {
      return ''
    }
  if (e.path.includes('.pdf')) {
    let t = document.getElementsByClassName('page'),
      n = '0'
    for (let e of t)
      if (e.contains(i)) {
        n = e.getAttribute('data-page-number')
        break
      }
    return `[[${e.path}#page=${n}|${e.basename}]]`
  }
  return `[[${e.path}|${e.basename}]]`
}
async function eng2(e, t, n) {
  n = n.replace('\u25BA', '')
  let i = document.getElementById('dictionary-container'),
    s = {
      messages: [
        {
          role: 'system',
          content:
            'Act like an English dictionary helps me look up a word or phrase in a specific context. Response in JSON format with "Term", "Part_of_speech", "Definition", "IPA", "Examples".  The term should be lemmatised. The term in the examples should be in bold. Provide three examples using the term.',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in English\nTerm: apples\nContext: he eats three apples',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "apple",\n"Part_of_speech": "noun",\n"Definition": "a sweet fruit that grows on apple trees, often eaten fresh or used in cooking and making juice",\n"IPA": "/ˈæpəl/",\n"Examples": [\n"He bit into a crispy **apple**.",\n"She put three **apples** into her lunchbox.",\n"He eats three **apples**."\n]\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: has\nContext: he has three cars',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "have",\n"Part_of_speech": "động từ",\n"Definition": "có, sở hữu, chiếm giữ",\n"IPA": "/hæv/",\n"Examples": [\n"He **has** three cars.",\n"She **has** a big house.",\n"They **have** a lot of friends."\n]\n}',
        },
        {
          role: 'user',
          content:
            "The definition and Part of speech are in Vietnamese\nTerm: turned a blind eye\nContext: he turned a blind eye to his children's faults",
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "turn a blind eye",\n"Part_of_speech": "thành ngữ",\n"Definition": "làm ngơ, không ý thức, bỏ qua lỗi lầm",\n"IPA": "/tɜrn ə blaɪnd aɪ/",\n"Examples": [\n"He **turned a blind eye** to his children\'s faults.",\n"She **turned a blind eye** to her friend\'s mistake.",\n"They **turned a blind eye** to the corruption in the company."\n]\n}',
        },
        {
          role: 'user',
          content:
            "The definition and Part of speech are in Vietnamese\nTerm: When you're ready\nContext: When you're ready, delete this note and make the vault your own.",
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "when you\'re ready",\n"Part_of_speech": "cụm từ",\n"Definition": "khi bạn đã sẵn sàng",\n"IPA": "/wen juər ˈredi/",\n"Examples": [\n"**When you\'re ready**, start the engine.",\n"**When you\'re ready**, let me know and we\'ll begin.",\n"**When you\'re ready**, delete this note and make the vault your own."\n]\n}',
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    },
    r = `The Definition and Part of Speech are in ${e.def}\nTerm: ${t}\nContext: ${n}`
  s.messages = [
    ...s.messages,
    {
      role: 'user',
      content: r,
    },
  ]
  let a = await AIchat(e.llmkey, s)
  if (!a) {
    return
  }
  a = JSON.parse(a)
  a.Source = await getSource()
  a.ID = `${Date.now()}`
  let o = document.createElement('div')
  o.classList.add('callout')
  let l = document.createElement('button')
  l.classList.add('callout-button')
  l.innerHTML = '&#128465;'
  o.innerHTML = `\n        <h2 class="callout-title">\n            <button speech="${a.Term}" class="dict-audio">►</button>\n            ${a.Term}\n        </h2>\n        <p class="callout-text">\n            ${a.IPA}\n        </p>\n        <p class="callout-text">\n            ${a.Part_of_speech}\n        </p>\n\n        <p class="callout-text">\n            ${a.Definition}\n        </p>\n    `
  let c = document.createElement('ul')
  c.classList.add('dict-example')
  c.setAttribute('field', 'Examples')
  for (let e of a.Examples) {
    let t = document.createElement('li'),
      n = e.replace(/\*\*/g, ''),
      i = await marked(e)
    i = i.replace(/\<p\>/g, '').replace(/\<\/p\>/g, '')
    t.innerHTML = `<button speech="${n}" class="dict-audio">►</button>${i}`
    c.appendChild(t)
    t.classList.add('callout-text')
  }
  o.appendChild(c)
  l.addEventListener('click', () => {
    o.remove()
  })
  o.prepend(l)
  null == i || i.prepend(o)
  o.setAttribute('data', JSON.stringify(a))
  let h = document.getElementsByClassName('dict-audio')
  for (let t of h)
    t.addEventListener('click', async (n) => {
      if (localStorage.getItem(e.activation)) {
        let e = t.getAttribute('speech')
        await textToSpeech(
          e,
          JSON.parse(localStorage.getItem('LLM-settings')).voice
        )
      } else {
        new import_obsidian.Notice('Please upgrade to use this feature')
      }
    })
}
var import_obsidian2 = require('obsidian')
async function ja(e, t, n) {
  n = n.replace('\u25BA', '')
  let i = document.getElementById('dictionary-container'),
    s = {
      messages: [
        {
          role: 'system',
          content:
            'Act like a Japanese dictionary helps me look up a word or phrase in a specific context. Response in JSON format with "Term", "Hiragana", "Definition", "Examples", "Part_of_speech".  The term should be lemmatised. The term in the examples should be in bold. Provide three examples using the term.',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in English\nTerm: 寂しい\nContext: これは寂しい曲ですね\u3002',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "寂しい",\n"Hiragana": "さびしい",\n"Definition": "lonely, sad, melancholic",\n"Examples": [\n"これは**さびしい**曲ですね",\n"彼は**さびしい**表情をしていた",\n"あの町は**さびしい**夜だった"\n],\n"Part_of_speech": "adjective"\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 期待\nContext: みんな私たちに期待しています\u3002',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "期待",\n"Hiragana": "きたい",\n"Definition": "mong đợi, kỳ vọng",\n"Examples": [\n"みんな私たちに**きたい**しています\u3002",\n"彼女は**きたい**の表情をしていた\u3002",\n"あのチームは**きたい**の勝利を得た\u3002"\n],\n"Part_of_speech": "danh từ"\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 対象',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "対象",\n"Hiragana": "たいしょう",\n"Definition": "đối tượng, mục tiêu",\n"Examples": [\n"この**たいしょう**は非常に重要です\u3002",\n"彼女は**たいしょう**の研究をしている\u3002",\n"あの会社は**たいしょう**の市場を目指しています\u3002"\n],\n"Part_of_speech": "danh từ"\n}',
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    },
    r = `The Definition and Part of Speech are in ${e.def}\nTerm: ${t}\nContext: ${n}`
  s.messages = [
    ...s.messages,
    {
      role: 'user',
      content: r,
    },
  ]
  let a = await AIchat(e.llmkey, s)
  if (!a) {
    return
  }
  a = JSON.parse(a)
  a.Source = await getSource()
  a.ID = `${Date.now()}`
  let o = document.createElement('div')
  o.classList.add('callout')
  let l = document.createElement('button')
  l.classList.add('callout-button')
  l.innerHTML = '&#128465;'
  o.innerHTML = `\n        <h2 class="callout-title" field="Term">\n            <button speech="${a.Term}" class="dict-audio">►</button>\n            ${a.Term}\n        </h2>\n\n        <p class="callout-text">\n            Hiragana: ${a.Hiragana} \n        </p>\n\n        <p class="callout-text">\n            ${a.Part_of_speech}\n        </p>\n\n\n        <p class="callout-text" field="Definition">\n            ${a.Definition}\n        </p>\n    `
  let c = document.createElement('ul')
  c.classList.add('dict-example')
  c.setAttribute('field', 'Examples')
  for (let e of a.Examples) {
    let t = document.createElement('li'),
      n = e.replace(/\*\*/g, ''),
      i = await marked(e)
    i = i.replace(/\<p\>/g, '').replace(/\<\/p\>/g, '')
    t.innerHTML = `<button speech="${n}" class="dict-audio">►</button>${i}`
    c.appendChild(t)
    t.classList.add('callout-text')
  }
  o.appendChild(c)
  l.addEventListener('click', () => {
    o.remove()
  })
  o.prepend(l)
  null == i || i.prepend(o)
  o.setAttribute('data', JSON.stringify(a))
  let h = document.getElementsByClassName('dict-audio')
  for (let t of h)
    t.addEventListener('click', async (n) => {
      if (localStorage.getItem(e.activation)) {
        let e = t.getAttribute('speech')
        await textToSpeech(
          e,
          JSON.parse(localStorage.getItem('LLM-settings')).voice
        )
      } else {
        new import_obsidian2.Notice('Please upgrade to use this feature')
      }
    })
}
var import_obsidian3 = require('obsidian')
async function korean(e, t, n) {
  n = n.replace('\u25BA', '')
  let i = document.getElementById('dictionary-container'),
    s = {
      messages: [
        {
          role: 'system',
          content:
            'Act like a Korean dictionary helps me look up a word or phrase in a specific context. Response in JSON format with "Term", "Hanja", "Definition", "Examples", "Part_of_speech".  The term should be lemmatised. The term in the examples should be in bold. Provide three examples using the term.',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in English\nTerm: 수고\nContext: 오늘 일이 다 끝났습니다. 수고하셨습니다.',
        },
        {
          role: 'assistant',
          content:
            '{\n  "Term": "수고",\n  "Hanja": "",\n  "Definition": "to work hard, to make an effort",\n  "Examples": [\n    "오늘 일이 다 끝났습니다. **수고**하셨습니다.",\n    "**수고**하세요.",\n    "저는 이 프로젝트에 **수고**했습니다."\n  ],\n  "Part_of_speech": "verb"\n}\n',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 무슨\nContext: 무슨 계절을 좋아하세요?',
        },
        {
          role: 'assistant',
          content:
            '{\n  "Term": "무슨",\n  "Hanja": "",\n  "Definition": "cái gì, gì",\n  "Examples": [\n    "**무슨** 계절을 좋아하세요?",\n    "저는 **무슨** 책을 읽고 싶어요.",\n    "**무슨** 음식을 좋아하세요?"\n  ],\n  "Part_of_speech": "danh từ hỏi"\n}\n',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in English\nTerm: 안녕히',
        },
        {
          role: 'assistant',
          content:
            '{\n  "Term": "안녕히",\n  "Hanja": "",\n  "Definition": "goodbye, farewell",\n  "Examples": [\n    "**안녕히** 가세요.",\n    "저는 이제 **안녕히** 가겠습니다.",\n    "다음에 **안녕히** 만나요."\n  ],\n  "Part_of_speech": "interjection"\n}\n',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 공부\nContext: 가: 한국어 공부가 어때요? 나: 어렵지만 재미있어요.',
        },
        {
          role: 'assistant',
          content:
            '{\n  "Term": "공부",\n  "Hanja": "學習",\n  "Definition": "học tập, nghiên cứu",\n  "Examples": [\n    "가: 한국어 **공부**가 어때요? 나: 어렵지만 재미있어요.",\n    "저는 컴퓨터 **공부**를 하고 싶어요.",\n    "저는 언어 **공부**를 열심히 했습니다."\n  ],\n  "Part_of_speech": "danh từ"\n}\n',
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    },
    r = `The Definition and Part of Speech are in ${e.def}\nTerm: ${t}\nContext: ${n}`
  s.messages = [
    ...s.messages,
    {
      role: 'user',
      content: r,
    },
  ]
  let a = await AIchat(e.llmkey, s)
  if (!a) {
    return
  }
  a = JSON.parse(a)
  a.Source = await getSource()
  a.ID = `${Date.now()}`
  let o = document.createElement('div')
  o.classList.add('callout')
  let l = document.createElement('button')
  l.classList.add('callout-button')
  l.innerHTML = '&#128465;'
  o.innerHTML = `\n        <h2 class="callout-title" field="Term">\n            <button speech="${a.Term}" class="dict-audio">►</button>\n            ${a.Term}\n        </h2>\n\n        <p class="callout-text">\n            Hanja: ${a.Hanja} \n        </p>\n\n        <p class="callout-text">\n            ${a.Part_of_speech}\n        </p>\n\n\n        <p class="callout-text" field="Definition">\n            ${a.Definition}\n        </p>\n    `
  let c = document.createElement('ul')
  c.classList.add('dict-example')
  c.setAttribute('field', 'Examples')
  for (let e of a.Examples) {
    let t = document.createElement('li'),
      n = e.replace(/\*\*/g, ''),
      i = await marked(e)
    i = i.replace(/\<p\>/g, '').replace(/\<\/p\>/g, '')
    t.innerHTML = `<button speech="${n}" class="dict-audio">►</button>${i}`
    c.appendChild(t)
    t.classList.add('callout-text')
  }
  o.appendChild(c)
  l.addEventListener('click', () => {
    o.remove()
  })
  o.prepend(l)
  null == i || i.prepend(o)
  o.setAttribute('data', JSON.stringify(a))
  let h = document.getElementsByClassName('dict-audio')
  for (let t of h)
    t.addEventListener('click', async (n) => {
      if (localStorage.getItem(e.activation)) {
        let e = t.getAttribute('speech')
        await textToSpeech(
          e,
          JSON.parse(localStorage.getItem('LLM-settings')).voice
        )
      } else {
        new import_obsidian3.Notice('Please upgrade to use this feature')
      }
    })
}
var import_obsidian4 = require('obsidian')
async function chinese(e, t, n) {
  n = n.replace('\u25BA', '')
  let i = document.getElementById('dictionary-container'),
    s = {
      messages: [
        {
          role: 'system',
          content:
            'Act like a Chinese dictionary helps me look up a word or phrase in a specific context. Response in JSON format with "Term", "Pinyin", "Definition", "Examples", "Part_of_speech".  The term should be lemmatised. The term in the examples should be in bold. Provide three examples using the term.',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in English\nTerm: 现实\nContext: 考虑问题\uFF0C不能脱离现实\u3002',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "现实",\n"Pinyin": "xiàn shí",\n"Definition": "reality, actuality",\n"Examples": [\n"考虑问题\uFF0C不能脱离**现实**\u3002",\n"他的演讲充满**现实**感\u3002",\n"我们应该面对**现实**\uFF0C不要逃避困难\u3002"\n],\n"Part_of_speech": "noun"\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 恰到好处\nContext: 鱼做得恰到好处\u3002',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "恰到好处",\n"Pinyin": "qià dào hǎo chu",\n"Definition": "đúng lúc, vừa đủ",\n"Examples": [\n"鱼做得**恰到好处**\u3002",\n"他的演讲结束得**恰到好处**\uFF0C获得了热烈的掌声\u3002",\n"她总是能找到**恰到好处**的解决方法\u3002"\n],\n"Part_of_speech": "thành ngữ"\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 盒子\nContext: 保险丝盒子在厨房里\u3002',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "盒子",\n"Pinyin": "hé zi",\n"Definition": "hộp",\n"Examples": [\n"保险丝**盒子**在厨房里\u3002",\n"她打开了**盒子**\uFF0C发现里面有一个 surprize\u3002",\n"这个**盒子**太小\uFF0C不能装下所有的东西\u3002"\n],\n"Part_of_speech": "danh từ"\n}',
        },
        {
          role: 'user',
          content:
            'The definition and Part of speech are in Vietnamese\nTerm: 传',
        },
        {
          role: 'assistant',
          content:
            '{\n"Term": "传",\n"Pinyin": "chuán",\n"Definition": "truyền, truyền lại",\n"Examples": [\n"这个故事被**传**了下来\u3002",\n"他**传**授了我们很多有用的经验\u3002",\n"这个消息被**传**遍了整个城市\u3002"\n],\n"Part_of_speech": "động từ"\n}',
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    },
    r = `The Definition and Part of Speech are in ${e.def}\nTerm: ${t}\nContext: ${n}`
  s.messages = [
    ...s.messages,
    {
      role: 'user',
      content: r,
    },
  ]
  let a = await AIchat(e.llmkey, s)
  if (!a) {
    return
  }
  a = JSON.parse(a)
  a.Source = await getSource()
  a.ID = `${Date.now()}`
  let o = document.createElement('div')
  o.classList.add('callout')
  let l = document.createElement('button')
  l.classList.add('callout-button')
  l.innerHTML = '&#128465;'
  o.innerHTML = `\n        <h2 class="callout-title" field="Term">\n            <button speech="${a.Term}" class="dict-audio">►</button>\n            ${a.Term}\n        </h2>\n\n        <p class="callout-text">\n            ${a.Pinyin} \n        </p>\n\n        <p class="callout-text">\n            ${a.Part_of_speech}\n        </p>\n\n\n        <p class="callout-text" field="Definition">\n            ${a.Definition}\n        </p>\n    `
  let c = document.createElement('ul')
  c.classList.add('dict-example')
  c.setAttribute('field', 'Examples')
  for (let e of a.Examples) {
    let t = document.createElement('li'),
      n = e.replace(/\*\*/g, ''),
      i = await marked(e)
    i = i.replace(/\<p\>/g, '').replace(/\<\/p\>/g, '')
    t.innerHTML = `<button speech="${n}" class="dict-audio">►</button>${i}`
    c.appendChild(t)
    t.classList.add('callout-text')
  }
  o.appendChild(c)
  l.addEventListener('click', () => {
    o.remove()
  })
  o.prepend(l)
  null == i || i.prepend(o)
  o.setAttribute('data', JSON.stringify(a))
  let h = document.getElementsByClassName('dict-audio')
  for (let t of h)
    t.addEventListener('click', async (n) => {
      if (localStorage.getItem(e.activation)) {
        let e = t.getAttribute('speech')
        await textToSpeech(
          e,
          JSON.parse(localStorage.getItem('LLM-settings')).voice
        )
      } else {
        new import_obsidian4.Notice('Please upgrade to use this feature')
      }
    })
}
async function lookUpTerm(e) {
  JSON.parse(localStorage.getItem('dict-select'))
  localStorage.setItem('LLM-settings', JSON.stringify(e))
  const t = window.getSelection()
  let n = '',
    i = ''
  this.app.workspace.getActiveFile()
  if (t.rangeCount > 0) {
    const e = t.getRangeAt(0),
      s = t.toString(),
      r =
        3 === e.commonAncestorContainer.nodeType
          ? e.commonAncestorContainer.parentNode
          : e.commonAncestorContainer
    n = s.trim()
    i = r.innerText.replace(/\n/g, ' ').trim()
    i == s && (i = r.parentElement.innerText.replace(/\n/g, ' ').trim())
  }
  'English' == e.lang
    ? await eng2(e, n, i)
    : 'Japanese' == e.lang
    ? await ja(e, n, i)
    : 'Korean' == e.lang
    ? await korean(e, n, i)
    : 'Chinese' == e.lang && (await chinese(e, n, i))
}
var import_obsidian5 = require('obsidian'),
  DICTIONARY_VIEWS = 'llm-dictionary-view',
  DictionaryView = class extends import_obsidian5.ItemView {
    constructor(e) {
      super(e)
    }
    getViewType() {
      return DICTIONARY_VIEWS
    }
    getDisplayText() {
      return 'Dictionary View'
    }
    async onOpen() {
      try {
        const e = this.containerEl.children[1]
        this.icon = 'sheets-in-box'
        e.empty()
        e.setAttribute('id', 'dictionary-view-container')
        let t = document.createElement('div')
        t.setAttribute('id', 'dictionary-view')
        t.innerHTML =
          '\n            <div class="tab-container">\n                <div class="tab-bar">\n                    <button class="tab-link active">Dictionary</button>\n                    <button class="tab-link">Save</button>\n                </div>\n                <div id="Tab1" class="tab-content">\n                    <div id="dictionary-container"></div>\n                </div>\n                <div id="Tab2" class="tab-content" style="display:none">\n                    <div id="save-notes">\n                        <button id="dict-save">Save</button>\n                        <input id="dict-note-name" placeholder="Vocabulary/{{Term}}.md" class="dict-inp"/>\n                        <input id="dict-note-audio" placeholder="Vocabulary/Audio" class="dict-inp"/>\n                        <h2>Template</h2>\n                        <p id="dict-fields"></p>\n                        <textarea id="dict-note-content"></textarea>\n                    </div>\n                    <div id="save-anki" class="hide">\n                        <button id="dict-save-anki">Save to Anki</button>\n                        <input id="dict-note-name-anki" placeholder="Vocabulary/{{Term}}.md" class="dict-inp"/>\n                        <input id="dict-note-audio-anki" placeholder="Vocabulary/Audio" class="dict-inp"/>\n                        <input id="dict-note-deck" placeholder="Anki Deck" class="dict-inp"/>\n                        <input id="dict-note-type" placeholder="Anki Note Type" class="dict-inp"/> <button id="dict-note-type-btn">Get Fields</button>\n                        <p id="dict-fields-anki"></p>\n                        <div id="anki-setup"></div>\n                    </div>\n                </div>\n            </div>        \n            \n            '
        e.appendChild(t)
        e.style.overflow = 'hidden'
      } catch (e) {
        console.error(e)
      }
    }
    async onClose() {}
  }
function openTab(e, t) {
  var n, i, s
  for (
    i = document.getElementsByClassName('tab-content'), n = 0;
    n < i.length;
    n++
  ) {
    i[n].style.display = 'none'
  }
  for (
    s = document.getElementsByClassName('tab-link'), n = 0;
    n < s.length;
    n++
  ) {
    s[n].className = s[n].className.replace(' active', '')
  }
  document.getElementById(t).style.display = 'block'
  e.currentTarget.className += ' active'
}
async function handleSaveNoteTab() {
  let e = document
    .getElementById('dictionary-container')
    .getElementsByClassName('callout')
  if (0 == e.length) {
    return
  }
  let t = []
  for (let n of e) {
    let e = JSON.parse(n.getAttribute('data'))
    t.push(e)
  }
  let n = Object.keys(t[0]).filter((e) => 'Examples' != e)
  document.getElementById('dict-fields').innerHTML = `Available fields: ${n
    .map((e) => `{{${e}}}`)
    .join(
      ', '
    )}, {{Audio}}, {{Example 1}}, {{Example Audio 1}}, {{Example 2}},...`
  let i = document.getElementById('dict-note-name')
  i.value = localStorage.getItem('dict-note-name')
    ? localStorage.getItem('dict-note-name')
    : ''
  i.addEventListener('change', (e) => {
    localStorage.setItem('dict-note-name', i.value)
  })
  let s = document.getElementById('dict-note-audio')
  s.value = localStorage.getItem('dict-note-audio')
    ? localStorage.getItem('dict-note-audio')
    : ''
  s.addEventListener('change', (e) => {
    localStorage.setItem('dict-note-audio', s.value)
  })
  let r = document.getElementById('dict-note-content')
  r.value = localStorage.getItem('dict-note-content')
    ? localStorage.getItem('dict-note-content')
    : ''
  r.addEventListener('change', (e) => {
    localStorage.setItem('dict-note-content', r.value)
  })
  let a = (
    localStorage.getItem('LLM-settings')
      ? JSON.parse(localStorage.getItem('LLM-settings'))
      : {}
  ).activation
  localStorage.getItem(a) ||
    ((document.getElementById('dict-note-audio').style.display = 'none'),
    (document.getElementById('dict-note-audio').value = ''))
}
var import_obsidian6 = require('obsidian')
async function validate(e) {
  let t = await (async function () {
    try {
      const e = await fetch('https://api.ipify.org?format=json')
      return (await e.json()).ip
    } catch (e) {
      throw (
        (console.error('Error getting IP address:', e),
        new Error('Unable to retrieve IP address.'))
      )
    }
  })()
  const n = await fetch(
    `https://script.google.com/macros/s/AKfycbx2dAZM-cP79uR4k9yFY1m7ZSRpeu2eGcze0HUeUTFKhY4j8-nduqRbS814rbIKhdH2yg/exec?table=LLM_dictionary&key=${e}&IP=${t}`,
    {
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      method: 'GET',
    }
  )
  let i = await n.text()
  i = JSON.parse(i)
  i.valid
    ? (new import_obsidian6.Notice('\u2705 Key đã được kích hoạt thành công'),
      localStorage.setItem('LLM-KEY', e),
      localStorage.setItem(e, JSON.stringify(i.message)))
    : new import_obsidian6.Notice(i.message)
}
var import_obsidian8 = require('obsidian'),
  import_obsidian7 = require('obsidian'),
  ANKI_PORT = 8765
function invoke(e, t = {}) {
  return new Promise((n, i) => {
    const s = new XMLHttpRequest()
    s.addEventListener('error', () => i('failed to issue request'))
    s.addEventListener('load', () => {
      try {
        const e = JSON.parse(s.responseText)
        if (2 != Object.getOwnPropertyNames(e).length) {
          throw 'response has an unexpected number of fields'
        }
        if (!e.hasOwnProperty('error')) {
          throw 'response is missing required error field'
        }
        if (!e.hasOwnProperty('result')) {
          throw 'response is missing required result field'
        }
        if (e.error) {
          throw e.error
        }
        n(e.result)
      } catch (e) {
        i(e)
      }
    })
    s.open('POST', 'http://127.0.0.1:' + ANKI_PORT.toString())
    s.send(
      JSON.stringify({
        action: e,
        version: 6,
        params: t,
      })
    )
  })
}
async function createDeck(e) {
  return await invoke('createDeck', { deck: e })
}
async function openNoteInAnki(e) {
  return await invoke('guiBrowse', {
    query: `nid:${e}`,
    reorderCards: {
      order: 'descending',
      columnId: 'noteCrt',
    },
  })
}
async function getFields(e) {
  try {
    return await invoke('modelFieldNames', { modelName: e })
  } catch (e) {
    return console.error(e), null
  }
}
async function addNote(e, t, n, i) {
  try {
    let s
    return (
      (s = await createDeck(e)),
      await invoke('addNote', {
        note: {
          modelName: n,
          deckName: e,
          fields: t,
          tags: i,
          options: { allowDuplicate: true },
        },
      })
    )
  } catch (e) {
    console.error(e)
  }
}
async function updateNote(e, t) {
  try {
    return await invoke('updateNoteFields', {
      note: {
        id: e,
        fields: t,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
async function deteteNote(e) {
  try {
    return await invoke('deleteNotes', { notes: [e] })
  } catch (e) {
    console.error(e)
  }
}
async function storeMediaFileByPath(e, t) {
  try {
    return await invoke('storeMediaFile', {
      filename: e,
      path: t,
    })
  } catch (e) {
    console.error(e)
  }
}
async function render(e) {
  try {
    if (
      (marked.use({
        mangle: false,
        headerIds: false,
      }),
      (e = e.replace(/\.md\|/g, '|')).match(/```((.|\n)*?)```/g))
    ) {
      let t = e.match(/```((.|\n)*?)```/g)
      for (let n of t) {
        let t = marked.parse(n)
        e = e.replace(n, t)
      }
    }
    if (e.match(/---((\n|.)*?)---/g)) {
      let t = e.match(/---((\n|.)*?)---/g)[0]
      t.match(/(.*):(.*)/g) &&
        ((t = t.replace(/---/g, '').replace(/\n(.*?)-/g, ' \u2724')),
        (t = t.replace(/\n/g, '\n\n')),
        (t = marked.parse(t)),
        (t = `<div class="metaData">${t}</div>`),
        (e = e.replace(e.match(/---((\n|.)*?)---/g)[0], t)))
    }
    return (
      (e = e.replace(/\n/g, '\n\n').replace(/\n\n\t/g, '\n\t')),
      (e = marked.parse(e)),
      (e = await renderNoteEmbed(e)),
      (e = (e = await convertInternalLink(e)).replace(/\^[0-9]+/g, ''))
    )
  } catch (e) {
    console.error(e)
    console.error('Render Failed')
  }
}
async function renderNoteEmbed(e) {
  try {
    if (!e.match(/\!\[\[(.*?)\]\]/g)) {
      return e
    }
    let t = this.app.vault.getAllLoadedFiles(),
      n = e.match(/\!\[\[(.*?)\]\]/g)
    for (let i of n) {
      let n,
        s = i
          .replace(/\|(.*?)\]\]/g, '')
          .replace(']]', '')
          .replace('![[', '')
          .replace(/\|(.*)/g, ''),
        r = t.filter((e) => e.basename == s || e.path == s || e.name == s)
      if (
        (0 == r.length && (n = "Can't not find this file"),
        (r = r[0]),
        ['mp3', 'wav', 'aiff', 'flac', 'ogg', 'm4a', 'wma', 'aac'].includes(
          r.extension
        ))
      ) {
        n = `[sound:${r.name}]`
        const e = this.app.vault.adapter.getBasePath() + '/' + r.path
        await storeMediaFileByPath(r.name, translateMacOSPath(e))
      } else {
        if (
          ['jpg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'raw'].includes(
            r.extension
          )
        ) {
          n = `<img src="${r.name}" />`
          const e = this.app.vault.adapter.getBasePath() + '/' + r.path
          await storeMediaFileByPath(r.name, translateMacOSPath(e))
        } else {
          'md' == r.extension &&
            ((n = await readFile(s)),
            (n = marked.parse(` ${n}`)),
            (n = `<div class="block-reference" id="${s}" \n                style="border-left: 3px solid blue; padding-left: 1em;"\n                >\n                <h3>${r.basename}</h3>\n                ${n}\n                </div>`))
        }
      }
      if (
        ((e = e.replace(i, n)),
        marked.use({
          mangle: false,
          headerIds: false,
        }),
        e.match(/```((.|\n)*?)```/g))
      ) {
        for (let t of e.match(/```((.|\n)*?)```/g))
          e = e.replace(t, marked.parse(t))
      }
    }
    if (e.match(/!\[\[(.*?)\]\]/g)) {
      let t = e.match(/!\[\[(.*?)\]\]/g)
      for (let i of t) {
        let t,
          s = i
            .replace(/\|(.*?)\]\]/g, '')
            .replace(']]', '')
            .replace('[[', '')
        s.match(/\#\^/g)
          ? ((s = s.replace('#', '-')),
            (t = new RegExp(`<div class="block-reference" id="${s}">`, 'g')))
          : (t = new RegExp(`<div class="block-reference" id="${s}">`, 'g'))
        ;(n.includes(i) || e.match(t)) &&
          (e = e.replace(i, '\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25'))
      }
      e = await render(e)
    }
    return e
  } catch (e) {
    console.error(e)
    console.error('renderEmbed')
  }
}
async function readFile(e) {
  let t
  return (
    (t = e.includes('/')
      ? this.app.vault
          .getMarkdownFiles()
          .filter((t) => t.path.includes(e + '.md'))
      : this.app.vault.getMarkdownFiles().filter((t) => t.basename == e)),
    0 == t.length ? 'FILE NOT FOUND' : await this.app.vault.read(t[0])
  )
}
async function convertInternalLink(e) {
  if (!e.match(/\[\[(.*?)\]\]/g)) {
    return e
  }
  let t = e.match(/\[\[(.*?)\]\]/g),
    n = this.app.vault.getName()
  for (let i of t) {
    let t,
      s = i
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\|(.*)/g, ''),
      r = document.createElement('div')
    r.innerHTML = s
    s = r.innerText
    let a = i
      .replace(/(.*?)\|/g, '')
      .replace(']]', '')
      .replace('[[', '')
    t = s.includes('/')
      ? this.app.vault
          .getMarkdownFiles()
          .filter((e) => e.path.replace('.md', '') == s.replace('.md', ''))
      : this.app.vault.getMarkdownFiles().filter((e) => e.basename == s)
    let o = t[0] ? t[0].path : '#',
      l = `<a \n                class="note-link" \n                href="obsidian://open?vault=${n}&file=${encodeURI(
        o.replace('.md', '')
      )}"\n                id="${o.replace('.md', '')}"\n        />${a}</a>`
    e = e.replace(i, l)
  }
  return e
}
function translateMacOSPath(e) {
  const t = process.platform
  if ('win32' === t) {
    let t = e.replace(/\//g, '\\')
    return (
      t.startsWith('/Volumes/') && (t = t.replace('/Volumes/', '')),
      t.startsWith('Macintosh HD') && (t = t.replace('Macintosh HD', '')),
      t
    )
  }
  if ('linux' === t) {
    let t = e.replace(/\\/g, '/')
    return t.startsWith('/Volumes/') && (t = t.replace('/Volumes/', '')), t
  }
  if ('darwin' === t) {
    return e
  }
  throw new Error('Unsupported operating system.')
}
async function addToAnki() {
  try {
    let e = document
      .getElementById('dictionary-container')
      .getElementsByClassName('callout')
    if (0 == e.length) {
      return
    }
    let t = []
    for (let n of e) {
      let e = JSON.parse(n.getAttribute('data'))
      t.push(e)
    }
    let n = Object.keys(t[0]).filter((e) => 'Examples' != e)
    document.getElementById(
      'dict-fields-anki'
    ).innerHTML = `Available fields: ${n
      .map((e) => `{{${e}}}`)
      .join(
        ', '
      )}, {{Obsidian Link}}, {{Audio}}, {{Example 1}}, {{Example Audio 1}}, {{Example 2}},...`
    document
      .getElementById('dict-note-type-btn')
      .addEventListener('click', async (e) => {
        let t = document.getElementById('dict-note-type').value,
          n = await getFields(t),
          i = document.getElementById('anki-setup')
        i.innerHTML = ''
        for (let e of n) {
          let n = document.createElement('h2')
          n.innerHTML = e
          let s = document.createElement('textarea')
          s.setAttribute('id', `field-${e}`)
          s.addEventListener('change', (n) => {
            localStorage.setItem(`llm-anki-${t}-${e}`, s.value)
          })
          null == i || i.appendChild(n)
          null == i || i.appendChild(s)
          let r = localStorage.getItem(`llm-anki-${t}-${e}`)
            ? localStorage.getItem(`llm-anki-${t}-${e}`)
            : ''
          s.value = r
        }
      })
    let i = document.getElementById('save-anki').getElementsByTagName('input')
    for (let e of i) {
      let t = e.getAttribute('id')
      if (!t) {
        continue
      }
      e.addEventListener('change', (n) => {
        localStorage.setItem(`llm-inp-${t}`, e.value)
      })
      let n = localStorage.getItem(`llm-inp-${t}`)
        ? localStorage.getItem(`llm-inp-${t}`)
        : ''
      e.value = n
    }
  } catch (e) {
    console.error(e)
  }
}
async function handleImport() {
  try {
    let e = document
      .getElementById('dictionary-container')
      .getElementsByClassName('callout')
    if (0 == e.length) {
      return
    }
    let t = []
    for (let n of e) {
      let e = JSON.parse(n.getAttribute('data'))
      t.push(e)
    }
    let n = Object.keys(t[0]).filter((e) => 'Examples' != e),
      i = document.getElementById('dict-note-name-anki'),
      s = document.getElementById('dict-note-audio-anki'),
      r = document.getElementById('dict-note-deck'),
      a = document.getElementById('dict-note-type'),
      o = '',
      l = document.getElementById('anki-setup').getElementsByTagName('textarea')
    for (let e of l) {
      o =
        o +
        '\n## ' +
        e.getAttribute('id').replace('field-', '').trim() +
        '\n' +
        e.value
    }
    let c = i.value.replace(/(.*?)\//g, ''),
      h = i.value.replace('/' + c, '')
    app.vault.getAbstractFileByPath(h) || app.vault.createFolder(h)
    s.value &&
      !app.vault.getAbstractFileByPath(s.value) &&
      app.vault.createFolder(s.value)
    let d = 0
    for (let l of t) {
      let t = {}
      for (let e of n) t[`{{${e}}}`] = l[e]
      t['{{Example 1}}'] = l.Examples[0]
      t['{{Example 2}}'] = l.Examples[1]
      t['{{Example 3}}'] = l.Examples[2]
      o.includes('{{Audio}}') &&
        (t['{{Audio}}'] = await exportAudio(l.Term, s.value))
      o.includes('{{Example Audio 1}}') &&
        (t['{{Example Audio 1}}'] = await exportAudio(l.Examples[0], s.value))
      o.includes('{{Example Audio 2}}') &&
        (t['{{Example Audio 2}}'] = await exportAudio(l.Examples[1], s.value))
      o.includes('{{Example Audio 3}}') &&
        (t['{{Example Audio 3}}'] = await exportAudio(l.Examples[2], s.value))
      let c = i.value.trim() ? i.value.trim() : '{{Term}}.md',
        h =
          '---\nAnki: \n---\n<button class="anki-btn-open">Open</button> | <button class="anki-btn-update">Update</button> | <button class="anki-btn-delete">Delete</button>\n' +
          o
      for (let e of Object.keys(t)) {
        let n = new RegExp(e, 'g')
        c = c.replace(n, t[e])
        h = h.replace(n, t[e])
      }
      let u = await createNote(c, h)
      await anki_add(u, a.value, r.value)
      setTimeout(() => {
        e[0].remove()
      }, 100)
      d += 1
    }
    new import_obsidian7.Notice('Completed')
  } catch (e) {
    console.error(e)
  }
}
async function createNote(e, t) {
  try {
    let n = (await this.app.vault.getMarkdownFiles()).filter((t) => {
      let n = new RegExp(e.replace('.md', ''), 'g')
      return !!t.path.match(n)
    })
    if (0 !== n.length) {
      let e = n.sort((e, t) => e.path - t.path)[0],
        i = e.path.match(/\([0-9]+\)\.md/g)
          ? Number(e.path.match(/\([0-9]+\)\.md/g)[0].match(/[0-9]+/g)) + 1
          : 1
      return (
        (e =
          1 == i
            ? e.path.replace('.md', ' (1).md')
            : e.path.replace(` (${i - 1}).md`, `(${i}).md`)),
        await app.vault.create(e, t)
      )
    }
    return await app.vault.create(e, t)
  } catch (e) {
    console.error(e)
  }
}
async function anki_add(e, t, n) {
  let i = await this.app.vault.read(e),
    s = i
      .replace(
        /\{\{Obsidian Link\}\}/g,
        `[[${e.path.replace('.md', '')}|${e.basename}]]`
      )
      .split('## ')
      .slice(1),
    r = i
      .replace(
        /\{\{Obsidian Link\}\}/g,
        `[[${e.path.replace('.md', '')}|${e.basename}]]`
      )
      .replace(
        '---\n<button class="anki-btn-add">Add</button>\n',
        '---\n<button class="anki-btn-open">Open</button> | <button class="anki-btn-update">Update</button> | <button class="anki-btn-delete">Delete</button>\n'
      )
  await this.app.vault.modify(e, r)
  let a = { t: await render(n) }
  for (let e of s) {
    let t = e.split('\n')[0],
      n = e.split('\n').slice(1).join('\n')
  }
  let o = await addNote(n, a, t, [])
  this.app.fileManager.processFrontMatter(e, (e) => {
    e.Anki = `${o}`
    e['Anki-deck'] = `${n}`
    e['Anki-type'] = `${t}`
  })
}
async function anki_update(e) {
  let t = this.app.metadataCache.getFileCache(e).frontmatter.Anki,
    n = await this.app.vault.read(e),
    i = n
      .replace(
        /\{\{Obsidian Link\}\}/g,
        `[[${e.path.replace('.md', '')}|${e.basename}]]`
      )
      .split('## ')
      .slice(1)
  n.includes('{{Obsidian Link}}') &&
    (await this.app.vault.modify(
      e,
      n.replace(
        /\{\{Obsidian Link\}\}/g,
        `[[${e.path.replace('.md', '')}|${e.basename}]]`
      )
    ))
  let s = { t: await render(n) }
  for (let e of i) {
    let t = e.split('\n')[0],
      n = e.split('\n').slice(1).join('\n')
  }
  await updateNote(Number(t), s)
}
async function anki_delete(e) {
  let t = this.app.metadataCache.getFileCache(e).frontmatter.Anki
  this.app.fileManager.processFrontMatter(e, (e) => {
    e.Anki = ''
  })
  await deteteNote(Number(t))
  let n = await this.app.vault.read(e)
  await this.app.vault.modify(
    e,
    n.replace(
      '---\n<button class="anki-btn-open">Open</button> | <button class="anki-btn-update">Update</button> | <button class="anki-btn-delete">Delete</button>\n',
      '---\n<button class="anki-btn-add">Add</button>\n'
    )
  )
}
async function anki_open(e) {
  let t = this.app.metadataCache.getFileCache(e).frontmatter.Anki
  await openNoteInAnki(t)
}
async function saveNote() {
  try {
    let e = document
      .getElementById('dictionary-container')
      .getElementsByClassName('callout')
    if (0 == e.length) {
      return
    }
    let t = []
    for (let n of e) {
      let e = JSON.parse(n.getAttribute('data'))
      t.push(e)
    }
    let n = Object.keys(t[0]).filter((e) => 'Examples' != e)
    document.getElementById('dict-fields').innerHTML = `Available fields: ${n
      .map((e) => `{{${e}}}`)
      .join(
        ', '
      )}, {{Audio}}, {{Example 1}}, {{Example Audio 1}}, {{Example 2}},...`
    let i = document.getElementById('dict-note-name')
    i.value = localStorage.getItem('dict-note-name')
      ? localStorage.getItem('dict-note-name')
      : ''
    i.addEventListener('change', (e) => {
      localStorage.setItem('dict-note-name', i.value)
    })
    let s = document.getElementById('dict-note-audio')
    s.value = localStorage.getItem('dict-note-audio')
      ? localStorage.getItem('dict-note-audio')
      : ''
    s.addEventListener('change', (e) => {
      localStorage.setItem('dict-note-audio', s.value)
    })
    let r = document.getElementById('dict-note-content')
    r.value = localStorage.getItem('dict-note-content')
      ? localStorage.getItem('dict-note-content')
      : ''
    r.addEventListener('change', (e) => {
      localStorage.setItem('dict-note-content', r.value)
    })
    let a = i.value.replace(/(.*?)\//g, ''),
      o = i.value.replace('/' + a, '')
    app.vault.getAbstractFileByPath(o) || app.vault.createFolder(o)
    s.value &&
      !app.vault.getAbstractFileByPath(s.value) &&
      app.vault.createFolder(s.value)
    let l = this.app.vault.getMarkdownFiles().map((e) => e.path),
      c = 0
    for (let a of t) {
      let t = {}
      for (let e of n) t[`{{${e}}}`] = a[e]
      t['{{Example 1}}'] = a.Examples[0]
      t['{{Example 2}}'] = a.Examples[1]
      t['{{Example 3}}'] = a.Examples[2]
      r.value.includes('{{Audio}}') &&
        (t['{{Audio}}'] = await exportAudio(a.Term, s.value))
      r.value.includes('{{Example Audio 1}}') &&
        (t['{{Example Audio 1}}'] = await exportAudio(a.Examples[0], s.value))
      r.value.includes('{{Example Audio 2}}') &&
        (t['{{Example Audio 2}}'] = await exportAudio(a.Examples[1], s.value))
      r.value.includes('{{Example Audio 3}}') &&
        (t['{{Example Audio 3}}'] = await exportAudio(a.Examples[2], s.value))
      let o = i.value.trim() ? i.value.trim() : '{{Term}}.md',
        h = r.value
      for (let e of Object.keys(t)) {
        let n = new RegExp(e, 'g')
        o = o.replace(n, t[e])
        h = h.replace(n, t[e])
      }
      for (let e = 1; e < 10000; e++) {
        if (l.includes(o)) {
          o = o.replace('.md', ` (${e}).md`).replace(` (${e - 1})`, '')
          break
        }
        break
      }
      await createNote(o, h)
      setTimeout(() => {
        e[0].remove()
      }, 100)
      c += 1
    }
    new import_obsidian8.Notice('Completed')
  } catch (e) {
    console.error(e)
  }
}
async function exportAudio(e, t) {
  try {
        if (!t) {
        return '';
        }

        const settings = JSON.parse(localStorage.getItem('LLM-settings') || '{}');
        const activationKey = settings.activation;

        if (localStorage.getItem(activationKey)) {
        const appConfig = JSON.parse(localStorage.getItem(activationKey));
        const fileName = `Audio-${Date.now()}`;
        e = e.replace(/\*\*/g, '');

        // const audioBlob = await tts(e, { voice: settings.voice });
        let a = await tts_fix(e, settings.voice)
        let audioBlob = await audioBlobToBuffer(a.audio)
        async function audioBlobToBuffer(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(Buffer.from(reader.result));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
        }
        // Save audio file via app
        await app[appConfig].create(`${t}/${fileName}.mp3`, audioBlob);

        return `![[${t}/${fileName}.mp3]]`;
        }

        return '';

  } catch (e) {
    console.error(e)
  }
}
var import_mark = __toESM(require_mark()),
  import_obsidian9 = require('obsidian')
async function whisper(e) {
  var t
  let n = JSON.parse(localStorage.getItem('LLM-settings'))
  if (!localStorage.getItem(n.activation)) {
    return void new import_obsidian9.Notice(
      'Please upgrade to use this feature'
    )
  }
  let i = localStorage.getItem('tts-box') ? localStorage.getItem('tts-box') : ''
  e.innerHTML = `\n    <div>\n        <div id="tts-content">${i}</div>\n        <hr>\n        <div>\n        <button id="speech-to-text">🎙</button>\n        <button id="play-audio" data="${JSON.stringify(
    i
  )}">▶️</button>\n        </div>\n    </div>\n    \n    `
  null == (t = document.getElementById('play-audio')) ||
    t.addEventListener('click', async (e) => {
      var t
      let i =
        null == (t = document.getElementById('tts-content'))
          ? void 0
          : t.innerText
      await textToSpeech(i, n.voice)
    })
  await setUpRecording()
}
async function setUpRecording() {
  let e,
    t = []
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    ? navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((n) => {
          e = new MediaRecorder(n)
          e.addEventListener('dataavailable', (e) => {
            t.push(e.data)
          })
          e.addEventListener('stop', async () => {
            const e = new Blob(t, { type: 'audio/mp3; codecs=opus' })
            let n = (await speechToText(e)).segments
              .map((e) => e.text)
              .join(' ')
              .replace(/(\.|\,|\?|\!)/g, '')
              .trim()
              .split(' ')
            console.log(n)
            new import_mark.default(
              document.getElementById('tts-content')
            ).mark(n, {
              className: 'whisper-correct',
              accuracy: 'partially',
              ignorePunctuation: ':;.,-\u2013\u2014\u2012_(){}[]!\'"+='.split(
                ''
              ),
            })
            t = []
          })
          const i = document.getElementById('speech-to-text')
          i.addEventListener('click', async () => {
            if (i.getAttribute('playing')) {
              i.removeAttribute('playing')
              e.stop()
            } else {
              let t = document.getElementById('tts-content')
              t.innerHTML = t.innerText
              i.setAttribute('playing', true)
              e.start()
            }
          })
        })
        .catch((e) => {
          console.error('Error accessing microphone:', e)
        })
    : console.error('getUserMedia() is not supported in this browser.')
}
async function speechToText(e) {
  try {
    let t = JSON.parse(localStorage.getItem('LLM-settings'))
    console.log(t)
    let n = {
      English: 'en',
      Korean: 'ko',
      Japanese: 'ja',
      Chinese: 'zh',
    }[t.lang]
    const s = t.llmkey,
      r = new FormData(),
      a = new File([e], 'audio.mp3', { type: 'audio/mpeg' })
    r.append('model', 'whisper-large-v3')
    r.append('file', a)
    r.append('temperature', '0')
    r.append('language', n)
    r.append('response_format', 'verbose_json')
    const o = await fetch(
      'https://api.groq.com/openai/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${s}` },
        body: r,
      }
    )
    return await o.json()
  } catch (e) {
    console.error('Error:', e)
  }
}
var import_obsidian10 = require('obsidian')
async function translation(e) {
  try {
    let t = localStorage.getItem('llm-translation')
      ? localStorage.getItem('llm-translation')
      : ''
    e.innerHTML = `\n        <div id="translation-text">${t}</div>\n        <hr>\n        <div id="translation-vn"></div>\n        `
    let n = {
        messages: [
          {
            role: 'system',
            content: 'Translate the given text into Vietnamese.',
          },
          {
            role: 'user',
            content:
              "There are many ways to greet someone. We'll learn about the most common way to greet someone in this lesson. I'll give a variety of example sentences.",
          },
          {
            role: 'assistant',
            content:
              'Có nhiều cách chào người khác. Chúng ta sẽ học về cách chào người khác phổ biến nhất trong bài học này. Tôi sẽ cho bạn một số ví dụ câu lệnh.',
          },
          {
            role: 'user',
            content:
              '在一个美丽的小村庄里\uFF0C住着一群勤劳善良的人们\u3002村庄四周环绕着青山绿水\uFF0C风景如画\u3002每当清晨\uFF0C太阳刚刚升起\uFF0C村民们就开始了一天的劳作\u3002有的人到田里耕作\uFF0C有的人去山上采摘\uFF0C还有的人在村口的小店里忙碌\u3002',
          },
          {
            role: 'assistant',
            content:
              'Trong một làng quê xinh đẹp, có một nhóm người chăm chỉ và tốt bụng sinh sống. Làng được bao quanh bởi núi non xanh tươi và nước trong, cảnh sắc như tranh vẽ. Mỗi khi sáng sớm, ngay khi mặt trời vừa mới lên, người dân trong làng bắt đầu một ngày lao động. Có người đi lao động trên đồng ruộng, có người đi hái lượm trên núi, còn có người bận rộn trong cửa hàng nhỏ tại cổng làng.',
          },
        ],
        model: 'llama3-70b-8192',
        temperature: 0,
        max_tokens: 1250,
        top_p: 1,
        stream: true,
        stop: null,
      },
      i = t
    n.messages = [
      ...n.messages,
      {
        role: 'user',
        content: i,
      },
    ]
    let s = JSON.parse(localStorage.getItem('LLM-settings')),
      r = await AIchat(s.llmkey, n)
    document.getElementById('translation-vn').innerHTML = r
  } catch (e) {
    new import_obsidian10.Notice(e)
    console.error(e)
  }
}
var import_obsidian11 = require('obsidian')
async function convertToAudio() {
  var e, t, n
  let i = JSON.parse(localStorage.getItem('LLM-settings'))
  if (!localStorage.getItem(i.activation)) {
    return void new import_obsidian11.Notice(
      'Please upgrade to use this feature'
    )
  }
  let s = this.app.workspace.getActiveFile(),
    r =
      (await this.app.vault.read(s),
      null == (e = this.app.workspace.activeEditor)
        ? void 0
        : e.editor.getSelection()),
    a =
      (null == (t = this.app.workspace.activeEditor) || t.editor.getCursor(),
      'Vocabulary/Audio')
  document.getElementById('dict-note-audio-anki') &&
  0 != document.getElementById('dict-note-audio-anki').value.length
    ? (a = document.getElementById('dict-note-audio-anki').value)
    : document.getElementById('dict-note-audio') &&
      0 != document.getElementById('dict-note-audio').value.length &&
      (a = document.getElementById('dict-note-audio').value)
  let o = null == (n = this.app.workspace.activeEditor) ? void 0 : n.editor
  app.vault.getAbstractFileByPath(a) || app.vault.createFolder(a)
  let l = await exportAudio(r, a)
  o.replaceSelection(`${l}`)
}
var DEFAULT_SETTINGS = {
    lang: 'Eng',
    voice: 'en-GB-SoniaNeural',
    def: 'English',
    llmkey: '',
    activation: '',
    folder: '',
    anki: false,
  },
  MyPlugin = class extends import_obsidian12.Plugin {
    async onload() {
      await this.loadSettings()
      this.registerView(DICTIONARY_VIEWS, (e) => new DictionaryView(e))
      localStorage.setItem('LLM-settings', JSON.stringify(this.settings))
      this.addCommand({
        id: 'look_up',
        name: 'Look up',
        callback: async () => {
          window.getSelection()
          await this.activateView()
          await lookUpTerm(this.settings)
        },
      })
      this.addCommand({
        id: 'test your pronunciation',
        name: 'test your pronunciation',
        callback: async () => {
          let e = '',
            t = ''
          this.app.workspace.getActiveFile()
          const n = window.getSelection()
          if (n.rangeCount > 0) {
            const i = n.getRangeAt(0),
              s = n.toString(),
              r =
                3 === i.commonAncestorContainer.nodeType
                  ? i.commonAncestorContainer.parentNode
                  : i.commonAncestorContainer
            e = s.trim()
            t = r.innerText.replace(/\n/g, ' ').trim()
            t == s && (t = r.parentElement.innerText.replace(/\n/g, ' ').trim())
          }
          this.app.workspace.getActiveViewOfType(import_obsidian12.MarkdownView)
          localStorage.setItem('tts-box', e)
          new Whisper(this.app).open()
        },
      })
      this.addCommand({
        id: 'translation',
        name: 'translation',
        callback: async () => {
          let e = '',
            t = ''
          this.app.workspace.getActiveFile()
          const n = window.getSelection()
          if (n.rangeCount > 0) {
            const i = n.getRangeAt(0),
              s = n.toString(),
              r =
                3 === i.commonAncestorContainer.nodeType
                  ? i.commonAncestorContainer.parentNode
                  : i.commonAncestorContainer
            e = s.trim()
            t = r.innerText.replace(/\n/g, ' ').trim()
            t == s && (t = r.parentElement.innerText.replace(/\n/g, ' ').trim())
          }
          this.app.workspace.getActiveViewOfType(import_obsidian12.MarkdownView)
          localStorage.setItem('llm-translation', e)
          new Translation(this.app).open()
        },
      })
      this.addCommand({
        id: 'text_to_speech',
        name: 'Text to speech',
        callback: async () => {
          await convertToAudio()
        },
      })
      this.addSettingTab(new SampleSettingTab(this.app, this))
      this.registerDomEvent(document, 'click', async (e) => {
        if ('dict-save' == e.target.getAttribute('id')) {
          await saveNote()
        } else {
          if ('dict-save-anki' == e.target.getAttribute('id')) {
            await handleImport()
          } else {
            if (e.target.classList.contains('anki-btn-open')) {
              await anki_open(this.app.workspace.getActiveFile())
            } else {
              if (e.target.classList.contains('anki-btn-update')) {
                await anki_update(this.app.workspace.getActiveFile())
              } else {
                if (e.target.classList.contains('anki-btn-delete')) {
                  await anki_delete(this.app.workspace.getActiveFile())
                } else {
                  if (e.target.classList.contains('anki-btn-add')) {
                    let e = this.app.workspace.getActiveFile(),
                      t = this.app.metadataCache.getFileCache(e).frontmatter
                    await anki_add(e, t['Anki-type'], t['Anki-deck'])
                  }
                }
              }
            }
          }
        }
      })
    }
    onunload() {}
    async activateView() {
      const { workspace: e } = this.app
      let t = null
      const n = e.getLeavesOfType(DICTIONARY_VIEWS)
      n.length > 0
        ? (t = n[0])
        : ((t = e.getRightLeaf(true)),
          await t.setViewState({
            type: DICTIONARY_VIEWS,
            active: true,
          }))
      let i = document.getElementsByClassName('tab-link')
      0 !== i.length &&
        (i[0].addEventListener('click', (e) => {
          openTab(e, 'Tab1')
        }),
        i[1].addEventListener('click', async (e) => {
          let t = JSON.parse(localStorage.getItem('LLM-settings')),
            n = document.getElementById('save-notes'),
            i = document.getElementById('save-anki')
          t.anki
            ? (null == n || n.classList.add('hide'),
              null == i || i.classList.remove('hide'),
              await addToAnki())
            : (null == n || n.classList.remove('hide'),
              null == i || i.classList.add('hide'),
              await handleSaveNoteTab())
          openTab(e, 'Tab2')
        }))
      e.revealLeaf(t)
    }
    async loadSettings() {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    }
    async saveSettings() {
      await this.saveData(this.settings)
    }
  },
  Whisper = class extends import_obsidian12.Modal {
    constructor(e) {
      super(e)
    }
    async onOpen() {
      const { contentEl: e } = this
      await whisper(e)
    }
    onClose() {
      const { contentEl: e } = this
      e.empty()
    }
  },
  Translation = class extends import_obsidian12.Modal {
    constructor(e) {
      super(e)
    }
    async onOpen() {
      const { contentEl: e } = this
      await translation(e)
    }
    onClose() {
      const { contentEl: e } = this
      e.empty()
    }
  },
  SampleSettingTab = class extends import_obsidian12.PluginSettingTab {
    constructor(e, t) {
      super(e, t)
      this.plugin = t
    }
    async display() {
      const { containerEl: e } = this
      e.empty()
      e.setAttribute('id', 'settingContainer')
      let t = new import_obsidian12.Setting(e),
        n = new import_obsidian12.Setting(e),
        i = new import_obsidian12.Setting(e),
        s = new import_obsidian12.Setting(e),
        a = new import_obsidian12.Setting(e)
      if (!localStorage.getItem(this.plugin.settings.activation)) {
        let t = document.createElement('div')
        e.appendChild(t)
        t.innerHTML = `\n\t\t\t\t<h2>Text to speech</h2>\n\t\t\t\t<p>Để sử dụng tính năng chuyển giọng nói thành văn bản, bạn cần mua mã kích hoạt một lần. Bạn có thể nghe thử giọng đọc bên dưới (chọn ngôn ngữ trước khi chọn giọng). Chi tiết xin liên hệ <a href="${'https://github.com/Mrntn161/LLM-Dictionary-vn?tab=readme-ov-file#t%C3%ADnh-n%C4%83ng-chuy%E1%BB%83n-v%C4%83n-b%E1%BA%A3n-th%C3%A0nh-gi%E1%BB%8Dng-n%C3%B3i'}">tại đây</a>.</p>\n\t\t\t\t<p>To use the speech-to-text feature, you need to purchase a one-time activation key. You can try the voices below (set the language first before choosing the voice). Go to <a href="${'https://github.com/Mrntn161/LLM-Dictionary-vn?tab=readme-ov-file#t%C3%ADnh-n%C4%83ng-chuy%E1%BB%83n-v%C4%83n-b%E1%BA%A3n-th%C3%A0nh-gi%E1%BB%8Dng-n%C3%B3i'}">here</a> for further information.</p>\n\t\t\t`
      }
      n.setName('LLM API')
        .setDesc(
          'Truy cập vào <a href="https://console.groq.com/keys">Groq</a> để lấy key API'
        )
        .addText((e) => {
          n.descEl.innerHTML =
            'Truy cập vào <a href="https://console.groq.com/keys">Groq</a> để lấy key API'
          e.onChange(async (e) => {
            this.plugin.settings.llmkey = e
            localStorage.setItem('llm-key', e)
            await this.plugin.saveSettings()
            localStorage.setItem(
              'LLM-settings',
              JSON.stringify(this.plugin.settings)
            )
          }).setValue(this.plugin.settings.llmkey)
        })
      i.setName('The term will be defined in ')
        .setDesc('Từ vựng sẽ được định nghĩa bằng ')
        .addDropdown((e) => {
          let t = ['English', 'Vietnamese', 'Chinese', 'Korean', 'Japanese']
          for (let n of t) e.addOption(n, n)
          e.onChange(async (e) => {
            this.plugin.settings.def = e
            await this.plugin.saveSettings()
            localStorage.setItem(
              'LLM-settings',
              JSON.stringify(this.plugin.settings)
            )
          }).setValue(this.plugin.settings.def)
        })
      a.setName('Save the vocabulary to Anki')
        .setDesc('Đánh dấu vào ô này nếu bạn muốn thêm từ vựng vào Anki.')
        .addToggle((e) => {
          e.onChange(async (e) => {
            this.plugin.settings.anki = e
            await this.plugin.saveSettings()
            localStorage.setItem(
              'LLM-settings',
              JSON.stringify(this.plugin.settings)
            )
          }).setValue(this.plugin.settings.anki)
        })
      t.setName('Language')
        .setDesc('Ngôn ngữ')
        .addDropdown(async (e) => {
          await setupLang(e)
          e.onChange(async (e) => {
            this.plugin.settings.lang = e
            await this.plugin.saveSettings()
            localStorage.setItem('TTS-lang', e)
            s.clear()
            s.setName('Voices')
              .setDesc('Thiết lập giọng đọc')
              .addDropdown(async (e) => {
                await setupVoice(e, localStorage.getItem('TTS-lang'))
                e.onChange(async (e) => {
                  this.plugin.settings.voice = e
                  await this.plugin.saveSettings()
                  localStorage.setItem(
                    'LLM-settings',
                    JSON.stringify(this.plugin.settings)
                  )
                }).setValue(this.plugin.settings.voice)
              })
          }).setValue(this.plugin.settings.lang)
        })
      s.setName('Voice')
        .setDesc('Thiết lập giọng đọc')
        .addDropdown(async (e) => {
          await setupVoice(e, localStorage.getItem('TTS-lang'))
          e.onChange(async (e) => {
            this.plugin.settings.voice = e
            localStorage.setItem(
              'LLM-settings',
              JSON.stringify(this.plugin.settings)
            )
            await this.plugin.saveSettings()
          }).setValue(this.plugin.settings.voice)
        })
      new import_obsidian12.Setting(e)
        .setName('Input the text and press Enter to hear the selected voice')
        .setDesc('Nhập văn bản và nhấn Enter để nghe thử giọng đọc')
        .addText(async (e) => {
          e.inputEl.setAttribute('id', 'sample-speech')
          e.inputEl.addEventListener('keydown', async (t) => {
            if ('Enter' == t.key) {
              let t = localStorage.getItem('LLM-settings')
                ? JSON.parse(localStorage.getItem('LLM-settings'))
                : {}
              await textToSpeech(e.inputEl.value, t.voice)
            }
          })
        })
      new import_obsidian12.Setting(e).setName('Key').addText(async (e) => {
        e.onChange(async (e) => {
          this.plugin.settings.activation = e
          await this.plugin.saveSettings()
          localStorage.setItem(
            'LLM-settings',
            JSON.stringify(this.plugin.settings)
          )
          20 == e.length && (await validate(e))
        }).setValue(this.plugin.settings.activation)
      })
    }
  }

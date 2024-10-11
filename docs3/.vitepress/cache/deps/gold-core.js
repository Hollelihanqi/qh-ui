import {
  createRouter,
  createWebHistory
} from "./chunk-IFBWMYF3.js";
import {
  Axios
} from "./chunk-Z4XTYOOJ.js";
import {
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  unref,
  watch
} from "./chunk-TUXA6EVM.js";
import "./chunk-NOO3FI36.js";
import "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/gold-core@0.1.17/node_modules/gold-core/dist/index.js
var lt = Object.defineProperty;
var ut = (e5, r, t) => r in e5 ? lt(e5, r, { enumerable: true, configurable: true, writable: true, value: t }) : e5[r] = t;
var U = (e5, r, t) => (ut(e5, typeof r != "symbol" ? r + "" : r, t), t);
var O = ((e5) => (e5.Number = "[object Number]", e5.Boolean = "[object Boolean]", e5.Object = "[object Object]", e5.Array = "[object Array]", e5.Function = "[object Function]", e5.String = "[object String]", e5.RegExp = "[object RegExp]", e5.Blob = "[object Blob]", e5.File = "[object File]", e5.Date = "[object Date]", e5.Error = "[object Error]", e5.Promise = "[object Promise]", e5.Undefined = "[object Undefined]", e5.Null = "[object Null]", e5.AsyncFunction = "[object AsyncFunction]", e5))(O || {});
var X = ((e5) => (e5.debug = "debug", e5.error = "error", e5.info = "info", e5.warn = "warn", e5))(X || {});
var gt = ((e5) => (e5[e5.ms = 0] = "ms", e5[e5.hour = 1] = "hour", e5[e5.minute = 2] = "minute", e5[e5.second = 3] = "second", e5))(gt || {});
var mt = ((e5) => (e5.white = "37m", e5.red = "31m", e5.green = "32m", e5.yellow = "33m", e5.blue = "34m", e5))(mt || {});
var ze = ((e5) => (e5[e5.vertical = 0] = "vertical", e5[e5.horizontal = 1] = "horizontal", e5))(ze || {});
var Ur = ((e5) => (e5[e5.ASC = 0] = "ASC", e5[e5.DESC = 1] = "DESC", e5))(Ur || {});
var Ve = ((e5) => (e5[e5.FlatMap = 0] = "FlatMap", e5[e5.URlParams = 1] = "URlParams", e5))(Ve || {});
var bt = ((e5) => (e5[e5.xml = 0] = "xml", e5[e5.ts = 1] = "ts", e5[e5.java = 2] = "java", e5[e5.json = 3] = "json", e5[e5.md = 4] = "md", e5[e5.vue = 5] = "vue", e5[e5.html = 6] = "html", e5[e5.css = 7] = "css", e5[e5.scss = 8] = "scss", e5[e5.properties = 9] = "properties", e5[e5.sql = 10] = "sql", e5[e5.sh = 11] = "sh", e5[e5.yaml = 12] = "yaml", e5[e5.conf = 13] = "conf", e5[e5.txt = 14] = "txt", e5[e5.js = 15] = "js", e5))(bt || {});
function E(e5) {
  return toString.call(e5);
}
function St(e5) {
  return E(e5) === O.Date;
}
function wt(e5) {
  return E(e5) === O.File;
}
function At(e5) {
  return E(e5) === O.Blob;
}
function Ot(e5) {
  return E(e5) === O.Boolean;
}
function Rt(e5) {
  return E(e5) === O.Number;
}
function H(e5) {
  return E(e5) === O.String;
}
function Pt(e5) {
  return m(e5) || nr(e5);
}
function m(e5) {
  return typeof e5 != "object" || e5 instanceof Array ? false : Object.isExtensible(e5);
}
function nr(e5) {
  return e5 instanceof Array;
}
function _t(e5) {
  return E(e5) === O.Array;
}
function Et(e5) {
  return E(e5) === O.Function;
}
function $t(e5) {
  return E(e5) === O.AsyncFunction;
}
function xt(e5) {
  return E(e5) === O.Promise;
}
function It(e5) {
  return E(e5) === O.Error;
}
var Yo = Object.freeze(Object.defineProperty({
  __proto__: null,
  getType: E,
  isArray: nr,
  isAsyncFunction: $t,
  isBlog: At,
  isBoolean: Ot,
  isDate: St,
  isError: It,
  isFile: wt,
  isFunction: Et,
  isNumber: Rt,
  isObject: m,
  isObjectOrArray: Pt,
  isPromise: xt,
  isRegExp: _t,
  isString: H
}, Symbol.toStringTag, { value: "Module" }));
var N = class extends Error {
  /**
   * 控制台异常构造
   * @param message 异常信息
   * @param type 控制台类型
   */
  constructor(t, n) {
    super(t);
    U(this, "__type");
    this.__type = n;
  }
  /**
   * 获取控制台类型
   */
  get type() {
    return this.__type || X.debug;
  }
};
var Zo = class extends Error {
  constructor(r) {
    super(r);
  }
};
function ea(e5) {
  return S(e5) ? false : m(e5) && Object.keys(e5).length > 0;
}
function ra(e5) {
  return S(e5) ? false : e5 instanceof Array && e5.length > 0;
}
function S(e5) {
  return e5 == null;
}
function Nt(e5) {
  return e5.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
function I(e5) {
  if (S(e5))
    return true;
  if (H(e5)) {
    const r = Nt(e5);
    return r === "" || r === "null" || r === "undefined";
  }
  return e5 instanceof Array ? e5.length === 0 : m(e5) ? Object.keys(e5).length === 0 : false;
}
function Ft(e5, r) {
  if (S(e5))
    throw new Error(r);
}
function Mt(e5, r) {
  if (!H(e5))
    throw new Error(r);
}
function jt(e5, r) {
  if (I(e5))
    throw new Error(r);
}
function Ct(e5, r) {
  if (!nr(e5))
    throw new Error(r);
}
function kt(e5, r) {
  if (I(e5))
    throw new Error(r);
}
function xe(e5, r) {
  if (m(e5) === false)
    throw new Error(r);
}
function Lt(e5, r) {
  if (I(e5))
    throw new Error(r);
}
var ta = Object.freeze(Object.defineProperty({
  __proto__: null,
  isArray: Ct,
  isObject: xe,
  isString: Mt,
  notBlank: jt,
  notEmpty: Ft,
  validArray: kt,
  validObject: Lt
}, Symbol.toStringTag, { value: "Module" }));
function Ut(e5) {
  const r = e5.replace(/[^\d]+/, "");
  return S(r) ? 0 : Number(r);
}
function Br(e5, r = "-") {
  return e5.includes("/") ? e5.split("/").flatMap((t) => Br(t, r)).join("/") : Wr(or(e5, r));
}
function or(e5, r = "-") {
  return e5.includes("/") ? e5.split("/").flatMap((t) => or(t, r)).join("/") : e5.split(r).flatMap((t) => Dr(t)).join("");
}
function Tr(e5, r = "-") {
  const t = e5.replace(/([A-Z])/g, (n) => r + n.toLowerCase()).replace(/\/-/g, "/");
  return t.startsWith(r) ? t.substring(1) : t;
}
function He(e5) {
  return e5.replace(/:\/+/g, "**").replace(/\\+/g, "/").replace(/\/+|\\+/g, "/").replace("**", "://");
}
function me(e5, r) {
  return e5.startsWith("http://") || e5.startsWith("https://") ? new URL(He(e5)) : new URL(He(`${r || location.origin}/${e5}`));
}
function Dr(e5) {
  return S(e5) ? "" : e5.slice(0, 1).toUpperCase() + e5.slice(1);
}
function Wr(e5) {
  return S(e5) ? "" : e5.slice(0, 1).toLowerCase() + e5.slice(1);
}
var na = Object.freeze(Object.defineProperty({
  __proto__: null,
  toFirstCharLowerCase: Wr,
  toFirstCharUpperCase: Dr,
  toJoin: Tr,
  toLowerCamelCase: Br,
  toNumber: Ut,
  toPathFormat: He,
  toURL: me,
  toUpperCamelCase: or
}, Symbol.toStringTag, { value: "Module" }));
var g = new Proxy(console, {
  get(e5, r) {
    var n;
    const t = e5[r];
    if (t instanceof Function && r === X.debug) {
      const a = (n = globalThis.window) == null ? void 0 : n.sessionStorage;
      return S(a.getItem("gold-debugger")) === false ? t : () => {
      };
    }
    return t;
  }
});
function oa(e5, r, t) {
  return I(e5) || e5.sort((n, a) => {
    let o = r(n), i = r(a);
    return H(o) === false && (o = JSON.stringify(o)), H(i) === false && (i = JSON.stringify(i)), o === i ? 0 : t === Ur.DESC ? i > o ? 1 : -1 : o > i ? 1 : -1;
  }), e5;
}
function qr(e5) {
  return window.btoa(encodeURIComponent(e5));
}
function aa(e5) {
  return encodeURIComponent(window.atob(e5));
}
function ia(e5, r) {
  if (xe(e5, "target is not Object"), r.includes(".") === false)
    return Reflect.get(e5, r);
  const t = r.split(".");
  let n = { ...e5 };
  for (const a of t) {
    if (S(a) || m(n) === false || Reflect.has(n, a) === false)
      return "";
    n = Reflect.get(n, a);
  }
  return n;
}
function ca(e5) {
  if (e5 instanceof Array && e5.splice(0, e5.length), m(e5))
    for (const r of Object.keys(e5))
      Reflect.deleteProperty(e5, r);
  return e5;
}
function sa() {
  const e5 = [], r = "0123456789abcdef";
  for (let t = 0; t < 36; t++)
    e5.push(r.substring(Math.floor(Math.random() * 16), 1));
  return e5[14] = "4", e5[19] = r.substring(e5[19] & 3 | 8, 1), e5[8] = e5[13] = e5[18] = e5[23] = "-", e5.join("");
}
function la(e5, r) {
  return r instanceof Function ? S(e5.find((t) => r(t))) === false : e5.includes(r);
}
function ua(e5, r) {
  return S(r) && (r = ze.vertical), r === ze.vertical ? e5.scrollHeight > e5.clientHeight : e5.scrollWidth > e5.clientWidth;
}
function fa() {
  const e5 = document.createElement("div");
  Object.assign(e5.style, { width: "100px", height: "100px", overflowY: "scroll" }), document.body.appendChild(e5);
  const r = e5.offsetWidth - e5.clientWidth;
  return document.body.removeChild(e5), r;
}
function ya(e5, r) {
  if (r === Ve.FlatMap) {
    if (m(e5))
      return ar(e5);
    if (e5 instanceof Array)
      return ir(e5);
  }
  if (r === Ve.URlParams)
    return new URLSearchParams(e5).toString();
}
function ar(e5, r) {
  xe(e5, "参数：target 必须是对象");
  for (const t in e5) {
    const n = Reflect.get(e5, t);
    if (m(n)) {
      const a = r ? `${r}.${t}` : t;
      Object.assign(e5, ar(n, a)), Reflect.deleteProperty(e5, t);
      continue;
    }
    if (r && (Reflect.set(e5, `${r}.${t}`, n), Reflect.deleteProperty(e5, t)), n instanceof Array) {
      const a = r ? `${r}.${t}` : t;
      Object.assign(e5, ir(n, a)), Reflect.deleteProperty(e5, t);
      continue;
    }
  }
  return e5;
}
function ir(e5, r) {
  const t = {};
  return e5.forEach((n, a) => {
    g.debug(a);
    const o = r ? `${r}[${a}]` : `[${a}]`;
    if (m(n)) {
      Object.assign(t, ar(n, o));
      return;
    }
    if (n instanceof Array) {
      Object.assign(t, ir(n, o));
      return;
    }
    Reflect.set(t, o, n);
  }), t;
}
function pa(e5) {
  const r = new URLSearchParams(e5), t = {};
  return r.forEach((n, a) => {
    Reflect.set(t, a, n);
  }), t;
}
function da(e5, r = location.search) {
  return new URLSearchParams(r).get(e5);
}
function ha() {
  return document.body.clientHeight;
}
function Bt(e5, r, t) {
  if (m(e5) === false || m(r) === false)
    throw new N("target and source 必须都为 Object");
  if (H(t == null ? void 0 : t.uniqueKey)) {
    const n = Reflect.get(e5, t == null ? void 0 : t.uniqueKey), a = Reflect.get(r, t == null ? void 0 : t.uniqueKey);
    return (t == null ? void 0 : t.useContent) === true ? JSON.stringify(n) === JSON.stringify(a) : n === a;
  }
  throw new N("参数：option.uniqueKey can't be blank String。");
}
function Re(e5, r, t) {
  const n = [O.Undefined, O.Null];
  if (m(r) === false)
    throw new N("source 必须都为 Object");
  if (m(e5) === false) {
    if (t.strict === true)
      throw new N("严格模式：target 必须都为 Object");
    g.warn("target is not object；赋值：target = {}"), e5 = {};
  }
  function a(o, i) {
    const c = `${o}.`;
    return i.filter((s) => s.startsWith(c)).flatMap((s) => s.replace(c, ""));
  }
  for (const o in r) {
    if (t != null && t.ignoreKey && t.ignoreKey.includes(o))
      continue;
    const i = Reflect.get(e5, o), c = Reflect.get(r, o), s = E(i), l = E(c);
    if ((t == null ? void 0 : t.ignoreEmpty) === true && n.includes(l)) {
      g.warn(`忽略空模式：source.${o} type is ${l}；合并忽略`);
      continue;
    }
    if ((t == null ? void 0 : t.strict) === true && Reflect.has(e5, o) === false) {
      g.warn(`严格模式：target not have 属性：${o}；合并忽略`);
      continue;
    }
    if (l === O.Object) {
      const u = a(o, (t == null ? void 0 : t.ignoreKey) || []);
      if (s !== O.Object && Reflect.set(e5, o, {}), t != null && t.deep) {
        const y = Re(Reflect.get(e5, o), c, { ...t, ignoreKey: u });
        Reflect.set(e5, o, y);
        continue;
      }
      if (t != null && t.level && (t == null ? void 0 : t.level) > 1) {
        const y = Re(Reflect.get(e5, o), c, { ...t, ignoreKey: u, level: (t == null ? void 0 : t.level) - 1 });
        Reflect.set(e5, o, y);
        continue;
      }
    }
    if (l === O.Array) {
      const u = m(t == null ? void 0 : t.uniqueKey) ? Reflect.get(t == null ? void 0 : t.uniqueKey, o) : void 0;
      if (I(u))
        continue;
      if (s !== O.Array && Reflect.set(e5, o, []), t != null && t.deep) {
        const y = Ge(Reflect.get(e5, o), c, { ...t, uniqueKey: u });
        Reflect.set(e5, o, y);
        continue;
      }
      if (t != null && t.level && (t == null ? void 0 : t.level) > 1) {
        const y = Ge(Reflect.get(e5, o), c, { ...t, uniqueKey: u, level: (t == null ? void 0 : t.level) - 1 });
        Reflect.set(e5, o, y);
        continue;
      }
    }
    Reflect.set(e5, o, c);
  }
  return e5;
}
function Ge(e5, r, t) {
  if (I(t == null ? void 0 : t.uniqueKey))
    throw new N("参数：option.uniqueKey can't be blank。");
  for (const n of r) {
    if (m(n)) {
      const a = e5.find((o) => Bt(o, n, t));
      if ((t == null ? void 0 : t.strict) === true && I(a))
        continue;
      if (m(a)) {
        Re(a, n, t);
        continue;
      }
    }
    e5.push(n);
  }
  return e5;
}
function Je(e5, r, t) {
  if (e5 instanceof Array && r instanceof Array)
    return Ge(e5, r, t);
  if (m(e5) && m(r))
    return Re(e5, r, t);
  throw new N(`target type is ${E(e5)}, source type is ${E(r)}；type 必须为 array or object.`);
}
function va(e5, r) {
  if (xe(e5, "参数：target 必须为对象"), r === void 0 && (r = { deep: false }), r.deep === true)
    try {
      return JSON.parse(JSON.stringify(e5));
    } catch {
      g.error("Tools.clone --> deep = true，target = ", e5);
    }
  const t = { ...e5 };
  if (r.exclude !== void 0)
    for (const n of r.exclude)
      Reflect.deleteProperty(t, n);
  return t;
}
function Tt(e5) {
  if (S(e5) === false) {
    const r = e5.$el || e5;
    if (r instanceof HTMLElement)
      return r.getBoundingClientRect();
  }
  return new DOMRect();
}
function ga(e5) {
  const r = new RegExp("(^| )" + e5 + "=([^;]*)(;|$)"), t = document.cookie.match(r);
  return t === null || t.length < 3 ? "" : unescape(t[2]);
}
function ma(e5) {
  var r;
  if (S(e5))
    return "";
  if (e5 instanceof Error)
    return e5.message;
  if (m(e5)) {
    if (Reflect.has(e5, "body"))
      return (r = e5.body) == null ? void 0 : r.message;
    if (Reflect.has(e5, "message"))
      return e5.message;
  }
  return e5;
}
function ba(e5) {
  var r;
  if (S(e5))
    return "";
  if (e5 instanceof Error)
    return e5.message;
  if (m(e5)) {
    if (Reflect.has(e5, "body"))
      return (r = e5.body) == null ? void 0 : r.message;
    if (Reflect.has(e5, "message"))
      return e5.message;
  }
  return e5;
}
function Sa(e5, r) {
  const t = me(e5);
  (r || location).href = t.href;
}
var Ke = "encrypt__";
function Ne(e5, r, t) {
  g.debug(`storage.get：key = ${r}`);
  const n = e5.getItem(r);
  if (S(n))
    return t == null ? void 0 : t.defaultValue;
  try {
    return n != null && n.startsWith(Ke) ? JSON.parse(qr(n.replace(Ke, ""))) : JSON.parse(n);
  } catch (a) {
    g.warn(`JSON.parse ${n} 异常：${a}.`, a);
    return;
  }
}
function vr(e5, r, t, n) {
  if (g.debug(`storage.set：key = ${r}`), I(t))
    return;
  const a = JSON.stringify(t), o = (n == null ? void 0 : n.encrypt) === true ? Ke + qr(a) : a;
  e5.setItem(r, o);
}
function Dt(e5) {
  e5.clear();
}
function Wt(e5, r) {
  g.debug(`storage.remove：key = ${r}`), e5.removeItem(r);
}
var zr = class {
  constructor(r) {
    U(this, "__storage");
    var t;
    this.__storage = S(r) ? (t = globalThis.window) == null ? void 0 : t.localStorage : r;
  }
  /**
   * storage 通过 Key 存储
   * @param key storage key
   * @param option { defaultValue：'默认值' }
   * @returns 返回目标
   */
  get(r, t) {
    return Ne(this.__storage, r, t);
  }
  /**
   * storage set value
   * @param key storage key
   * @param value storage value
   * @param option IOptionStorage 参数
   * @returns 
   */
  set(r, t, n) {
    vr(this.__storage, r, t, n);
  }
  clear() {
    Dt(this.__storage);
  }
  remove(r) {
    Wt(this.__storage, r);
  }
  /**
   * 向 keyRoot 对象追加 { [key]: value}
   * @param key storage key
   * @param attribute 属性名
   * @param value 属性值
   * @param option IOptionStorage 参数
   * @returns 
   */
  put(r, t, n, a) {
    const o = Ne(this.__storage, r, Object.assign({}, a, { defaultValue: {} }));
    if (m(o)) {
      Reflect.set(o, t, n), vr(this.__storage, r, o, a);
      return;
    }
    g.warn(`${r} value is not Object`);
  }
  /**
   * 获取 Map 元素
   * @param key storage key
   * @param attribute map key
   * @returns map value
   */
  getAttribute(r, t, n) {
    const a = Ne(this.__storage, r, Object.assign({}, n, { defaultValue: {} }));
    if (m(a)) {
      const o = Reflect.get(a, t);
      return S(o) ? n == null ? void 0 : n.defaultValue : o;
    }
    return null;
  }
};
var kr;
var wa = new zr((kr = globalThis.window) == null ? void 0 : kr.localStorage);
var Lr;
var k = new zr((Lr = globalThis.window) == null ? void 0 : Lr.sessionStorage);
var Aa = class {
  constructor(r, t = 12, n) {
    U(this, "__data", []);
    U(this, "__max");
    U(this, "__dataSource", []);
    U(this, "__pointList", []);
    U(this, "__denominator");
    U(this, "__height");
    this.__dataSource = r, this.__max = t + 1, this.__denominator = t, this.__pointList = [{ row: 1, column: 1 }], this.__height = n;
  }
  get pointList() {
    return this.__pointList;
  }
  set pointList(r) {
    this.__pointList = r;
  }
  get data() {
    return this.__data;
  }
  get areaHeight() {
    return Math.round(this.__height / this.__denominator);
  }
  get containerStyle() {
    return {
      display: "grid",
      "grid-template-columns": `repeat(${this.__denominator}, 1fr)`,
      "grid-auto-rows": `${this.areaHeight}px`
    };
  }
  itemStyle({ row: r, column: t }) {
    return r && t ? {
      "grid-row": `${r.start} / ${r.end}`,
      "grid-column": `${t.start} / ${t.end}`
    } : {};
  }
  include({ start: r, end: t }, n) {
    return n += 0.1, n >= r && n <= t;
  }
  includePoint({ row: r, column: t }) {
    for (const n of this.data)
      if (this.include(n.row, r) && this.include(n.column, t))
        return true;
    return false;
  }
  mergeArea() {
    for (const r of this.pointList)
      this.includePoint(r) && Object.assign(r, { disabled: true });
  }
  orderArea() {
    this.pointList.sort((r, t) => r.row === t.row ? r.column - t.column : r.row - t.row);
  }
  parseAllArea() {
    for (let r of this.__dataSource) {
      const t = this.parseArea(r);
      t.row && t.column && (this.__data.push(t), this.parsePoint(), r.row = t.row, r.column = t.column);
    }
  }
  removeMarkArea() {
    const r = this.pointList.length;
    for (let t = r - 1; t >= 0; t--)
      this.pointList[t].disabled === true && this.pointList.splice(t, 1);
  }
  crossVerify(r, { start: t, end: n }) {
    return !(t + 1e-3 > r.end || n - 1e-3 < r.start);
  }
  crossArea({ row: r, column: t }) {
    for (const n of this.data)
      if (this.crossVerify(n.row, r) && this.crossVerify(n.column, t))
        return true;
    return false;
  }
  /**
   * 点位向上移动， 每次减 1
   * @param {Object} param
   */
  extendPointUpAndPush({ row: r, column: t }) {
    let n = { row: r, column: t }, a = 0;
    do {
      if (a++, a > 100)
        break;
      if (n = { row: n.row - 1, column: t }, n.row === 0 || this.includePoint(n)) {
        this.pointList.push({ row: n.row + 1, column: t });
        return;
      }
    } while (true);
  }
  /**
   * 点位向左移动， 每次减 1
   * @param {Object} param
   */
  extendPointLeftAndPush({ row: r, column: t }) {
    let n = { row: r, column: t }, a = 0;
    do {
      if (a++, a > 100)
        break;
      if (n = { row: r, column: n.column - 1 }, n.column === 0 || this.includePoint(n)) {
        this.pointList.push({ row: r, column: n.column + 1 });
        return;
      }
    } while (true);
  }
  /**
   * 点位解析
   */
  parsePoint() {
    this.pointList = [];
    for (const r of this.data)
      r.column.end < this.__max && this.extendPointUpAndPush({
        column: r.column.end,
        row: r.row.start
      }), this.extendPointLeftAndPush({
        column: r.column.start,
        row: r.row.end
      });
    this.orderArea(
      /** 区域排序 */
    ), this.mergeArea(
      /** 区域合并 */
    ), this.removeMarkArea(
      /** 区域移出 */
    );
  }
  parseArea(r) {
    const { rowspan: t, colspan: n, ...a } = r;
    if (t > this.__max - 1 || n > this.__max - 1)
      throw new Error("数据异常，请检查。");
    const o = { ...a };
    let i = false;
    for (const c of this.pointList) {
      const { row: s, column: l } = c;
      if (c.disabled === true)
        continue;
      if (i === true)
        break;
      if (l + n > this.__max)
        continue;
      const u = {
        row: { start: s, end: s + t },
        column: { start: l, end: l + n }
      };
      this.crossArea(u) || (Object.assign(o, u), c.disabled = i = true);
    }
    return o;
  }
};
function qt(e5) {
  return e5 && e5.__esModule && Object.prototype.hasOwnProperty.call(e5, "default") ? e5.default : e5;
}
function zt(e5) {
  if (e5.__esModule)
    return e5;
  var r = e5.default;
  if (typeof r == "function") {
    var t = function n() {
      if (this instanceof n) {
        var a = [null];
        a.push.apply(a, arguments);
        var o = Function.bind.apply(r, a);
        return new o();
      }
      return r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: true }), Object.keys(e5).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(e5, n);
    Object.defineProperty(t, n, a.get ? a : {
      enumerable: true,
      get: function() {
        return e5[n];
      }
    });
  }), t;
}
var Vt = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return false;
  if (typeof Symbol.iterator == "symbol")
    return true;
  var r = {}, t = Symbol("test"), n = Object(t);
  if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return false;
  var a = 42;
  r[t] = a;
  for (t in r)
    return false;
  if (typeof Object.keys == "function" && Object.keys(r).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(r).length !== 0)
    return false;
  var o = Object.getOwnPropertySymbols(r);
  if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(r, t))
    return false;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(r, t);
    if (i.value !== a || i.enumerable !== true)
      return false;
  }
  return true;
};
var gr = typeof Symbol < "u" && Symbol;
var Ht = Vt;
var Gt = function() {
  return typeof gr != "function" || typeof Symbol != "function" || typeof gr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : Ht();
};
var Jt = "Function.prototype.bind called on incompatible ";
var Fe = Array.prototype.slice;
var Kt = Object.prototype.toString;
var Qt = "[object Function]";
var Xt = function(r) {
  var t = this;
  if (typeof t != "function" || Kt.call(t) !== Qt)
    throw new TypeError(Jt + t);
  for (var n = Fe.call(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var u = t.apply(
        this,
        n.concat(Fe.call(arguments))
      );
      return Object(u) === u ? u : this;
    } else
      return t.apply(
        r,
        n.concat(Fe.call(arguments))
      );
  }, i = Math.max(0, t.length - n.length), c = [], s = 0; s < i; s++)
    c.push("$" + s);
  if (a = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(o), t.prototype) {
    var l = function() {
    };
    l.prototype = t.prototype, a.prototype = new l(), l.prototype = null;
  }
  return a;
};
var Yt = Xt;
var cr = Function.prototype.bind || Yt;
var Zt = cr;
var en = Zt.call(Function.call, Object.prototype.hasOwnProperty);
var d;
var ie = SyntaxError;
var Vr = Function;
var ae = TypeError;
var Me = function(e5) {
  try {
    return Vr('"use strict"; return (' + e5 + ").constructor;")();
  } catch {
  }
};
var Y = Object.getOwnPropertyDescriptor;
if (Y)
  try {
    Y({}, "");
  } catch {
    Y = null;
  }
var je = function() {
  throw new ae();
};
var rn = Y ? function() {
  try {
    return arguments.callee, je;
  } catch {
    try {
      return Y(arguments, "callee").get;
    } catch {
      return je;
    }
  }
}() : je;
var ne = Gt();
var j = Object.getPrototypeOf || function(e5) {
  return e5.__proto__;
};
var oe = {};
var tn = typeof Uint8Array > "u" ? d : j(Uint8Array);
var Z = {
  "%AggregateError%": typeof AggregateError > "u" ? d : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? d : ArrayBuffer,
  "%ArrayIteratorPrototype%": ne ? j([][Symbol.iterator]()) : d,
  "%AsyncFromSyncIteratorPrototype%": d,
  "%AsyncFunction%": oe,
  "%AsyncGenerator%": oe,
  "%AsyncGeneratorFunction%": oe,
  "%AsyncIteratorPrototype%": oe,
  "%Atomics%": typeof Atomics > "u" ? d : Atomics,
  "%BigInt%": typeof BigInt > "u" ? d : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? d : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? d : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? d : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array > "u" ? d : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? d : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? d : FinalizationRegistry,
  "%Function%": Vr,
  "%GeneratorFunction%": oe,
  "%Int8Array%": typeof Int8Array > "u" ? d : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? d : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? d : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ne ? j(j([][Symbol.iterator]())) : d,
  "%JSON%": typeof JSON == "object" ? JSON : d,
  "%Map%": typeof Map > "u" ? d : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ne ? d : j((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? d : Promise,
  "%Proxy%": typeof Proxy > "u" ? d : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect > "u" ? d : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? d : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ne ? d : j((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? d : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ne ? j(""[Symbol.iterator]()) : d,
  "%Symbol%": ne ? Symbol : d,
  "%SyntaxError%": ie,
  "%ThrowTypeError%": rn,
  "%TypedArray%": tn,
  "%TypeError%": ae,
  "%Uint8Array%": typeof Uint8Array > "u" ? d : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? d : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? d : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? d : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap > "u" ? d : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? d : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? d : WeakSet
};
try {
  null.error;
} catch (e5) {
  nn = j(j(e5));
  Z["%Error.prototype%"] = nn;
}
var nn;
var on = function e(r) {
  var t;
  if (r === "%AsyncFunction%")
    t = Me("async function () {}");
  else if (r === "%GeneratorFunction%")
    t = Me("function* () {}");
  else if (r === "%AsyncGeneratorFunction%")
    t = Me("async function* () {}");
  else if (r === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (t = n.prototype);
  } else if (r === "%AsyncIteratorPrototype%") {
    var a = e("%AsyncGenerator%");
    a && (t = j(a.prototype));
  }
  return Z[r] = t, t;
};
var mr = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var be = cr;
var Pe = en;
var an = be.call(Function.call, Array.prototype.concat);
var cn = be.call(Function.apply, Array.prototype.splice);
var br = be.call(Function.call, String.prototype.replace);
var _e = be.call(Function.call, String.prototype.slice);
var sn = be.call(Function.call, RegExp.prototype.exec);
var ln = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var un = /\\(\\)?/g;
var fn = function(r) {
  var t = _e(r, 0, 1), n = _e(r, -1);
  if (t === "%" && n !== "%")
    throw new ie("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && t !== "%")
    throw new ie("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return br(r, ln, function(o, i, c, s) {
    a[a.length] = c ? br(s, un, "$1") : i || o;
  }), a;
};
var yn = function(r, t) {
  var n = r, a;
  if (Pe(mr, n) && (a = mr[n], n = "%" + a[0] + "%"), Pe(Z, n)) {
    var o = Z[n];
    if (o === oe && (o = on(n)), typeof o > "u" && !t)
      throw new ae("intrinsic " + r + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: n,
      value: o
    };
  }
  throw new ie("intrinsic " + r + " does not exist!");
};
var sr = function(r, t) {
  if (typeof r != "string" || r.length === 0)
    throw new ae("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof t != "boolean")
    throw new ae('"allowMissing" argument must be a boolean');
  if (sn(/^%?[^%]*%?$/, r) === null)
    throw new ie("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = fn(r), a = n.length > 0 ? n[0] : "", o = yn("%" + a + "%", t), i = o.name, c = o.value, s = false, l = o.alias;
  l && (a = l[0], cn(n, an([0, 1], l)));
  for (var u = 1, y = true; u < n.length; u += 1) {
    var f = n[u], v = _e(f, 0, 1), p = _e(f, -1);
    if ((v === '"' || v === "'" || v === "`" || p === '"' || p === "'" || p === "`") && v !== p)
      throw new ie("property names with quotes must have matching quotes");
    if ((f === "constructor" || !y) && (s = true), a += "." + f, i = "%" + a + "%", Pe(Z, i))
      c = Z[i];
    else if (c != null) {
      if (!(f in c)) {
        if (!t)
          throw new ae("base intrinsic for " + r + " exists, but the property is not available.");
        return;
      }
      if (Y && u + 1 >= n.length) {
        var b = Y(c, f);
        y = !!b, y && "get" in b && !("originalValue" in b.get) ? c = b.get : c = c[f];
      } else
        y = Pe(c, f), c = c[f];
      y && !s && (Z[i] = c);
    }
  }
  return c;
};
var Hr = { exports: {} };
(function(e5) {
  var r = cr, t = sr, n = t("%Function.prototype.apply%"), a = t("%Function.prototype.call%"), o = t("%Reflect.apply%", true) || r.call(a, n), i = t("%Object.getOwnPropertyDescriptor%", true), c = t("%Object.defineProperty%", true), s = t("%Math.max%");
  if (c)
    try {
      c({}, "a", { value: 1 });
    } catch {
      c = null;
    }
  e5.exports = function(y) {
    var f = o(r, a, arguments);
    if (i && c) {
      var v = i(f, "length");
      v.configurable && c(
        f,
        "length",
        { value: 1 + s(0, y.length - (arguments.length - 1)) }
      );
    }
    return f;
  };
  var l = function() {
    return o(r, n, arguments);
  };
  c ? c(e5.exports, "apply", { value: l }) : e5.exports.apply = l;
})(Hr);
var pn = Hr.exports;
var Gr = sr;
var Jr = pn;
var dn = Jr(Gr("String.prototype.indexOf"));
var hn = function(r, t) {
  var n = Gr(r, !!t);
  return typeof n == "function" && dn(r, ".prototype.") > -1 ? Jr(n) : n;
};
var vn = {};
var gn = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: vn
}, Symbol.toStringTag, { value: "Module" }));
var mn = zt(gn);
var lr = typeof Map == "function" && Map.prototype;
var Ce = Object.getOwnPropertyDescriptor && lr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var Ee = lr && Ce && typeof Ce.get == "function" ? Ce.get : null;
var Sr = lr && Map.prototype.forEach;
var ur = typeof Set == "function" && Set.prototype;
var ke = Object.getOwnPropertyDescriptor && ur ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var $e = ur && ke && typeof ke.get == "function" ? ke.get : null;
var wr = ur && Set.prototype.forEach;
var bn = typeof WeakMap == "function" && WeakMap.prototype;
var he = bn ? WeakMap.prototype.has : null;
var Sn = typeof WeakSet == "function" && WeakSet.prototype;
var ve = Sn ? WeakSet.prototype.has : null;
var wn = typeof WeakRef == "function" && WeakRef.prototype;
var Ar = wn ? WeakRef.prototype.deref : null;
var An = Boolean.prototype.valueOf;
var On = Object.prototype.toString;
var Rn = Function.prototype.toString;
var Pn = String.prototype.match;
var fr = String.prototype.slice;
var V = String.prototype.replace;
var _n = String.prototype.toUpperCase;
var Or = String.prototype.toLowerCase;
var Kr = RegExp.prototype.test;
var Rr = Array.prototype.concat;
var C = Array.prototype.join;
var En = Array.prototype.slice;
var Pr = Math.floor;
var Qe = typeof BigInt == "function" ? BigInt.prototype.valueOf : null;
var Le = Object.getOwnPropertySymbols;
var Xe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null;
var ce = typeof Symbol == "function" && typeof Symbol.iterator == "object";
var $ = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ce || "symbol") ? Symbol.toStringTag : null;
var Qr = Object.prototype.propertyIsEnumerable;
var _r = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e5) {
  return e5.__proto__;
} : null);
function Er(e5, r) {
  if (e5 === 1 / 0 || e5 === -1 / 0 || e5 !== e5 || e5 && e5 > -1e3 && e5 < 1e3 || Kr.call(/e/, r))
    return r;
  var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e5 == "number") {
    var n = e5 < 0 ? -Pr(-e5) : Pr(e5);
    if (n !== e5) {
      var a = String(n), o = fr.call(r, a.length + 1);
      return V.call(a, t, "$&_") + "." + V.call(V.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return V.call(r, t, "$&_");
}
var Ye = mn;
var $r = Ye.custom;
var xr = Yr($r) ? $r : null;
var $n = function e2(r, t, n, a) {
  var o = t || {};
  if (z(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (z(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = z(o, "customInspect") ? o.customInspect : true;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (z(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (z(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var c = o.numericSeparator;
  if (typeof r > "u")
    return "undefined";
  if (r === null)
    return "null";
  if (typeof r == "boolean")
    return r ? "true" : "false";
  if (typeof r == "string")
    return et(r, o);
  if (typeof r == "number") {
    if (r === 0)
      return 1 / 0 / r > 0 ? "0" : "-0";
    var s = String(r);
    return c ? Er(r, s) : s;
  }
  if (typeof r == "bigint") {
    var l = String(r) + "n";
    return c ? Er(r, l) : l;
  }
  var u = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= u && u > 0 && typeof r == "object")
    return Ze(r) ? "[Array]" : "[Object]";
  var y = Hn(o, n);
  if (typeof a > "u")
    a = [];
  else if (Zr(a, r) >= 0)
    return "[Circular]";
  function f(F, W, L) {
    if (W && (a = En.call(a), a.push(W)), L) {
      var pe = {
        depth: o.depth
      };
      return z(o, "quoteStyle") && (pe.quoteStyle = o.quoteStyle), e2(F, pe, n + 1, a);
    }
    return e2(F, o, n + 1, a);
  }
  if (typeof r == "function" && !Ir(r)) {
    var v = Ln(r), p = Se(r, f);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (p.length > 0 ? " { " + C.call(p, ", ") + " }" : "");
  }
  if (Yr(r)) {
    var b = ce ? V.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : Xe.call(r);
    return typeof r == "object" && !ce ? de(b) : b;
  }
  if (qn(r)) {
    for (var w = "<" + Or.call(String(r.nodeName)), h = r.attributes || [], P = 0; P < h.length; P++)
      w += " " + h[P].name + "=" + Xr(xn(h[P].value), "double", o);
    return w += ">", r.childNodes && r.childNodes.length && (w += "..."), w += "</" + Or.call(String(r.nodeName)) + ">", w;
  }
  if (Ze(r)) {
    if (r.length === 0)
      return "[]";
    var x = Se(r, f);
    return y && !Vn(x) ? "[" + er(x, y) + "]" : "[ " + C.call(x, ", ") + " ]";
  }
  if (Nn(r)) {
    var ee = Se(r, f);
    return !("cause" in Error.prototype) && "cause" in r && !Qr.call(r, "cause") ? "{ [" + String(r) + "] " + C.call(Rr.call("[cause]: " + f(r.cause), ee), ", ") + " }" : ee.length === 0 ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + C.call(ee, ", ") + " }";
  }
  if (typeof r == "object" && i) {
    if (xr && typeof r[xr] == "function" && Ye)
      return Ye(r, { depth: u - n });
    if (i !== "symbol" && typeof r.inspect == "function")
      return r.inspect();
  }
  if (Un(r)) {
    var ue = [];
    return Sr && Sr.call(r, function(F, W) {
      ue.push(f(W, r, true) + " => " + f(F, r));
    }), Nr("Map", Ee.call(r), ue, y);
  }
  if (Dn(r)) {
    var fe = [];
    return wr && wr.call(r, function(F) {
      fe.push(f(F, r));
    }), Nr("Set", $e.call(r), fe, y);
  }
  if (Bn(r))
    return Ue("WeakMap");
  if (Wn(r))
    return Ue("WeakSet");
  if (Tn(r))
    return Ue("WeakRef");
  if (Mn(r))
    return de(f(Number(r)));
  if (Cn(r))
    return de(f(Qe.call(r)));
  if (jn(r))
    return de(An.call(r));
  if (Fn(r))
    return de(f(String(r)));
  if (!In(r) && !Ir(r)) {
    var J = Se(r, f), ye = _r ? _r(r) === Object.prototype : r instanceof Object || r.constructor === Object, D = r instanceof Object ? "" : "null prototype", re = !ye && $ && Object(r) === r && $ in r ? fr.call(G(r), 8, -1) : D ? "Object" : "", K = ye || typeof r.constructor != "function" ? "" : r.constructor.name ? r.constructor.name + " " : "", te = K + (re || D ? "[" + C.call(Rr.call([], re || [], D || []), ": ") + "] " : "");
    return J.length === 0 ? te + "{}" : y ? te + "{" + er(J, y) + "}" : te + "{ " + C.call(J, ", ") + " }";
  }
  return String(r);
};
function Xr(e5, r, t) {
  var n = (t.quoteStyle || r) === "double" ? '"' : "'";
  return n + e5 + n;
}
function xn(e5) {
  return V.call(String(e5), /"/g, "&quot;");
}
function Ze(e5) {
  return G(e5) === "[object Array]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function In(e5) {
  return G(e5) === "[object Date]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function Ir(e5) {
  return G(e5) === "[object RegExp]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function Nn(e5) {
  return G(e5) === "[object Error]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function Fn(e5) {
  return G(e5) === "[object String]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function Mn(e5) {
  return G(e5) === "[object Number]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function jn(e5) {
  return G(e5) === "[object Boolean]" && (!$ || !(typeof e5 == "object" && $ in e5));
}
function Yr(e5) {
  if (ce)
    return e5 && typeof e5 == "object" && e5 instanceof Symbol;
  if (typeof e5 == "symbol")
    return true;
  if (!e5 || typeof e5 != "object" || !Xe)
    return false;
  try {
    return Xe.call(e5), true;
  } catch {
  }
  return false;
}
function Cn(e5) {
  if (!e5 || typeof e5 != "object" || !Qe)
    return false;
  try {
    return Qe.call(e5), true;
  } catch {
  }
  return false;
}
var kn = Object.prototype.hasOwnProperty || function(e5) {
  return e5 in this;
};
function z(e5, r) {
  return kn.call(e5, r);
}
function G(e5) {
  return On.call(e5);
}
function Ln(e5) {
  if (e5.name)
    return e5.name;
  var r = Pn.call(Rn.call(e5), /^function\s*([\w$]+)/);
  return r ? r[1] : null;
}
function Zr(e5, r) {
  if (e5.indexOf)
    return e5.indexOf(r);
  for (var t = 0, n = e5.length; t < n; t++)
    if (e5[t] === r)
      return t;
  return -1;
}
function Un(e5) {
  if (!Ee || !e5 || typeof e5 != "object")
    return false;
  try {
    Ee.call(e5);
    try {
      $e.call(e5);
    } catch {
      return true;
    }
    return e5 instanceof Map;
  } catch {
  }
  return false;
}
function Bn(e5) {
  if (!he || !e5 || typeof e5 != "object")
    return false;
  try {
    he.call(e5, he);
    try {
      ve.call(e5, ve);
    } catch {
      return true;
    }
    return e5 instanceof WeakMap;
  } catch {
  }
  return false;
}
function Tn(e5) {
  if (!Ar || !e5 || typeof e5 != "object")
    return false;
  try {
    return Ar.call(e5), true;
  } catch {
  }
  return false;
}
function Dn(e5) {
  if (!$e || !e5 || typeof e5 != "object")
    return false;
  try {
    $e.call(e5);
    try {
      Ee.call(e5);
    } catch {
      return true;
    }
    return e5 instanceof Set;
  } catch {
  }
  return false;
}
function Wn(e5) {
  if (!ve || !e5 || typeof e5 != "object")
    return false;
  try {
    ve.call(e5, ve);
    try {
      he.call(e5, he);
    } catch {
      return true;
    }
    return e5 instanceof WeakSet;
  } catch {
  }
  return false;
}
function qn(e5) {
  return !e5 || typeof e5 != "object" ? false : typeof HTMLElement < "u" && e5 instanceof HTMLElement ? true : typeof e5.nodeName == "string" && typeof e5.getAttribute == "function";
}
function et(e5, r) {
  if (e5.length > r.maxStringLength) {
    var t = e5.length - r.maxStringLength, n = "... " + t + " more character" + (t > 1 ? "s" : "");
    return et(fr.call(e5, 0, r.maxStringLength), r) + n;
  }
  var a = V.call(V.call(e5, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, zn);
  return Xr(a, "single", r);
}
function zn(e5) {
  var r = e5.charCodeAt(0), t = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[r];
  return t ? "\\" + t : "\\x" + (r < 16 ? "0" : "") + _n.call(r.toString(16));
}
function de(e5) {
  return "Object(" + e5 + ")";
}
function Ue(e5) {
  return e5 + " { ? }";
}
function Nr(e5, r, t, n) {
  var a = n ? er(t, n) : C.call(t, ", ");
  return e5 + " (" + r + ") {" + a + "}";
}
function Vn(e5) {
  for (var r = 0; r < e5.length; r++)
    if (Zr(e5[r], `
`) >= 0)
      return false;
  return true;
}
function Hn(e5, r) {
  var t;
  if (e5.indent === "	")
    t = "	";
  else if (typeof e5.indent == "number" && e5.indent > 0)
    t = C.call(Array(e5.indent + 1), " ");
  else
    return null;
  return {
    base: t,
    prev: C.call(Array(r + 1), t)
  };
}
function er(e5, r) {
  if (e5.length === 0)
    return "";
  var t = `
` + r.prev + r.base;
  return t + C.call(e5, "," + t) + `
` + r.prev;
}
function Se(e5, r) {
  var t = Ze(e5), n = [];
  if (t) {
    n.length = e5.length;
    for (var a = 0; a < e5.length; a++)
      n[a] = z(e5, a) ? r(e5[a], e5) : "";
  }
  var o = typeof Le == "function" ? Le(e5) : [], i;
  if (ce) {
    i = {};
    for (var c = 0; c < o.length; c++)
      i["$" + o[c]] = o[c];
  }
  for (var s in e5)
    z(e5, s) && (t && String(Number(s)) === s && s < e5.length || ce && i["$" + s] instanceof Symbol || (Kr.call(/[^\w$]/, s) ? n.push(r(s, e5) + ": " + r(e5[s], e5)) : n.push(s + ": " + r(e5[s], e5))));
  if (typeof Le == "function")
    for (var l = 0; l < o.length; l++)
      Qr.call(e5, o[l]) && n.push("[" + r(o[l]) + "]: " + r(e5[o[l]], e5));
  return n;
}
var yr = sr;
var le = hn;
var Gn = $n;
var Jn = yr("%TypeError%");
var we = yr("%WeakMap%", true);
var Ae = yr("%Map%", true);
var Kn = le("WeakMap.prototype.get", true);
var Qn = le("WeakMap.prototype.set", true);
var Xn = le("WeakMap.prototype.has", true);
var Yn = le("Map.prototype.get", true);
var Zn = le("Map.prototype.set", true);
var eo = le("Map.prototype.has", true);
var pr = function(e5, r) {
  for (var t = e5, n; (n = t.next) !== null; t = n)
    if (n.key === r)
      return t.next = n.next, n.next = e5.next, e5.next = n, n;
};
var ro = function(e5, r) {
  var t = pr(e5, r);
  return t && t.value;
};
var to = function(e5, r, t) {
  var n = pr(e5, r);
  n ? n.value = t : e5.next = {
    // eslint-disable-line no-param-reassign
    key: r,
    next: e5.next,
    value: t
  };
};
var no = function(e5, r) {
  return !!pr(e5, r);
};
var oo = function() {
  var r, t, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new Jn("Side channel does not contain " + Gn(o));
    },
    get: function(o) {
      if (we && o && (typeof o == "object" || typeof o == "function")) {
        if (r)
          return Kn(r, o);
      } else if (Ae) {
        if (t)
          return Yn(t, o);
      } else if (n)
        return ro(n, o);
    },
    has: function(o) {
      if (we && o && (typeof o == "object" || typeof o == "function")) {
        if (r)
          return Xn(r, o);
      } else if (Ae) {
        if (t)
          return eo(t, o);
      } else if (n)
        return no(n, o);
      return false;
    },
    set: function(o, i) {
      we && o && (typeof o == "object" || typeof o == "function") ? (r || (r = new we()), Qn(r, o, i)) : Ae ? (t || (t = new Ae()), Zn(t, o, i)) : (n || (n = { key: {}, next: null }), to(n, o, i));
    }
  };
  return a;
};
var ao = String.prototype.replace;
var io = /%20/g;
var Be = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var dr = {
  default: Be.RFC3986,
  formatters: {
    RFC1738: function(e5) {
      return ao.call(e5, io, "+");
    },
    RFC3986: function(e5) {
      return String(e5);
    }
  },
  RFC1738: Be.RFC1738,
  RFC3986: Be.RFC3986
};
var co = dr;
var Te = Object.prototype.hasOwnProperty;
var Q = Array.isArray;
var M = function() {
  for (var e5 = [], r = 0; r < 256; ++r)
    e5.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase());
  return e5;
}();
var so = function(r) {
  for (; r.length > 1; ) {
    var t = r.pop(), n = t.obj[t.prop];
    if (Q(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      t.obj[t.prop] = a;
    }
  }
};
var rt = function(r, t) {
  for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < r.length; ++a)
    typeof r[a] < "u" && (n[a] = r[a]);
  return n;
};
var lo = function e3(r, t, n) {
  if (!t)
    return r;
  if (typeof t != "object") {
    if (Q(r))
      r.push(t);
    else if (r && typeof r == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Te.call(Object.prototype, t)) && (r[t] = true);
    else
      return [r, t];
    return r;
  }
  if (!r || typeof r != "object")
    return [r].concat(t);
  var a = r;
  return Q(r) && !Q(t) && (a = rt(r, n)), Q(r) && Q(t) ? (t.forEach(function(o, i) {
    if (Te.call(r, i)) {
      var c = r[i];
      c && typeof c == "object" && o && typeof o == "object" ? r[i] = e3(c, o, n) : r.push(o);
    } else
      r[i] = o;
  }), r) : Object.keys(t).reduce(function(o, i) {
    var c = t[i];
    return Te.call(o, i) ? o[i] = e3(o[i], c, n) : o[i] = c, o;
  }, a);
};
var uo = function(r, t) {
  return Object.keys(t).reduce(function(n, a) {
    return n[a] = t[a], n;
  }, r);
};
var fo = function(e5, r, t) {
  var n = e5.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
};
var yo = function(r, t, n, a, o) {
  if (r.length === 0)
    return r;
  var i = r;
  if (typeof r == "symbol" ? i = Symbol.prototype.toString.call(r) : typeof r != "string" && (i = String(r)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(u) {
      return "%26%23" + parseInt(u.slice(2), 16) + "%3B";
    });
  for (var c = "", s = 0; s < i.length; ++s) {
    var l = i.charCodeAt(s);
    if (l === 45 || l === 46 || l === 95 || l === 126 || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || o === co.RFC1738 && (l === 40 || l === 41)) {
      c += i.charAt(s);
      continue;
    }
    if (l < 128) {
      c = c + M[l];
      continue;
    }
    if (l < 2048) {
      c = c + (M[192 | l >> 6] + M[128 | l & 63]);
      continue;
    }
    if (l < 55296 || l >= 57344) {
      c = c + (M[224 | l >> 12] + M[128 | l >> 6 & 63] + M[128 | l & 63]);
      continue;
    }
    s += 1, l = 65536 + ((l & 1023) << 10 | i.charCodeAt(s) & 1023), c += M[240 | l >> 18] + M[128 | l >> 12 & 63] + M[128 | l >> 6 & 63] + M[128 | l & 63];
  }
  return c;
};
var po = function(r) {
  for (var t = [{ obj: { o: r }, prop: "o" }], n = [], a = 0; a < t.length; ++a)
    for (var o = t[a], i = o.obj[o.prop], c = Object.keys(i), s = 0; s < c.length; ++s) {
      var l = c[s], u = i[l];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (t.push({ obj: i, prop: l }), n.push(u));
    }
  return so(t), r;
};
var ho = function(r) {
  return Object.prototype.toString.call(r) === "[object RegExp]";
};
var vo = function(r) {
  return !r || typeof r != "object" ? false : !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));
};
var go = function(r, t) {
  return [].concat(r, t);
};
var mo = function(r, t) {
  if (Q(r)) {
    for (var n = [], a = 0; a < r.length; a += 1)
      n.push(t(r[a]));
    return n;
  }
  return t(r);
};
var tt = {
  arrayToObject: rt,
  assign: uo,
  combine: go,
  compact: po,
  decode: fo,
  encode: yo,
  isBuffer: vo,
  isRegExp: ho,
  maybeMap: mo,
  merge: lo
};
var nt = oo;
var rr = tt;
var ge = dr;
var bo = Object.prototype.hasOwnProperty;
var Fr = {
  brackets: function(r) {
    return r + "[]";
  },
  comma: "comma",
  indices: function(r, t) {
    return r + "[" + t + "]";
  },
  repeat: function(r) {
    return r;
  }
};
var B = Array.isArray;
var So = String.prototype.split;
var wo = Array.prototype.push;
var ot = function(e5, r) {
  wo.apply(e5, B(r) ? r : [r]);
};
var Ao = Date.prototype.toISOString;
var Mr = ge.default;
var _ = {
  addQueryPrefix: false,
  allowDots: false,
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encoder: rr.encode,
  encodeValuesOnly: false,
  format: Mr,
  formatter: ge.formatters[Mr],
  // deprecated
  indices: false,
  serializeDate: function(r) {
    return Ao.call(r);
  },
  skipNulls: false,
  strictNullHandling: false
};
var Oo = function(r) {
  return typeof r == "string" || typeof r == "number" || typeof r == "boolean" || typeof r == "symbol" || typeof r == "bigint";
};
var De = {};
var Ro = function e4(r, t, n, a, o, i, c, s, l, u, y, f, v, p, b, w) {
  for (var h = r, P = w, x = 0, ee = false; (P = P.get(De)) !== void 0 && !ee; ) {
    var ue = P.get(r);
    if (x += 1, typeof ue < "u") {
      if (ue === x)
        throw new RangeError("Cyclic object value");
      ee = true;
    }
    typeof P.get(De) > "u" && (x = 0);
  }
  if (typeof s == "function" ? h = s(t, h) : h instanceof Date ? h = y(h) : n === "comma" && B(h) && (h = rr.maybeMap(h, function(Ie) {
    return Ie instanceof Date ? y(Ie) : Ie;
  })), h === null) {
    if (o)
      return c && !p ? c(t, _.encoder, b, "key", f) : t;
    h = "";
  }
  if (Oo(h) || rr.isBuffer(h)) {
    if (c) {
      var fe = p ? t : c(t, _.encoder, b, "key", f);
      if (n === "comma" && p) {
        for (var J = So.call(String(h), ","), ye = "", D = 0; D < J.length; ++D)
          ye += (D === 0 ? "" : ",") + v(c(J[D], _.encoder, b, "value", f));
        return [v(fe) + (a && B(h) && J.length === 1 ? "[]" : "") + "=" + ye];
      }
      return [v(fe) + "=" + v(c(h, _.encoder, b, "value", f))];
    }
    return [v(t) + "=" + v(String(h))];
  }
  var re = [];
  if (typeof h > "u")
    return re;
  var K;
  if (n === "comma" && B(h))
    K = [{ value: h.length > 0 ? h.join(",") || null : void 0 }];
  else if (B(s))
    K = s;
  else {
    var te = Object.keys(h);
    K = l ? te.sort(l) : te;
  }
  for (var F = a && B(h) && h.length === 1 ? t + "[]" : t, W = 0; W < K.length; ++W) {
    var L = K[W], pe = typeof L == "object" && typeof L.value < "u" ? L.value : h[L];
    if (!(i && pe === null)) {
      var st = B(h) ? typeof n == "function" ? n(F, L) : F : F + (u ? "." + L : "[" + L + "]");
      w.set(r, x);
      var hr = nt();
      hr.set(De, w), ot(re, e4(
        pe,
        st,
        n,
        a,
        o,
        i,
        c,
        s,
        l,
        u,
        y,
        f,
        v,
        p,
        b,
        hr
      ));
    }
  }
  return re;
};
var Po = function(r) {
  if (!r)
    return _;
  if (r.encoder !== null && typeof r.encoder < "u" && typeof r.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = r.charset || _.charset;
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = ge.default;
  if (typeof r.format < "u") {
    if (!bo.call(ge.formatters, r.format))
      throw new TypeError("Unknown format option provided.");
    n = r.format;
  }
  var a = ge.formatters[n], o = _.filter;
  return (typeof r.filter == "function" || B(r.filter)) && (o = r.filter), {
    addQueryPrefix: typeof r.addQueryPrefix == "boolean" ? r.addQueryPrefix : _.addQueryPrefix,
    allowDots: typeof r.allowDots > "u" ? _.allowDots : !!r.allowDots,
    charset: t,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : _.charsetSentinel,
    delimiter: typeof r.delimiter > "u" ? _.delimiter : r.delimiter,
    encode: typeof r.encode == "boolean" ? r.encode : _.encode,
    encoder: typeof r.encoder == "function" ? r.encoder : _.encoder,
    encodeValuesOnly: typeof r.encodeValuesOnly == "boolean" ? r.encodeValuesOnly : _.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: a,
    serializeDate: typeof r.serializeDate == "function" ? r.serializeDate : _.serializeDate,
    skipNulls: typeof r.skipNulls == "boolean" ? r.skipNulls : _.skipNulls,
    sort: typeof r.sort == "function" ? r.sort : null,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : _.strictNullHandling
  };
};
var _o = function(e5, r) {
  var t = e5, n = Po(r), a, o;
  typeof n.filter == "function" ? (o = n.filter, t = o("", t)) : B(n.filter) && (o = n.filter, a = o);
  var i = [];
  if (typeof t != "object" || t === null)
    return "";
  var c;
  r && r.arrayFormat in Fr ? c = r.arrayFormat : r && "indices" in r ? c = r.indices ? "indices" : "repeat" : c = "indices";
  var s = Fr[c];
  if (r && "commaRoundTrip" in r && typeof r.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = s === "comma" && r && r.commaRoundTrip;
  a || (a = Object.keys(t)), n.sort && a.sort(n.sort);
  for (var u = nt(), y = 0; y < a.length; ++y) {
    var f = a[y];
    n.skipNulls && t[f] === null || ot(i, Ro(
      t[f],
      f,
      s,
      l,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      u
    ));
  }
  var v = i.join(n.delimiter), p = n.addQueryPrefix === true ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? p += "utf8=%26%2310003%3B&" : p += "utf8=%E2%9C%93&"), v.length > 0 ? p + v : "";
};
var se = tt;
var tr = Object.prototype.hasOwnProperty;
var Eo = Array.isArray;
var A = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decoder: se.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};
var $o = function(e5) {
  return e5.replace(/&#(\d+);/g, function(r, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
};
var at = function(e5, r) {
  return e5 && typeof e5 == "string" && r.comma && e5.indexOf(",") > -1 ? e5.split(",") : e5;
};
var xo = "utf8=%26%2310003%3B";
var Io = "utf8=%E2%9C%93";
var No = function(r, t) {
  var n = {}, a = t.ignoreQueryPrefix ? r.replace(/^\?/, "") : r, o = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, i = a.split(t.delimiter, o), c = -1, s, l = t.charset;
  if (t.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === Io ? l = "utf-8" : i[s] === xo && (l = "iso-8859-1"), c = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== c) {
      var u = i[s], y = u.indexOf("]="), f = y === -1 ? u.indexOf("=") : y + 1, v, p;
      f === -1 ? (v = t.decoder(u, A.decoder, l, "key"), p = t.strictNullHandling ? null : "") : (v = t.decoder(u.slice(0, f), A.decoder, l, "key"), p = se.maybeMap(
        at(u.slice(f + 1), t),
        function(b) {
          return t.decoder(b, A.decoder, l, "value");
        }
      )), p && t.interpretNumericEntities && l === "iso-8859-1" && (p = $o(p)), u.indexOf("[]=") > -1 && (p = Eo(p) ? [p] : p), tr.call(n, v) ? n[v] = se.combine(n[v], p) : n[v] = p;
    }
  return n;
};
var Fo = function(e5, r, t, n) {
  for (var a = n ? r : at(r, t), o = e5.length - 1; o >= 0; --o) {
    var i, c = e5[o];
    if (c === "[]" && t.parseArrays)
      i = [].concat(a);
    else {
      i = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var s = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, l = parseInt(s, 10);
      !t.parseArrays && s === "" ? i = { 0: a } : !isNaN(l) && c !== s && String(l) === s && l >= 0 && t.parseArrays && l <= t.arrayLimit ? (i = [], i[l] = a) : s !== "__proto__" && (i[s] = a);
    }
    a = i;
  }
  return a;
};
var Mo = function(r, t, n, a) {
  if (r) {
    var o = n.allowDots ? r.replace(/\.([^.[]+)/g, "[$1]") : r, i = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, s = n.depth > 0 && i.exec(o), l = s ? o.slice(0, s.index) : o, u = [];
    if (l) {
      if (!n.plainObjects && tr.call(Object.prototype, l) && !n.allowPrototypes)
        return;
      u.push(l);
    }
    for (var y = 0; n.depth > 0 && (s = c.exec(o)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && tr.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      u.push(s[1]);
    }
    return s && u.push("[" + o.slice(s.index) + "]"), Fo(u, t, n, a);
  }
};
var jo = function(r) {
  if (!r)
    return A;
  if (r.decoder !== null && r.decoder !== void 0 && typeof r.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var t = typeof r.charset > "u" ? A.charset : r.charset;
  return {
    allowDots: typeof r.allowDots > "u" ? A.allowDots : !!r.allowDots,
    allowPrototypes: typeof r.allowPrototypes == "boolean" ? r.allowPrototypes : A.allowPrototypes,
    allowSparse: typeof r.allowSparse == "boolean" ? r.allowSparse : A.allowSparse,
    arrayLimit: typeof r.arrayLimit == "number" ? r.arrayLimit : A.arrayLimit,
    charset: t,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : A.charsetSentinel,
    comma: typeof r.comma == "boolean" ? r.comma : A.comma,
    decoder: typeof r.decoder == "function" ? r.decoder : A.decoder,
    delimiter: typeof r.delimiter == "string" || se.isRegExp(r.delimiter) ? r.delimiter : A.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof r.depth == "number" || r.depth === false ? +r.depth : A.depth,
    ignoreQueryPrefix: r.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof r.interpretNumericEntities == "boolean" ? r.interpretNumericEntities : A.interpretNumericEntities,
    parameterLimit: typeof r.parameterLimit == "number" ? r.parameterLimit : A.parameterLimit,
    parseArrays: r.parseArrays !== false,
    plainObjects: typeof r.plainObjects == "boolean" ? r.plainObjects : A.plainObjects,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : A.strictNullHandling
  };
};
var Co = function(e5, r) {
  var t = jo(r);
  if (e5 === "" || e5 === null || typeof e5 > "u")
    return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e5 == "string" ? No(e5, t) : e5, a = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), i = 0; i < o.length; ++i) {
    var c = o[i], s = Mo(c, n[c], t, typeof e5 == "string");
    a = se.merge(a, s, t);
  }
  return t.allowSparse === true ? a : se.compact(a);
};
var ko = _o;
var Lo = Co;
var Uo = dr;
var Bo = {
  formats: Uo,
  parse: Lo,
  stringify: ko
};
var To = qt(Bo);
var it = ((e5) => (e5.Encoding = "accept-encoding", e5.Language = "accept-language", e5.ContentType = "content-type", e5.RequestedWith = "X-Requested-With", e5.Authorization = "authorization", e5.TokenAccess = "access_token", e5.TokenRefresh = "refresh_token", e5))(it || {});
var Do = ((e5) => (e5.Json = "application/json", e5.Form = "application/x-www-form-urlencoded", e5))(Do || {});
var Wo = ((e5) => (e5.Ajax = "XMLHttpRequest", e5))(Wo || {});
var qo = ((e5) => (e5.H = "zh-CN", e5))(qo || {});
var Oa = /* @__PURE__ */ ((e5) => {
})();
var We = {
  enable() {
    return false;
  },
  hookVerify(e5, r) {
    const t = e5.code;
    this.enable() && H(t) && ((t.startsWith("TOKEN_") || t.startsWith("CREDENTIAL_")) && (k.remove(
      "authorization"
      /* Authorization */
    ), this.hookLoginFailure(e5, r)), t === "LOGINED_AUTHORITY" && this.hookUnauthorized(e5, r), t.startsWith("ERROR_") && this.hookErrorUnknown(e5, r));
  },
  hookResponseHeader(e5) {
    Reflect.has(
      e5,
      "authorization"
      /* Authorization */
    ) && k.set("authorization", Reflect.get(
      e5,
      "authorization"
      /* Authorization */
    ));
  },
  hookResponseDataParseFailure(e5, r) {
    throw new N(JSON.stringify({ body: e5, headers: r }), X.error);
  },
  hookLoginFailure(e5, r) {
    throw g.warn(`请实现回调函数：Security.${this.hookLoginFailure.name}`, e5, r), new N("回话失效, 请重新登录...", X.info);
  },
  hookUnauthorized(e5, r) {
    throw g.warn(`请实现回调函数：Security.${this.hookUnauthorized.name}`, e5, r), new N("无权访问，请检查权限...", X.info);
  },
  hookErrorUnknown(e5, r) {
    throw g.warn(`请实现回调函数：Security.${this.hookErrorUnknown.name}`, e5, r), new N(e5.message, X.error);
  }
};
function ct(e5) {
  return Promise.reject(e5);
}
var jr = {
  resolve(e5) {
    g.debug("-----interceptor-Request------ config-before -> ", e5);
    const r = {
      [
        "content-type"
        /* ContentType */
      ]: "application/json",
      [
        "X-Requested-With"
        /* RequestedWith */
      ]: "XMLHttpRequest",
      authorization: k.get(
        "authorization"
        /* Authorization */
      ),
      access_token: k.get(
        "access_token"
        /* TokenAccess */
      ),
      refresh_token: k.get(
        "refresh_token"
        /* TokenRefresh */
      )
    };
    {
      const t = k.get(
        "accept-language"
        /* Language */
      );
      I(t) === false && Reflect.set(r, "accept-language", t);
    }
    return I(e5.headers) === false && Je(r, e5.headers, { deep: true }), Reflect.set(e5, "headers", r), Reflect.get(
      r,
      "content-type"
      /* ContentType */
    ) === "application/json" && Reflect.set(e5, "data", JSON.stringify(e5.data)), g.debug("-----interceptor-Request------ config-after ->", e5), e5;
  },
  reject: ct
};
var Cr = {
  resolve(e5) {
    const r = e5.headers;
    try {
      if (We.hookResponseHeader(r), Reflect.has(r, "ignore-parse"))
        return e5.data;
      if (H(e5.data) === false)
        return We.hookResponseDataParseFailure(e5.data, r);
      const t = JSON.parse(e5.data);
      return t.success === true ? t.data : (t.success === false && We.hookVerify(t, r), Promise.reject({ body: t, headers: r }));
    } catch (t) {
      return t instanceof N ? Reflect.get(console, t.type).call(console, t) : t instanceof Error ? Promise.reject(t.message) : t instanceof Promise ? t : Promise.reject(t);
    }
  },
  reject: ct
};
var zo = {
  baseURL: "/api/",
  timeout: 6e4,
  paramsSerializer: {
    serialize(e5) {
      return To.stringify(e5, { arrayFormat: "repeat" });
    }
  }
};
var Vo = class extends Axios {
  constructor(r, t) {
    super(t ? Je(zo, r || {}, { deep: true }) : r), t && (g.debug("使用默认配置，并默认配置优先级较高..."), this.setInterceptorToRequeset(jr.resolve, jr.reject), this.setInterceptorToResponse(Cr.resolve, Cr.reject));
  }
  setConfig(r) {
    Je(this.defaults, r, { deep: true });
  }
  setInterceptorToResponse(r, t) {
    this.interceptors.response.use(r, t);
  }
  setInterceptorToRequeset(r, t) {
    this.interceptors.request.use(r, t);
  }
  /**
   * get
   * @param url 请求 地址
   * @param params 请求数据
   * @param config 可选配置
   * @returns 
   */
  get(r, t, n) {
    return this.request({ url: r, method: "get", params: t, ...n });
  }
  /**
   * post
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  post(r, t, n) {
    return this.request({ url: r, method: "post", data: t, ...n });
  }
  /**
   * put
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  put(r, t, n) {
    return this.request({ url: r, method: "put", data: t, ...n });
  }
  /**
   * delete
   * @param url 请求 地址
   * @param params 请求数据
   * @param config 可选配置
   * @returns 
   */
  delete(r, t, n) {
    return this.request({ url: r, method: "delete", params: t, ...n });
  }
  /**
   * patch
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  patch(r, t, n) {
    return this.request({ url: r, method: "patch", data: t, ...n });
  }
};
var Ra = new Vo({}, true);
function Pa(e5, r) {
  const t = e5.classList;
  return S(t) ? false : t.contains(r);
}
function _a(e5, r) {
  const t = e5.classList;
  t.contains(r) === false && t.add(r);
}
function Ea(e5, r) {
  const t = e5.classList;
  t.contains(r) && t.remove(r);
}
function Ho(e5, r) {
  if (g.debug("gold-core：RouterVue —— inintRouteRecord"), r) {
    const t = "/src/views", n = "Route.vue", a = [];
    for (const o of Object.keys(r)) {
      const i = Tr(o.replace(t, "").replace(n, ""));
      e5.addRoute({ path: i, component: Reflect.get(r, o) }), a.push({ path: i, component: Reflect.get(r, o) });
    }
    k.set("route-record-list", a.map(({ path: o }) => o));
  }
}
var T = {
  enable() {
    return false;
  },
  beforeEach(e5, r) {
    return g.warn(`请实现回调函数：SecurityRouter.${T.beforeEach.name}`, me(e5.fullPath).searchParams.get("token"), r), true;
  },
  beforeResolve(e5) {
    return g.warn(`请实现回调函数：SecurityRouter.${T.beforeEach.name}`, e5), true;
  },
  afterEach(e5, r, t) {
    g.warn(`请实现回调函数：SecurityRouter.${T.afterEach.name}`, e5, r, t);
  }
};
function $a(e5) {
  const r = createRouter(Object.assign({ history: createWebHistory() }, e5));
  return r.beforeEach((t, n) => {
    if (g.debug("gold-core：RouterVue —— beforeEach"), T.enable())
      return T.beforeEach(t, n);
  }), r.beforeResolve((t) => {
    if (g.debug("gold-core：RouterVue —— beforeResolve"), T.enable())
      return T.beforeResolve(t);
  }), r.afterEach((t, n, a) => {
    if (g.debug("gold-core：RouterVue —— afterEach"), T.enable())
      return T.afterEach(t, n, a);
  }), Ho(r, e5.modules), r;
}
function xa() {
  const e5 = defineProps({
    modelValue: [String, Boolean]
  }), r = ref(e5.modelValue), t = defineEmits(["update:modelValue"]);
  return watch(() => e5.modelValue, (n) => r.value = n), watch(() => r.value, (n) => t("update:modelValue", n)), r;
}
function Ia() {
  const e5 = ref(false), r = ref(false), t = ref(false);
  return { statusAdd: e5, statusUpdate: r, statusDetail: t };
}
function Na() {
  const e5 = ref(), r = ref(), t = ref(), n = ref();
  return { primaryKeyAdd: e5, primaryKeyRemove: r, primaryKeyUpdate: t, primaryKeyDetail: n };
}
function Fa() {
  const e5 = ref(), r = ref(), t = ref(), n = ref(), a = ref();
  return { refForm: e5, refFormList: r, refFormAdd: t, refFormUpdate: n, refFormDetail: a };
}
function Ma() {
  const r = ref(), t = ref();
  function n() {
    const { height: a } = Tt(unref(t));
    r.value = 300 < a ? Math.floor(a) : 300;
  }
  return { containerHeight: r, containerTarget: t, containerInitialize: n };
}
function ja() {
  const e5 = ref([]);
  function r(t) {
    e5.value = t;
  }
  return { selectionMultiple: e5, selectionChange: r };
}
function Ca() {
  const e5 = reactive({ list: [], total: 0 });
  provide("modelResult", e5);
  const r = { pageSize: 20, pageNum: 1 };
  return provide("modelPagination", r), { modelResult: e5, modelPagination: r };
}
function Go(e5, r) {
  const t = me(e5);
  g.debug(`gold-core：composable.Frame —— tabPaneAdd：${t.href}`), globalThis.top.postMessage(Object.assign(r || {}, { action: "tab-pane-add", href: t.href }), "*");
}
function ka(e5) {
  globalThis.top.postMessage({ action: "tab-pane-close", code: e5 }, "*");
}
function La(e5) {
  const r = ref([]), t = ref("");
  globalThis.window.addEventListener("message", ({ data: o }) => {
    if ((o == null ? void 0 : o.action) === "tab-pane-add")
      return n(o, e5);
    if ((o == null ? void 0 : o.action) === "tab-pane-close")
      return a(o);
  });
  function n(o, i) {
    var h;
    const { href: c, label: s, code: l, refresh: u, target: y, closable: f, mode: v } = o || {}, p = me(o == null ? void 0 : o.href);
    if (y === "_blank")
      return globalThis.top.open(c), true;
    const b = I(l) ? p.origin + p.pathname + p.hash : l, w = (h = unref(r)) == null ? void 0 : h.find(({ code: P }) => b === P);
    if (i != null && i.sso && p.origin !== globalThis.top.location.origin) {
      const P = p.searchParams, x = "token";
      P.delete(x), P.append(x, k.get(it.Authorization, { defaultValue: "" }));
    }
    if (w === void 0 || I(w)) {
      if (i.max && unref(r).length >= i.max) {
        const P = unref(r).findIndex(({ closable: x }) => x === true);
        P >= 0 && unref(r).splice(P, 1);
      }
      unref(r).push({ label: s, href: p.href, code: b, closable: f, mode: v });
    } else
      u === true && p.searchParams.set("v", (/* @__PURE__ */ new Date()).getTime() + ""), Reflect.set(w, "href", p.href), Reflect.set(w, "label", s), Reflect.set(w, "refresh", u), Reflect.set(w, "closable", f), Reflect.set(w, "code", l), Reflect.set(w, "mode", v);
    return t.value = b, true;
  }
  function a(o) {
    var c;
    const i = (c = unref(r)) == null ? void 0 : c.filter((s) => o.code !== s.code);
    if (i instanceof Array) {
      r.value = i;
      const [s] = [...i].reverse();
      t.value = s.code;
    }
  }
  return provide("list-route", r), provide("tab-activate", t), e5.cacheable === true && (watch(() => t.value, (o) => {
    const i = unref(r).find((c) => c.code === o);
    i && k.set("tab-activate", i);
  }), onMounted(async () => {
    await nextTick();
    const o = k.get("tab-activate");
    S(o) || Go(o.href, o);
  })), { listRoute: r, activate: t };
}
export {
  ta as Assert,
  na as Convert,
  mt as EnumColor,
  X as EnumConsole,
  Do as EnumContentType,
  ze as EnumDirection,
  Oa as EnumEncoding,
  Ve as EnumFormat,
  it as EnumHeader,
  qo as EnumLanguage,
  Ur as EnumOrder,
  Wo as EnumRequestedWith,
  gt as EnumTime,
  O as EnumType,
  N as ErrorConsole,
  Zo as ErrorView,
  bt as FileSuffix,
  Vo as Http,
  We as HttpSecurity,
  Aa as Layout,
  g as ProxyConsole,
  T as SecurityRouter,
  Yo as Type,
  sa as UUID,
  _a as addClass,
  Je as assign,
  Ge as assignArray,
  Re as assignObject,
  ca as clearEmpty,
  ha as clientHeight,
  Tt as clientRect,
  va as clone,
  ga as cookie,
  $a as createRouterVue,
  aa as decryption,
  qr as encryption,
  Bt as equal,
  ia as findPath,
  E as getType,
  Pa as hasClass,
  ua as hasScrollBar,
  Ra as http,
  la as includes,
  nr as isArray,
  $t as isAsyncFunction,
  I as isBlank,
  At as isBlog,
  Ot as isBoolean,
  St as isDate,
  S as isEmpty,
  It as isError,
  wt as isFile,
  Et as isFunction,
  Rt as isNumber,
  m as isObject,
  Pt as isObjectOrArray,
  xt as isPromise,
  _t as isRegExp,
  H as isString,
  wa as local,
  ma as message,
  ra as notBlankArray,
  ea as notBlankObject,
  pa as parse,
  ba as parseMessage,
  Ea as removeClass,
  fa as scrollBarWidth,
  Sa as sendRedirect,
  k as session,
  oa as sorting,
  ya as stringify,
  ir as stringifyArray,
  ar as stringifyObject,
  Go as tabPaneAdd,
  ka as tabPaneClose,
  Wr as toFirstCharLowerCase,
  Dr as toFirstCharUpperCase,
  Tr as toJoin,
  Br as toLowerCamelCase,
  Ut as toNumber,
  He as toPathFormat,
  me as toURL,
  or as toUpperCamelCase,
  Nt as trim,
  da as urlParam,
  Ma as useContainer,
  Fa as useForm,
  La as useFrame,
  Ca as useModel,
  Na as usePrimaryKey,
  Ia as useStatus,
  ja as useTable,
  xa as useVModel
};
//# sourceMappingURL=gold-core.js.map

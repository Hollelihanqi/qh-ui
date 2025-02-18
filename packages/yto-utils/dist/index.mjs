const isEmptyFun = (value) => {
  if (value == null) {
    return true;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};
const isFunctionFun = (value) => {
  return typeof value === "function";
};
function debounceFun(func, wait) {
  let timeoutId;
  return function debounced(...args) {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resolve(func.apply(this, args));
      }, wait);
    });
  };
}
const guid = () => {
  const S4 = () => {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};
const copyStr = async (str) => {
  if (!str) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(str);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = str;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      return false;
    }
  } catch (err) {
    return false;
  }
};

const isBrowser = typeof window !== "undefined";
const checkEnvironment = () => {
  if (!isBrowser) {
    console.warn("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301JsBridge");
    return false;
  }
  return true;
};
const JsBridge = {
  init: function(callback) {
    if (!checkEnvironment()) return;
    console.log("jsBridge:init");
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (!isiOS) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          "WebViewJavascriptBridgeReady",
          function() {
            callback(WebViewJavascriptBridge);
          },
          false
        );
      }
    } else {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    }
  },
  first: function() {
    if (!checkEnvironment()) return;
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (!isiOS) {
      try {
        JsBridge.init(function(bridge) {
          bridge.init(function(data, responseCallback) {
            responseCallback(data);
          });
        });
      } catch (error) {
        console.log("jsBridge:first:::!isiOS-error: ", error);
      }
    }
  },
  /**
   * 函数描述：webView调用JS事件
   *
   * jsBridge.registerHandler(method, callBack(response));
   * @param method {string} 方法名
   * @return {Object} 回调
   */
  registerHandler: function(name, fun) {
    if (!checkEnvironment()) return;
    JsBridge.init(function(bridge) {
      bridge.registerHandler(name, fun);
    });
  },
  /**
   * 函数描述：js调用webview事件
   *
   * jsBridge.callHandler(method, data, callBack(response));
   * @param method {string} 方法名
   * @param data {Object} 参数
   * @return {Object} 回调
   */
  callHandler: function(name, data, fun) {
    if (!checkEnvironment()) return;
    JsBridge.init(function(bridge) {
      bridge.callHandler(name, data, fun);
    });
  }
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _Bridge = class _Bridge {
  constructor() {
    console.log("\u521D\u59CB\u5316JsBridge");
    JsBridge.first();
  }
  /**
   * 调用原生方法
   * @param funName 方法名
   * @param funParams 方法参数
   * @param otherParams 其他参数（如超时时间）
   */
  callHandler(funName, funParams = {}, otherParams = { timeout: _Bridge.DEFAULT_TIMEOUT }) {
    let isCallback = false;
    const timeout = otherParams.timeout || _Bridge.DEFAULT_TIMEOUT;
    return new Promise((resolve, reject) => {
      try {
        JsBridge.init((bridge2) => {
          console.log("JsBridge\u521D\u59CB\u5316\u6210\u529F");
          bridge2.registerHandler(
            funName,
            (data, responseCallback) => {
              responseCallback(data);
            }
          );
          bridge2.callHandler(funName, funParams, (res) => {
            isCallback = true;
            resolve({
              code: 0,
              data: res,
              message: "\u6210\u529F"
            });
          });
          setTimeout(() => {
            if (!isCallback) {
              resolve({
                code: -1,
                data: null,
                message: `\u8C03\u7528\u8D85\u65F6(${timeout}ms)`
              });
            }
          }, timeout);
        });
      } catch (error) {
        reject({
          code: -2,
          data: null,
          message: error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF"
        });
      }
    });
  }
};
__publicField(_Bridge, "DEFAULT_TIMEOUT", 3e3);
let Bridge = _Bridge;
const bridge = new Bridge();

const ocrValueMapping = (originalData, field) => {
  const mappedData = {};
  Object.entries(field).forEach(([key, value]) => {
    mappedData[key] = originalData[value] ?? null;
  });
  return mappedData;
};

const downloadFileStream = (streamData, fileName) => {
  const blob = new Blob([streamData], { type: streamData.type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || (/* @__PURE__ */ new Date()).getTime().toString();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
const downloadFileDataCSV = (params) => {
  let str = `${params.tableHeadArr.toString()}
`;
  params.fileDataArr.forEach((item) => {
    str += params.formatter(item);
  });
  const url = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(str);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${params.fileName || ( new Date()).getTime()}.csv`;
  link.click();
  document.removeChild(link);
};

const addWaterMarker = (params = {
  content: "",
  elNode: null,
  font: "14px Inter, Avenir",
  fillStyle: "rgba(0, 0, 0, 0.08)",
  rotate: -28,
  zIndex: 99999,
  width: 200,
  height: 100
}) => {
  const { content, elNode, fillStyle, font, zIndex, rotate, width, height } = params;
  if (!content) return;
  let node = getTargetNode(elNode);
  try {
    const canvas = createWatermarkCanvas(content, {
      width,
      height,
      rotate,
      font,
      fillStyle
    });
    const watermarkDiv = createWatermarkContainer(canvas, zIndex);
    node.style.position = "relative";
    node.appendChild(watermarkDiv);
  } catch (error) {
    console.error("\u6DFB\u52A0\u6C34\u5370\u5931\u8D25:", error);
  }
};
const removeWatermark = (elNode) => {
  const node = getTargetNode(elNode);
  const waterMarkEl = node.querySelector(".water-mark");
  waterMarkEl && node.removeChild(waterMarkEl);
};
const getTargetNode = (elNode) => {
  if (!elNode) {
    return document.body;
  }
  if (typeof elNode === "string") {
    const node = document.querySelector(elNode);
    if (!node) {
      throw new Error(`\u672A\u627E\u5230\u76EE\u6807\u8282\u70B9: ${elNode}`);
    }
    return node;
  }
  return elNode;
};
const createWatermarkCanvas = (content, options) => {
  const { width = 200, height = 100, rotate = -28, font, fillStyle } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("\u65E0\u6CD5\u83B7\u53D6canvas\u4E0A\u4E0B\u6587");
  }
  ctx.rotate(rotate * Math.PI / 180);
  ctx.font = font || "14px Inter, Avenir";
  ctx.fillStyle = fillStyle || "rgba(0, 0, 0, 0.08)";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(content, 0, canvas.height);
  return canvas;
};
const createWatermarkContainer = (canvas, zIndex) => {
  const div = document.createElement("div");
  div.classList.add("water-mark");
  div.style.pointerEvents = "none";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.position = "absolute";
  div.style.zIndex = zIndex || "99999";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.backgroundRepeat = "repeat";
  div.style.backgroundPosition = "0px 0px";
  div.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  return div;
};

const UNITS = {
  TRILLION: 1e12,
  BILLION: 1e8,
  MILLION: 1e4
};
const UNIT_TEXTS = {
  TRILLION: "\u5146",
  BILLION: "\u4EBF",
  MILLION: "\u4E07"
};
const thousandsSeparator = (num) => {
  return num.toLocaleString("en-US");
};
const isInteger = (num) => Number.isInteger(num);
const formatNumber = (num, fixedNum = 2, nullStr = "-") => {
  const numValue = Number(num);
  if (isNaN(numValue)) {
    return nullStr;
  }
  if (numValue <= 0) {
    return String(numValue);
  }
  const formatUnit = (value, unit, unitText) => {
    const divided = value / unit;
    return isInteger(divided) ? `${divided}${unitText}` : `${divided.toFixed(fixedNum)}${unitText}`;
  };
  if (numValue >= UNITS.TRILLION) {
    return formatUnit(numValue, UNITS.TRILLION, UNIT_TEXTS.TRILLION);
  }
  if (numValue >= UNITS.BILLION) {
    return formatUnit(numValue, UNITS.BILLION, UNIT_TEXTS.BILLION);
  }
  if (numValue >= UNITS.MILLION) {
    return formatUnit(numValue, UNITS.MILLION, UNIT_TEXTS.MILLION);
  }
  return String(numValue);
};

const TIME_UNITS = {
  day: { value: 24 * 60 * 60 * 1e3, label: "\u5929", milliseconds: 24 * 60 * 60 * 1e3 },
  hour: { value: 60 * 60 * 1e3, label: "\u65F6", milliseconds: 60 * 60 * 1e3 },
  minute: { value: 60 * 1e3, label: "\u5206", milliseconds: 60 * 1e3 },
  second: { value: 1e3, label: "\u79D2", milliseconds: 1e3 },
  millisecond: { value: 1, label: "\u6BEB\u79D2", milliseconds: 1 }
};
const formatUnit = (value, unit, shouldAddZero = true) => {
  return shouldAddZero && value < 10 ? `0${value}${unit}` : `${value}${unit}`;
};
const formatDuration = (timeInput, inputType = "second", showUnits = ["day", "hour", "minute", "second"]) => {
  if (!timeInput) return "--";
  const conversionMap = {
    minute: 60 * 1e3,
    second: 1e3,
    millisecond: 1
  };
  const totalMilliseconds = timeInput * conversionMap[inputType];
  const result = showUnits.reduce((acc, unit) => {
    const { value, label } = TIME_UNITS[unit];
    const unitValue = Math.floor(totalMilliseconds % (unit === "day" ? Infinity : TIME_UNITS[showUnits[showUnits.indexOf(unit) - 1]]?.value || Infinity) / value);
    if (unitValue === 0 && acc === "") return acc;
    return acc + formatUnit(unitValue, label, unit !== "millisecond");
  }, "");
  return result || "--";
};

export { addWaterMarker, bridge, copyStr, debounceFun, downloadFileDataCSV, downloadFileStream, formatDuration, formatNumber, guid, isEmptyFun, isFunctionFun, isInteger, ocrValueMapping, removeWatermark, thousandsSeparator };

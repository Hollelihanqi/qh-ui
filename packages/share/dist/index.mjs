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

const ocrValueMapping = (originalData, field) => {
  const mappedData = {};
  Object.entries(field).forEach(([key, value]) => {
    mappedData[key] = originalData[value] ?? null;
  });
  return mappedData;
};

export { copyStr, debounceFun, guid, isEmptyFun, isFunctionFun, ocrValueMapping };

var SCORM = (function () {
  var api = null, initialized = false;
  function find(win, depth) {
    while (win && depth-- > 0) {
      if (win.API_1484_11) return win.API_1484_11;
      if (win.parent && win.parent !== win) { win = win.parent; } else { break; }
    }
    return null;
  }
  function get() {
    if (api) return api;
    api = find(window, 10);
    if (!api && window.opener) api = find(window.opener, 10);
    return api;
  }
  return {
    init: function () {
      var a = get();
      if (!a) return false;
      initialized = a.Initialize('') === 'true';
      return initialized;
    },
    get: function (k) { var a = get(); return a && initialized ? a.GetValue(k) : ''; },
    set: function (k, v) { var a = get(); return a && initialized ? a.SetValue(k, String(v)) === 'true' : false; },
    save: function () { var a = get(); return a && initialized ? a.Commit('') === 'true' : false; },
    quit: function () { var a = get(); if (a && initialized) { a.Terminate(''); initialized = false; } }
  };
})();

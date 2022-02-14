import form from "./components/form";

(function (window) {
  const LFSignature = {
    init: function () {
      form.init();
    },
  };

  //load SDK
  const supportedAPI = Object.keys(LFSignature);
  const queue = window.LFSignature;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      const method = queue[i][0];
      if (supportedAPI.indexOf(method) !== -1) {
        LFSignature[method]();
      }
    }
  }
})(window);

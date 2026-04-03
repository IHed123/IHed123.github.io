if (!window.top.location.href.startsWith("https://skybase-alpha.github.io/")) {
  document.querySelector("title").innerHTML = "Google";
  function hidey() {
    function inFrame() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return !0;
      }
    }
    if (1 != inFrame()) {
      var a = window.open("about:blank", "_blank");
      a.document.documentElement.innerHTML =
        '<!DOCTYPE html><html><title>Classes</title><link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png"><style>body {margin:0;}</style><body><iframe height="100%" width="100%" src="' +
        window.location.href +
        '"frameborder="0" allowfullscreen></iframe></body></html>';
      window.location.replace("https://classroom.google.com/h");
    }
  }
} else {
  alert("this site is poopoo");
  window.close();
}

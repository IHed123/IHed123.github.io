function hidey() {
  if (
    document.getElementById("jsInput").value.startsWith("http://") ||
    document.getElementById("jsInput").value.startsWith("https://")
  ) {
    var url = document.getElementById("jsInput").value;
  } else {
    var url = "http://" + document.getElementById("jsInput").value;
  }
  var a = window.open("about:blank", "_blank");
  a.document.documentElement.innerHTML =
    `
      <!DOCTYPE html>
      <html>
          <head>
              <title>Classes</title>
              <link rel="icon" type="image/png" href="https://ssl.gstatic.com/classroom/favicon.png">
          </head>
          <body style="margin: 0">
              <iframe height="100%" width="100%" src="` +
    url +
    `"frameborder="0" allowfullscreen></iframe>
          </body>
      </html>`;
}

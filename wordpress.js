const version = 'a25.5.26.001'
const baseUrl = 'https://cdn.jsdelivr.net/gh/scyppan/Battle-Turn-Order';

document.addEventListener('DOMContentLoaded', function () {

  var mainScript = document.createElement('script')
  mainScript.src   = baseUrl + '@' + version + '/main.js'
  mainScript.defer = true
  mainScript.onload = function() {
    initMain(baseUrl, version)
  }
  document.head.appendChild(mainScript)
})
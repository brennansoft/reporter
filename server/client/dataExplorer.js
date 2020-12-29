window.addEventListener('load', function() {
  const FILE_SELECTOR = document.getElementById('file-selector')
  const DATA_WINDOW = document.getElementById('data-source')

  function loadSource (event) {
    const file = event.target.files[0]
    const path = './' + file.webkitRelativePath + file.name
    DATA_WINDOW.setAttribute('src', path)
  }

  FILE_SELECTOR.onload = function (event) {
    console.log('event', event)
  }

  FILE_SELECTOR.addEventListener('change', (event) => {
    const file = event.target.files[0]
    const path = './' + file.webkitRelativePath + file.name

    fetch(path, {
      headers : {
        'Content-Type': 'application/html',
        'Accept': 'application/html'
       }
    }).then(response => response.text())
      .then(text => console.log(text))

    DATA_WINDOW.setAttribute('src', path)

    let dataWindow = DATA_WINDOW.contentWindow
    let dataDoc = DATA_WINDOW.contentDocument

    dataDoc.getElementsByTagName('body')[0].addEventListener('load', function () {
      console.log('hello')
    })

    dataWindow.addEventListener('load', function () {
      console.log('dataDoc loaded')
      let rows = getDataRows(dataDoc)
      console.log(rows.map(extractRowData))
    })
  })
})

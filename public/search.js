function searched() {
  console.log('keriiii');
    const myDiv = document.createElement('div')
    myDiv.id = 'div_id'
    myDiv.innerHTML = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
   ' <div class="modal-dialog modal-dialog-centered" role="document">' +
      '<div class="modal-content">' +
        '<div class="modal-header"> ' +
         ' <h5 class="modal-title" id="exampleModalLongTitle">Searching...</h5>' +
         ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
           ' <span aria-hidden="true">&times;</span></button> </div>' +
      '  <div  style="height: auto;" class="modal-body row height d-flex row flex-row justify-content-center align-items-start ">' +
         '              <div class="col-md-12"><div class="form"><form action="/shop" id="searchForm"><input id="inp" name="p" type="text" onkeyup="sendData(this)" class="form-control form-input" placeholder="Search anything..."><div><input type="submit" class="btn btn-dark" value="Submit" hidden></div></form></div>' +
  
      ' </div>' +
      '<section id="searching">' +
  
      '</section>' +
    '</div>' +
        '<div class="modal-footer">' +
  
        '</div></div></div></div>'
  
    document.body.appendChild(myDiv)
  }
  function sendData (e) {
    const searchResults = document.getElementById('searching')
    const exp = e.value.toString()
    const match = exp.match(/^[a-zA-z ]*/)
    const match2 = exp.match(/\s*/)
    if (match2[0] === e.value) {
      console.log('ivde ind')
      searchResults.innerHTML = ''
    }
    if (match[0] === e.value && e.value != '') {
      fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: e.value })
      }).then((res) => { return res.json() }).then(data => {
        const suggestion = data.payload
        console.log(suggestion,'paaaaaaaaa');
        searchResults.innerHTML = ''
        if (suggestion.length < 1) {
          console.log('kali');
          searchResults.innerHTML = '<p>Sorry. Nothing Found.</p>'
          return
        }
        suggestion.forEach((element, i) => {
          console.log(element+"ghjk");
          if (element.type == 'Products') {
            console.log('ivde product' + element.title)
            searchResults.innerHTML += `<a href='/shop?q=${element.id}'>${element.name}</a>` +
            `<p class="text-muted m-0">  ${element.type}</p>`
          } else if (element.type == 'category') {
            console.log('cate')
            searchResults.innerHTML += `<a href='/shop?cat=${element.id}'>${element.title}</a>` +
            `<p class="text-muted m-0">  ${element.type}</p>`
          }
          if (suggestion[i + 1]) {
            searchResults.innerHTML += '<hr class="p-0 m-0">'
          }
        })
      })
  
      return
    }
    console.log('ending')
    searchResults.innerHTML = ''
  }
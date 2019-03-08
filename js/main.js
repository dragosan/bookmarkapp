document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  console.log(siteName, siteUrl);

  if(!validateForm(siteName,siteUrl)){
    return false;
  }
  
  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  //   console.log(bookmark);
  //   localStorage.setItem("test", "hello world");
  //   console.log(localStorage.getItem("test"));
  //   localStorage.removeItem("test");

  // test if bookmarks exist in localStorage
  if (localStorage.getItem("bookmarks") === null) {
    // initiate array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // if bookmarks exist
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // add to array
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  fetchBookmarks();
  document.getElementById('myForm').reset();
  e.preventDefault();
}

function deleteItem(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarksResult = document.getElementById("bookmarksResult");

  bookmarksResult.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResult.innerHTML +=
      '<div class="card card-body bg-light">' +
      "<h3>" +
      name +
      '<a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a>' +
      "<a onclick=\"deleteItem('" +
      url +
      '\')" class="btn btn-danger"  href="#">Delete</a>' +
      "</h3>" +
      "</div>";
  }

  console.log(bookmarks);
}

function validateForm(siteName,siteUrl){
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression); 
  if (!siteUrl.match(regex)) {
    alert("Please submit a valid url");
    return false;
  }
  return true;
}


tabs = ['research', 'team', 'papers', 'press', 'resources']

waitForFonts = 1;
loaded = 0;
if (waitForFonts) {
  var fontA = new FontFaceObserver('Raleway');
  var fontB = new FontFaceObserver('Open Sans');
  Promise.all([fontA.load(), fontB.load()]).then(function () {
    loaded = 1;
    $('body').addClass("fonts-ready");
  });
}

$(document).ready(function() {

  if (!waitForFonts  || loaded) {
    $('body').addClass("fonts-ready")
  }

  // if ($('.page-content .wrapper.resources').length > 0) {
  //   loadGitHubRepos()
  // }

  var includes = $('[data-include]');
  jQuery.each(includes, function(){
    var file = 'includes/' + $(this).data('include') + '.html';
    var callback = ""
    if ($(this).data('include') == 'header') {
      callback = headerFunctions;
    } else if ($(this).data('include') == 'footer') {
      callback = footerFunctions;
    }
    $(this).load(file,callback);
  });
});

function headerFunctions() {
  // Show current page's sub nav
  currentPage = location.pathname.substr(location.pathname.lastIndexOf("/")+1)
  if (currentPage.includes(".")) {
    currentPage = currentPage.substr(0,currentPage.indexOf("."))
  }
  if (currentPage != "") {
    $('.site-nav .sub-nav.'+currentPage).css("margin-top", "0")
    $('.site-nav .sub-nav.'+currentPage).css("z-index", "-11")
  }

  // On hover, show sub nav
  $('.main-nav > li').hover(function() {
    name = this.attributes.data.value;

    // Hide other sub navs
    tabs.forEach((item, i) => {
      if (item != name) {
        $('.site-nav .sub-nav.'+item).css("margin-top", "-75px");
      }
    });

    // Show this sub nav
    // $('.site-nav .sub-nav.'+name).animate({marginTop: "0"}, 100)
    $('.site-nav .sub-nav.'+name).css("margin-top", "0");
  }, function() {})
  // When cursor leaves the nav, hide the sub navs
  $('.site-nav').hover(function() {

  }, function() {
    if (currentPage != "") {
      $('.site-nav .sub-nav.'+currentPage).css("margin-top", "0");
    }
    tabs.forEach((item, i) => {
      if (item != currentPage) {
        $('.site-nav .sub-nav.'+item).animate({marginTop:"-75px"}, 100);
      }
    });
  });
}

function footerFunctions() {
  $('footer.site-footer .copyright').html("&copy; "+new Date().getFullYear());
}

// function loadGitHubRepos() {
//
//   const xhr = new XMLHttpRequest();
//   const url = 'https://api.github.com/users/DOnghiaGroup/repos';
//   xhr.open('GET', url, true);
//   xhr.onload = function() {
//       const data = JSON.parse(this.response);
//       console.log(data);
//       for (i in data) {
//         item = data[i]
//         newHtmlElement = "<p class=\"githubrepo\"><a href=\""+item.html_url+"\">"+item.name+"</a> - "+item.description+"</p>"
//         $('.page-content .resources #code .githubrepos').append(newHtmlElement)
//       }
//   }
//
//   // Send the request to the server
//   xhr.send();
// }

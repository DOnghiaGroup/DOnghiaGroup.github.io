
tabs = ['research', 'team', 'papers', 'resources']

// Prevent unloaded fonts from flashing
waitForFonts = 0;
if (waitForFonts) {
  var fontA = new FontFaceObserver('Raleway');
  var fontB = new FontFaceObserver('Open Sans');
  Promise.all([fontA.load(), fontB.load()]).then(function () {
    $('body').addClass("fonts-ready")
  });
}

$(document).ready(function() {

  if (!waitForFonts) {
    $('body').addClass("fonts-ready")
  }

  // var includes = $('[data-include]');
  // jQuery.each(includes, function(){
  //   var file = 'includes/' + $(this).data('include') + '.html';
  //   var callback = ($(this).data('include') == 'header') ? headerFunctions : ""
  //   $(this).load(file,callback);
  // });

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
  console.log("Test");
  console.log($('.main-nav > li').length);
  $('.main-nav > li').hover(function() {
    name = this.attributes.data.value;

    // Hide other sub navs
    tabs.forEach((item, i) => {
      if (item != name && item != currentPage) {
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
    tabs.forEach((item, i) => {
      if (item != currentPage) {
        $('.site-nav .sub-nav.'+item).animate({marginTop:"-75px"}, 100);
      }
    });
  })
});

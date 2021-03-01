// on-click active class
$(document).ready(function () {
  var current = location.pathname;
  $('nav ul li a').each(function(){
      var $this = $(this);
      // if the current path is like this link, make it active
      if($this.attr('href').indexOf(current) !== -1){
          $this.addClass('active');
      }
  })
});
$.preloader = (selector = '.preloader') => {
    return {
      show() {
        $(selector).css('height', '100vh');
        setTimeout(function () {
          $(selector).children().show();
        }, 200);
      },
      hide() {
        $(selector).css('height', 0);
        setTimeout(function () {
          $(selector).children().hide();
        }, 200);
      }
    }
}  
const ui = {
  init: () => {
    ui.bindMobileNavToggle();
  },
  bindMobileNavToggle: () => {
    $('.mobile-nav-toggle').on('click', function() {
      $('body').toggleClass('mobile-nav-active');
    });
  }
};
export default ui;

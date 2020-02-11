/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable strict */
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var dropdownlink = this.el.find('.accordion-menu__item-header');
    dropdownlink.on('click',
        {el: this.el, multiple: this.multiple},
        this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      // this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      // show only one menu at the same time
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
  };

  // eslint-disable-next-line no-unused-vars
  var accordion = new Accordion($('.accordion-menu'), false);
// eslint-disable-next-line semi
})

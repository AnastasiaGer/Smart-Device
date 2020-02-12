/* eslint-disable one-var */
/* eslint-disable no-undef */
/* eslint-disable strict */
var link = document.querySelector('.dialog-link');

var popup = document.querySelector('.modal-dialog');
var close = document.querySelector('.modal-close');
var closeOverlay = document.querySelector('.modal-overlay');
var overlay = document.querySelector('.modal-overlay');

var DialogForm = popup.querySelector('form');
var elName = popup.querySelector('.recall-form__name');
var elPhone = popup.querySelector('.recall-form__phone');
var elMessage = popup.querySelector('.recall-form__message-input');

var isStorageSupport = true;
var storage = '';

var emptyFields = function () {
  elName.value = '';
  elPhone.value = '';
  elMessage.value = '';
};

try {
  storage['name'] = localStorage.getItem('name');
  storage['tel'] = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (event) {
  event.preventDefault();
  popup.classList.add('modal-content-show');
  popup.classList.add('show-animation');
  overlay.classList.add('modal-overlay-show');
  emptyFields();

  if (storage) {
    elName.value = storage['name'];
    elPhone.value = storage['tel'];
    elMessage.focus();
  } else {
    elName.focus();
  }
});
close.addEventListener('click', function (event) {
  event.preventDefault();
  popup.classList.remove('modal-content-show');
  closeOverlay.classList.remove('modal-overlay-show');
  popup.classList.remove('modal-error');
});
overlay.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.remove('modal-content-show');
  popup.classList.remove('modal-error');
});
closeOverlay.addEventListener('click', function (event) {
  event.preventDefault();
  closeOverlay.classList.remove('modal-overlay-show');
  popup.classList.remove('modal-content-show');
  popup.classList.remove('modal-error');
});
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    if (popup.classList.contains('modal-content-show')) {
      popup.classList.remove('modal-content-show');
      popup.classList.remove('modal-error');
      overlay.classList.remove('modal-overlay-show');
    }
  }
});
DialogForm.addEventListener('submit', function (event) {
  if (!elName.value || !elPhone.value || !elMessage.value) {
    event.preventDefault();
    popup.classList.remove('modal-error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('modal-error');
    if (!elName) {
      elName.focus();
    }
    if (!elPhone) {
      elPhone.focus();
    }
    if (!elMessage) {
      elMessage.focus();
    }
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', elName.value);
      localStorage.setItem('tel', elPhone.value);
    }
  }
});


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

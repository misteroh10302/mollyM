/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */




// Split privacy on mobile
function privacyMobile() {
 const pagePrivacy =  document.querySelector('#shopify-section-page-privacy-template');
 let pageHeader = document.querySelector('.SectionHeader__Heading')
  if (window.innerWidth < 500) {
      if (pageHeader.innerHTML.includes('Privacy')) {
          if (!pageHeader.innerHTML.includes('<br>')) {
            let titleSplit = pageHeader.innerHTML.split('/');
            console.log(titleSplit[0], titleSplit[1]);
            pageHeader.innerHTML = `${titleSplit[0]} / <br> ${titleSplit[1]}`;
          }
      }
  } else {
    if (pageHeader.innerHTML.includes('Privacy')) {
      pageHeader.innerHTML = "Privacy Policy / Terms and Conditions";
    }
  }
}


 const allImageThumb = document.querySelector('.Product__SlideshowNavImage:nth-child(1)');
 const allImageThumbElse = document.querySelectorAll('.Product__SlideshowNavImage:nth-child(n+1)');

 changeImage = (e) => {
   const top = document.querySelector('.template-product');
   e.target.parentElement.classList.add('no__pointer');
   setTimeout(function(){
     window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
   },10)
 }

 updatePointer = () => {
   allImageThumb.classList.remove('no__pointer');
 }
 if (allImageThumb  !== null) {
   console.log('okay');
   allImageThumb.classList.add('no__pointer');
   allImageThumbElse.forEach( (item) => item.addEventListener('click', updatePointer))
   allImageThumb.addEventListener('click',changeImage);
 }


 // Accordion Interactions

const accordionButton = document.querySelectorAll('.accordion');
const inner = document.querySelectorAll('.inner');

togglePanel = (e) => {
  e.target.parentElement.classList.toggle('panel___open');
  let elHeight = e.target.nextElementSibling.style.height;
  let innerDataHeight = e.target.nextElementSibling.attributes[1].value
  if ( elHeight === "0px") {
    e.target.nextElementSibling.style.height = innerDataHeight + "px";
  } else {
    e.target.nextElementSibling.style.height = 0;
  }

}

accordionButton.forEach( (each) => each.addEventListener('click', togglePanel));

const pageTransition = document.querySelector('.PageTransition');
const allLinks = document.querySelectorAll('.MegaMenu__Item .Linklist__Item a');

inner.forEach( function(each) {
    let innerHeight = each.clientHeight;
    each.setAttribute('data-height',innerHeight);
    each.style.height = 0;
});


// window.addEventListener('load', hideAccordians);


// About Page Scroll Down
//

filterUpdate = () => {
  // get the window url
  let windowUrl = window.location.href;
  windowUrl = windowUrl.substr(windowUrl.lastIndexOf('/'),windowUrl.length);
  windowUrl = windowUrl.substring(1);

  const getTheBody = document.querySelector('#shopify-section-collection-template');

  if (getTheBody) {
    getTheBody.classList.add(windowUrl);
    let cat = `category_${windowUrl}`;
    let theFilter = document.querySelector(`button[data-tag='${cat}']`);
    if (theFilter !== null) {
        theFilter.click();
    }
  }
}

scrollToAnchor = () => {
  const windowUrl = window.location;
  if (windowUrl.hash === true) {
      pageTransition.setAttribute('style', 'display: none;');
  }
  if (window.location.href.includes('our-story')) {
    console.log("yes");
    scroll(0,0);
    setTimeout( function() { scroll(0,0); }, 1);

    let clickedHash = window.location.href;
    clickedHash = clickedHash.substr(clickedHash.lastIndexOf('#'), clickedHash.length);
    let theAnchor = document.querySelector(`strong${clickedHash}`);

    setTimeout( function() {
        window.scrollTo({
         top: theAnchor.offsetTop - 170,
         behavior: "smooth"
       });

     }, 2);
  }
}

updateButton = () => {
  setTimeout(function(){
    const button = document.querySelector('.shopify-payment-button__button');
    if (button) {
      button.innerHTML = "Add to Bag";
      button.classList.add('shown');
    }

  },1500);

}

// Set the filter , update the product button, and scroll to the right section of the page on load
setPages = () =>{
  scrollToAnchor();
  filterUpdate();
  updateButton();
  addLoginParentClass();
  privacyMobile();
}


/// Scroll when we are on the page
scrollToAnchorOnPage = (e) => {
  if (e.target.href.includes('/our-story')) {
    e.preventDefault();
  }
  const windowUrl = window.location;
  let clickedHash = e.target.href;
  clickedHash = clickedHash.substr(clickedHash.lastIndexOf('#'), clickedHash.length);
  let theAnchor = document.querySelector(`strong${clickedHash}`);
  window.history.pushState(clickedHash, clickedHash,  e.target.href);
  window.scrollTo({
    top: theAnchor.offsetTop - 170,
    behavior: "smooth"
  });
  pageTransition.setAttribute('style', 'display: none; opacity: 0;');
}

// only give all links if there is a story tag
if (window.location.href.includes('our-story')) {
  allLinks.forEach( (each) => each.addEventListener('click', scrollToAnchorOnPage));
}
document.addEventListener('DOMContentLoaded', setPages);


// CUSTOM LOGIN POPUP
const accountNavButton = document.querySelector('#login__nav');
const accountPopUp = document.querySelector('#login__home');
const closeLogin = document.querySelector('.Login__Close');
const registerOnPop = document.querySelector('#register_onpop');
const registerForm = document.querySelector('#create_customer');
const backFromRegister = document.querySelector('#backFromReg');
const customer_login = document.querySelector('#customer_login');
const loginWrapper = document.querySelector('#shopify-section-login-popup');

function addLoginParentClass() {
  loginWrapper.classList.add('login__open_start');
}
openAccount = (e) => {
  e.preventDefault();
  accountPopUp.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('no-scroll');
}

closeAccount = (e) => {
  accountPopUp.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('no-scroll');
}

fadeInReg = (e) => {
  e.preventDefault();
  loginWrapper.classList.remove('login__open_start');
  registerForm.setAttribute('style','display: block; visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);');
  customer_login.setAttribute('style','display: none; visibility: hidden; opacity: 0; transform: matrix(1, 0, 0, 1, 0, 0);');
}


fadeOutReg = (e) => {
  e.preventDefault();
  loginWrapper.classList.add('login__open_start');
  customer_login.setAttribute('style','display: block; visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);');
  registerForm.setAttribute('style','display: none; visibility: hidden; opacity: 0; transform: matrix(1, 0, 0, 1, 0, 0);');
}


accountNavButton.addEventListener('click', openAccount);
closeLogin.addEventListener('click', closeAccount);
registerOnPop.addEventListener('click', fadeInReg);
backFromRegister.addEventListener('click', fadeOutReg);


// Dynamically Set the top of the Search Modal

//// Get bottom position of menu
// Check to see if the page has an annoucment bar
const html = document.querySelector('html');
const header = document.querySelector('.Header__Wrapper');
const announcement = document.querySelector('#shopify-section-announcement');
const headerBottom = 105 + 42;
const announcementBottom = announcement.offsetHeight;
const searchModal = document.querySelector('.Search');
const topPos = headerBottom+announcementBottom;
const isAnnouceThere = html.attributes.style.value.includes('announcement-bar');

setPopUps = () => {
  if (isAnnouceThere) {
    accountPopUp.setAttribute('style','top:'+headerBottom+'px;');
    searchModal.setAttribute('style','top:'+headerBottom+'px;');
  } else {
    accountPopUp.setAttribute('style','top:'+headerBottom+'px;');
    searchModal.setAttribute('style','top:'+headerBottom+'px;');
  }
}


updateAnnounce = () => {

}

updateAnnounceIpad = () => {
  if (window.innerWidth < 1240) {
    if (window.scrollY > 60) {
      accountPopUp.setAttribute('style','top:'+58+'px;');
      searchModal.setAttribute('style','top:'+58+'px;');
    } else {
      accountPopUp.setAttribute('style','top:'+100+'px;');
      searchModal.setAttribute('style','top:'+100+'px;');
    }
  }
  else if (window.innerWidth < 645) {
    if (window.scrollY > 60) {
      accountPopUp.setAttribute('style','top:'+49+'px;');
      searchModal.setAttribute('style','top:'+49+'px;');
    } else {
      accountPopUp.setAttribute('style','top:'+90+'px;');
      searchModal.setAttribute('style','top:'+90+'px;');
    }
  } else {
    accountPopUp.setAttribute('style','top:'+headerBottom+'px;');
    searchModal.setAttribute('style','top:'+headerBottom+'px;');
  }

}


function mobileAdjust() {
  updateAnnounceIpad();
  privacyMobile();
}
window.addEventListener('resize', mobileAdjust);
window.addEventListener('scroll', updateAnnounce);
setPopUps();



// Make the Register Fade In

// var _this17 = this;
//
// this.searchElement.setAttribute('aria-hidden', 'false');
//
// document.documentElement.classList.add('no-scroll');
// __WEBPACK_IMPORTED_MODULE_0__helper_Accessibility__["default"].trapFocus(this.searchElement, 'search', this.searchElement.querySelector('[name="q"]'));
//
// var onFocusListener = function onFocusListener() {
//   _this17.searchInputElement.focus();
//   _this17.searchElement.removeEventListener('transitionend', onFocusListener);
// };
//
// this.searchElement.addEventListener('transitionend', onFocusListener);
//
// event.preventDefault();

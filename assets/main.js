const body = document.body;
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('nav');
const closeIcon = document.querySelector('.close');
const featureTabs = document.querySelectorAll('.feature-tabs ul li');
let hrs = document.querySelectorAll('.feature-tabs ul hr');
const tabContents = document.querySelector('.feature-tab-contents');
const arrows = document.querySelectorAll('.questions ul li div:first-of-type');
const submit = document.querySelector('.submit');


const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
let active = 'active-tab';




menuIcon.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);
featureTabs.forEach (function (tab) {
  tab.addEventListener('click', activateTab);
});
submit.addEventListener('click', validateForm);




function toggleMenu () {
  menu.classList.toggle('show-menu');
  body.classList.toggle('no-scroll');
}

function activateTab (e) {
  
  deactivateTabs();
  shiftTabs(e);
  activateCurrentTab(e);
  
}


function activateCurrentTab (e) {
  let currentTab = e.currentTarget.nextElementSibling;
  e.currentTarget.classList.add('black');
  currentTab.classList.add(active);
}


function shiftTabs (e) {
  let transition;
  let height = body.getBoundingClientRect().width;
  if (height >= 768) {
    transition = 'translateX';
  }
  else {
    transition = 'translateY'
  }
  if (e.currentTarget.classList.contains('one')) {
    tabContents.style.transform = `${transition}(0%)`;
  }
  else if (e.currentTarget.classList.contains('two')) {
    tabContents.style.transform = `${transition}(-33.33%)`;
  }
  
  else if (e.currentTarget.classList.contains('three')) {
    tabContents.style.transform = `${transition}(-66.66%)`;
  }
}


function deactivateTabs () {
  
  featureTabs.forEach (function (tab) {
    let tabClass = tab.classList;
    if (tabClass.contains('black')){
      tabClass.remove('black');
    }
  });
  
  hrs.forEach (function (hr) {
    let hrClass = hr.classList;
    if (hrClass.contains(active)) {
      hrClass.remove(active);
    }
  });
}


let up = document.querySelector('.arrow-up')
let down = document.querySelector('.arrow-down')

arrows.forEach (function (arrow) {
  
  arrow.addEventListener('click', function (e) {
    
    let downArrow = arrow.firstElementChild.firstElementChild;
    let upArrow = arrow.firstElementChild.lastElementChild;
    let answer = arrow.nextElementSibling;
 
    answer.classList.toggle('show-answer')
    downArrow.classList.toggle('hide-down')
    upArrow.classList.toggle('show-up')
   
  })
});


 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
 
  if (currentScroll <= 700) {
    body.classList.remove(scrollUp);
    return;
  }
 
  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
    
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
    
  }
  lastScroll = currentScroll;
  
});


function validateForm (e) {
  let form = document.querySelector('form');
  if (!form.checkValidity()) {
    e.preventDefault();
    form.classList.add('invalid');
  }
}

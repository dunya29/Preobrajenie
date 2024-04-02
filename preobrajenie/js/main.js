
const screenWidth = window.innerWidth;
//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
    document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("noscroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
    document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  console.log(paddingValue)
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("noscroll");
}
// Menu burger action
const menuBurgerOpen = document.querySelector('.header-burger');
if (menuBurgerOpen) {
  const menuMobile = document.querySelector('.menu');
  const menuBurgerClose = document.querySelector('.menu__close');
  menuBurgerOpen.addEventListener('click', () => {
    disableScroll()
    menuMobile.classList.add('menu--active');
  });
  menuBurgerClose.addEventListener('click', () => {
    menuMobile.classList.remove('menu--active');
    setTimeout(() => {
      enableScroll()
    }, 500);
  });
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
  let maskoptions = {
    "mask": "+7(999)999-99-99",  
    "showMaskOnHover": false, 
    "showMaskOnFocus": false,
  }
    inp.forEach(item => {
      Inputmask(maskoptions).mask(item);
    })
}
// input hover
const inputs = document.querySelectorAll('.input');
if (inputs.length != 0) {
  inputs.forEach(input => {
    const placeholder = input.firstElementChild;
    const inputTag = input.lastElementChild;
    inputTag.onfocus = function () {
      placeholder.classList.add('focused');
    };
    inputTag.onblur = function () {
      if (inputTag.value == '') {
        placeholder.classList.remove('focused');
      }
    };
  });
}
// Select
const select = document.querySelector('.default');
const defaultSelect = () => {
  const choices = new Choices(select, {
    searchEnabled: false,
    shouldSort: false
  });
};
if (select) {
  defaultSelect();
}
// motion swiper
const tabsPanel = document.querySelectorAll(".motion .tabs__panel")
if (tabsPanel) {
  tabsPanel.forEach(item => {
    const itemSwiper = new Swiper(item.querySelector(".swiper"), {
      slidesPerView: '3',
      navigation: {
        nextEl: item.querySelector(".motion__swiper-button-next"),
        prevEl: item.querySelector(".motion__swiper-button-prev")
      },
      spaceBetween: 8,
      simulateTouch: true,
      slidesPerView: '2',
      watchSlidesProgress: true,
      breakpoints: {
        768: {
          slidesPerView: '3',
          spaceBetween: 16
        },
        1200: {
          spaceBetween: 32,
          slidesPerView: '3'
        }
      }
    });
  })
}
// Yandex map
function init1() {
  let mapCenter = [56.351679, 43.870314];
  let mapMain = new ymaps.Map('map', {
    center: mapCenter,
    zoom: 16,
    controls: []
  });
  let mapPop = new ymaps.Map('map-popup', {
    center: mapCenter,
    zoom: 16,
    controls: []
  });
  var searchControl = new ymaps.control.SearchControl({
    options: {
      provider: 'yandex#search',
      noPopup: true,
      noSuggestPanel: true,
      boundedBy: [[56.351678, 43.870313], [56.351680, 43.870315]]
    }
  });
  var searchControl1 = new ymaps.control.SearchControl({
    options: {
      provider: 'yandex#search',
      noPopup: true,
      noSuggestPanel: true,
      boundedBy: [[56.351678, 43.870313], [56.351680, 43.870315]]
    }
  });
  mapPop.controls.add(searchControl1);
  mapMain.controls.add(searchControl);
  searchControl.search('Магазины');
  searchControl1.search('Магазины');
  const mapTab = document.querySelector('.map__nav');
  const mapTabs = mapTab.querySelectorAll('.tabs__nav-btn');
  const mapTabPopup = document.querySelector('.map__nav-popup');
  const mapTabsPopup = mapTabPopup.querySelectorAll('.tabs__nav-btn');
  mapTabs.forEach((el,idx) => {
    el.addEventListener('click', () => {
      mapTabs.forEach(elem => {
        elem.classList.remove('active');
      });
      mapTabsPopup.forEach(elem => {
        elem.classList.remove('active');
      });
      searchControl.search(el.getAttribute("data-map"));
      searchControl1.search(el.getAttribute("data-map"));
      mapTabs[idx].classList.add('active');
      mapTabsPopup[idx].classList.add('active');
    });
  });
  mapTabsPopup.forEach((el,idx) => {
    el.addEventListener('click', () => {
      mapTabsPopup.forEach(elem => {
        elem.classList.remove('active');
      });
      mapTabs.forEach(elem => {
        elem.classList.remove('active');
      });
      searchControl.search(el.getAttribute("data-map"));
      searchControl1.search(el.getAttribute("data-map"));
      mapTabs[idx].classList.add('active');
      mapTabsPopup[idx].classList.add('active');
    });
  });

  mapPop.controls.remove('searchControl'); // удаляем поиск
  mapPop.controls.remove('trafficControl'); // удаляем контроль трафика
  mapPop.controls.remove('typeSelector'); // удаляем тип
  mapMain.controls.remove('searchControl'); // удаляем поиск
  mapMain.controls.remove('trafficControl'); // удаляем контроль трафика
  mapMain.controls.remove('typeSelector'); // удаляем тип
  mapPop.geoObjects.add(new ymaps.Placemark([56.351679, 43.870314], {
    iconCaption: 'ЖК Преображение'
  }, {
    preset: 'islands#redHomeIcon',
    iconColor: 'green'
  }));
  mapMain.geoObjects.add(new ymaps.Placemark([56.351679, 43.870314], {
    iconCaption: 'ЖК Преображение'
  }, {
    preset: 'islands#redHomeIcon',
    iconColor: 'green'
  }));
  const mapExtand = document.querySelector('.map__open-extend');
  const mapReduce = document.querySelector('.map__open-reduce');
  const mapPopup = document.querySelector('.popup-map');
  mapExtand.addEventListener('click', () => {
    mapPopup.classList.add('active');
    disableScroll()
  });
  mapReduce.addEventListener('click', () => {
    mapPopup.classList.remove('active');
    enableScroll()
  });
}
if (document.querySelector('#map')) {
  ymaps.ready(init1);
}
// Yandex map
function init2() {
  let mapCenter = [56.351679, 43.870314];
  let map = new ymaps.Map('map1', {
    center: mapCenter,
    zoom: 13,
    controls: ['searchControl']
  });
  if (screenWidth <= 768) {
    map.setZoom(11);
  } else if (screenWidth <= 1200) {
    map.setZoom(12);
  }
  var searchControl = new ymaps.control.SearchControl({
    options: {
      provider: 'yandex#map'
    }
  });
  searchControl.search('Продукты');

  // map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  // map.controls.remove('rulerControl'); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects
  // .add(placemark)
  .add(new ymaps.Placemark([56.351679, 43.870314], {
    iconCaption: 'ЖК Преображение'
  }, {
    preset: 'islands#redHomeIcon',
    iconColor: 'green'
  })).add(new ymaps.Placemark([56.351679, 43.870314], {
    iconCaption: 'Главный офис'
  }, {
    preset: 'islands#redHomeIcon',
    iconColor: 'green'
  }));
}
if (document.querySelector('#map1')) {
  ymaps.ready(init2);
}
const mapTabs = document.querySelectorAll('.map__point');
if (mapTabs.length != 0) {
  mapTabs.forEach(mapTab => {
    mapTab.addEventListener('click', () => {
      mapTabs.forEach(el => {
        el.classList.remove('active');
      });
      mapTab.classList.add('active');
    });
  });
}
class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.graph-modal');
    this.speed = 300;
    this.animation = 'fade';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }
  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-graph-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.graphPath;
          let animation = clickedElement.dataset.graphAnimation;
          let speed = clickedElement.dataset.graphSpeed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }

        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('graph-modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }

  }

  open(selector) {
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }

    this.modalContainer = this._nextContainer;

    if (selector) {
      this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
    }
    
    this.modalContainer.scrollTo(0, 0)

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');

    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    this.disableScroll();

    this.modalContainer.classList.add('graph-modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();

      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement)
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}
class GraphTabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => {}
    }
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
    if (this.tabs) {
      this.tabList = this.tabs.querySelector('.tabs__nav');
      this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav-btn');
      this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    } else {
      console.error('Селектор data-tabs не существует!');
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error('Количество элементов с одинаковым data-tabs больше одного!');
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('Количество кнопок и элементов табов не совпадает!');
      return;
    }
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((el, i) => {
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('id', `${this.selector}${i + 1}`);
      el.classList.remove('tabs__nav-btn--active');
    });

    this.tabsPanels.forEach((el, i) => {
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
      el.classList.remove('tabs__panel--active');
    });

    this.tabsBtns[0].classList.add('tabs__nav-btn--active');
    this.tabsBtns[0].removeAttribute('tabindex');
    this.tabsBtns[0].setAttribute('aria-selected', 'true');
    this.tabsPanels[0].classList.add('tabs__panel--active');
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        let currentTab = this.tabList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      el.addEventListener('keydown', (e) => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);

        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = 'down';
        } else {
          dir = null;
        }

        if (dir !== null) {
          if (dir === 'down') {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
    this.tabsPanels[index].classList.add('tabs__panel--active');

    this.tabsBtns[oldIndex].classList.remove('tabs__nav-btn--active');
    this.tabsBtns[index].classList.add('tabs__nav-btn--active');

    this.options.isChanged(this);
  }
}
const modal = new GraphModal();
const motion = document.querySelector('.motion');
if (motion) {
  const tabs = new GraphTabs('motion');
}
//news swiper
let initNews = false
let newsSwiper
const news = document.querySelector(".main-news")
if (news) {
  function initNewsSwiper() {
    if (window.innerWidth <= 1199.98 && window.innerWidth >= 575.98 && !initNews) {
      initNews = true
      newsSwiper = new Swiper(news.querySelector(".swiper"), {
        slidesPerView: 2,
        spaceBetween: 16,
        observe: true,
        observeParents: true,
        speed: 800
        })
    } else if ((window.innerWidth > 1199.98 || window.innerWidth < 575.98) && initNews) {
      initNews = false
      newsSwiper.destroy()
    }
  }
  initNewsSwiper()
  window.addEventListener("resize", initNewsSwiper)
}















const house1 = document.querySelector('.house__img-house-1');
const house2 = document.querySelector('.house__img-house-2');
if (house1) {
  const popup1 = document.querySelector('.house-hover__first');
  const popup2 = document.querySelector('.house-hover__sec');
  if (screenWidth >= 1200) {
    house1.addEventListener('mouseover', () => {
      popup1.classList.add('active');
      house1.classList.add('active');
    });
    popup1.addEventListener('mouseover', () => {
      popup1.classList.add('active');
      house1.classList.add('active');
    });
    house1.addEventListener('mouseleave', () => {
      popup1.classList.remove('active');
      house1.classList.remove('active');
    });
    popup1.addEventListener('mouseleave', () => {
      popup1.classList.remove('active');
      house1.classList.remove('active');
    });
    house2.addEventListener('mouseover', () => {
      popup2.classList.add('active');
      house2.classList.add('active');
    });
    popup2.addEventListener('mouseover', () => {
      popup2.classList.add('active');
      house2.classList.add('active');
    });
    house2.addEventListener('mouseleave', () => {
      popup2.classList.remove('active');
      house2.classList.remove('active');
    });
    popup2.addEventListener('mouseleave', () => {
      popup2.classList.remove('active');
      house2.classList.remove('active');
    });
  } else {
    const choose1 = document.querySelector('.house__choose-1');
    const choose2 = document.querySelector('.house__choose-2');
    popup1.classList.add('active');
    house1.classList.add('active');
    choose1.addEventListener('click', () => {
      choose2.classList.remove('active');
      choose1.classList.add('active');
      popup1.classList.add('active');
      popup2.classList.remove('active');
      house1.classList.add('active');
      house2.classList.remove('active');
    });
    choose2.addEventListener('click', () => {
      choose1.classList.remove('active');
      choose2.classList.add('active');
      popup1.classList.remove('active');
      popup2.classList.add('active');
      house2.classList.add('active');
      house1.classList.remove('active');
    });
  }
}
var floorSlider = document.querySelector('#slider-floor');
if (floorSlider) {
  noUiSlider.create(floorSlider, {
    start: [5, 17],
    connect: true,
    step: 1,
    range: {
      'min': 5,
      'max': 17
    }
  });
  const filterInputs = document.querySelectorAll('.floor-input');
  floorSlider.noUiSlider.on('update', function (values, handle) {
    filterInputs[handle].value = Math.round(values[handle]);
  });
  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    floorSlider.noUiSlider.set(arr);
  };
  filterInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
var floorSliderMobile = document.querySelector('#slider-floor-1');
if (floorSliderMobile) {
  noUiSlider.create(floorSliderMobile, {
    start: [5, 17],
    connect: true,
    step: 1,
    range: {
      'min': 5,
      'max': 17
    }
  });
  const filterInputs = document.querySelectorAll('.floor-input-1');
  floorSliderMobile.noUiSlider.on('update', function (values, handle) {
    filterInputs[handle].value = Math.round(values[handle]);
  });
  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    floorSliderMobile.noUiSlider.set(arr);
  };
  filterInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
var squareSlider = document.querySelector('#slider-square');
if (squareSlider) {
  noUiSlider.create(squareSlider, {
    start: [39.89, 82.45],
    connect: true,
    range: {
      'min': 39.89,
      'max': 82.45
    }
  });
  const filterInputs = document.querySelectorAll('.square-input');
  squareSlider.noUiSlider.on('update', function (values, handle) {
    filterInputs[handle].value = values[handle];
  });
  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    squareSlider.noUiSlider.set(arr);
  };
  filterInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
var squareSliderMobile = document.querySelector('#slider-square-1');
if (squareSliderMobile) {
  noUiSlider.create(squareSliderMobile, {
    start: [39.89, 82.45],
    connect: true,
    range: {
      'min': 39.89,
      'max': 82.45
    }
  });
  const filterInputs = document.querySelectorAll('.square-input-1');
  squareSliderMobile.noUiSlider.on('update', function (values, handle) {
    filterInputs[handle].value = values[handle];
  });
  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    squareSliderMobile.noUiSlider.set(arr);
  };
  filterInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
const filterRooms = document.querySelectorAll('.filter__room');
if (filterRooms.length != 0) {
  filterRooms.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('active');
    });
  });
}
const flatTabBtns = document.querySelectorAll('.flat-tabs__btn');
if (flatTabBtns.length != 0) {
  const flatTabs = document.querySelectorAll('.flat__item');
  flatTabBtns.forEach(flatTabBtn => {
    flatTabBtn.addEventListener('click', () => {
      flatTabBtns.forEach(el => {
        el.classList.remove('active');
      });
      flatTabs.forEach(el => {
        el.classList.remove('active');
      });
      flatTabBtn.classList.add('active');
      if (flatTabBtn.dataset.flat == 'list') {
        flatTabs[0].classList.add('active');
        document.querySelector('.flat-hat__sort').style.display = 'flex';
      } else if (flatTabBtn.dataset.flat == 'scheme') {
        flatTabs[1].classList.add('active');
        document.querySelector('.flat-hat__sort').style.display = 'none';
      }
    });
  });
}
//КОД ПРИБЛИЖЕНИЯ И ОТДАЛЕНИЯ
var flatSchemes = document.querySelectorAll('.flat-scheme__img');
if (flatSchemes.length != 0) {
  const mobileOverlay = document.querySelector('.flat-scheme__overlay');
  if (screenWidth < 768) {
    mobileOverlay.classList.remove('hidden');
    mobileOverlay.addEventListener('touchstart', () => {
      mobileOverlay.classList.add('hidden');
    });
  }
  const zoomInBtn = document.querySelector('.flat-scheme__zoom-in');
  const zoomOutBtn = document.querySelector('.flat-scheme__zoom-out');
  let block = document.querySelector('.flat-scheme__img');
  var x = 0;
  if (block.classList.contains('flat-scheme__img-citybox')) {
    if (screenWidth >= 1200) {
      x = 0.55;
    } else if (screenWidth >= 768) {
      x = 0.8;
    } else if (screenWidth >= 640) {
      x = 1;
    } else if (screenWidth >= 420) {
      x = 1.2;
    } else if (screenWidth > 0) {
      x = 1.3;
    }
  } else {
    if (screenWidth >= 768) {
      x = 0.8;
    } else if (screenWidth >= 640) {
      x = 1;
    } else if (screenWidth >= 420) {
      x = 1.2;
    }
  }

  //КОД ПЕРЕМЕЩЕНИЯ
  var blockmove = document.querySelector('.flat-scheme');
  var left = 0,
    tp = 0,
    xx,
    yy;
  blockmove.ontouchstart = function (e) {
    e.preventDefault();
    xx = e.pageX;
    yy = e.pageY;
    function moveAt(e) {
      block.style.left = left + e.pageX - xx + 'px';
      block.style.top = tp + e.pageY - yy + 'px';
    }
    blockmove.ontouchmove = function (e) {
      moveAt(e);
    };
    blockmove.touchend = blockmove.onmouseup = function (e) {
      left = parseFloat(block.style.left);
      tp = parseFloat(block.style.top);
      blockmove.onmouseleave = null;
      blockmove.onmousemove = null;
      blockmove.onmouseup = null;
    };
  };
  blockmove.onmousedown = function (e) {
    e.preventDefault();
    xx = e.pageX;
    yy = e.pageY;
    function moveAt(e) {
      if (left + e.pageX - xx < 1500 && left + e.pageX - xx > -1500) {
        block.style.left = left + e.pageX - xx + 'px';
      }
      if (tp + e.pageY - yy < 1500 && tp + e.pageY - yy > -1500) {
        block.style.top = tp + e.pageY - yy + 'px';
      }
    }
    blockmove.onmousemove = function (e) {
      moveAt(e);
    };
    blockmove.onmouseleave = blockmove.onmouseup = function (e) {
      left = parseFloat(block.style.left);
      tp = parseFloat(block.style.top);
      blockmove.onmouseleave = null;
      blockmove.onmousemove = null;
      blockmove.onmouseup = null;
    };
  };
  block.onwheel = function (event) {
    if (event.deltaY < 0 && x < 5) {
      x += 0.1;
      this.style.scale = x;
    }
    if (event.deltaY > 0 && x > 0.6) {
      x -= 0.1;
      this.style.scale = x;
    }
    return false;
  };
  zoomInBtn.addEventListener('click', () => {
    if (x < 5) {
      x += 0.4;
      block.style.scale = x;
    }
  });
  zoomOutBtn.addEventListener('click', () => {
    if (x > 0.6) {
      x -= 0.4;
      block.style.scale = x;
    }
  });
  const flatBtns = document.querySelectorAll('.zoom-item');
  flatBtns.forEach(el => {
    el.addEventListener('click', () => {
      let flatId = el.getAttribute('data-tab');
      let block = document.querySelector(flatId);
      var x = 0;
      if (screenWidth >= 768) {
        x = 0.8;
      } else if (screenWidth >= 640) {
        x = 1;
      } else if (screenWidth >= 420) {
        x = 1.2;
      }

      //КОД ПЕРЕМЕЩЕНИЯ
      var blockmove = document.querySelector('.flat-scheme');
      var left = 0,
        tp = 0,
        xx,
        yy;
      blockmove.ontouchstart = function (e) {
        e.preventDefault();
        xx = e.pageX;
        yy = e.pageY;
        function moveAt(e) {
          block.style.left = left + e.pageX - xx + 'px';
          block.style.top = tp + e.pageY - yy + 'px';
        }
        blockmove.ontouchmove = function (e) {
          moveAt(e);
        };
        blockmove.touchend = blockmove.onmouseup = function (e) {
          left = parseFloat(block.style.left);
          tp = parseFloat(block.style.top);
          blockmove.onmouseleave = null;
          blockmove.onmousemove = null;
          blockmove.onmouseup = null;
        };
      };
      blockmove.onmousedown = function (e) {
        e.preventDefault();
        xx = e.pageX;
        yy = e.pageY;
        function moveAt(e) {
          block.style.left = left + e.pageX - xx + 'px';
          block.style.top = tp + e.pageY - yy + 'px';
        }
        blockmove.onmousemove = function (e) {
          moveAt(e);
        };
        blockmove.onmouseleave = blockmove.onmouseup = function (e) {
          left = parseFloat(block.style.left);
          tp = parseFloat(block.style.top);
          blockmove.onmouseleave = null;
          blockmove.onmousemove = null;
          blockmove.onmouseup = null;
        };
      };
      block.onwheel = function (event) {
        if (event.deltaY < 0 && x < 5) {
          x += 0.1;
          this.style.scale = x;
        }
        if (event.deltaY > 0 && x > 0.6) {
          x -= 0.1;
          this.style.scale = x;
        }
        return false;
      };
      zoomInBtn.addEventListener('click', () => {
        if (x < 5) {
          x += 0.4;
          block.style.scale = x;
        }
      });
      zoomOutBtn.addEventListener('click', () => {
        if (x > 0.6) {
          x -= 0.4;
          block.style.scale = x;
        }
      });
    });
  });
}
// Tabs main
const houseBtns = document.querySelectorAll('.tab-btn');
const houseCards = document.querySelectorAll('.tab-item');
if (houseBtns) {
  houseBtns.forEach(houseBtn => {
    if (!houseBtn.classList.contains('unavailable')) {
      houseBtn.addEventListener('click', () => {
        let tabId = houseBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);
        if (!houseBtn.classList.contains('active')) {
          houseBtns.forEach(houseBtn => {
            houseBtn.classList.remove('active');
          });
          houseCards.forEach(houseCard => {
            houseCard.classList.remove('active');
          });
          houseBtn.classList.add('active');
          currentTab.classList.add('active');
        }
      });
    }
  });
}
const cityboxes = document.querySelectorAll('.flat-scheme__img-citybox');
if (cityboxes.length != 0) {
  cityboxes.forEach(el => {
    const paths = el.querySelectorAll('path');
    paths.forEach(path => {
      path.dataset.graphPath = 'popup-citybox';
    });
  });
}
const commerces = document.querySelectorAll('.flat-scheme__img-commerce');
if (commerces.length != 0) {
  commerces.forEach(el => {
    const paths = el.querySelectorAll('path');
    paths.forEach(path => {
      path.dataset.graphPath = 'popup-commerce';
    });
  });
}
// Accordion product aside
const accordionProd = document.querySelector('.p-info__line-acc');
if (accordionProd) {
  accordionProd.addEventListener('click', () => {
    accordionProd.classList.toggle('active');
    const accordionClauseItemBody = accordionProd.nextElementSibling;
    if (accordionProd.classList.contains('active')) {
      accordionClauseItemBody.style.maxHeight = accordionClauseItemBody.scrollHeight + 'px';
    } else {
      accordionClauseItemBody.style.maxHeight = 0;
    }
  });
}
// Product fancybox
const fancyBtn = document.querySelector('#p-fancy');
if (fancyBtn) {
  const fancyBody = document.querySelector('.p-fancy');
  const fancyClose = fancyBody.querySelector('.graph-modal__close');
  fancyBtn.addEventListener('click', () => {
    fancyBody.classList.add('active');
    document.body.classList.add('noscroll');
  });
  fancyClose.addEventListener('click', () => {
    fancyBody.classList.remove('active');
    document.body.classList.remove('noscroll');
  });
}
const prodTab = document.querySelector('.prod-tab');
if (prodTab) {
  const prodTabBtns = prodTab.querySelectorAll('.tabs__nav-btn');
  const prodTabItems = prodTab.querySelectorAll('.tabs__panel');
  const fancyBtns = document.querySelectorAll('.p-fancy__prev');
  const fancyItems = document.querySelectorAll('.p-fancy__pic');
  for (let i = 0; i < prodTabBtns.length; i++) {
    prodTabBtns[i].addEventListener('click', () => {
      fancyBtns.forEach(el => {
        el.classList.remove('active');
      });
      fancyItems.forEach(el => {
        el.classList.remove('active');
      });
      fancyBtns[i].classList.add('active');
      fancyItems[i].classList.add('active');
    });
  }
  for (let i = 0; i < fancyBtns.length; i++) {
    fancyBtns[i].addEventListener('click', () => {
      prodTabBtns.forEach(el => {
        el.classList.remove('tabs__nav-btn--active');
        el.setAttribute("tabindex", "-1");
        el.setAttribute("aria-selected", "");
      });
      prodTabItems.forEach(el => {
        el.classList.remove('tabs__panel--active');
      });
      prodTabBtns[i].classList.add('tabs__nav-btn--active');
      prodTabItems[i].classList.add('tabs__panel--active');
      prodTabBtns[i].setAttribute("tabindex", "");
      prodTabBtns[i].setAttribute("aria-selected", "true");
    });
  }
}
// mobile cityboxes // commerce
const cityboxTabs = document.querySelectorAll('.citybox__choose');
if (cityboxTabs.length != 0) {
  const cityboxItems = document.querySelectorAll('.citybox-list');
  cityboxTabs[0].addEventListener('click', () => {
    cityboxItems[0].classList.add('active');
    cityboxItems[1].classList.remove('active');
  });
  cityboxTabs[1].addEventListener('click', () => {
    cityboxItems[1].classList.add('active');
    cityboxItems[0].classList.remove('active');
  });
}
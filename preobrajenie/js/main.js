
const screenWidth = window.innerWidth;
const menu = document.querySelector(".menu")
const modal= document.querySelectorAll(".modal")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
let animSpd = 400
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
//open modal
function openModal(modal) {
  if (!menu.classList.contains("menu--active")) {
      disableScroll()
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
      if (!menu.classList.contains("menu--active")) {
          enableScroll()
      }
  }, animSpd);
}
//formSuccess
function formSuccess(form) {
  form.querySelectorAll(".item-form").forEach(item =>  {
      item.classList.remove("error")
      if (item.querySelector(".item-form__error")) {
          item.querySelector(".item-form__error").textContent = ""
      }
      if (item.querySelector(".input__placeholder")) {
        item.querySelector(".input__placeholder").classList.remove("focused")
    }
  })
  form.querySelectorAll("input").forEach(inp => {
      if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
          inp.value = ""
      }
  })
  if (form.querySelector("textarea")) {
      form.querySelector("textarea").value = ""
  }
  let modal = document.querySelector(".modal.open")
  if (modal) {
      modal.classList.remove("open")
      successModal.classList.add("open")
  } else {
      openModal(successModal)
  }
}

// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
      if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
          closeModal(mod)
      }
  })
})
// modal button on click
modalShowBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-modal")
      let title = btn.getAttribute("data-modal-title")
      if (href == "feedback-modal") {
          document.getElementById(href).querySelector(".modal__top h3").textContent = !!title ? title : "Заказать звонок"
      }
      openModal(document.getElementById(href))
  })
})
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
      slidesPerView: '2',
      spaceBetween: 8,
      simulateTouch: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: item.querySelector(".motion__swiper-button-next"),
        prevEl: item.querySelector(".motion__swiper-button-prev")
      },
      breakpoints: {
        1199.98: {
          spaceBetween: 32,
          slidesPerView: '3'
        },
        767.98: {
          slidesPerView: '3',
          spaceBetween: 16
        },
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
  let mapCenter = [56.346252, 43.861564];
  let map = new ymaps.Map('map2', {
    center: mapCenter,
    zoom: 13,
  });
  if (screenWidth <= 768) {
    map.setZoom(11);
  } else if (screenWidth <= 1200) {
    map.setZoom(12);
  }

  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); 

  map.geoObjects
 .add(new ymaps.Placemark([56.346252, 43.861564], {
    iconCaption: 'Главный офис'
  }, {
    preset: 'islands#greenPocketIcon',
    iconColor: 'green'
  }));
}
if (document.querySelector('#map2')) {
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
const motion = document.querySelector('.motion');
//swhitch tab
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

// scheme-popup position on mousemove
const schemePopup = document.querySelector(".scheme-popup")
// scheme-popup position on mousemove
function setSchemePopup() {
  document.querySelectorAll(".scheme-cat__apartaments .item-apartaments a").forEach(item => {
    function move(xPos, yPos) {
      schemePopup.classList.add("open")
      let top = item.getBoundingClientRect().top
      let left = item.getBoundingClientRect().left
      if (window.innerWidth < left + schemePopup.clientWidth + item.clientWidth + 50) {
        schemePopup.style.left = xPos - schemePopup.clientWidth - 10 + "px"
      } else {
        schemePopup.style.left = xPos + 15 + "px"
      }
      if (window.innerHeight < top + schemePopup.clientHeight + 25) {
        schemePopup.style.top = yPos - schemePopup.clientHeight - 5 + "px"
      } else {
        schemePopup.style.top = yPos + 25 + "px"
      }
    }
    function setPopupData() {
      let nmb = item.getAttribute("data-nmb") ? item.getAttribute("data-nmb") : ""
      let name = item.getAttribute("data-name")
      let area = item.getAttribute("data-area")
      let floor = item.getAttribute("data-floor")
      let url = item.getAttribute("data-url")
      let price = item.getAttribute("data-price").replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
      let img = item.getAttribute("data-img")
      schemePopup.querySelector(".scheme-popup__content").innerHTML = `<div class="scheme-popup__header">
        <h5><span>${name}</span><span>№ ${nmb}</span></h5>
        <h6><span>${area} кв. м.</span><span>${floor} этаж</span></h6>
      </div>
      <a href=${url} class="scheme-popup__preview">
          <picture><img src=${img} alt=""></picture>
      </a>
      <div class="scheme-popup__footer">
          <div class="h5 scheme-popup__price">${price} руб</div>
          <a href=${url} class="btn stroke-btn">Подробнее</a>
      </div>
        `
    }
    function resetPopupData() {
      schemePopup.querySelector(".scheme-popup__content").innerHTML = ""
    }
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991.98) {
        setPopupData()
      }
    })
    item.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 991.98) {
        move(e.clientX, e.clientY)
        item.addEventListener("mouseleave", () => {
          schemePopup.classList.remove("open")
          resetPopupData()
        })
      }
    })
    item.addEventListener("click", e => {
      if (window.innerWidth <= 991.98) {
        e.preventDefault()
        setPopupData()
        openModal(schemePopup)
      }
    })
  })
}
if (schemePopup) {
  setSchemePopup()
}
//close mobile modal on resize
document.querySelectorAll(".mob-modal").forEach(mod => {
  window.addEventListener("resize", () => {
    if (mod.classList.contains("open") && window.innerWidth > 991.98) {
      closeModal(mod)
    }
  })
})
//init range slider
function initSliders() {
  let rangeSliders = filter.querySelectorAll(".filter-range")
  rangeSliders.forEach(item => {
    let rangeStart = item.querySelector(".filter-range__start")
    let rangeEnd = item.querySelector(".filter-range__end")
    let rangeSlider = item.querySelector(".filter-range__body")
    let start = +item.getAttribute("data-start")
    let end = +item.getAttribute("data-end")
    let min = +item.getAttribute("data-min")
    let max = +item.getAttribute("data-max")
    noUiSlider.create(rangeSlider, {
      start: [start, end],
      connect: true,
      range: {
        'min': min,
        'max': max
      }
    });
    rangeStart.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([rangeStart.value, null])
      setRangeSelected(item, rangeSlider, min, max)
    });
    rangeEnd.addEventListener("change", () => {
      rangeSlider.noUiSlider.set([null, rangeEnd.value])
      setRangeSelected(item, rangeSlider, min, max)
    });
    let rangeValues = [rangeStart, rangeEnd];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeValues[handle].value = item.classList.contains("integer") ? parseInt(values[handle]) : values[handle]
      setRangeSelected(item, rangeSlider, min, max)
    });
  })
}
//setRangeSelected 
function setRangeSelected(item, rangeSlider, min, max) {
  if (rangeSlider.noUiSlider.get(true)[0] != min || rangeSlider.noUiSlider.get(true)[1] != max) {
    rangeSlider.classList.add("rangeStartMinDiff")
  } else if (!document.querySelector(".filter-form__room input:checked")) {
    rangeSlider.classList.remove("rangeStartMinDiff")
  }
  if (item.classList.contains("filter-range--floor")) {
    document.querySelector(".filter-selected__items-floor").innerHTML = `<span>${parseInt(rangeSlider.noUiSlider.get(0)[0])}-${parseInt(rangeSlider.noUiSlider.get(0)[1])} этаж</span>`
  } else if (item.classList.contains("filter-range--square")) {
    document.querySelector(".filter-selected__items-square").innerHTML = `<span>${Math.floor(rangeSlider.noUiSlider.get(0)[0])} м2 - ${Math.ceil(rangeSlider.noUiSlider.get(0)[1])}м2</span>`
  }
  showResetBtn()
}
//showResetBtn
function showResetBtn() {
  console.log("fff")
  if (document.querySelector(".rangeStartMinDiff") || document.querySelector(".filter-form__room input:checked")) {
    $(".filter-form__reset").slideDown()
    $(".filter__mob").slideDown()
  } else {
    $(".filter-form__reset").slideUp()
    $(".filter__mob").slideUp()
  }
}
//filter-form
const filter = document.querySelector(".filter")
if (filter) {
  initSliders()
  document.querySelector(".filter__mob-btn").addEventListener("click", () => {
    if (window.innerWidth <= 991.98) {
      openModal(document.querySelector(".filter-form"))
    }
  }) 
  filter.querySelector(".filter-form").addEventListener("reset", e => {
    e.preventDefault();
    filter.querySelectorAll(".filter-form__rooms input").forEach(inp => {
      inp.checked = false
      inp.removeAttribute("checked")
    })
    filter.querySelectorAll(".filter-range").forEach(item => {
      item.querySelector(".filter-range__body").noUiSlider.set([+item.getAttribute("data-min"),+item.getAttribute("data-max")]) 
    }) 
    document.querySelector(".filter-selected__items-flats").innerHTML = "" 
  }) 
  document.querySelector(".filter-form .filter-form__btn--submit").addEventListener("click", () => closeModal(document.querySelector(".filter-form")))
  document.querySelector(".filter__header .filter-form__btn").addEventListener("click", () => filter.querySelector(".filter-form").reset())
  document.querySelectorAll(".filter-form__room").forEach(item => {
    item.querySelector("input").addEventListener("change", () => {
     document.querySelector(".filter-selected__items-flats").innerHTML = Array.from(document.querySelectorAll(".filter-form__room input:checked")).map(el => `<span>${el.getAttribute("data-value")} ккв</span>`).join("")
     showResetBtn()
    })
  })
}
//switch tab
function tabSwitch(nav, block) {
  nav.forEach((item, idx) => {
      item.addEventListener("click", () => {
          nav.forEach(el => {
              el.classList.remove("active")
          })
          block.forEach(el => {
              el.classList.remove("active")
          })
          item.classList.add("active")
          block[idx].classList.add("active")
          item.style.opacity = "0"
          block[idx].style.opacity = "0"
          setTimeout(() => {
              item.style.opacity = "1"
              block[idx].style.opacity = "1"
          }, 0);
      })
  });
}
const flatPage = document.querySelector(".catalog")
if (flatPage) {
  flatPage.addEventListener("click", e => {
    let thisTab = Array.from(flatPage.querySelectorAll("[data-nav]")).find(item => item.contains(e.target))
    if (thisTab) {
      let href = thisTab.getAttribute("data-nav")
      flatPage.querySelectorAll("[data-nav]").forEach(el => {
        el.classList.remove("active")
      })
      flatPage.querySelectorAll("[data-block]").forEach(el => {
          el.classList.remove("active")
      })
      thisTab.classList.add("active")
      flatPage.querySelector(`[data-block='${href}']`).classList.add("active")
      thisTab.style.opacity = "0"
      flatPage.querySelector(`[data-block='${href}']`).style.opacity = "0"
      setTimeout(() => {
          thisTab.style.opacity = "1"
          flatPage.querySelector(`[data-block='${href}']`).style.opacity = "1"
      }, 0);
    }
  })
}
//init plan swipers
function initPlanSwipers() {
  if(mainPlanSwiper) {
    mainPlanSwiper.destroy()
    thumbPlanSwiper.destroy()
  }
  thumbPlanSwiper = new Swiper(".plan-cat__thumbswiper", {
    slidesPerView: 3.15,
    spaceBetween: 8,
    observer: true,
    observeParents: true,
    direction: "horizontal",
    speed: 800,
    breakpoints: {
      1399.98: {
        slidesPerView: 5,
        spaceBetween: 20,
        direction: "vertical",
      },
      991.98: {
        slidesPerView: 5,
        spaceBetween: 8,
        direction: "vertical",
      },
      767.98: {
        slidesPerView: 5,
        spaceBetween: 8,
        direction: "horizontal",
      },
      480.98: {
        slidesPerView: 4.1,
        spaceBetween: 8,
        direction: "horizontal",
      }
    },
  })
  mainPlanSwiper = new Swiper(".plan-cat__mainswiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: thumbPlanSwiper,
    },
    navigation: {
      nextEl: document.querySelector(".plan-cat .swiper-btn--next"),
      prevEl: document.querySelector(".plan-cat .swiper-btn--prev")
    },
    speed: 400
  })
  if (document.querySelectorAll(".plan-cat__thumbswiper .swiper-slide").length > 5) {
    document.querySelectorAll(".plan-cat .swiper-btn").forEach(el => el.style.display = "flex")
  }
}
//plan swiper
let thumbPlanSwiper,
    mainPlanSwiper
if (document.querySelector(".catalog__plan")) {
  initPlanSwipers()
}
//custom fancybox
document.addEventListener("click", e => {
  document.querySelectorAll("[data-fancy]").forEach(item => {
    if (item.contains(e.target)) {
        let imgSrc = []
        let title = []
        let objectFit = item.getAttribute("data-fit") ? item.getAttribute("data-fit") : ""
        let val = item.getAttribute("data-fancy")
        let txt = item.getAttribute("data-txt")
        document.querySelectorAll("[data-fancy]").forEach(el => {
          if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
            imgSrc.push(el.getAttribute("data-src"))
            title.push(el.getAttribute("data-txt"))
          }
        })
        let initialSl = imgSrc.indexOf(item.getAttribute("data-src"))
    
        document.querySelector(".footer").insertAdjacentHTML('afterend', `
        <div class="modal fancy-modal">
          <div class="modal__overlay">
            <div class="modal__content">
                <button class="btn modal__close" aria-label="Закрыть всплывающее окно"></button>
                  <div class="swiper mainswiper">
                    <div class="swiper-wrapper">
                       ${imgSrc.map((item,idx) => `<div class="swiper-slide">
                             <div class="swiper-img ${objectFit}">
                                 <img src=${item} alt="">
                             </div>
                             ${txt ? title[idx].length > 0 ? `<p>${title[idx]}</p>` : "" : ""}
                         </div>`).join("")}
                    </div>
                  </div>
            </div>
          </div>
        </div>
       `);
        let fancyMainSwiper = new Swiper(".fancy-modal .swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          observer: true,
          observeParents: true,
          initialSlide: initialSl,
          speed: 800,
        })
        const fancyModal = document.querySelector(".fancy-modal")
        openModal(fancyModal)
        fancyModal.addEventListener("click", e => {
          if (!fancyModal.querySelector(".modal__content").contains(e.target) || fancyModal.querySelector(".modal__close").contains(e.target)) {
              closeModal(fancyModal)
              setTimeout(() => {
                fancyModal.remove()
              }, animSpd);
          }
        })
    }
  })
})
if (document.querySelector(".product")) {
  let thumbFlatSwiper = new Swiper(".product__thumbswiper", {
    slidesPerView: 3,
    spaceBetween: 8,
    observer: true,
    observeParents: true,
    direction: "horizontal",
    speed: 800,
    breakpoints: {
      1399.98: {
        slidesPerView: 3,
        spaceBetween: 20,
        direction: "horizontal",
      },
      991.98: {
        slidesPerView: 3.33,
        spaceBetween: 8,
        direction: "horizontal",
      },
      767.98: {
        slidesPerView: 3,
        spaceBetween: 16,
        direction: "vertical",
      }
    },
  })
  let mainFlatSwiper = new Swiper(".product__mainswiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: thumbFlatSwiper,
    },
    speed: 400
  })
}

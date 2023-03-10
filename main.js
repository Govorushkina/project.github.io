const workersSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 5,
  arrows: false,
  slidesToScroll: 1,
  autoplay: false,
  centerMode: true,
  centerPadding: "10%",
  slide: "div",
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

$(document).ready(() => {
  // вызывается при полной загрузке сайта
  // выпадающее меню в начале сайта
  $(".header-nav-menu-item.drop").on("mouseover", function (e) {
    let id = this.id;
    $(`[aria-labelledby=${id}]`).addClass("show");
  });

  $(`.header-nav-menu-item.drop`).on("mouseout", function (e) {
    let id = this.id;
    $(`[aria-labelledby=${id}]`).removeClass("show");
  });

  // FAQ внизу сайта, аккордион
  $(".accordion-item").on("click", (e) => {
    if (e.target.classList.contains("accordion-item")) {
      return;
    }
    if (
      e.target.closest(".accordion-item").classList.contains("opened") &&
      !e.target.classList.contains("accordion-body")
    ) {
      e.target.closest(".accordion-item").classList.toggle("opened");
    } else {
      $(".accordion-item.opened").removeClass("opened");
      e.target.closest(".accordion-item").classList.toggle("opened");
    }
  });

  // мобильное меню

  $(".btn-group").on("show.bs.dropdown", function (e) {
    $(".dropdown-menu").removeClass("invisible");
    $(this)
      .find(".dropdown-menu")
      .first()
      .removeClass("slideOut")
      .stop(true, true)
      .addClass("slideIn");
  });
  $(".btn-group").on("hide.bs.dropdown", function (e) {
    e.preventDefault();
    $(this)
      .find(".dropdown-menu")
      .first()
      .removeClass("slideIn")
      .stop(true, true)
      .addClass("slideOut");
    setTimeout(() => {
      $(".nav-btn").removeClass("show");
      $(".animate").removeClass("show");
    }, 300);
  });
// карусель с компаниями, бесконечная

  $(".workers-carousel.first").not(".slick-initialized").slick(workersSettings);
  $(".workers-carousel.second")
    .not(".slick-initialized")
    .slick(workersSettings);

  // карусель с отзывами

  let settings = {
    dots: false,
    dotsClass: ".reviews-nav",
    edgeFriction: 0.35,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendArrows: ".reviews-nav",
    prevArrow:
      '<button id="prev" type="button" class="slick-prev slick-arrow"></button>',
    nextArrow:
      '<button id="next" type="button" class="slick-next slick-arrow"></button>',
  };

  $(".reviews-carousel").on("init", function (event, slick) {
    $(".reviews-counter").append(
      `<span class="reviews-counter-active">01</span>/0${slick.slideCount} `
    );
  });

  $(".reviews-carousel").slick(settings);

  $(".reviews-carousel").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      $(".reviews-counter-active").html(`0${currentSlide + 1}`);
    }
  );
});

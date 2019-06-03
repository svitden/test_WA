$(document).ready(function () {
  $('.page-header__slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true
      //     }
      //   },
      //   {
      //     breakpoint: 992,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   }        
      // ]
  })
});
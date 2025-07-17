export const commonFunction = () => {
  let backtotop = document.querySelector(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    document.addEventListener("scroll", toggleBacktotop);
  }

  let sidebarstn = document.querySelector(".toggle-sidebar-btn");
  if (sidebarstn) {
    const toggleBtn = () => {
      document.body.classList.toggle("toggle-sidebar");
    };
    sidebarstn.addEventListener("click", toggleBtn);
  }
};
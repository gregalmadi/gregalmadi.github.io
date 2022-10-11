"use strict";

const navbar = document.querySelector(".navbar");
const navBrand = document.querySelector(".navbar .navbar-brand");
const navItem = document.querySelectorAll(".navbar-nav .nav-item");
const navbarToggler = document.querySelector(".navbar-toggler");
const menuItems = document.querySelector(".navbar-nav");

const footerLinks = document.querySelectorAll(
  ".container__segmentSixth__links a"
);

window.addEventListener("scroll", () => {
  if (window.scrollY !== 0) {
    navbar.style.backgroundColor = "white";
    navBrand.style.color = "black";
    navbarToggler.style.color = "black";
    navbarToggler.style.borderColor = "black";
    navItem.forEach((item) => {
      item.style.color = "black";
      item.addEventListener("mouseover", () => {
        item.style.color = "#fdcc52";
      });
      item.addEventListener("mouseleave", () => {
        item.style.color = "black";
      });
    });

    navBrand.addEventListener("mouseover", () => {
      navBrand.style.color = "#fdcc52";
    });

    navBrand.addEventListener("mouseleave", () => {
      navBrand.style.color = "black";
    });
  } else {
    navbar.style.backgroundColor = "rgba(0,0,0,0)";
    navBrand.style.color = "#fdcc52";
    navbarToggler.style.color = "rgba(221, 221, 221, 0.826)";
    navbarToggler.style.borderColor = "rgba(221, 221, 221, 0.826)";
    navBrand.addEventListener("mouseover", () => {
      navBrand.style.color = "white";
    });

    navBrand.addEventListener("mouseleave", () => {
      navBrand.style.color = "#fdcc52";
    });
    navItem.forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.style.color = "white";
      });
      item.addEventListener("mouseleave", () => {
        item.style.color = "rgba(221, 221, 221, 0.826)";
      });
      item.style.color = "rgba(221, 221, 221, 0.826)";
    });
  }
});

navItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.innerHTML === "DOWNLOAD") {
      document
        .querySelector("#download")
        .scrollIntoView({ behavior: "smooth" });
    }
    if (item.innerHTML === "FEATURES") {
      document
        .querySelector("#features")
        .scrollIntoView({ behavior: "smooth" });
    }
    if (item.innerHTML === "CONTACT") {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    }
  });
});

footerLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    modalTitle.innerHTML = link.innerHTML;
    modalOpen(i);
  });
});

// Opening and closing menu on mobile devices ----------------------

let menuOpen = false;
navbarToggler.addEventListener("click", () => {
  if (!menuOpen) {
    menuItems.style.display = "flex";
    menuOpen = true;
  } else {
    menuItems.style.display = "none";
    menuOpen = false;
  }
});

window.addEventListener("resize", () => {
  if (menuOpen === false && window.innerWidth > 992) {
    menuItems.style.display = "flex";
    menuOpen = true;
  } else if (window.innerWidth < 992) {
    menuItems.style.display = "none";
    menuOpen = false;
  }
});

// Modal -----------------------------------------------------------

const modalWindow = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__header");
const modalContent = document.querySelector(".modal__text");

const closeModalBtn = document.querySelector(".btn--close");
const okayBtn = document.querySelector(".btn--okay");

// Opening modal logic
const modalOpen = (i) => {
  modalWindow.style.display = "flex";
  modalWindow.classList.add("fadeIn");
  setTimeout(() => {
    clearTimeout();
    modalWindow.classList.remove("fadeIn");
  }, 1000);
  switch (i) {
    case 0:
      modalContent.innerHTML =
        "All data will be treated as strictly confidential and will not be disclosed to third parties. Take a look on our disclaimer and Privacy Policy.";
      break;
    case 1:
      modalContent.innerHTML =
        "Our current General Terms & Conditions (GTC), including all important information about prices, payment methods, returns and cancellation periods, can be found on our website at loremnotipsum.com.";
      break;
    case 2:
      modalContent.innerHTML =
        "Do you have a question about your subscription, a recent order, products, shipping or you want to suggest a new magazine? Here you can find some helpful answers to frequently asked questions (FAQ).";
      break;
  }
};

// Closing modal logic
const modalClose = () => {
  modalWindow.classList.add("fadeOut");

  setTimeout(() => {
    clearTimeout();
    modalWindow.classList.remove("fadeOut");
    modalWindow.style.display = "none";
  }, 1000);
};

// Listening for modal closing events
closeModalBtn.addEventListener("click", modalClose);
okayBtn.addEventListener("click", modalClose);

modalWindow.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    modalClose();
  } else {
    return;
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalClose();
  }
});

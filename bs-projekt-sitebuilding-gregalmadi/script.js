"use strict";

const navbar = document.querySelector(".navbar");
const navBrand = document.querySelector(".navbar .navbar-brand");
const navItem = document.querySelectorAll(".navbar-nav .nav-item");

const modalTitle = document.querySelector(".modal-title");
const footerLinks = document.querySelectorAll(".footerlinks a");

window.addEventListener("scroll", () => {
  if (window.scrollY !== 0) {
    navbar.style.backgroundColor = "white";
    navBrand.style.color = "black";
    navItem.forEach((item) => {
      item.style.color = "black";
      item.addEventListener("mouseover", () => {
        item.style.color = "#fec947";
      });
      item.addEventListener("mouseleave", () => {
        item.style.color = "black";
      });
    });

    navBrand.addEventListener("mouseover", () => {
      navBrand.style.color = "#fec947";
    });

    navBrand.addEventListener("mouseleave", () => {
      navBrand.style.color = "black";
    });
  } else {
    navbar.style.backgroundColor = "rgba(0,0,0,0)";
    navBrand.style.color = "#fec947";
    navBrand.addEventListener("mouseover", () => {
      navBrand.style.color = "white";
    });

    navBrand.addEventListener("mouseleave", () => {
      navBrand.style.color = "#fec947";
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

footerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    modalTitle.innerHTML = link.innerHTML;
    $("#myBSModal").modal("toggle");
  });
});

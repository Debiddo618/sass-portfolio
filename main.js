// import './sass/main.css';

import gamesData from "./data/games.json";
import projectsData from "./data/projects.json";
import skillsData from "./data/skills.json";
import historyData from "./data/history.json";
import mobileData from "./data/mobile.json";
import { getImageUrl } from "./utils";

// used to create skill slider
function createSkillSlider(skillsData, containerSelector) {
  const slider = document.querySelector(containerSelector);
  const list = document.createElement("div");
  list.classList.add("list");

  skillsData.forEach((skillData, index) => {
    const skill = document.createElement("div");
    skill.classList.add("item");
    skill.style.setProperty("--position", index + 1);
    skill.innerHTML = `
      <img src="${getImageUrl(skillData.imageSrc)}" alt="${skillData.title}" />
    `;
    list.appendChild(skill);
  });

  slider.appendChild(list);
}

document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const nav = document.querySelector(".nav");
  const scrollThreshold = 100;
  
  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
  // Experience
  const experienceTimeline = document.querySelector(".experience__timeline");
  historyData.forEach((experience, index) => {
    const experienceContainer = document.createElement("div");
    experienceContainer.classList.add("experience__container");

    // Add container--left or container--right based on the index
    if (index % 2 === 0) {
      experienceContainer.classList.add("experience__container--left");
      experienceContainer.setAttribute("data-aos", "fade-right");
    } else {
      experienceContainer.classList.add("experience__container--right");
      experienceContainer.setAttribute("data-aos", "fade-left");
    }

    // Determine arrow class
    const arrowClass =
      index % 2 === 0
        ? "experience__left-container-arrow"
        : "experience__right-container-arrow";

    experienceContainer.innerHTML = `
      <img class="experience__image" src="${getImageUrl(
        experience.imageSrc
      )}" alt="${experience.organisation}" />
      <div class="experience__text-box">
        <div class="experience__title">${experience.organization}</div>
        <div class="experience__date">${experience.startDate} - ${
      experience.endDate
    }</div>
      <ul class="experience__list">
        ${experience.experiences
          .map((data) => `<li class="experience__description">${data}</li>`)
          .join("")}
      </ul>
        <span class="${arrowClass}"></span>
      </div>
    `;
    experienceTimeline.appendChild(experienceContainer);
  });

  // projects grid
  const projectGridWeb = document.querySelector(".project__grid--web");
  projectsData.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
    <div class="project-card--face1">
      <img src="${getImageUrl(project.imageSrc)}" alt="${
      project.title
    }" class="project-card__image">
      <h3 class="project-card__title">${project.title}</h3>
    </div>
    <div class="project-card--face2">
      <p class="project-card__description">${project.description}</p>
      <ul class="project-card__skills">
        <div class="project-card__skills-title">Skills</div>
        ${project.skills
          .map((skill) => `<li class="project-card__skill">${skill}</li>`)
          .join("")}
      </ul>
      <div class="project-card__links">
        <a href="${
          project.demo
        }" target="_blank" class="project-card__link--demo btn">Live</a>
        <a href="${
          project.source
        }" target="_blank" class="project-card__link--source btn">Source</a>
      </div>
    </div>
  `;
    projectGridWeb.appendChild(projectCard);
  });

  // games grid
  const gamesGrid = document.querySelector(".games__grid");
  gamesData.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
         <img class="game-card__image" src="${getImageUrl(
           game.imageSrc
         )}" alt="${game.title}">
         <div class="game-card__title">${game.title}</div>
         <div class="game-card__description">${game.description}</div>
         <div class="game-card__links">
         <button class="game-card__link--demo btn"> <a href="${
           game.demo
         }" target="_blank">Live</a></button>
         <button class="game-card__link--source btn"> <a href="${
           game.source
         }" target="_blank">Source</a></button>
         </div>
       `;

    gamesGrid.appendChild(gameCard);
  });

  // mobile projects
  const mobileSliderWrapper = document.querySelector(
    ".mobile__projects__slider-wrapper"
  );
  const mobileSlider = document.querySelector(".mobile__projects__slider");
  const slideNav = document.createElement("div");
  slideNav.classList.add("mobile__projects__slide-nav");

  let currentIndex = 0;
  const totalSlides = mobileData.length;

  mobileData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.classList.add("mobile__projects__slide");
    slide.setAttribute("id", `slide${index}`);

    slide.innerHTML = `
    <img class="mobile__projects__slide__image" src="${getImageUrl(
      data.imageSrc
    )}" alt="${data.title}">
    <div class="mobile__projects__slide__details">
      <div class="mobile__projects__slide__title">${data.title}</div>
      <button class="mobile__projects__slide__button btn">
        <a href="${data.source}" target="_blank">Source</a>
      </button>
    </div>
    <div class="mobile__projects__slide__description">${data.description}</div>
  `;
    mobileSlider.append(slide);
  });

  // Create and append the navigation buttons
  const prevButton = document.createElement("button");
  prevButton.classList.add("mobile__projects__prev");
  prevButton.innerHTML = "&#10094;"; // left arrow
  prevButton.addEventListener("click", () => changeSlide(-1));

  const nextButton = document.createElement("button");
  nextButton.classList.add("mobile__projects__next");
  nextButton.innerHTML = "&#10095;"; // right arrow
  nextButton.addEventListener("click", () => changeSlide(1));

  mobileSliderWrapper.append(prevButton, nextButton);

  // Used for the mobile image slider
  function changeSlide(direction) {
    const slides = document.querySelectorAll(".mobile__projects__slide");
    slides[currentIndex].classList.remove("active");

    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }

    slides[currentIndex].classList.add("active");
  }

  // Initialize the first slide as active
  document
    .querySelectorAll(".mobile__projects__slide")[0]
    .classList.add("active");

  // slider
  createSkillSlider(skillsData, ".slider");
  createSkillSlider(skillsData, ".slider2");
});

// form submission
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.style.display = "block";
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

// Theme Switcher
const themeButton = document.querySelector(".nav__theme-switcher");

const handleSwitchTheme = () => {
  const img = themeButton.querySelector("img");
  const body = document.body;

  if (img.src.includes("sun.png")) {
    img.src = "./img/moon.png";
    img.alt = "dark";

    // Add the 'dark-theme' class to the body
    body.classList.add("dark-theme");
  } else {
    img.src = "./img/sun.png";
    img.alt = "light";

    // Remove the 'dark-theme' class from the body
    body.classList.remove("dark-theme");
  }
};

themeButton.addEventListener("click", handleSwitchTheme);

// Resume Button
document
  .querySelector(".about-details-resume")
  .addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "./data/David_Zheng_Resume.pdf";
    link.download = "resume.pdf";
    link.click();
  });

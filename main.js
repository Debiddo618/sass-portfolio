// import './sass/main.css';

import gamesData from "./data/games.json";
import projectsData from "./data/projects.json";
import skillsData from "./data/skills.json";

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

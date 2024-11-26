// import './sass/main.css';

import gamesData from "./data/games.json";
import projectsData from "./data/projects.json";

import { getImageUrl } from "./utils";

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
        ${project.skills.map((skill) => `<li>${skill}</li>`).join("")}
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
});

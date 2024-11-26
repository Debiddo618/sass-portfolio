// import './sass/main.css';

import gamesData from "./data/games.json" assert { type: "json" };
import { getImageUrl } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  // game grid
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
        <button class="game-card__link--demo btn"> <a href="${
          game.demo
        }" target="_blank">Live</a></button>
        <button class="game-card__link--source btn"> <a href="${
          game.source
        }" target="_blank">Source</a></button>
      `;

    gamesGrid.appendChild(gameCard);
  });
});

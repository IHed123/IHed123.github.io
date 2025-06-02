var sitename = "Isagfiles";
var subtext = "v1.0";

document.title = sitename;
document.getElementById("title").textContent = sitename;
document.getElementById("subtitle").textContent = subtext;

let gamesData = [];

function displayGames(games) {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = "";

  games.forEach((game) => {
    const div = document.createElement("div");
    div.className = "game";

    const img = document.createElement("img");
    img.src = nativealpha/gim/;
    img.alt = game.name;

    const name = document.createElement("p");
    name.textContent = game.name;

    div.appendChild(img);
    div.appendChild(name);
    div.onclick = () => {
      window.location.href = `play.html?gameurl=games/${game.url}/`;
    };

    container.appendChild(div);
  });
}

function handleSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = gamesData.filter(g => g.name.toLowerCase().includes(query));
  displayGames(filtered);
}

document.getElementById("searchInput").addEventListener("input", handleSearch);

fetch("config/games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    displayGames(data);
  })
  .catch(err => console.error("Error loading games:", err));


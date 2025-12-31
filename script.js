let playerCount = null;
let impostorCount = null;
let roles = [];
let revealed = [];

/* =========================
   🐐 LEYENDAS HISTÓRICAS
   ========================= */
const jugadoresOriginales = [
  "Diego Maradona","Pelé","Johan Cruyff","Franz Beckenbauer","Alfredo Di Stéfano","Michel Platini","George Best",
  "Ferenc Puskás","Bobby Charlton","Garrincha","Lev Yashin",

  /* ⭐ LEYENDAS MODERNAS (90s–2015) */
  "Zinedine Zidane","Ronaldo Nazário","Ronaldinho","Paolo Maldini","Francesco Totti","Thierry Henry",
  "Roberto Carlos","David Beckham","Andrea Pirlo","Iker Casillas","Oliver Kahn","Gianluigi Buffon","Arjen Robben",
  "Franck Ribéry","Samuel Eto'o","Didier Drogba","Wayne Rooney","Kaká","Michael Ballack","Mario Götze",
  "Xavi Hernández","Andrés Iniesta","Zlatan Ibrahimović","Luis Suárez","Fernando Torres","Sergio Ramos",
  "Carles Puyol","Philipp Lahm","Manuel Neuer","Clarence Seedorf","Raúl González",

  /* 🔥 JUGADORES ACTUALES / RECIENTES */
  "Lionel Messi","Cristiano Ronaldo","Kylian Mbappé","Erling Haaland","Kevin De Bruyne","Luka Modrić",
  "Mohamed Salah","Karim Benzema","Sadio Mané","Neymar Jr","Jude Bellingham","Pedri","Romelu Lukaku","Toni Kroos",
  "Vinícius Jr","Rodrygo","Harry Kane","Antoine Griezmann","Robert Lewandowski","Bernardo Silva","Bruno Fernandes",
  "Federico Valverde","Declan Rice","Bukayo Saka","Lucas Paquetá",

  /* 🇦🇷 SELECCIÓN ARGENTINA */
  "Emiliano Dibu Martínez","Nicolás Otamendi","Cristian Cuti Romero","Marcos Acuña","Nahuel Molina",
  "Rodrigo De Paul","Leandro Paredes","Enzo Fernández","Ángel Di María","Julián Álvarez","Lautaro Martínez",
  "Alexis Mac Allister","Gonzalo Montiel","Lisandro Martínez","Carlos Tévez","Sergio Agüero","Pablo Aimar",
  "Juan Román Riquelme","Hernán Crespo","Javier Zanetti","Gabriel Batistuta","Esteban Cambiasso","Walter Samuel",
  "Martín Palermo","Pablo Zabaleta",

  /* 🌎 SUDAMERICANOS / INTERNACIONALES */
  "Edinson Cavani","Miguel Merentiel","Kevin Zenón","Marcelo","Memo Ochoa",

  /* 🧠 DTs / COMODINES */
  "Pep Guardiola","José Mourinho","Carlo Ancelotti","Alex Ferguson","Marcelo Bielsa",
  "Diego Simeone","Lionel Scaloni"
];


let jugadoresDisponibles = [...jugadoresOriginales].sort(() => Math.random() - 0.5);

function setPlayerCount(value) {
  playerCount = Number(value);
  document.getElementById("playerSelect").classList.add("selected");

  // Ajustar impostores si se pasa
  if (impostorCount && impostorCount >= playerCount) {
    impostorCount = playerCount - 1;
    document.getElementById("impostorSelect").value = impostorCount;
  }
}

function setImpostors(value) {
  if (!playerCount) {
    alert("Primero elegí la cantidad de jugadores");
    document.getElementById("impostorSelect").value = "";
    return;
  }

  impostorCount = Number(value);
  if (impostorCount >= playerCount) {
    alert("No puede haber tantos impostores 👀");
    document.getElementById("impostorSelect").value = "";
    impostorCount = null;
    return;
  }

  document.getElementById("impostorSelect").classList.add("selected");
}

function startRound() {
  if (!playerCount || !impostorCount) {
    alert("Elegí jugadores e impostores antes de empezar");
    return;
  }

  if (jugadoresDisponibles.length === 0) {
    alert("⚠️ No quedan jugadores. Recargá la página para reiniciar.");
    return;
  }

  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = "";

  revealed = Array(playerCount).fill(false);

  const jugador = jugadoresDisponibles.pop();
  roles = Array(playerCount).fill(jugador);

  let impostors = [];
  while (impostors.length < impostorCount) {
    let rand = Math.floor(Math.random() * playerCount);
    if (!impostors.includes(rand)) {
      impostors.push(rand);
      roles[rand] = "IMPOSTOR";
    }
  }

  for (let i = 0; i < playerCount; i++) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player";
    playerDiv.innerHTML = `
      <button id="btn${i}" onclick="reveal(${i})">Jugador ${i + 1}</button>
      <span id="role${i}" class="hidden"></span>
    `;
    playersDiv.appendChild(playerDiv);
  }
}

function reveal(index) {
  if (revealed[index]) return;

  const btn = document.getElementById(`btn${index}`);
  const roleSpan = document.getElementById(`role${index}`);

  btn.disabled = true;
  btn.classList.add("active"); // 👈 estado activo

  roleSpan.textContent = roles[index];
  roleSpan.classList.remove("hidden");
  roleSpan.style.color = roles[index] === "IMPOSTOR" ? "red" : "#00ff99";

  setTimeout(() => {
    roleSpan.classList.add("hidden");
    btn.classList.remove("active");
    btn.classList.add("crossed"); // 👈 estado final
    revealed[index] = true;
  }, 2000);
}


import "./style.css";

async function injectSprite() {
  if (document.querySelector("[data-svg-sprite]")) return;

  const spriteUrl = `${import.meta.env.BASE_URL}sprite.svg`;
  const spriteResponse = await fetch(spriteUrl);

  const wrapper = document.createElement("div");
  wrapper.hidden = true;
  wrapper.dataset.svgSprite = "true";
  wrapper.innerHTML = await spriteResponse.text();
  document.body.prepend(wrapper);
}

await injectSprite().catch(() => {});

const body = document.body;
const menuDrawers = Array.from(document.querySelectorAll("[data-menu]"));
const menuToggleButtons = Array.from(
  document.querySelectorAll("[data-menu-toggle]"),
);
const menuCloseButtons = Array.from(
  document.querySelectorAll("[data-menu-close]"),
);
const track = document.querySelector("[data-carousel-track]");
console.log("Menu init - Found:", {
  drawers: menuDrawers.length,
  buttons: menuToggleButtons.length,
  closeButtons: menuCloseButtons.length,
});
const setMenuOpenState = (isOpen) => {
  menuDrawers.forEach((d) => d.classList.toggle("menu-drawer--open", isOpen));
  menuToggleButtons.forEach((b) =>
    b.classList.toggle("menu-button--active", isOpen),
  );
  body.classList.toggle("menu-open", isOpen);
};

const openMenu = () => {
  if (menuDrawers.length === 0) return;
  requestAnimationFrame(() => setMenuOpenState(true));
};

const closeMenu = () => {
  if (menuDrawers.length === 0) return;
  setMenuOpenState(false);
};

const toggleMenu = () => {
  if (menuDrawers.length === 0) return;
  const anyOpen = menuDrawers.some((d) =>
    d.classList.contains("menu-drawer--open"),
  );
  if (anyOpen) closeMenu();
  else openMenu();
};

// Use event delegation so listeners work even if DOM has duplicates or elements are re-rendered
document.addEventListener("click", (event) => {
  const toggleEl =
    event.target.closest && event.target.closest("[data-menu-toggle]");
  if (toggleEl) {
    event.preventDefault();
    toggleMenu();
    return;
  }

  const closeEl =
    event.target.closest && event.target.closest("[data-menu-close]");
  if (closeEl) {
    event.preventDefault();
    closeMenu();
    return;
  }

  // If user clicks directly on the drawer container (backdrop), close menu
  if (
    event.target &&
    event.target.matches &&
    event.target.matches("[data-menu]")
  ) {
    closeMenu();
    return;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const anyOpen = menuDrawers.some((d) =>
      d.classList.contains("menu-drawer--open"),
    );
    if (anyOpen) closeMenu();
  }
});

if (track) {
  const cards = Array.from(track.querySelectorAll(".speciality-card"));
  if (cards.length > 0 && !track.dataset.loopReady) {
    cards.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    track.dataset.loopReady = "true";
  }
}

// Variables
const menuToggle = document.getElementById("menuToggle")
const closeSidebar = document.getElementById("closeSidebar")
const sidebar = document.getElementById("sidebar")
const sidebarOverlay = document.getElementById("sidebarOverlay")
const menuLinks = document.querySelectorAll(".sidebar-menu a")
const sidebarToggleDesktop = document.getElementById("sidebarToggleDesktop")

// Abrir sidebar en móvil
menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active")
  sidebarOverlay.classList.add("active")
})

sidebarToggleDesktop.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed")
})

// Cerrar sidebar
closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active")
  sidebarOverlay.classList.remove("active")
})

// Cerrar sidebar al hacer click en overlay
sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("active")
  sidebarOverlay.classList.remove("active")
})

// Manejar clicks en los menús
menuLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()

    // Remover clase active de todos los links
    menuLinks.forEach((l) => l.classList.remove("active"))

    // Agregar clase active al link clickeado
    this.classList.add("active")

    // Cerrar sidebar en móvil
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active")
      sidebarOverlay.classList.remove("active")
    }

    console.log("Ir a:", this.getAttribute("data-menu"))
  })
})

// Cerrar sidebar al cambiar el tamaño de la pantalla
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("active")
    sidebarOverlay.classList.remove("active")
  }
})

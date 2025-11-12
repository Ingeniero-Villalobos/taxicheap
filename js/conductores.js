// Sample drivers data
const driversData = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+1 (555) 123-4567",
    photo: "/driver-photo.jpg",
    verified: false,
    vehicle: {
      brand: "Toyota",
      model: "Camry",
      plate: "ABC-1234",
      year: 2022,
      photo: "/vehicle-photo.jpg",
    },
    backgroundPhoto: "/image/background-check.jpg",
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 234-5678",
    photo: "/driver-photo.jpg",
    verified: true,
    vehicle: {
      brand: "Honda",
      model: "Civic",
      plate: "XYZ-5678",
      year: 2023,
      photo: "/vehicle-photo.jpg",
    },
    backgroundPhoto: "/background-check.jpg",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos.lopez@email.com",
    phone: "+1 (555) 345-6789",
    photo: "/driver-photo.jpg",
    verified: false,
    vehicle: {
      brand: "Nissan",
      model: "Altima",
      plate: "DEF-9012",
      year: 2021,
      photo: "/vehicle-photo.jpg",
    },
    backgroundPhoto: "/background-check.jpg",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    photo: "/driver-photo.jpg",
    verified: true,
    vehicle: {
      brand: "Hyundai",
      model: "Elantra",
      plate: "GHI-3456",
      year: 2022,
      photo: "/vehicle-photo.jpg",
    },
    backgroundPhoto: "/background-check.jpg",
  },
]

// DOM Elements
const driversGrid = document.getElementById("driversGrid")
const searchDrivers = document.getElementById("searchDrivers")
const driverModal = document.getElementById("driverModal")
const modalOverlay = document.getElementById("modalOverlay")
const closeModal = document.getElementById("closeModal")

// Render drivers
function renderDrivers(drivers = driversData) {
  driversGrid.innerHTML = ""

  drivers.forEach((driver) => {
    const verifiedClass = driver.verified ? "" : "unverified"
    const verifiedText = driver.verified ? "Verificado" : "Pendiente"

    const driverCard = document.createElement("div")
    driverCard.className = "driver-card"
    driverCard.innerHTML = `
            <div class="driver-card-header">
                <img src="${driver.photo}" alt="${driver.name}">
                <div class="driver-card-verified ${verifiedClass}">${verifiedText}</div>
            </div>
            <div class="driver-card-body">
                <div class="driver-card-name">${driver.name}</div>
                <div class="driver-card-info"><strong>Email:</strong> ${driver.email}</div>
                <div class="driver-card-info"><strong>Teléfono:</strong> ${driver.phone}</div>
                <div class="driver-card-info"><strong>Vehículo:</strong> ${driver.vehicle.brand} ${driver.vehicle.model}</div>
            </div>
        `

    driverCard.addEventListener("click", () => openModal(driver))
    driversGrid.appendChild(driverCard)
  })
}

// Open modal with driver info
function openModal(driver) {
  document.getElementById("modalDriverName").textContent = driver.name
  document.getElementById("modalDriverEmail").textContent = driver.email
  document.getElementById("modalDriverPhone").textContent = driver.phone
  document.getElementById("modalDriverPhoto").src = driver.photo

  const verifiedBadge = document.getElementById("modalDriverVerified")
  if (driver.verified) {
    verifiedBadge.textContent = "Verificado"
    verifiedBadge.className = "detail-value verified-badge verified"
  } else {
    verifiedBadge.textContent = "Pendiente"
    verifiedBadge.className = "detail-value verified-badge unverified"
  }

  document.getElementById("modalVehicleBrand").textContent = driver.vehicle.brand
  document.getElementById("modalVehicleModel").textContent = driver.vehicle.model
  document.getElementById("modalVehiclePlate").textContent = driver.vehicle.plate
  document.getElementById("modalVehicleYear").textContent = driver.vehicle.year
  document.getElementById("modalVehiclePhoto").src = driver.vehicle.photo

  document.getElementById("modalBackgroundPhoto").src = driver.backgroundPhoto

  driverModal.classList.add("active")
  modalOverlay.classList.add("active")
}

// Close modal
function closeDriverModal() {
  driverModal.classList.remove("active")
  modalOverlay.classList.remove("active")
}

closeModal.addEventListener("click", closeDriverModal)
modalOverlay.addEventListener("click", closeDriverModal)

// Search drivers
searchDrivers.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase()
  const filteredDrivers = driversData.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm) ||
      driver.email.toLowerCase().includes(searchTerm) ||
      driver.phone.includes(searchTerm),
  )
  renderDrivers(filteredDrivers)
})

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDriverModal()
  }
})

// Initial render
renderDrivers()

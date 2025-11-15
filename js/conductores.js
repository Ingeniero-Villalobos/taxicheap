let driversData = JSON.parse(localStorage.getItem('driversData')) || [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+1 (555) 123-4567",
    photo: "/driver-photo.jpg",
    verified: true,
    vehicle: {
      brand: "Toyota",
      model: "Camry",
      plate: "ABC-1234",
      year: 2022,
      photo: "/vehicle-photo.jpg",
    },
    backgroundPhoto: "/background-check.jpg",
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

const formModal = document.getElementById("formModal")
const formModalOverlay = document.getElementById("formModalOverlay")
const closeFormModal = document.getElementById("closeFormModal")
const driverForm = document.getElementById("driverForm")
const btnCreateDriver = document.getElementById("btnCreateDriver")
const btnCancelForm = document.getElementById("btnCancelForm")
const formModalTitle = document.getElementById("formModalTitle")

let currentDriverId = null

// Save drivers to localStorage
function saveDriversToStorage() {
  localStorage.setItem('driversData', JSON.stringify(driversData))
}

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
  currentDriverId = driver.id
  
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

  const btnVerify = document.getElementById("btnVerifyDriver")
  if (driver.verified) {
    btnVerify.textContent = "✓ Verificado"
    btnVerify.classList.add("verified")
    btnVerify.disabled = true
  } else {
    btnVerify.textContent = "✓ Verificar Conductor"
    btnVerify.classList.remove("verified")
    btnVerify.disabled = false
  }

  driverModal.classList.add("active")
  modalOverlay.classList.add("active")
}

// Close modal
function closeDriverModal() {
  driverModal.classList.remove("active")
  modalOverlay.classList.remove("active")
  currentDriverId = null
}

function openFormModal(driverId = null) {
  closeDriverModal()
  
  if (driverId) {
    // Editing mode
    const driver = driversData.find(d => d.id === driverId)
    if (driver) {
      formModalTitle.textContent = "Editar Conductor"
      document.getElementById("driverName").value = driver.name
      document.getElementById("driverEmail").value = driver.email
      document.getElementById("driverPhone").value = driver.phone
      document.getElementById("vehicleBrand").value = driver.vehicle.brand
      document.getElementById("vehicleModel").value = driver.vehicle.model
      document.getElementById("vehiclePlate").value = driver.vehicle.plate
      document.getElementById("vehicleYear").value = driver.vehicle.year
      currentDriverId = driverId
    }
  } else {
    // Creating mode
    formModalTitle.textContent = "Crear Conductor"
    driverForm.reset()
    currentDriverId = null
  }

  formModal.classList.add("active")
  formModalOverlay.classList.add("active")
}

// Close form modal
function closeFormModalFunc() {
  formModal.classList.remove("active")
  formModalOverlay.classList.remove("active")
  driverForm.reset()
  currentDriverId = null
}

driverForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const newDriver = {
    id: currentDriverId || Date.now(),
    name: document.getElementById("driverName").value,
    email: document.getElementById("driverEmail").value,
    phone: document.getElementById("driverPhone").value,
    photo: document.getElementById("driverPhoto").value || "/driver-photo.jpg",
    verified: currentDriverId ? driversData.find(d => d.id === currentDriverId)?.verified || false : false,
    vehicle: {
      brand: document.getElementById("vehicleBrand").value,
      model: document.getElementById("vehicleModel").value,
      plate: document.getElementById("vehiclePlate").value,
      year: parseInt(document.getElementById("vehicleYear").value),
      photo: document.getElementById("vehiclePhoto").value || "/vehicle-photo.jpg",
    },
    backgroundPhoto: document.getElementById("backgroundPhoto").value || "/background-check.jpg",
  }

  if (currentDriverId) {
    // Update
    const index = driversData.findIndex(d => d.id === currentDriverId)
    if (index !== -1) {
      driversData[index] = newDriver
    }
  } else {
    // Create
    driversData.push(newDriver)
  }

  saveDriversToStorage()
  renderDrivers()
  closeFormModalFunc()
})

document.getElementById("btnVerifyDriver").addEventListener("click", () => {
  if (currentDriverId) {
    const driver = driversData.find(d => d.id === currentDriverId)
    if (driver) {
      driver.verified = !driver.verified
      saveDriversToStorage()
      openModal(driver)
      renderDrivers()
    }
  }
})

document.getElementById("btnEditDriver").addEventListener("click", () => {
  openFormModal(currentDriverId)
})

document.getElementById("btnDeleteDriver").addEventListener("click", () => {
  if (currentDriverId && confirm("¿Estás seguro de que deseas eliminar este conductor?")) {
    driversData = driversData.filter(d => d.id !== currentDriverId)
    saveDriversToStorage()
    renderDrivers()
    closeDriverModal()
  }
})

closeModal.addEventListener("click", closeDriverModal)
modalOverlay.addEventListener("click", closeDriverModal)
closeFormModal.addEventListener("click", closeFormModalFunc)
formModalOverlay.addEventListener("click", closeFormModalFunc)
btnCancelForm.addEventListener("click", closeFormModalFunc)

btnCreateDriver.addEventListener("click", () => {
  openFormModal()
})

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
    if (formModal.classList.contains("active")) {
      closeFormModalFunc()
    } else if (driverModal.classList.contains("active")) {
      closeDriverModal()
    }
  }
})

// Initial render
renderDrivers()

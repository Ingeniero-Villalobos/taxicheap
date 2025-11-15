// Sample passengers data
let passengersData = JSON.parse(localStorage.getItem('passengersData')) || [
  {
    id: 1,
    name: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    phone: "+1 (555) 111-1111",
    photo: "/driver-photo.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Laura Martínez",
    email: "laura.martinez@email.com",
    phone: "+1 (555) 222-2222",
    photo: "/driver-photo.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Diego Fernández",
    email: "diego.fernandez@email.com",
    phone: "+1 (555) 333-3333",
    photo: "/driver-photo.jpg",
    verified: false,
  },
  {
    id: 4,
    name: "Sofía Ruiz",
    email: "sofia.ruiz@email.com",
    phone: "+1 (555) 444-4444",
    photo: "/driver-photo.jpg",
    verified: true,
  },
]

// DOM Elements
const passengersGrid = document.getElementById("passengersGrid")
const searchPassengers = document.getElementById("searchPassengers")
const passengerModal = document.getElementById("passengerModal")
const modalOverlay = document.getElementById("modalOverlay")
const closeModal = document.getElementById("closeModal")

let currentPassengerId = null

// Save passengers to localStorage
function savePassengersToStorage() {
  localStorage.setItem('passengersData', JSON.stringify(passengersData))
}

// Render passengers
function renderPassengers(passengers = passengersData) {
  passengersGrid.innerHTML = ""

  passengers.forEach((passenger) => {
    const verifiedClass = passenger.verified ? "" : "unverified"
    const verifiedText = passenger.verified ? "Verificado" : "Pendiente"

    const passengerCard = document.createElement("div")
    passengerCard.className = "passenger-card"
    passengerCard.innerHTML = `
            <div class="passenger-card-header">
                <img src="${passenger.photo}" alt="${passenger.name}">
                <div class="passenger-card-verified ${verifiedClass}">${verifiedText}</div>
            </div>
            <div class="passenger-card-body">
                <div class="passenger-card-name">${passenger.name}</div>
                <div class="passenger-card-info"><strong>Email:</strong> ${passenger.email}</div>
                <div class="passenger-card-info"><strong>Teléfono:</strong> ${passenger.phone}</div>
            </div>
        `

    passengerCard.addEventListener("click", () => openModal(passenger))
    passengersGrid.appendChild(passengerCard)
  })
}

// Open modal with passenger info
function openModal(passenger) {
  currentPassengerId = passenger.id
  
  document.getElementById("modalPassengerName").textContent = passenger.name
  document.getElementById("modalPassengerEmail").textContent = passenger.email
  document.getElementById("modalPassengerPhone").textContent = passenger.phone
  document.getElementById("modalPassengerPhoto").src = passenger.photo

  const verifiedBadge = document.getElementById("modalPassengerVerified")
  if (passenger.verified) {
    verifiedBadge.textContent = "Verificado"
    verifiedBadge.className = "detail-value verified-badge verified"
  } else {
    verifiedBadge.textContent = "Pendiente"
    verifiedBadge.className = "detail-value verified-badge unverified"
  }

  passengerModal.classList.add("active")
  modalOverlay.classList.add("active")
}

// Close modal
function closePassengerModal() {
  passengerModal.classList.remove("active")
  modalOverlay.classList.remove("active")
  currentPassengerId = null
}

document.getElementById("btnVerifyPassenger").addEventListener("click", () => {
  if (currentPassengerId) {
    const passenger = passengersData.find(p => p.id === currentPassengerId)
    if (passenger) {
      passenger.verified = !passenger.verified
      savePassengersToStorage()
      openModal(passenger)
      renderPassengers()
    }
  }
})

document.getElementById("btnDeletePassenger").addEventListener("click", () => {
  if (currentPassengerId && confirm("¿Estás seguro de que deseas eliminar este pasajero?")) {
    passengersData = passengersData.filter(p => p.id !== currentPassengerId)
    savePassengersToStorage()
    renderPassengers()
    closePassengerModal()
  }
})

closeModal.addEventListener("click", closePassengerModal)
modalOverlay.addEventListener("click", closePassengerModal)

// Search passengers
searchPassengers.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase()
  const filteredPassengers = passengersData.filter(
    (passenger) =>
      passenger.name.toLowerCase().includes(searchTerm) ||
      passenger.email.toLowerCase().includes(searchTerm) ||
      passenger.phone.includes(searchTerm),
  )
  renderPassengers(filteredPassengers)
})

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && passengerModal.classList.contains("active")) {
    closePassengerModal()
  }
})

// Initial render
renderPassengers()

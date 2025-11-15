// Sample coupons data
let couponsData = JSON.parse(localStorage.getItem('couponsData')) || [
  {
    id: 1,
    code: "TAXI10",
    description: "10% descuento en tu próximo viaje",
    discount: 10,
    expiry: "2025-12-31",
    status: "activo",
  },
  {
    id: 2,
    code: "SUMMER20",
    description: "20% descuento en viajes de verano",
    discount: 20,
    expiry: "2025-09-30",
    status: "activo",
  },
  {
    id: 3,
    code: "WELCOME15",
    description: "Bienvenida para nuevos usuarios",
    discount: 15,
    expiry: "2025-06-30",
    status: "inactivo",
  },
]

// DOM Elements
const couponsGrid = document.getElementById("couponsGrid")
const searchCoupons = document.getElementById("searchCoupons")
const couponModal = document.getElementById("couponModal")
const modalOverlay = document.getElementById("modalOverlay")
const closeModal = document.getElementById("closeModal")

const formModal = document.getElementById("formModal")
const formModalOverlay = document.getElementById("formModalOverlay")
const closeFormModal = document.getElementById("closeFormModal")
const couponForm = document.getElementById("couponForm")
const btnCreateCoupon = document.getElementById("btnCreateCoupon")
const btnCancelForm = document.getElementById("btnCancelForm")
const formModalTitle = document.getElementById("formModalTitle")

let currentCouponId = null

// Save coupons to localStorage
function saveCouponsToStorage() {
  localStorage.setItem('couponsData', JSON.stringify(couponsData))
}

// Render coupons
function renderCoupons(coupons = couponsData) {
  couponsGrid.innerHTML = ""

  coupons.forEach((coupon) => {
    const couponCard = document.createElement("div")
    couponCard.className = "coupon-card"
    couponCard.innerHTML = `
            <div class="coupon-card-content">
                <div class="coupon-card-code">${coupon.code}</div>
                <div class="coupon-card-discount">-${coupon.discount}%</div>
                <div class="coupon-card-description">${coupon.description}</div>
                <div class="coupon-card-footer">
                    <div class="coupon-card-expiry">Vence: ${new Date(coupon.expiry).toLocaleDateString('es-ES')}</div>
                    <div class="coupon-card-status ${coupon.status}">${coupon.status === 'activo' ? 'Activo' : 'Inactivo'}</div>
                </div>
            </div>
        `

    couponCard.addEventListener("click", () => openModal(coupon))
    couponsGrid.appendChild(couponCard)
  })
}

// Open modal with coupon info
function openModal(coupon) {
  currentCouponId = coupon.id
  
  document.getElementById("modalCouponCode").textContent = coupon.code
  document.getElementById("modalCouponDescription").textContent = coupon.description
  document.getElementById("modalCouponDiscount").textContent = `${coupon.discount}%`
  document.getElementById("modalCouponExpiry").textContent = new Date(coupon.expiry).toLocaleDateString('es-ES')

  const statusBadge = document.getElementById("modalCouponStatus")
  statusBadge.textContent = coupon.status === 'activo' ? 'Activo' : 'Inactivo'
  statusBadge.className = `status-badge ${coupon.status}`

  couponModal.classList.add("active")
  modalOverlay.classList.add("active")
}

// Close modal
function closeCouponModal() {
  couponModal.classList.remove("active")
  modalOverlay.classList.remove("active")
  currentCouponId = null
}

function openFormModal(couponId = null) {
  closeCouponModal()
  
  if (couponId) {
    // Editing mode
    const coupon = couponsData.find(c => c.id === couponId)
    if (coupon) {
      formModalTitle.textContent = "Editar Cupón"
      document.getElementById("couponCode").value = coupon.code
      document.getElementById("couponDescription").value = coupon.description
      document.getElementById("couponDiscount").value = coupon.discount
      document.getElementById("couponExpiry").value = coupon.expiry
      document.getElementById("couponStatus").value = coupon.status
      currentCouponId = couponId
    }
  } else {
    // Creating mode
    formModalTitle.textContent = "Crear Cupón"
    couponForm.reset()
    currentCouponId = null
  }

  formModal.classList.add("active")
  formModalOverlay.classList.add("active")
}

// Close form modal
function closeFormModalFunc() {
  formModal.classList.remove("active")
  formModalOverlay.classList.remove("active")
  couponForm.reset()
  currentCouponId = null
}

couponForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const newCoupon = {
    id: currentCouponId || Date.now(),
    code: document.getElementById("couponCode").value.toUpperCase(),
    description: document.getElementById("couponDescription").value,
    discount: parseInt(document.getElementById("couponDiscount").value),
    expiry: document.getElementById("couponExpiry").value,
    status: document.getElementById("couponStatus").value,
  }

  if (currentCouponId) {
    // Update
    const index = couponsData.findIndex(c => c.id === currentCouponId)
    if (index !== -1) {
      couponsData[index] = newCoupon
    }
  } else {
    // Create
    couponsData.push(newCoupon)
  }

  saveCouponsToStorage()
  renderCoupons()
  closeFormModalFunc()
})

document.getElementById("btnEditCoupon").addEventListener("click", () => {
  openFormModal(currentCouponId)
})

document.getElementById("btnDeleteCoupon").addEventListener("click", () => {
  if (currentCouponId && confirm("¿Estás seguro de que deseas eliminar este cupón?")) {
    couponsData = couponsData.filter(c => c.id !== currentCouponId)
    saveCouponsToStorage()
    renderCoupons()
    closeCouponModal()
  }
})

closeModal.addEventListener("click", closeCouponModal)
modalOverlay.addEventListener("click", closeCouponModal)
closeFormModal.addEventListener("click", closeFormModalFunc)
formModalOverlay.addEventListener("click", closeFormModalFunc)
btnCancelForm.addEventListener("click", closeFormModalFunc)

btnCreateCoupon.addEventListener("click", () => {
  openFormModal()
})

// Search coupons
searchCoupons.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase()
  const filteredCoupons = couponsData.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm) ||
      coupon.description.toLowerCase().includes(searchTerm),
  )
  renderCoupons(filteredCoupons)
})

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (formModal.classList.contains("active")) {
      closeFormModalFunc()
    } else if (couponModal.classList.contains("active")) {
      closeCouponModal()
    }
  }
})

// Initial render
renderCoupons()

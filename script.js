// ==========================================
// NAV TOGGLE (MOBILE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Floating enquiry button (added on every page)
  createFloatingEnquiry();

  // Init slider (gallery)
  initSlider();

  // Init event animations
  initEventAnimations();

  // Contact form validation
  initContactForm();
});

// ==========================================
// FLOATING ENQUIRY BUTTON
// ==========================================
function createFloatingEnquiry() {
  const btn = document.createElement("div");
  btn.className = "floating-enquiry";
  btn.innerHTML = "📩 Enquiry";
  btn.onclick = () => {
    window.location.href = "contact.html";
  };
  document.body.appendChild(btn);
}

// ==========================================
// GALLERY SLIDER
// ==========================================
let slideIndex = 0;
let sliderInterval;

function initSlider() {
  const slider = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  if (!slider || images.length === 0) return;

  const totalSlides = images.length;

  function showSlide() {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  window.nextSlide = function () {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide();
  };

  window.prevSlide = function () {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide();
  };

  sliderInterval = setInterval(() => window.nextSlide(), 4000);
}

// ==========================================
// EVENTS POPUP MODAL
// ==========================================
window.openEventModal = function (title, description) {
  const modal = document.getElementById("eventModal");
  if (!modal) return;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-description").innerText = description;
  modal.style.display = "block";
};

window.closeModal = function () {
  const modal = document.getElementById("eventModal");
  if (modal) modal.style.display = "none";
};

window.addEventListener("click", (e) => {
  const modal = document.getElementById("eventModal");
  if (modal && e.target === modal) {
    closeModal();
  }
});

// ==========================================
// EVENT CARDS SCROLL ANIMATION
// ==========================================
function initEventAnimations() {
  const cards = document.querySelectorAll(".event-card");
  if (cards.length === 0) return;

  function check() {
    const trigger = window.innerHeight * 0.9;
    cards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < trigger) {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      } else {
        card.style.opacity = 0;
        card.style.transform = "translateY(30px)";
      }
    });
  }

  window.addEventListener("scroll", check);
  check();
}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const name = document.getElementById("contact-name");
    const phone = document.getElementById("contact-phone");
    const msg = document.getElementById("contact-msg");

    if (!name.value.trim()) {
      alert("Please enter your name.");
      name.focus();
      e.preventDefault();
      return;
    }

    if (!phone.value.trim() || phone.value.trim().length < 10) {
      alert("Please enter a valid phone number.");
      phone.focus();
      e.preventDefault();
      return;
    }

    if (!msg.value.trim()) {
      alert("Please type your message.");
      msg.focus();
      e.preventDefault();
      return;
    }

    alert("Thank you! Your message has been recorded. (Demo)");
  });
}

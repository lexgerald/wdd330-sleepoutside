
const registrationModal = document.querySelector("#registration-modal");
const registrationForm = document.querySelector("#registration-form");
const closeRegistration = document.querySelector("#close-registration");
const registrationMessage = document.querySelector("#registration-message");

const hasSeenRegistration = localStorage.getItem("registrationModalSeen");

// Show the modal only on the visitor's first visit.
if (registrationModal && !hasSeenRegistration) {
    registrationModal.showModal();
    localStorage.setItem("registrationModalSeen", "true");
}

// Close button
closeRegistration?.addEventListener("click", () => {
    registrationModal.close();
});

// Close when clicking outside the modal content.
registrationModal?.addEventListener("click", (event) => {
    if (event.target === registrationModal) {
        registrationModal.close();
    }
});

// Handle registration form submission.
registrationForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector("#registration-email").value.trim();

    const registrations = JSON.parse(
        localStorage.getItem("registrations") || "[]",
    );

    if (!registrations.includes(email)) {
        registrations.push(email);
    }

    localStorage.setItem("registrations", JSON.stringify(registrations));

    registrationMessage.textContent =
        "Thanks for registering! Your email has been saved in this demo.";

    registrationForm.reset();
});

document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });

    document.querySelectorAll('[href^="#modal"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModal = document.querySelector(link.getAttribute('href'));
            modals.forEach(modal => modal.classList.remove('active'));
            targetModal.classList.add('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Form submission
    const contactForm = document.getElementById('contact_form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');

            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            fetch('https://formspree.io/f/mnnpbqar', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Success handling
                form.innerHTML = `
                    <div class="alert alert-success lead">
                        <h4>Thank you!</h4>
                        <p>Your message has been sent successfully.</p>
                    </div>
                `;
            })
            .catch(error => {
                // Even if there's a CORS error, the email might have been sent
                form.innerHTML = `
                    <div class="alert alert-warning lead">
                        <h4>Message may have been sent!</h4>
                        <p>We encountered a response issue, but your message was likely received.</p>
                        <button onclick="window.location.reload()" class="btn btn-warning">Try Again</button>
                    </div>
                `;
                console.error('Error:', error);
            });
        });
    }
});

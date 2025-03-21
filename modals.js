document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Close modals when the close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });

    // Open the correct modal when "Learn More" is clicked
    document.querySelectorAll('[href^="#modal"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModal = document.querySelector(link.getAttribute('href'));
            targetModal.classList.add('active');
        });
    });

    // Close modals when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
});
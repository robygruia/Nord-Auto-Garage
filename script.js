document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Meniu Navigație Mobil --- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });

        // Închide meniul la click pe un link
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
            });
        });
    }

    /* --- 2. Galerie Înainte / După (Slider interactiv) --- */
    const sliderRange = document.getElementById('sliderRange');
    const beforeImage = document.getElementById('beforeImage');
    const sliderLine = document.getElementById('sliderLine');

    if (sliderRange && beforeImage && sliderLine) {
        const updateSliderPosition = (value) => {
            beforeImage.style.width = `${value}%`;
            sliderLine.style.left = `${value}%`;
        };

        sliderRange.addEventListener('input', (e) => {
            updateSliderPosition(e.target.value);
        });

        // Setare inițială
        updateSliderPosition(50);
    }

   /* --- 3. Formular de Programare trimis pe Email --- */
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Se trimite...';
        submitBtn.disabled = true;

        const formData = new FormData(bookingForm);

        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = `<span style="color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Solicitarea a fost trimisă cu succes! Vei fi contactat în cel mai scurt timp.</span>`;
                bookingForm.reset();
            } else {
                formStatus.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> A apărut o problemă la expediere. Te rugăm să ne suni direct!</span>`;
            }
        } catch (error) {
            formStatus.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Eroare de conexiune. Verifică rețeaua.</span>`;
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 6000);
        }
    });
}

    /* --- 4. Schimbare activă pe link-urile din meniu la scroll --- */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    });

});
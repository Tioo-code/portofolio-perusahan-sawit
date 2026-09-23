document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Sticky Navbar
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');

    // Sticky Navbar & Back to Top Toggle on Scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar
        if (scrollPos > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (scrollPos > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Nav Link Spy
        highlightActiveNav();
    });

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Highlight active nav item based on scroll position
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight - 80) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }

    // 3. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galeriCards = document.querySelectorAll('.galeri-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galeriCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 4. Gallery Lightbox Modal
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');

    const galeriThumbs = document.querySelectorAll('.galeri-thumb');

    galeriThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const img = thumb.querySelector('img');
            const title = thumb.querySelector('.galeri-title')?.innerText || '';
            const caption = thumb.querySelector('.galeri-caption')?.innerText || '';

            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.9rem; opacity:0.85;">${caption}</span>`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 5. Job Card Click to Select in Form
    const jobCards = document.querySelectorAll('.job-card');
    const empPosisiSelect = document.getElementById('empPosisi');
    const employeeForm = document.getElementById('employeeForm');

    jobCards.forEach(card => {
        card.addEventListener('click', () => {
            jobCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const jobName = card.getAttribute('data-job');
            if (empPosisiSelect && jobName) {
                empPosisiSelect.value = jobName;
                
                // If on mobile/small screen, smoothly scroll to the form
                if (window.innerWidth < 1024) {
                    employeeForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // 6. Employee Application Form WhatsApp Submission
    if (employeeForm) {
        employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('empNama').value.trim();
            const phone = document.getElementById('empPhone').value.trim();
            const usia = document.getElementById('empUsia').value.trim();
            const posisi = document.getElementById('empPosisi').value;
            const domisili = document.getElementById('empDomisili').value.trim();
            const pengalaman = document.getElementById('empPengalaman').value;
            const catatan = document.getElementById('empCatatan').value.trim();

            if (!nama || !phone || !usia || !posisi || !domisili || !pengalaman) {
                alert('Mohon lengkapi seluruh kolom yang bertanda bintang (*).');
                return;
            }

            // Target whatsapp number
            const targetNomor = '6280000000000'; // Placeholder yang dapat diganti
            const pesanLamaran = encodeURIComponent(
                `*PENDAFTARAN KARYAWAN BARU — PERKEBUNAN SAWIT SUWITO SETIO BUDI*\n\n` +
                `Halo Admin / Bapak Suwito Setio Budi,\nSaya ingin mengajukan lamaran kerja dengan data sebagai berikut:\n\n` +
                `👤 *Nama*: ${nama}\n` +
                `📱 *No. HP/WA*: ${phone}\n` +
                `🎂 *Usia*: ${usia} Tahun\n` +
                `📍 *Domisili*: ${domisili}\n` +
                `💼 *Posisi Dilamar*: ${posisi}\n` +
                `⏱️ *Pengalaman Kerja*: ${pengalaman}\n` +
                `📝 *Catatan Tambahan*: ${catatan || '-'}\n\n` +
                `Mohon informasi mengenai proses dan jadwal seleksi berikutnya. Terima kasih!`
            );

            const waLink = `https://wa.me/${targetNomor}?text=${pesanLamaran}`;
            window.open(waLink, '_blank');
        });
    }

    // 7. General Contact Form WhatsApp Redirection
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('nama').value.trim();
            const perihal = document.getElementById('perihal').value;
            const pesan = document.getElementById('pesan').value.trim();

            if (!nama || !pesan) {
                alert('Silakan lengkapi nama dan pesan Anda.');
                return;
            }

            const nomorWA = '6280000000000'; 
            const teksWA = encodeURIComponent(
                `Halo Bapak Suwito Setio Budi,\n\nSaya *${nama}* ingin berdiskusi mengenai *${perihal}*.\n\nPesan:\n"${pesan}"\n\nTerima kasih.`
            );

            const waUrl = `https://wa.me/${nomorWA}?text=${teksWA}`;
            window.open(waUrl, '_blank');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile nav when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Video thumbnails functionality
    const videoThumbs = document.querySelectorAll('.video-thumb');
    const mainVideoFrame = document.querySelector('.video-container iframe');
    const videoInfo = document.querySelector('.video-info');

    const videoSources = [
        {
            src: "https://player.vimeo.com/video/367782069?h=327df726c9&title=0&byline=0&portrait=0",
            title: "2023 Showreel",
            description: "A collection of our best work from the past year"
        },
        {
            src: "https://player.vimeo.com/video/225899544?h=1ff4932829&title=0&byline=0&portrait=0",
            title: "Commercial: Product Launch",
            description: "High-end commercial for a luxury brand"
        },
        {
            src: "https://player.vimeo.com/video/219372232?h=de61fc06f8&title=0&byline=0&portrait=0",
            title: "Documentary: City Life",
            description: "A short documentary exploring urban environments"
        },
        {
            src: "https://player.vimeo.com/video/370236304?h=81459ac3ab&title=0&byline=0&portrait=0",
            title: "Fashion Film: Seasonal Collection",
            description: "Stylized fashion campaign showcasing the latest trends"
        },
        {
            src: "https://player.vimeo.com/video/347119375?h=1990f35a86&title=0&byline=0&portrait=0",
            title: "Music Video: Harmony",
            description: "Visually stunning music video for an indie artist"
        },
        {
            src: "https://player.vimeo.com/video/289096862?h=e0e380970f&title=0&byline=0&portrait=0",
            title: "Travel Documentary: Hidden Places",
            description: "Exploring the world's most remarkable locations"
        }
    ];

    videoThumbs.forEach((thumb) => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            videoThumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main video
            const index = parseInt(this.getAttribute('data-index'));
            if (videoSources[index]) {
                mainVideoFrame.src = videoSources[index].src;
                videoInfo.querySelector('h3').textContent = videoSources[index].title;
                videoInfo.querySelector('p').textContent = videoSources[index].description;
            }
        });
    });

    // Clone logos for infinite scroll effect
    const clientsGrid = document.querySelector('.clients-grid');
    const logos = document.querySelectorAll('.client-logo');
    
    // Clone each logo and append to the grid
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clientsGrid.appendChild(clone);
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, project, message });
            
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            submitBtn.disabled = true;
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('in-view');
            }
        });
    };
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
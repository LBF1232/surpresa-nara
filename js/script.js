document.addEventListener('DOMContentLoaded', () => {
    
    const setupPage = () => {
        
        window.scrollTo(0, 0);

        const preloader = document.getElementById('preloader');
        const body = document.body;
        body.classList.add('loading');

        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            body.classList.remove('loading');
        });

        AOS.init({
            duration: 1000,
            easing: 'ease-out-quad',
            once: true,
            offset: 120,
        });
        
        const backgroundMusic = document.getElementById('background-music');
        const playMusic = () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.log("Música aguardando interação do usuário.");
                });
            }
            document.body.removeEventListener('click', playMusic, true);
        };
        document.body.addEventListener('click', playMusic, true);

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const tiltElements = document.querySelectorAll('.tilt-effect');
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const middleX = rect.width / 2;
                const middleY = rect.height / 2;
                const offsetX = ((x - middleX) / middleX) * 15;
                const offsetY = ((y - middleY) / middleY) * -15;
                element.style.transition = 'transform 0.1s ease';
                element.style.transform = `perspective(1000px) rotateY(${offsetX}deg) rotateX(${offsetY}deg) scale(1.05)`;
            });
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'transform 0.6s ease';
                element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            });
        });

        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        document.querySelectorAll('.nav-link, .cta-button').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = -150;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetElement.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition + offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                
                if (this.classList.contains('nav-previous')) {
                    const returnGif = document.getElementById('return-gif-container');
                    if (returnGif) {
                        returnGif.classList.add('visible');
                        setTimeout(() => {
                            returnGif.classList.remove('visible');
                        }, 4000);
                    }
                }
            });
        });

        const sakuraContainer = document.querySelector('.sakura-container');
        if (sakuraContainer) {
            setInterval(() => {
                const petal = document.createElement('div');
                petal.classList.add('sakura-petal');
                const size = Math.random() * 10 + 5;
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;
                petal.style.left = `${Math.random() * 100}vw`;
                petal.style.animationDuration = `${Math.random() * 10 + 8}s`;
                petal.style.animationDelay = `${Math.random() * 5}s`;
                petal.style.setProperty('--x-end', `${Math.random() * 200 - 100}px`);
                petal.style.setProperty('--rotate-end', `${Math.random() * 720 - 360}deg`);
                sakuraContainer.appendChild(petal);
                petal.addEventListener('animationend', () => {
                    petal.remove();
                });
            }, 2500);
        }
        
        const biwaSound = document.getElementById('biwa-sound');
        const biwaPlayerGif = document.getElementById('biwa-player-gif');
        const portals = document.querySelectorAll('.portal');

        portals.forEach(portal => {
            portal.addEventListener('click', () => {
                const isOpen = portal.classList.contains('open');
                portals.forEach(p => {
                    if (p !== portal) p.classList.remove('open');
                });
                if (!isOpen) {
                    if(biwaSound) {
                        biwaSound.currentTime = 0;
                        biwaSound.play();
                    }
                    if(biwaPlayerGif) {
                        biwaPlayerGif.classList.add('visible');
                        setTimeout(() => {
                            biwaPlayerGif.classList.remove('visible');
                        }, 1200);
                    }
                    const imageViewer = portal.querySelector('.image-viewer');
                    const imageSrc = portal.getAttribute('data-image-src');
                    const captionText = portal.getAttribute('data-caption');
                    const captionElement = portal.querySelector('.portal-caption');
                    
                    imageViewer.style.backgroundImage = `url('${imageSrc}')`;
                    captionElement.textContent = captionText;
                    
                    portal.classList.add('open');
                } else {
                    portal.classList.remove('open');
                }
            });
        });
        
        let observers = [];

        const setupScrollAnimations = () => {
            observers.forEach(observer => observer.disconnect());
            observers = [];

            const flyingBirdContainer = document.getElementById('flying-bird-container');
            const birdTrigger = document.getElementById('declaration');
            if (flyingBirdContainer && birdTrigger) {
                const birdObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            flyingBirdContainer.classList.add('fly');
                            
                            const angryCrow = document.getElementById('angry-crow-container');
                            setTimeout(() => {
                                angryCrow.classList.add('visible');
                                setTimeout(() => {
                                    angryCrow.classList.remove('visible');
                                }, 5000);
                            }, 9000);

                            birdObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                birdObserver.observe(birdTrigger);
                observers.push(birdObserver);
            }
            
            const runners = {
                '#timeline-item-1': '#tanjiro-runner',
                '#timeline-item-2': '#nezuko-runner',
                '#timeline-item-3': '#inosuke-runner',
                '#timeline-item-4': '#rengoku-runner',
                '#timeline-item-5': '#nezuko-runner-2',
                '#timeline-item-6': '#zenitsu-runner'
            };

            for (const [triggerId, runnerId] of Object.entries(runners)) {
                const triggerElement = document.querySelector(triggerId);
                const runnerElement = document.querySelector(runnerId);

                if (triggerElement && runnerElement) {
                    const runnerObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                runnerElement.classList.add('run');
                                runnerObserver.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });
                    runnerObserver.observe(triggerElement);
                    observers.push(runnerObserver);
                }
            }
        };

        const restartButton = document.getElementById('restart-button');
        if(restartButton) {
            restartButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });

                document.querySelectorAll('.character-runner, #flying-bird-container').forEach(runner => {
                    runner.classList.remove('run', 'fly');
                });
                
                document.querySelectorAll('[data-aos]').forEach(el => {
                    el.classList.remove('aos-animate');
                });

                document.querySelectorAll('.portal').forEach(portal => {
                    portal.classList.remove('open');
                });

                setTimeout(() => {
                    AOS.refresh();
                    setupScrollAnimations();
                }, 500);
            });
        }
        
        setupScrollAnimations();
    };

    setupPage();
});
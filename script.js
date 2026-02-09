document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- NEURAL PULSE ANIMATION (Layered Network) ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        let pulsesArray = []; // For the signal animation

        // Mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: 150
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                // Layered colors
                this.color = Math.random() > 0.5 ? '#2dd4bf' : '#818cf8';

                // Connection neighbors
                this.neighbors = [];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;

                    // Trigger pulse if close to mouse
                    if (Math.random() < 0.02) {
                        firePulse(this);
                    }
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 30; // Return speed
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 30;
                    }
                }
            }
        }

        // Pulse signal travelling between nodes
        class Pulse {
            constructor(startNode, endNode) {
                this.startNode = startNode;
                this.endNode = endNode;
                this.progress = 0;
                this.speed = 0.05;
                this.dead = false;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.dead = true;
                    // Chance to propagate
                    if (Math.random() < 0.3) {
                        firePulse(this.endNode);
                    }
                }
            }

            draw() {
                let x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
                let y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#fff';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function firePulse(node) {
            // Find a random neighbor to fire to
            if (node.neighbors.length > 0) {
                let target = node.neighbors[Math.floor(Math.random() * node.neighbors.length)];
                pulsesArray.push(new Pulse(node, target));
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 8000;

            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particlesArray.push(new Particle(x, y));
            }

            // Pre-calculate neighbors for performance
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                        ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < 150 * 150) { // Connection threshold
                        particlesArray[a].neighbors.push(particlesArray[b]);
                        particlesArray[b].neighbors.push(particlesArray[a]);
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections first
            for (let a = 0; a < particlesArray.length; a++) {
                let p = particlesArray[a];
                for (let b = 0; b < p.neighbors.length; b++) {
                    let neighbor = p.neighbors[b];
                    // Draw line only once (canonical order)
                    if (p.x < neighbor.x) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(neighbor.x, neighbor.y);
                        ctx.stroke();
                    }
                }
                p.update();
                p.draw();
            }

            // Draw pulses
            for (let i = 0; i < pulsesArray.length; i++) {
                pulsesArray[i].update();
                pulsesArray[i].draw();
            }
            // Remove dead pulses
            pulsesArray = pulsesArray.filter(p => !p.dead);

            // Random background pulses
            if (Math.random() < 0.05) {
                let randomNode = particlesArray[Math.floor(Math.random() * particlesArray.length)];
                firePulse(randomNode);
            }

            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    // --- TYPEWRITER EFFECT (Only on landing) ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const roles = ["Generative AI Systems.", "Agentic Workflows.", "RAG Architectures.", "Computer Vision Pipelines."];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 1000);
    }

});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CANVAS PARTICLE SYSTEM ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        // Mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height/80) * (canvas.width/80)
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Particle Class
        class Particle {
            constructor(x, y, loading_speed, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = (Math.random() * 2) - 0.5;
                this.directionY = (Math.random() * 2) - 0.5;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Check collision detection - mouse position / particle position
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < mouse.radius + this.size){
                    if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                        this.x += 1;
                    } 
                    if (mouse.x > this.x && this.x > this.size * 10){
                        this.x -= 1;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                        this.y += 1;
                    } 
                    if (mouse.y > this.y && this.y > this.size * 10){
                        this.y -= 1;
                    }
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i=0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let color = Math.random() > 0.5 ? '#66fcf1' : '#bd00ff'; // Cyan or Purple
                
                particlesArray.push(new Particle(x, y, 1, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,innerWidth, innerHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance/20000);
                        let pColor = particlesArray[a].color;
                        
                        ctx.strokeStyle = pColor === '#66fcf1' ? `rgba(102, 252, 241, ${opacityValue})` : `rgba(189, 0, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            mouse.radius = ((canvas.height/80) * (canvas.height/80));
            init();
        });
    }

    // --- TYPEWRITER EFFECT ---
    const typingElement = document.getElementById('typing-text');
    const texts = ["INITIALIZING SYSTEM...", "LOADING MODULES...", "ACCESS GRANTED."];
    let textIndex = 0;
    let charIndex = 0;
    
    // We can just type one phrase or rotate. Let's type a welcome message or rotate roles.
    // For this design, let's type one static complex message or rotate roles.
    const roles = ["Neural Architect", "Data Scientist", "Deep Learning Engineer"];
    
    function typeWriter() {
        if (textIndex < roles.length) {
            if (charIndex < roles[textIndex].length) {
                if(!typingElement.innerHTML.endsWith(' ')) typingElement.innerHTML += roles[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(eraseText, 2000);
            }
        } else {
            textIndex = 0;
            setTimeout(typeWriter, 100);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typingElement.innerHTML = roles[textIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            textIndex++;
            setTimeout(typeWriter, 500);
        }
    }

    // Start typing if element exists
    if(typingElement) {
        // typeWriter(); 
        // Simple typewriter for the sub text: 
        // Actually, let's just do a simple "System Online" sequence for the banner
        let systemMsg = "SYSTEM STATUS: ONLINE. WELCOME, USER.";
        let i = 0;
        function typeSysMsg() {
            if (i < systemMsg.length) {
                typingElement.innerHTML += systemMsg.charAt(i);
                i++;
                setTimeout(typeSysMsg, 50);
            }
        }
        typeSysMsg();
    }

    // --- SCROLL OBSERVER ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.terminal-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- TABS (Publications/Projects) ---
    window.openTab = function(tabName) {
        var i;
        var x = document.getElementsByClassName("tab-content");
        var tabs = document.getElementsByClassName("tab-btn");
        
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
            x[i].classList.remove('active');
        }
        
        for (i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
        
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add('active');
        
        // Find the button that called this and set active
        // Simplest is to just set 'active' on the clicked button, passed as event or just finding by text.
        // We'll iterate to match index or ID. 
        // For simplicity in this script, we assume the buttons have IDs or we just toggle based on event.
        // But since we use onclick="openTab('pubs')", we need to query the buttons to highlight correct one.
        if(tabName === 'pubs') {
            tabs[0].classList.add("active");
        } else {
            tabs[1].classList.add("active");
        }
    }

});

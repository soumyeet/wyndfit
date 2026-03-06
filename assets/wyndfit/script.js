document.addEventListener('DOMContentLoaded', () => {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const modeText = document.getElementById('mode-text');
    const badge = document.getElementById('chat-mode-badge');
    const chatWindow = document.getElementById('chat-window');

    const conversations = {
        normal: [
            { sender: 'bot', text: "Hey! Ready for today's session? Based on your profile, we have a 45-min endurance focus." },
            { sender: 'user', text: "Yeah, I'm feeling good. Let's do it." },
            { sender: 'bot', text: "Awesome. We'll start with a dynamic warmup. Let me know when you've cleared some space." }
        ],
        quiet: [
            { sender: 'bot', text: "I noticed you've been working for 3 hours straight. Need a 2-minute reset?" },
            { sender: 'user', text: "Actually, yes. My neck is stiff." },
            { sender: 'bot', text: "Perfect. Let's do a quick seated trap stretch. Hold your right ear to your shoulder for 30s..." }
        ]
    };

    const descriptions = {
        normal: "<strong>Normal Mode:</strong> Comprehensive, structured fitness regimes tailored to your physical requirements and holistic health goals.",
        quiet: "<strong>Quiet Mode:</strong> 2-3 minute micro-interventions. Perfect for when you're overwhelmed or just need a gentle physical reset."
    };

    function renderChat(mode) {
        chatWindow.innerHTML = '';
        conversations[mode].forEach((msg, idx) => {
            const div = document.createElement('div');
            div.className = `chat-bubble ${msg.sender}`;
            if (msg.sender === 'bot' && idx === conversations[mode].length - 1) {
                div.classList.add('highlight');
            }
            div.style.opacity = '0';
            div.style.transform = 'translateY(10px)';
            div.style.animation = `fadeInUp 0.3s ease forwards ${idx * 0.2}s`;
            div.innerHTML = msg.text;
            chatWindow.appendChild(div);
        });
    }

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;

            modeText.style.opacity = '0';
            setTimeout(() => {
                modeText.innerHTML = descriptions[mode];
                modeText.style.opacity = '1';
            }, 200);

            badge.textContent = mode === 'normal' ? 'Normal' : 'Quiet';
            // Custom styling removed so it uses the white CSS class

            renderChat(mode);
        });
    });

    renderChat('normal');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // WhatsApp Modal Logic (Join Now, Get Started, Organize Event)
    const whatsappModal = document.getElementById('whatsapp-modal');
    const btnJoinNow = document.getElementById('btn-join-now');
    const btnGetStarted = document.getElementById('btn-get-started');
    const btnOrganize = document.getElementById('btn-organize');
    const closeBtn = document.getElementById('close-modal');

    // Function to open modal
    const openModal = (e) => {
        if (e) e.preventDefault();
        whatsappModal.classList.add('active');
    };

    // Function to close modal
    const closeModal = () => {
        whatsappModal.classList.remove('active');
    };

    // Add click listeners if buttons exist
    if (btnJoinNow) btnJoinNow.addEventListener('click', openModal);
    if (btnGetStarted) btnGetStarted.addEventListener('click', openModal);
    if (btnOrganize) btnOrganize.addEventListener('click', openModal);

    // Close on X button click
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    whatsappModal.addEventListener('click', (e) => {
        if (e.target === whatsappModal) {
            closeModal();
        }
    });
});

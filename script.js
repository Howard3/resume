document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    const updateThemeIcon = (isDark) => {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    };

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        updateThemeIcon(!isDark);
    });

    // Initialize theme icon
    updateThemeIcon(document.body.dataset.theme === 'dark');

    // Populate Experience Timeline with animations
    const experienceTimeline = document.getElementById('experience-timeline');
    experienceData.forEach((job, index) => {
        const jobElement = document.createElement('div');
        jobElement.className = 'experience-item';
        jobElement.style.animationDelay = `${index * 0.2}s`;
        
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <div class="company-info">
                <span class="company">${job.company}</span>
                <span class="date">${job.period}</span>
            </div>
            <ul>
                ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        
        experienceTimeline.appendChild(jobElement);
    });

    // Populate Skills with animations
    const populateSkills = (skills, containerId) => {
        const container = document.getElementById(containerId);
        skills.forEach((skill, index) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(skillTag);
        });
    };

    populateSkills(coreSkills, 'core-skills');
    populateSkills(otherSkills, 'other-skills');

    // Enhanced scroll animations
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    // Animate numbers in charity stats
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const numberElements = document.querySelectorAll('.number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(element => statsObserver.observe(element));

    // Populate FAQ items
    const faqContainer = document.getElementById('faq-items');
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        
        const question = document.createElement('h3');
        question.textContent = faq.question;
        
        const answer = document.createElement('p');
        answer.textContent = faq.answer;

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqContainer.appendChild(faqItem);
    });
});
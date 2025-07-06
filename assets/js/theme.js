// Enhanced Theme Toggle with Full Site Support
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    const body = document.body;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        
        // Update all theme-dependent elements
        updateThemeColors(theme);
        
        // Update toggle icon and text
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = 'Dark Mode';
        }
    }

    function updateThemeColors(theme) {
        const elements = [
            { selector: 'header', dark: 'rgba(15, 23, 42, 0.95)', light: 'rgba(248, 250, 252, 0.95)' },
            { selector: '.skill-card, .project-card, .service-card, footer', 
              dark: 'var(--dark-gray)', light: 'var(--light-gray)' },
            { selector: 'body', dark: 'var(--dark-color)', light: 'var(--light-color)' },
            { selector: 'body', darkText: 'var(--light-color)', lightText: 'var(--dark-color)' }
        ];

        elements.forEach(element => {
            const els = document.querySelectorAll(element.selector);
            els.forEach(el => {
                if (theme === 'light') {
                    if (element.light) el.style.backgroundColor = element.light;
                    if (element.lightText) el.style.color = element.lightText;
                } else {
                    if (element.dark) el.style.backgroundColor = element.dark;
                    if (element.darkText) el.style.color = element.darkText;
                }
            });
        });
    }

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'light' : 'dark';
            setTheme(newTheme);
        }
    });
});
// تشغيل الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    
    // تهيئة شريط التنقل
    initializeNavigation();
    
    // تهيئة أشرطة المهارات
    initializeSkillBars();
    
    // تهيئة نموذج التواصل
    initializeContactForm();
    
    // تهيئة التأثيرات البصرية
    initializeAnimations();
});

// شريط التنقل
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // تبديل القائمة في الشاشات الصغيرة
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // تغيير لون شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // تمييز الرابط النشط
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// أشرطة المهارات
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// نموذج التواصل
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // الحصول على بيانات النموذج
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // التحقق من صحة البيانات
        if (!validateForm(name, email, subject, message)) {
            return;
        }

        // إظهار رسالة نجاح
        showSuccessMessage();
        
        // إعادة تعيين النموذج
        form.reset();
    });
}

// التحقق من صحة النموذج
function validateForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name.trim().length < 2) {
        showErrorMessage('يرجى إدخال اسم صحيح');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if (subject.trim().length < 3) {
        showErrorMessage('يرجى إدخال موضوع صحيح');
        return false;
    }
    
    if (message.trim().length < 10) {
        showErrorMessage('يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل');
        return false;
    }
    
    return true;
}

// إظهار رسالة نجاح
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(message, form.firstChild);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// إظهار رسالة خطأ
function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${text}
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(message, form.firstChild);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// التأثيرات البصرية
function initializeAnimations() {
    // تأثير الظهور التدريجي
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // تأثير الكتابة للعنوان الرئيسي
    typeWriter();
}

// تأثير الكتابة
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typing() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    }
    
    setTimeout(typing, 1000);
}

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// إضافة أنماط CSS للرسائل
const alertStyles = `
    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    
    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .alert i {
        font-size: 1.2rem;
    }
`;

// إضافة الأنماط إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);

// معالج الأخطاء العامة
window.addEventListener('error', function(e) {
    console.error('خطأ في JavaScript:', e.error);
});

// تحسين الأداء - تأخير تحميل الصور
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// تشغيل تحميل الصور المؤجل
lazyLoadImages();

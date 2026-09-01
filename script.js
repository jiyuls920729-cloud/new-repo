document.addEventListener('DOMContentLoaded', function() {
    // 💡 팝업창 가로 슬라이드 및 동그라미 점 제어
    const popup = document.getElementById('notice-popup');
    if (popup) {
        const track = popup.querySelector('.popup-slides-track');
        const dots = popup.querySelectorAll('.p-dot');
        const popupTitle = document.getElementById('popup-title');
        const closeBtns = popup.querySelectorAll('.popup-close-btn, .btn-close, .btn-today-close');
        
        let currentPopupIdx = 0;
        const popupTitles = [
            "[공지] G건축 공식 홈페이지 오픈",
            "[이벤트] 친환경 자재 솔루션 안내"
        ];

        if (localStorage.getItem('mainPopupClosed') === 'true') {
            popup.style.display = 'none';
        }

        function movePopupSlide(idx) {
            track.style.transform = `translateX(-${idx * 50}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[idx].classList.add('active');
            popupTitle.textContent = popupTitles[idx];
            currentPopupIdx = idx;
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                movePopupSlide(idx);
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                popup.style.display = 'none';
                if(btn.classList.contains('btn-today-close')) {
                    localStorage.setItem('mainPopupClosed', 'true');
                }
            });
        });
    }

    // 💡 모바일 햄버거 메뉴 열기/닫기 기능
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobilePanel = document.querySelector('.mobile-menu-panel');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.m-close-btn');

    function openMobileMenu() {
        if(mobilePanel && mobileOverlay) {
            mobilePanel.classList.add('active');
            mobileOverlay.classList.add('active');
        }
    }

    function closeMobileMenu() {
        if(mobilePanel && mobileOverlay) {
            mobilePanel.classList.remove('active');
            mobileOverlay.classList.remove('active');
        }
    }

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    }
    if(mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
    if(mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // 1. 메인 비주얼 슬라이드 및 텍스트 순차 애니메이션
    const visualSlides = document.querySelectorAll('.visual-slide');
    const prevBtn = document.querySelector('.visual-section .prev');
    const nextBtn = document.querySelector('.visual-section .next');
    let currentVisual = 0;
    const visualCount = visualSlides.length;

    function playAnimation(slide) {
        const elements = slide.querySelectorAll('.sub-text, .main-text, .desc-text');
        elements.forEach(el => {
            el.classList.remove('animate');
            void el.offsetWidth;
            el.classList.add('animate');
        });
    }

    function showVisual(index) {
        visualSlides.forEach(slide => slide.classList.remove('active'));
        visualSlides[index].classList.add('active');
        playAnimation(visualSlides[index]);
    }

    if(visualSlides.length > 0) {
        visualSlides[0].classList.add('active');
        playAnimation(visualSlides[0]);
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function() {
            currentVisual = (currentVisual + 1) % visualCount;
            showVisual(currentVisual);
        });

        prevBtn.addEventListener('click', function() {
            currentVisual = (currentVisual - 1 + visualCount) % visualCount;
            showVisual(currentVisual);
        });

        setInterval(function() {
            currentVisual = (currentVisual + 1) % visualCount;
            showVisual(currentVisual);
        }, 5000);
    }

    // 2. 상품 슬라이드 & 사각 인디케이터 기능
    const prodSlides = document.querySelectorAll('.product-slide-item');
    const indicators = document.querySelectorAll('.prod-indicators .indicator');
    const prodPrevBtn = document.querySelector('.box-product .prev-btn');
    const prodNextBtn = document.querySelector('.box-product .next-btn');
    let currentProd = 0;
    const prodCount = prodSlides.length;

    function showProduct(index) {
        prodSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        prodSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentProd = index;
    }

    if(prodNextBtn && prodPrevBtn) {
        prodNextBtn.addEventListener('click', function() {
            let nextIdx = (currentProd + 1) % prodCount;
            showProduct(nextIdx);
        });

        prodPrevBtn.addEventListener('click', function() {
            let prevIdx = (currentProd - 1 + prodCount) % prodCount;
            showProduct(prevIdx);
        });

        indicators.forEach((ind, idx) => {
            ind.addEventListener('click', function() {
                showProduct(idx);
            });
        });
    }

    // 3. 스크롤 리빌 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
});
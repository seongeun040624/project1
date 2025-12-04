 //주요정보 바로가기
 var swiper = new Swiper(".RollingSwiper", {
        slidesPerView: 10,
        spaceBetween: 0,

        loop: true,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        navigation: {
        nextEl: ".swiper-button-next-rolling",
        prevEl: ".swiper-button-prev-rolling",
        },
    });

    const stopBtn = document.querySelector('.bn_rolling02 .bn_controlBtn>.stop');
    let isplaying=true;

    stopBtn.addEventListener('click', function(){
        if(isplaying){
            swiper.autoplay.stop();
            isplaying=false;
            stopBtn.classList.add('play');
        }else{
            swiper.autoplay.start();
            isplaying=true;
            stopBtn.classList.remove('play');
        }
    });


    //제일 아래 배너
    var swiper = new Swiper(".rolling_wrap", {
        slidesPerView: 6,
        spaceBetween: 10,

        loop: true,

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        navigation: {
        nextEl: ".swiper-button-next-rolling03",
        prevEl: ".swiper-button-prev-rolling03",
        },
    });

    const stopBtn1 = document.querySelector('.bn_wrap_rolling03 .controlBtn>.stop');
    let isplaying1=true;

    stopBtn1.addEventListener('click', function(){
        if(isplaying1){
            swiper.autoplay.stop();
            isplaying1=false;
            stopBtn1.classList.add('play');
        }else{
            swiper.autoplay.start();
            isplaying1=true;
            stopBtn1.classList.remove('play');
        }
    });


    //알림창 자바
    document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.sliderWrap ul li'));
    const tabs = Array.from(document.querySelectorAll('.tabWrap .tabs ul li a'));
    const tabContents = Array.from(document.querySelectorAll('.tabWrap .tapContents ul li'));
    const prevBtn = document.querySelector('.controlsWrap .prev');
    const nextBtn = document.querySelector('.controlsWrap .next');
    const playBtn = document.querySelector('.controlsWrap .play');
    const stopBtn = document.querySelector('.controlsWrap .stop');

    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 4000;

    function show(index) {
        index = (index + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        tabContents.forEach((c, i) => c.classList.toggle('active', i === index));
        tabs.forEach((t, i) => {
            if (i === index) t.classList.add('active');
            else t.classList.remove('active');
        });
        current = index;
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    function startAuto() {
        if (timer) return;
        timer = setInterval(next, INTERVAL);
        if (playBtn) {
            playBtn.classList.remove('stop');
            playBtn.classList.add('play');
            playBtn.setAttribute('aria-pressed', 'true');
        }
        
    }

    function stopAuto() {
        if (!timer) return;
        clearInterval(timer);
        timer = null;
        if (playBtn) {
            playBtn.classList.remove('play');
            playBtn.classList.add('stop');
            playBtn.setAttribute('aria-pressed', 'false');
        }
         
    }

    // 초기 표시
    show(0);
    startAuto();

    // 탭 클릭 => 해당 슬라이드로 이동 및 자동재생 중지
    tabs.forEach((t, i) => {
        t.addEventListener('click', function (e) {
            e.preventDefault();
            show(i);
            stopAuto();
        });
    });

    // 컨트롤 버튼
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.preventDefault(); prev(); stopAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.preventDefault(); next(); stopAuto(); });
    if (playBtn) playBtn.addEventListener('click', function (e) { e.preventDefault();timer ? stopAuto() : startAuto();});
    if (stopBtn) stopBtn.addEventListener('click', function (e) { e.preventDefault(); !timer ? stopAuto() : startAuto(); });

    

});
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.popupImgs .imgs ul li'); 
    const prevBtn = document.querySelector('.popup_control_wrap .prev');
    const nextBtn = document.querySelector('.popup_control_wrap .next');
    const stopBtn = document.querySelector('.popup_control_wrap .stop');

    let current = 0;              // 현재 보이는 이미지 번호
    let interval = null;          // 자동 슬라이드 저장용

    // 모든 슬라이드를 투명하게 만들기
    slides.forEach((slide, i) => {
        slide.style.position = "absolute";
        slide.style.top = 0;
        slide.style.left = 0;
        slide.style.opacity = i === 0 ? 1 : 0;  // 첫 슬라이드만 보이게
        slide.style.transition = "opacity 0.8s"; // 페이드 효과
    });

    // 슬라이드 보여주는 함수 (페이드 인/아웃)
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? 1 : 0;
        });
        current = index;
    }

    // 자동 재생 함수
    function startAuto() {
        interval = setInterval(() => {
            let next = (current + 1) % slides.length;
            showSlide(next);
        }, 3000);  // 3초마다 변경
       stopBtn.classList.remove('play');
    }

    // 자동 재생 멈추기
    function stopAuto() {
        clearInterval(interval);
        interval = null;
        stopBtn.classList.add('play');
    }

    // 다음 버튼 클릭
    nextBtn.addEventListener('click', () => {
        let next = (current + 1) % slides.length;
        showSlide(next);
        stopAuto();
    });

    // 이전 버튼 클릭
    prevBtn.addEventListener('click', () => {
        let prev = (current - 1 + slides.length) % slides.length;
        showSlide(prev);
        stopAuto();
    });

    // 정지/플레이 버튼 클릭
    stopBtn.addEventListener('click', () => {

        if(interval===null){
            startAuto();
         }else{
            stopAuto();
        }
        
    });

    // 자동 시작
    startAuto();
});

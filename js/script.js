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
        if (playBtn) playBtn.setAttribute('aria-pressed', 'true');
    }

    function stopAuto() {
        if (!timer) return;
        clearInterval(timer);
        timer = null;
        if (playBtn) playBtn.setAttribute('aria-pressed', 'false');
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
    if (playBtn) playBtn.addEventListener('click', function (e) { e.preventDefault(); startAuto(); });
    if (stopBtn) stopBtn.addEventListener('click', function (e) { e.preventDefault(); stopAuto(); });
});
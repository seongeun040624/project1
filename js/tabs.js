document.addEventListener('DOMContentLoaded', function () {
    const topBtn = document.querySelector('.top');
    if (!topBtn) return;

    const showAfter = 200; // 스크롤 픽셀 기준 — 필요하면 조정

    const onScroll = () => {
        if (window.scrollY > showAfter) topBtn.classList.add('visible');
        else topBtn.classList.remove('visible');
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    topBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 초기 상태 체크
    onScroll();
});
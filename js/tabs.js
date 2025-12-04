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



// ...new file...
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.box_wrap_latest .inner .box_container1');
    if (!container) return;

    const tab1 = container.querySelector('.tap_news01 a');
    const tab1Icon = container.querySelector('.tap_news01 strong');
    const tab2 = container.querySelector('.tap_news02 a');
    const tab2Icon = container.querySelector('.tap_news02 strong');
    const desks = Array.from(container.querySelectorAll('.box_desk'));
    const listnews = Array.from(container.querySelectorAll(".list_news ul"));

    function activate(index) {
        // 탭 클래스 토글 (current, bg_green 사용)
        if (index === 0) {
            tab1.classList.add('current', 'bg_green');
            tab2.classList.remove('current', 'bg_green');
            tab1Icon.classList.add( 'icon_green');
            tab2Icon.classList.remove('icon_green');
        } else {
            tab2.classList.add('current', 'bg_green');
            tab1.classList.remove('current', 'bg_green');
            tab1Icon.classList.remove( 'icon_green');
            tab2Icon.classList.add( 'icon_green');
        }
        // 콘텐츠 표시 제어: desks[0] 또는 desks[1]
        desks.forEach((d, i) => d.classList.toggle('hidden', i !== index));
        listnews.forEach((ln, i) => ln.classList.toggle('hidden', i !== index));
    }

    // 초기 상태 보장 (HTML 초기 상태와 동기화)
    activate(tab1.classList.contains('current') ? 0 : 1);

    // 클릭 및 키보드 접근성
    tab1.addEventListener('click', e => { e.preventDefault(); activate(0); });
    tab2.addEventListener('click', e => { e.preventDefault(); activate(1); });
    tab1.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(0); } });
    tab2.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(1); } });
});


// ...new file...


document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".box_container2");
    if (!container) return;

    // 1) 탭 h3 전체 선택 (공지, 입찰, 채용, 고시공고)
    const tabs = Array.from(container.querySelectorAll("article h3"));

    // 2) 콘텐츠(.box_desk) 4개
    const desks = Array.from(container.querySelectorAll("article .box_desk"));

    // 3) 리스트(.list_news ul) 4개
    const lists = Array.from(container.querySelectorAll(".list_news ul"));

    // 4) 아이콘 strong 선택 (각 탭의 strong)
    const icons = tabs.map(tab => tab.querySelector("strong"));
    const links = tabs.map(tab => tab.querySelector("a"));

    function activate(index) {

        // --- 탭 스타일 제어 ---
        tabs.forEach((tab, i) => {

            const link = links[i];
            const icon = icons[i];

            if (i === index) {
                link.classList.add("bg_blue", "current");
                icon.classList.add("icon_blue");

            } else {
                link.classList.remove("bg_blue", "current");
                icon.classList.remove("icon_blue");
            }
        });

        // --- 내용 변경(.box_desk) ---
        desks.forEach((desk, i) => {
            desk.classList.toggle("hidden", i !== index);
        });

        // --- 리스트 변경(.list_news ul) ---
        lists.forEach((list, i) => {
            list.classList.toggle("hidden", i !== index);
        });
    }

    // 초기 상태 (공지사항이 current 되어 있음)
    activate(0);

    // --- 이벤트 바인딩 ---
    tabs.forEach((tab, i) => {
        tab.addEventListener("click", e => {
            e.preventDefault();
            activate(i);
        });

        tab.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate(i);
            }
        });
    });

});

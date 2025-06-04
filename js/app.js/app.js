document.addEventListener("DOMContentLoaded", function () {
  // 1) 다크 모드 토글
  const toggleCheckbox = document.getElementById("dark-mode-toggle");
  const htmlEl = document.documentElement;
  // 로컬스토리지에 설정이 있으면 반영
  if (localStorage.getItem("dark-mode") === "enabled") {
    htmlEl.classList.add("dark");
    toggleCheckbox.checked = true;
  }
  toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
      htmlEl.classList.add("dark");
      localStorage.setItem("dark-mode", "enabled");
    } else {
      htmlEl.classList.remove("dark");
      localStorage.setItem("dark-mode", "disabled");
    }
  });

  // 2) 모바일 햄버거 메뉴 열기/닫기
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMobile = document.getElementById("nav-mobile");
  hamburgerBtn.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
    });
  });

  // 3) 스크롤 시 페이드인 애니메이션
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };
  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target);
    });
  },
  appearOptions);
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // 4) 고객 후기 슬라이더 (간단 구현)
  let currentIndex = 0;
  const slidesContainer = document.querySelector("#testimonial-slider .slides");
  const slides = document.querySelectorAll("#testimonial-slider .slide");
  const totalSlides = slides.length;
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }
  prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });
  nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000);

  // 5) 검색 자동완성 (샘플 데이터)
  const markets = [
    "통인시장",
    "광장시장",
    "남대문시장",
    "경동시장",
    "중부시장",
    "송정4일장",
    "학동시장",
  ];
  const searchInput = document.getElementById("market-search");
  const searchResultsEl = document.getElementById("search-results");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      // 입력이 비어있으면 예시 카드 그대로 두거나, 원하는 초기 상태로 복원
      return;
    }
    // 간단 매칭 예시
    const filtered = markets.filter((m) => m.includes(query));
    // 검색 결과 렌더링
    searchResultsEl.innerHTML = "";
    filtered.forEach((marketName) => {
      const card = document.createElement("div");
      card.classList.add("market-card", "fade-in");
      card.innerHTML = `
        <img src="https://via.placeholder.com/300x160.png?text=${encodeURIComponent(
          marketName
        )}" alt="${marketName}" />
        <div class="market-info">
          <h4>${marketName}</h4>
          <p>검색된 시장 정보 예시 설명입니다.</p>
        </div>
      `;
      searchResultsEl.appendChild(card);
      appearOnScroll.observe(card);
    });
  });
});

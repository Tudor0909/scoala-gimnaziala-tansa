(function () {
  "use strict";

  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (_error) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (_error) {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (_error) {
        return false;
      }
    }
  };

  const NOUTATI_DATABASE = [
    {
      id: "pdi-2025-2029",
      title: "Planul de Dezvoltare Instituțională (PDI 2025-2029)",
      url: "noutate.html?id=pdi-2025-2029",
      date: "2025-10-02",
      dateFormatted: "2 oct. 2025",
      excerpt: "A fost aprobat și publicat Planul de Dezvoltare Instituțională al Școlii Gimnaziale Tansa pentru perioada 2025-2029. Deschideți pagina dedicată și documentul PDF.",
      isNew: true,
      keywords: "pdi plan dezvoltare institutionala strategie 2025 2029 aprobare documente",
      eyebrow: "DOCUMENTE OFICIALE &bull; PUBLICAȚIE 2 OCTOMBRIE 2025",
      heroDesc: "Documentul strategic de orientare și dezvoltare a Școlii Gimnaziale Tansa pentru perioada 2025-2029.",
      category: "DOCUMENTE OFICIALE",
      bodyTitle: "Prezentare generală PDI 2025-2029",
      paragraphs: [
        "Școala Gimnazială Tansa anunță aprobarea și publicarea oficială a <strong>Planului de Dezvoltare Instituțională (PDI) pentru perioada 2025-2029</strong>. Documentul stabilește prioritățile strategice, obiectivele educaționale, măsurile de modernizare digitală și investițiile în infrastructura școlară pentru următorii 4 ani."
      ],
      actionBox: {
        type: "download",
        borderLeftColor: "var(--blue)",
        title: "Planul de Dezvoltare Instituțională 2025-2029.pdf",
        meta: "Document PDF oficial &bull; 50 pagini &bull; 5.9 MB",
        btnText: "Deschide PDF",
        url: "documente/pdi-tansa-2025-2029.pdf"
      }
    },
    {
      id: "modernizare-sali",
      title: "Dotări moderne pentru sălile de clasă",
      url: "noutate.html?id=modernizare-sali",
      date: "2025-03-19",
      dateFormatted: "19 martie 2025",
      excerpt: "Școala Gimnazială Tansa beneficiază de o investiție de 533.000 lei pentru mobilier, echipamente digitale și materiale didactice.",
      isNew: false,
      keywords: "pnrr dotari moderne mobilier echipamente digitale 533000 lei investitie modernizare",
      eyebrow: "INVESTIȚII ȘI MODERNIZARE &bull; 19 MARTIE 2025",
      heroDesc: "Școala Gimnazială Tansa beneficiază de un proiect european în valoare de 533.000 lei pentru dotarea și modernizarea sălilor de clasă.",
      category: "PROIECT EUROPEAN",
      bodyTitle: "Investiție de 533.000 lei în infrastructura școlară",
      paragraphs: [
        "Școala Gimnazială Tansa derulează un proiect european important pentru dotarea și modernizarea sălilor de clasă, a cabinetelor de specialitate și a spațiilor de învățământ, finanțat prin Planul Național de Redresare și Reziliență (PNRR).",
        "Proiectul include achiziția de mobilier modern ergonomic, table inteligente interactive, sisteme audio-video avansate, laptopuri pentru cadrele didactice și elevi, precum și materiale didactice de ultimă generație destinate atât corpului principal al școlii, cât și Structurii Suhuleț."
      ],
      actionBox: {
        type: "link",
        borderLeftColor: "var(--green)",
        eyebrow: "Articol de presă — Adminis.ro",
        title: "Școala din Tansa beneficiază de un proiect european pentru dotarea și modernizarea sălilor de clasă",
        meta: "Publicat în presa regională despre investiția de la Tansa",
        btnText: "Citește pe Adminis.ro",
        url: "https://adminis.ro/stiri/scoala-din-tansa-beneficiaza-de-un-proiect-european-pentru-dotarea-si-modernizarea-salilor-de-clasa/"
      }
    }
  ];

  function renderNews() {
    const newsList = document.querySelector(".news-list");
    if (!newsList) return;

    newsList.innerHTML = NOUTATI_DATABASE.map(item => `
      <div class="feed-card searchable">
        ${item.isNew ? '<span class="badge-new-pulse">NOU</span>' : ''}
        <div>
          <h3 style="color: var(--blue); margin-bottom: 6px;">${item.title}</h3>
          <p style="margin-bottom: 12px;">${item.excerpt}</p>
          <a class="feed-card__action" href="${item.url}">Citește noutatea</a>
        </div>
        <time datetime="${item.date}">${item.dateFormatted}</time>
      </div>
    `).join("");
  }

  // Render news dynamically before DOM selectors query .searchable items
  renderNews();

  const root = document.documentElement;
  const body = document.body;
  const mainNav = document.querySelector(".main-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
  const siteSearch = document.querySelector("#siteSearch");
  const siteSearchForm = document.querySelector(".site-search");
  const searchStatus = document.querySelector("#searchStatus");
  const searchableItems = Array.from(document.querySelectorAll(".searchable"));


  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }



  function closeMenu() {
    mainNav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  }

  function setupNavigation() {
    navToggle?.addEventListener("click", () => {
      const isOpen = mainNav?.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
      body.classList.toggle("nav-open", Boolean(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        closeMenu();
        const href = link.getAttribute("href") || "";
        if (href.includes("#")) {
          const [linkPage, targetId] = href.split("#");
          const currentPath = window.location.pathname.split("/").pop() || "index.html";
          const resolvedLinkPage = linkPage || "index.html";
          if ((resolvedLinkPage === currentPath || (currentPath === "" && resolvedLinkPage === "index.html")) && targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              e.preventDefault();
              const headerOffset = 130;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              history.pushState(null, null, `#${targetId}`);
              updateActiveNav();
            }
          }
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    if (!("IntersectionObserver" in window)) {
      return;
    }

    function updateActiveNav() {
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const isHomepage = currentPath === "index.html" || currentPath === "";

      if (isHomepage) {
        const noutatiElem = document.getElementById("noutati");
        let isNoutatiActive = window.location.hash === "#noutati";
        if (noutatiElem) {
          const rect = noutatiElem.getBoundingClientRect();
          isNoutatiActive = rect.top <= 250 && rect.bottom > 150;
        }

        navLinks.forEach((link) => {
          const href = link.getAttribute("href") || "";
          const [linkPage, linkHash] = href.split("#");
          const resolvedLinkPage = linkPage || "index.html";

          if (linkHash === "noutati") {
            link.classList.toggle("is-active", isNoutatiActive);
          } else if (resolvedLinkPage === "index.html" && !linkHash) {
            link.classList.toggle("is-active", !isNoutatiActive);
          } else {
            link.classList.remove("is-active");
          }
        });
      } else {
        navLinks.forEach((link) => {
          const href = link.getAttribute("href") || "";
          const [linkPage, linkHash] = href.split("#");
          const resolvedLinkPage = linkPage || "index.html";
          link.classList.toggle("is-active", resolvedLinkPage === currentPath && !linkHash);
        });
      }
    }

    updateActiveNav();
    window.addEventListener("hashchange", updateActiveNav);
    window.addEventListener("scroll", updateActiveNav, { passive: true });
  }



  function setupTabs() {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const panels = Array.from(document.querySelectorAll(".tab-panel"));

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("aria-controls");

        tabs.forEach((item) => {
          const isActive = item === tab;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-selected", String(isActive));
        });

        panels.forEach((panel) => {
          const isActive = panel.id === targetId;
          panel.hidden = !isActive;
          panel.classList.toggle("is-active", isActive);
        });
      });
    });
  }

  const SITE_SEARCH_DATABASE = [
    // ── ȘCOALA NOASTRĂ (4 secțiuni cu ancore directe) ──
    {
      title: "Profil instituțional & Structură",
      eyebrow: "Unitate de învățământ",
      desc: "Școala Gimnazială Tansa este o unitate de învățământ public (inclusiv Școala Gimnazială Suhuleț)",
      badge: "Școala noastră",
      url: "scoala-noastra.html#profil",
      keywords: "unitate invatamant profil institutional structura uni prof"
    },
    {
      title: "Dotări",
      eyebrow: "Facilități & Infrastructură",
      desc: "Corpuri de clădire în Tansa și Suhuleț, clădiri încălzite centralizat, 14 săli de clasă și bibliotecă școlară",
      badge: "Școala noastră",
      url: "scoala-noastra.html#baza",
      keywords: "facilitati baza materiala laborator informatica biologie chimie biblioteca corpuri cladiri"
    },
    {
      title: "Elevii noștri",
      eyebrow: "Populație școlară",
      desc: "156 elevi înscriși în învățământul primar și gimnazial (clasele pregătitoare – VIII)",
      badge: "Școala noastră",
      url: "scoala-noastra.html#elevi",
      keywords: "elevi elevii 156 primar gimnazial clase pregatitoare copii efectiv"
    },
    {
      title: "Istoric & Comunitate școlară",
      eyebrow: "Tradiție & Comunitate",
      desc: "Tradiție educațională fondată în anul 1894 în comuna Tansa, Iași",
      badge: "Școala noastră",
      url: "scoala-noastra.html#istoric",
      keywords: "istoric comunitate 1894 traditie cadre didactice parinti fondare"
    },

    // ── CONTACT (2 destinații distincte) ──
    {
      title: "Contact",
      eyebrow: "Contact direct",
      desc: "Telefon: 0232 325 202 • Email: scoalatansa@yahoo.com • Program: Luni–Vineri 08:00–16:00",
      badge: "Contact",
      url: "contact.html",
      keywords: "contact telefon secretariat email director secretar dambu carausu formular mesaj"
    },
    {
      title: "Locație & Hartă",
      eyebrow: "Locație",
      desc: "Hartă interactivă cu locația Școlii Gimnaziale Tansa, adresă și indicații GPS",
      badge: "Contact",
      url: "contact.html#harta",
      keywords: "locatie harta unde gasesti adresa gps navigatie strada indicatii"
    },

    // ── NOUTĂȚI ──
    {
      title: "Noutăți",
      eyebrow: "Noutăți",
      desc: "Cele mai noi știri și anunțuri oficiale ale Școlii Gimnaziale Tansa",
      badge: "Noutăți",
      url: "index.html#noutati",
      keywords: "noutati stiri anunturi nou"
    },
    ...NOUTATI_DATABASE.map(item => ({
      title: item.title,
      eyebrow: item.isNew ? "Noutate Nouă" : "Noutate",
      desc: item.excerpt,
      badge: "Noutăți",
      url: item.url,
      keywords: item.keywords
    })),

    // ── ACTIVITĂȚI ──
    {
      title: "Festivalul Toamnei",
      eyebrow: "Activitate școlară",
      desc: "Activitate școlară tradițională desfășurată la Structura Suhuleț (24 Octombrie 2024)",
      badge: "Activități",
      url: "proiecte.html",
      keywords: "festival toamnei suhulet recolta costume ateliere manifestare activitate"
    },

    // ── DOCUMENTE ──
    {
      title: "Orar clase",
      eyebrow: "Orar",
      desc: "Deschide sau descarcă orarul oficial al claselor în format PDF",
      badge: "Documente",
      url: "documente/orar-clase.pdf",
      keywords: "orar ore lectii pdf descarca"
    },

    // ── FOOTER ──
    {
      title: "Ministerul Educației",
      eyebrow: "Legături utile",
      desc: "Portalul oficial al Ministerului Educației Naționale (edu.ro)",
      badge: "Footer",
      url: "https://www.edu.ro/",
      keywords: "ministerul educatiei edu minister"
    },
    {
      title: "ISJ Iași (Inspectoratul Școlar)",
      eyebrow: "Legături utile",
      desc: "Inspectoratul Școlar Județean Iași (isjiasi.ro)",
      badge: "Footer",
      url: "https://www.isjiasi.ro/",
      keywords: "isj iasi inspectoratul scolar judetean"
    },
    {
      title: "ARACIP (Fișa unității Tansa)",
      eyebrow: "Surse date publice",
      desc: "Fișa de evaluare și acreditare instituțională ARACIP pentru Școala Gimnazială Tansa",
      badge: "Footer",
      url: "https://aracip.eu/detalii-unitate-de-invatamant/223212",
      keywords: "aracip fisa acreditare evaluare calitate"
    },
    {
      title: "Profil Școala ECO",
      eyebrow: "Surse date publice",
      desc: "Proiectul național Școala ECO — Școala Gimnazială Tansa",
      badge: "Footer",
      url: "https://scoalaeco.ro/is/scoala-gimnaziala-tansa/",
      keywords: "eco ecologie mediu verde"
    }
  ];

  function setupSearch() {
    if (!siteSearch || !siteSearchForm) return;

    let dropdown = document.querySelector(".search-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "search-dropdown";
      siteSearchForm.appendChild(dropdown);
    }

    function renderDropdown(matches, queryText) {
      if (!queryText.trim()) {
        dropdown.classList.remove("is-active");
        dropdown.innerHTML = "";
        return;
      }

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="search-dropdown__empty">Niciun rezultat pentru „${queryText}”. Încercați alți termeni (ex: elevi, PDI, orar, contact).</div>`;
        dropdown.classList.add("is-active");
        return;
      }

      dropdown.innerHTML = matches
        .slice(0, 5)
        .map(
          (item) => `
          <a class="search-dropdown__item" href="${item.url}">
            <div class="search-dropdown__title">
              <span>${item.title}</span>
              <span class="search-dropdown__badge">${item.badge}</span>
            </div>
            <div class="search-dropdown__desc">${item.desc}</div>
          </a>
        `
        )
        .join("");

      dropdown.classList.add("is-active");
    }

    function handleLiveSearch() {
      const queryText = siteSearch.value.trim();
      const query = normalize(queryText);

      searchableItems.forEach((item) => {
        const haystack = normalize(item.textContent || "");
        const isMatch = !query || haystack.includes(query);
        item.classList.toggle("is-hidden", !isMatch);
      });

      if (!query) {
        dropdown.classList.remove("is-active");
        dropdown.innerHTML = "";
        return;
      }

      function isWordMatch(text, queryStr) {
        if (!text) return false;
        const words = text.split(/[\s,.\-—–/()]+/);
        return words.some((w) => w.startsWith(queryStr));
      }

      function calculateRelevance(entry, queryStr) {
        const titleNorm = normalize(entry.title || "");
        const eyebrowNorm = normalize(entry.eyebrow || "");
        const descNorm = normalize(entry.desc || "");
        const keywordsNorm = normalize(entry.keywords || "");

        let score = 0;

        // Title — highest priority
        if (titleNorm === queryStr) score += 2000;                  // titlu exact identic
        else if (titleNorm.startsWith(queryStr)) score += 1200;     // titlu începe cu termenul
        else if (isWordMatch(titleNorm, queryStr)) score += 900;    // cuvânt în titlu

        // Eyebrow — secundar
        if (eyebrowNorm === queryStr) score += 700;
        else if (eyebrowNorm.startsWith(queryStr)) score += 500;
        else if (isWordMatch(eyebrowNorm, queryStr)) score += 350;

        // Keywords — potrivire directă
        if (isWordMatch(keywordsNorm, queryStr)) score += 250;

        // Desc — cel mai slab
        if (isWordMatch(descNorm, queryStr)) score += 100;

        return score;
      }

      const matchingDatabase = SITE_SEARCH_DATABASE.map((entry) => ({
        ...entry,
        score: calculateRelevance(entry, query)
      }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score);

      renderDropdown(matchingDatabase, queryText);
    }

    siteSearch.addEventListener("input", handleLiveSearch);
    siteSearch.addEventListener("keyup", handleLiveSearch);
    siteSearch.addEventListener("focus", handleLiveSearch);

    document.addEventListener("click", (e) => {
      if (!siteSearchForm.contains(e.target)) {
        dropdown.classList.remove("is-active");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdown.classList.remove("is-active");
      }
    });

    siteSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const queryText = siteSearch.value.trim();
      const query = normalize(queryText);
      if (!query) return;

      function isWordMatch(text, queryStr) {
        const words = text.split(/[\s,.\-—–/()]+/);
        return words.some((w) => w.startsWith(queryStr));
      }

      function calculateRelevance(entry, queryStr) {
        const titleNorm = normalize(entry.title);
        const descNorm = normalize(entry.desc);
        const keywordsNorm = normalize(entry.keywords);

        const titleWordMatch = isWordMatch(titleNorm, queryStr);
        const descWordMatch = isWordMatch(descNorm, queryStr);
        const keywordWordMatch = isWordMatch(keywordsNorm, queryStr);

        if (!titleWordMatch && !descWordMatch && !keywordWordMatch) {
          return 0;
        }

        let score = 0;
        if (titleNorm.startsWith(queryStr)) score += 1000;
        else if (titleWordMatch) score += 500;
        else if (descWordMatch) score += 200;
        else if (keywordWordMatch) score += 100;

        return score;
      }

      const matchingDatabase = SITE_SEARCH_DATABASE.map((entry) => ({
        ...entry,
        score: calculateRelevance(entry, query)
      }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score);

      if (matchingDatabase.length > 0) {
        window.location.href = matchingDatabase[0].url;
      }
    });
  }

  function setupScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const selector = button.getAttribute("data-scroll-target");
        const target = selector ? document.querySelector(selector) : null;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }



  function setupMapTabs() {
    const mapTabs = document.querySelectorAll(".map-tab");
    const frameTansa = document.getElementById("mapFrameTansa");
    const frameSuhulet = document.getElementById("mapFrameSuhulet");

    if (!frameTansa || !frameSuhulet) {
      return;
    }

    function loadMapFor(location) {
      if (location === "tansa") {
        if (frameTansa.dataset.loaded === "true") return;
        const iframe = document.createElement("iframe");
        iframe.title = "Hartă Google Maps — Școala Gimnazială Tansa, Iași";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.src = "https://www.google.com/maps?q=Scoala+Tansa,+Tansa&hl=ro&z=17&output=embed";
        iframe.style.cssText = "width:100%;height:100%;border:0;";
        iframe.allowFullscreen = true;
        frameTansa.appendChild(iframe);
        frameTansa.dataset.loaded = "true";
      } else if (location === "suhulet") {
        if (frameSuhulet.dataset.loaded === "true") return;
        const iframe = document.createElement("iframe");
        iframe.title = "Hartă Google Maps — Școala Gimnazială Suhuleț, Iași";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.src = "https://www.google.com/maps?q=Scoala+1-8+Suhulet&hl=ro&z=17&output=embed";
        iframe.style.cssText = "width:100%;height:100%;border:0;";
        iframe.allowFullscreen = true;
        frameSuhulet.appendChild(iframe);
        frameSuhulet.dataset.loaded = "true";
      }
    }

    // Load initial map (Tansa)
    loadMapFor("tansa");

    mapTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const location = tab.dataset.location;

        // Toggle active button style
        mapTabs.forEach((t) => {
          t.classList.remove("active");
          t.style.background = "var(--paper)";
          t.style.color = "var(--navy)";
          t.style.borderColor = "var(--line)";
        });
        tab.classList.add("active");
        tab.style.background = "var(--blue)";
        tab.style.color = "#ffffff";
        tab.style.borderColor = "var(--blue)";

        // Toggle frame visibility and load
        if (location === "tansa") {
          frameTansa.style.display = "block";
          frameSuhulet.style.display = "none";
          loadMapFor("tansa");
        } else {
          frameTansa.style.display = "none";
          frameSuhulet.style.display = "block";
          loadMapFor("suhulet");
        }
      });
    });
  }

  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  function setupLightbox() {
    let modal = document.querySelector(".lightbox-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "lightbox-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
        <div class="lightbox-modal__content">
          <button type="button" class="lightbox-modal__close" aria-label="Închide poze">&times;</button>
          <img class="lightbox-modal__img" src="" alt="">
          <div class="lightbox-modal__caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector(".lightbox-modal__close");
      closeBtn.addEventListener("click", closeLightbox);
      modal.addEventListener("click", closeLightbox);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
      });
    }

    const modalImg = modal.querySelector(".lightbox-modal__img");
    const modalCaption = modal.querySelector(".lightbox-modal__caption");

    function openLightbox(src, caption) {
      modalImg.src = src;
      modalImg.alt = caption || "Fotografie";
      modalCaption.textContent = caption || "";
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    window.openLightbox = openLightbox;

    // Attach to feature-image-wrapper and any img element
    document.querySelectorAll(".feature-image-wrapper, .gallery-item, article img").forEach((wrapper) => {
      const img = wrapper.tagName === "IMG" ? wrapper : wrapper.querySelector("img");
      if (!img) return;

      const parent = img.closest(".feature-image-wrapper") || img.parentElement;
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "Fotografie";

      img.style.cursor = "pointer";
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(src, alt);
      });

      if (parent && !parent.querySelector(".view-photo-btn")) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "view-photo-btn";
        btn.textContent = "VEZI FOTO";
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openLightbox(src, alt);
        });
        parent.appendChild(btn);
      }
    });
  }

  function setupBackToTop() {
    let btn = document.getElementById("backToTop");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "backToTop";
      btn.className = "back-to-top";
      btn.type = "button";
      btn.setAttribute("aria-label", "Înapoi sus");
      btn.setAttribute("title", "Înapoi sus");
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;
      document.body.appendChild(btn);
    }

    const toggleBtn = () => {
      if (window.scrollY > 280) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
        btn.classList.remove("is-active");
      }
    };

    window.addEventListener("scroll", toggleBtn, { passive: true });
    toggleBtn();

    btn.addEventListener("click", () => {
      btn.classList.add("is-active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        btn.blur();
      }, 100);
    });
  }

  function setupHeaderButtonsFix() {
    document.querySelectorAll(".schedule-top-button, .header-fb-button, .contact-detail-value a").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          btn.blur();
        }, 100);
      });
    });
  }

  function setupContactForm() {
    const form = document.querySelector("#contactForm");
    if (!form) return;

    const submitBtn = form.querySelector("#contactSubmitBtn");
    const resetBtn = form.querySelector("#contactResetBtn");
    const inputs = form.querySelectorAll("input, textarea");

    const originalBtnContent = submitBtn.innerHTML;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      inputs.forEach(input => input.disabled = true);

      submitBtn.disabled = true;
      submitBtn.style.background = "#10b981";
      submitBtn.style.borderColor = "#10b981";
      submitBtn.style.color = "#ffffff";
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Mesajul a fost trimis cu succes!
      `;

      if (resetBtn) {
        resetBtn.style.display = "inline-flex";
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        form.reset();
        inputs.forEach(input => input.disabled = false);

        submitBtn.disabled = false;
        submitBtn.style.background = "";
        submitBtn.style.borderColor = "";
        submitBtn.style.color = "";
        submitBtn.innerHTML = originalBtnContent;

        resetBtn.style.display = "none";
      });
    }
  }

  function initNewsDetailPage() {
    const heroTitle = document.getElementById("newsHeroTitle");
    if (!heroTitle) return; // Not on the news detail page

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get("id");
    const item = NOUTATI_DATABASE.find(x => x.id === newsId);

    if (!item) {
      // Redirect to homepage news if id not found
      window.location.replace("index.html#noutati");
      return;
    }

    // Populate metadata and header text
    document.title = `${item.title} | Școala Gimnazială Tansa`;
    
    const eyebrowEl = document.getElementById("newsHeroEyebrow");
    if (eyebrowEl) eyebrowEl.innerHTML = item.eyebrow;

    heroTitle.textContent = item.title;

    const descEl = document.getElementById("newsHeroDesc");
    if (descEl) descEl.textContent = item.heroDesc;

    // Populate badge (isNew)
    const badge = document.getElementById("newsBadge");
    if (badge) {
      if (item.isNew) {
        badge.style.display = "inline-flex";
        badge.textContent = "NOU";
      } else {
        badge.style.display = "none";
      }
    }

    // Populate date
    const timeEl = document.getElementById("newsDate");
    if (timeEl) {
      timeEl.setAttribute("datetime", item.date);
      timeEl.textContent = `Publicat la ${item.dateFormatted}`;
    }

    // Populate content title and body
    document.getElementById("newsBodyTitle").textContent = item.bodyTitle;

    const bodyContent = document.getElementById("newsBodyContent");
    bodyContent.innerHTML = item.paragraphs
      .map(p => `<p style="font-size: 1.05rem; line-height: 1.7; color: var(--navy); margin-bottom: 20px;">${p}</p>`)
      .join("");

    // Populate dynamic Action Box (Download PDF / Link external)
    const actionBox = document.getElementById("newsActionBox");
    if (actionBox && item.actionBox) {
      actionBox.style.borderLeft = `5px solid ${item.actionBox.borderLeftColor}`;
      
      let html = "<div>";
      if (item.actionBox.type === "link") {
        html += `<span style="font-size: 0.82rem; font-weight: 900; color: ${item.actionBox.borderLeftColor}; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">${item.actionBox.eyebrow}</span>`;
      }
      html += `<strong style="font-size: 1.1rem; color: var(--navy); display: block; margin-bottom: 4px;">${item.actionBox.title}</strong>`;
      html += `<span style="color: var(--muted); font-size: 0.9rem; font-weight: 600;">${item.actionBox.meta}</span>`;
      html += "</div>";
      
      html += `
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="button button--primary" href="${item.actionBox.url}" target="_blank" rel="noreferrer" style="padding: 10px 20px; font-weight: 800;">
            ${item.actionBox.btnText}
          </a>
        </div>
      `;
      
      actionBox.innerHTML = html;
    }
  }

  setupNavigation();
  setupTabs();
  setupSearch();
  setupScrollButtons();
  setupMapTabs();
  setupLightbox();
  setupScrollAnimations();
  setupBackToTop();
  setupHeaderButtonsFix();
  setupContactForm();
  initNewsDetailPage();
})();

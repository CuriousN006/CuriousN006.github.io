(function () {
  const DATA_URL = "data/site.json";

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const normalizeDate = (value) => String(value ?? "").replaceAll("-", ".");

  const categoryHref = (slug) => `category.html?slug=${encodeURIComponent(slug)}`;

  const countPosts = (posts, slug) => posts.filter((post) => post.category === slug).length;

  const findCategory = (data, slug) =>
    data.categories.find((category) => category.slug === slug);

  const currentSlug = () => {
    const fromParams = new URLSearchParams(window.location.search).get("slug");
    return fromParams || document.body.dataset.category || "";
  };

  function renderCategories(data, activeSlug) {
    const list = document.querySelector("[data-category-list]");
    if (!list) return;

    const allCount = data.posts.length;
    const allCurrent = activeSlug ? "" : ' aria-current="page"';
    const categoryItems = data.categories
      .map((category) => {
        const current = category.slug === activeSlug ? ' aria-current="page"' : "";
        return `<li><a${current} href="${categoryHref(category.slug)}"><span>${escapeHtml(
          category.name
        )}</span><b>${countPosts(data.posts, category.slug)}</b></a></li>`;
      })
      .join("");

    list.innerHTML = `<li><a${allCurrent} href="index.html"><span>전체 글</span><b>${allCount}</b></a></li>${categoryItems}`;
  }

  function renderBoard(data, activeSlug) {
    const body = document.querySelector("[data-post-board]");
    if (!body) return;

    const posts = activeSlug
      ? data.posts.filter((post) => post.category === activeSlug)
      : data.posts;

    if (!posts.length) {
      body.innerHTML = `<tr><td colspan="4" class="empty-table">아직 등록된 글이 없습니다.</td></tr>`;
      return;
    }

    body.innerHTML = posts
      .map((post) => {
        const category = findCategory(data, post.category);
        const categoryName = category ? category.name : post.category;
        const categoryLink = category ? categoryHref(category.slug) : "index.html";
        return `<tr>
          <td data-label="No">${escapeHtml(post.id)}</td>
          <td data-label="카테고리"><a href="${categoryLink}">${escapeHtml(categoryName)}</a></td>
          <td data-label="제목">
            <a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a>
            <p>${escapeHtml(post.summary)}</p>
          </td>
          <td data-label="날짜"><time datetime="${escapeHtml(post.date)}">${escapeHtml(
          normalizeDate(post.date)
        )}</time></td>
        </tr>`;
      })
      .join("");
  }

  function renderHeadings(data, activeSlug) {
    const boardHeading = document.querySelector("[data-board-heading]");
    const boardKicker = document.querySelector("[data-board-kicker]");
    const description = document.querySelector("[data-board-description]");
    const category = activeSlug ? findCategory(data, activeSlug) : null;

    if (boardHeading) boardHeading.textContent = category ? category.name : "전체 글";
    if (boardKicker) boardKicker.textContent = category ? "category" : "all posts";
    if (description && category) description.textContent = category.description;
    if (document.title && category) document.title = `${category.name} | ${data.site.title}`;
  }

  function renderCategorySelect(data) {
    const select = document.querySelector("[data-category-select]");
    if (!select) return;

    select.innerHTML = data.categories
      .map((category) => `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</option>`)
      .join("");
  }

  async function boot() {
    try {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const slug = currentSlug();
      renderCategories(data, slug);
      renderHeadings(data, slug);
      renderBoard(data, slug);
      renderCategorySelect(data);
    } catch (error) {
      const body = document.querySelector("[data-post-board]");
      if (body) {
        body.innerHTML = `<tr><td colspan="4" class="empty-table">글 목록 데이터를 불러오지 못했습니다.</td></tr>`;
      }
      console.error(error);
    }
  }

  boot();
})();

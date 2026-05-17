(function () {
  const OWNER = "CuriousN006";
  const REPO = "CuriousN006.github.io";
  const DATA_PATH = "data/site.json";
  const DATA_URL = DATA_PATH;

  const state = {
    data: null,
    sha: null
  };

  const $ = (selector) => document.querySelector(selector);

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const slugify = (value) =>
    String(value || "new-category")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "new-category";

  function setStatus(message, type = "info") {
    const status = $("[data-admin-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.type = type;
  }

  function normalizeData() {
    const rows = [...document.querySelectorAll("[data-category-row]")];
    const categories = rows
      .map((row) => ({
        slug: slugify(row.querySelector("[data-field='slug']").value),
        name: row.querySelector("[data-field='name']").value.trim(),
        description: row.querySelector("[data-field='description']").value.trim()
      }))
      .filter((category) => category.slug && category.name);

    return {
      site: state.data.site,
      categories,
      posts: state.data.posts
    };
  }

  function render() {
    const body = $("[data-admin-categories]");
    if (!body || !state.data) return;

    body.innerHTML = state.data.categories
      .map(
        (category) => `<tr data-category-row>
          <td><input data-field="name" value="${escapeHtml(category.name)}"></td>
          <td><input data-field="slug" value="${escapeHtml(category.slug)}"></td>
          <td><input data-field="description" value="${escapeHtml(category.description)}"></td>
          <td><button type="button" data-remove-category>삭제</button></td>
        </tr>`
      )
      .join("");

    refreshPreview();
  }

  function refreshPreview() {
    const preview = $("[data-json-preview]");
    if (!preview || !state.data) return;
    const nextData = normalizeData();
    preview.value = JSON.stringify(nextData, null, 2);
  }

  function addCategory() {
    const existing = normalizeData();
    existing.categories.push({
      slug: "new-category",
      name: "새 카테고리",
      description: "새 카테고리 설명"
    });
    state.data = existing;
    render();
  }

  function downloadJson() {
    const blob = new Blob([$("[data-json-preview]").value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "site.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyJson() {
    await navigator.clipboard.writeText($("[data-json-preview]").value);
    setStatus("JSON을 클립보드에 복사했습니다.", "success");
  }

  async function boot() {
    try {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      state.data = await response.json();
      render();
      setStatus("카테고리 데이터를 불러왔습니다.", "success");
    } catch (error) {
      setStatus(`데이터를 불러오지 못했습니다: ${error.message}`, "error");
      return;
    }

    document.addEventListener("input", (event) => {
      if (event.target.matches("[data-field]")) refreshPreview();
    });

    document.addEventListener("click", (event) => {
      if (event.target.matches("[data-remove-category]")) {
        event.target.closest("[data-category-row]").remove();
        refreshPreview();
      }
    });

    $("[data-add-category]").addEventListener("click", addCategory);
    $("[data-download-json]").addEventListener("click", downloadJson);
    $("[data-copy-json]").addEventListener("click", copyJson);
  }

  boot();
})();

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

// 處理一般分頁按鈕點擊
tabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    // 如果點擊的是成果按鈕,不執行預設的分頁切換
    if (tab.dataset.target === "result") {
      e.preventDefault();
      return;
    }

    e.preventDefault(); // 阻止 <a> 跳轉
    // 移除所有 active
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    // 顯示當前
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// 處理下拉選單連結點擊
const dropdownLinks = document.querySelectorAll(".dropdown a");
dropdownLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // 先切換到成果頁面
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    const resultTab = document.querySelector('[data-target="result"]');
    resultTab.classList.add("active");
    document.getElementById("result").classList.add("active");

    // 取得目標 ID 並平滑滾動
    const targetId = link.getAttribute("href");
    // 移除開頭的 # 號來取得實際的 ID
    const cleanId = targetId.replace("#", "");
    // 因為 HTML 中的 id 包含了 #,所以要用屬性選擇器來找
    const targetElement = document.querySelector(`[id="${targetId}"]`) || document.getElementById(cleanId);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    }
  });
});

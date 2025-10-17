const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        e.preventDefault(); // 阻止 <a> 跳轉
        // 移除所有 active
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        // 顯示當前
        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
      });
    });

// auth.js
// 登录 / 注册 tab 切换逻辑（UI 练习版，不做表单校验）

(function () {
  const tabs = document.querySelectorAll(".auth-tab-btn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (!tabs.length || !loginForm || !signupForm) return;

  function setMode(mode) {
    tabs.forEach((btn) => {
      const m = btn.getAttribute("data-auth-mode");
      if (m === mode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (mode === "login") {
      loginForm.style.display = "";
      signupForm.style.display = "none";
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "";
    }
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-auth-mode");
      if (mode) setMode(mode);
    });
  });

  // “还没有账号？立即注册 / 已有账号？直接登录” 文本按钮
  const switchButtons = document.querySelectorAll("[data-switch-to]");
  switchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-switch-to");
      if (mode) setMode(mode);
    });
  });
})();

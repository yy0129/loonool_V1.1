// 当前登录用户（示例）
const currentUser = {
  name: "Jinxi",
  initials: "JX",
};

function initUserInfo() {
  const avatarEl = document.getElementById("user-avatar");
  const nameEl = document.getElementById("user-name");
  if (avatarEl) avatarEl.textContent = currentUser.initials || "US";
  if (nameEl) nameEl.textContent = currentUser.name || "User";
}

function initUserMenu() {
  const navUser = document.getElementById("nav-user");
  const trigger = document.getElementById("user-menu-trigger");
  const dropdown = document.getElementById("user-dropdown");
  if (!navUser || !trigger || !dropdown) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    navUser.classList.toggle("open");
  });

  dropdown.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    navUser.classList.remove("open");
  });
}

// 导航行为
function goToProfile() {
  alert("这里将来跳到 /profile（个人中心）。");
}

function goToMySpaces() {
  window.location.href = "entry.html";
}

function logout() {
  alert("这里将来调用登出接口，然后跳转到登录页。");
}

function goToReviewDemo() {
  window.location.href = "review.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initUserInfo();
  initUserMenu();
});

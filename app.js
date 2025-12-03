// 模拟当前登录用户
const currentUser = {
  name: "Jinxi",
  initials: "JX",
};

// ====== 我的空间数据（入口页用） ======
const spaces = [
  {
    id: "SP-001",
    name: "亚马逊主图审核 · 11月活动",
    owner: "Jinxi",
    taskCount: 5,
    lastUpdated: "2025-11-30 18:23",
    status: "active",
  },
  {
    id: "SP-002",
    name: "新品包装图审核 · 新年主题",
    owner: "Design Team",
    taskCount: 3,
    lastUpdated: "2025-11-28 14:05",
    status: "active",
  },
  {
    id: "SP-003",
    name: "历史活动 · 已归档示例",
    owner: "Marketing",
    taskCount: 8,
    lastUpdated: "2025-10-10 09:12",
    status: "archived",
  },
];

function statusLabel(status) {
  return status === "active" ? "活跃" : "已归档";
}

// 渲染入口页的空间表格
function renderSpaces() {
  const tbody = document.getElementById("spaces-tbody");
  const tableWrapper = document.getElementById("spaces-table-wrapper");
  const emptyState = document.getElementById("empty-state");
  if (!tbody || !tableWrapper || !emptyState) return;

  if (!spaces.length) {
    tableWrapper.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  tableWrapper.style.display = "block";
  emptyState.style.display = "none";

  tbody.innerHTML = "";
  spaces.forEach((space) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="space-name">
        <span class="space-name-main">${space.name}</span>
        <span class="space-name-sub">Space ID：${space.id}</span>
      </td>
      <td>${space.owner}</td>
      <td>${space.taskCount}</td>
      <td>${space.lastUpdated}</td>
      <td>
        <span class="status-pill status-${space.status}">
          ${statusLabel(space.status)}
        </span>
      </td>
      <td class="actions-cell">
        <button class="btn-outline" onclick="enterSpace('${space.id}')">
          进入空间
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 进入某个空间 -> 暂时跳到 review.html
function enterSpace(spaceId) {
  console.log("进入空间：", spaceId);
  window.location.href = "review.html";
}

// 创建空间（示例）
function createSpace() {
  console.log("创建新的审核空间");
  alert("这里将来可以弹出创建 Space 的流程（暂时是示例提示）。");
}

// ====== 用户导航相关 ======

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

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    navUser.classList.toggle("open");
  });

  dropdown.addEventListener("click", (event) => event.stopPropagation());

  document.addEventListener("click", () => {
    navUser.classList.remove("open");
  });
}

function goToProfile() {
  alert("这里将来跳转到 /profile（个人中心）");
}

function goToMySpaces() {
  window.location.href = "entry.html";
}

function logout() {
  alert("这里将来调用登出接口，然后跳转到登录页。");
}

// 基础页按钮：预览审核空间
function goToReviewDemo() {
  window.location.href = "review.html";
}

// ====== 审核页 Demo 数据与逻辑 ======

const demoTasks = [
  { id: "T1", name: "任务 1 · 主图选图", imageCount: 3, finalImage: "图 2" },
  { id: "T2", name: "任务 2 · 细节图审核", imageCount: 2, finalImage: "未选定" },
];

const demoImages = [
  {
    id: "I1",
    label: "图 1 · 主视觉",
    isFinal: false,
    thumbColor: "#e5e7eb",
  },
  {
    id: "I2",
    label: "图 2 · 高对比度",
    isFinal: true,
    thumbColor: "#d1fae5",
  },
  {
    id: "I3",
    label: "图 3 · 文字强化版",
    isFinal: false,
    thumbColor: "#fee2e2",
  },
];

const demoDiscussions = [
  {
    author: "Jinxi",
    time: "3 分钟前",
    text: "我更偏向图 2，这个版本在电商小图上会更明显。",
  },
  {
    author: "Design Team",
    time: "刚刚",
    text: "@Marketing 请确认图 2 文案是否有风险。",
  },
];

const demoEvidence = [
  {
    title: "风格一致性 · 初步分析",
    meta: "风格工具 · 由 Jinxi · 5 分钟前生成",
  },
  {
    title: "平台图片规则 · 摘要",
    meta: "外部证据 · 上传者：Legal · 10 分钟前",
  },
];

let currentTaskId = "T1";

function renderTasks() {
  const listEl = document.getElementById("task-list");
  if (!listEl) return;
  listEl.innerHTML = "";
  demoTasks.forEach((task) => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.id === currentTaskId ? " active" : "");
    item.onclick = () => {
      currentTaskId = task.id;
      renderTasks();
      renderReviewSummary();
    };
    item.innerHTML = `
      <div class="task-item-title">${task.name}</div>
      <div class="task-item-meta">图片 ${task.imageCount} 张 · Final：${task.finalImage}</div>
    `;
    listEl.appendChild(item);
  });
}

function renderImages() {
  const gridEl = document.getElementById("image-grid");
  const emptyEl = document.getElementById("image-empty");
  const countLabel = document.getElementById("image-count-label");
  if (!gridEl || !emptyEl || !countLabel) return;

  if (!demoImages.length) {
    gridEl.style.display = "none";
    emptyEl.style.display = "block";
    countLabel.textContent = "暂无图片";
    return;
  }

  gridEl.style.display = "grid";
  emptyEl.style.display = "none";

  const currentTask = demoTasks.find((t) => t.id === currentTaskId);
  countLabel.textContent = `${currentTask ? currentTask.name : "当前任务"} · ${
    currentTask ? currentTask.imageCount : demoImages.length
  }/6`;

  gridEl.innerHTML = "";
  demoImages.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "image-card";
    card.onclick = () => {
      alert(`预览 ${img.label}（可以做全屏预览弹窗）`);
    };

    const thumb = document.createElement("div");
    thumb.className = "image-thumb";
    thumb.style.background = img.thumbColor;

    const meta = document.createElement("div");
    meta.className = "image-meta";
    meta.innerHTML = `
      <span>${img.label}</span>
      <span class="image-badge ${
        img.isFinal ? "final" : ""
      }">${img.isFinal ? "Final" : `候选 · #${index + 1}`}</span>
    `;

    card.appendChild(thumb);
    card.appendChild(meta);
    gridEl.appendChild(card);
  });
}

function renderDiscussions() {
  const listEl = document.getElementById("discussion-list");
  if (!listEl) return;
  listEl.innerHTML = "";
  demoDiscussions.forEach((msg) => {
    const item = document.createElement("div");
    item.className = "discussion-item";
    item.innerHTML = `
      <div class="discussion-author">${msg.author}</div>
      <div class="discussion-meta">${msg.time}</div>
      <div class="discussion-text">${msg.text}</div>
    `;
    listEl.appendChild(item);
  });
}

function renderReviewSummary() {
  const taskNameEl = document.getElementById("task-name-label");
  const imgCountEl = document.getElementById("summary-image-count");
  const finalLabelEl = document.getElementById("summary-final-label");
  if (!taskNameEl || !imgCountEl || !finalLabelEl) return;

  const currentTask = demoTasks.find((t) => t.id === currentTaskId);
  if (!currentTask) return;

  taskNameEl.textContent = currentTask.name;
  imgCountEl.textContent = `${currentTask.imageCount} / 6`;
  finalLabelEl.textContent = currentTask.finalImage
    ? `已选定 · ${currentTask.finalImage}`
    : "未选定";
}

function renderEvidence() {
  const listEl = document.getElementById("evidence-list");
  if (!listEl) return;
  listEl.innerHTML = "";
  demoEvidence.forEach((ev) => {
    const item = document.createElement("div");
    item.className = "evidence-item";
    item.innerHTML = `
      <div class="evidence-item-title">${ev.title}</div>
      <div class="evidence-item-meta">${ev.meta}</div>
    `;
    listEl.appendChild(item);
  });
}

// 审核页：各种 Demo 行为
function uploadImagesDemo() {
  alert("这里将来是上传图片的入口（当前为 Demo 提示）。");
}

function exportResultsDemo() {
  alert("这里将来导出所有有 Final 图片的任务结果（当前为 Demo 提示）。");
}

function inviteMembersDemo() {
  alert("这里将来生成邀请链接，邀请成员加入当前 Space。");
}

function sendDiscussionDemo() {
  const input = document.getElementById("discussion-input");
  if (!input || !input.value.trim()) return;
  demoDiscussions.push({
    author: currentUser.name,
    time: "刚刚",
    text: input.value.trim(),
  });
  input.value = "";
  renderDiscussions();
}

function uploadEvidenceDemo() {
  alert("这里将来上传 PDF / 截图并写入 Evidence List。");
}

function runToolDemo(toolName) {
  alert(`执行分析工具：【${toolName}】（当前为 Demo 提示）。`);
}

// 初始化各页面
function initBasePage() {
  console.log("初始化基础页");
}

function initEntryPage() {
  console.log("初始化入口页（我的空间）");
  renderSpaces();
}

function initReviewPage() {
  console.log("初始化审核页");
  renderTasks();
  renderImages();
  renderDiscussions();
  renderReviewSummary();
  renderEvidence();
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initUserInfo();
  initUserMenu();

  const body = document.body;
  const pageType = body.getAttribute("data-page");

  if (pageType === "base") initBasePage();
  if (pageType === "entry") initEntryPage();
  if (pageType === "review") initReviewPage();
});

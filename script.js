// 1. Tạo 5 công việc mẫu theo yêu cầu
let tasks = [
    { id: 1, name: "Thiết kế layout UI", deadline: "2026-10-14", priority: "Cao", completed: false },
    { id: 2, name: "Code HTML form", deadline: "2026-10-14", priority: "Cao", completed: true },
    { id: 3, name: "Style CSS responsive", deadline: "2026-10-15", priority: "Trung bình", completed: false },
    { id: 4, name: "Viết logic JavaScript", deadline: "2026-10-16", priority: "Cao", completed: false },
    { id: 5, name: "Kiểm tra lỗi và nộp bài", deadline: "2026-10-17", priority: "Thấp", completed: false }
];

// Lấy các phần tử từ DOM
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskPriorityInput = document.getElementById('task-priority');
const errorMessage = document.getElementById('error-message');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');

// 2. Hàm render (hiển thị) danh sách công việc
function renderTasks(tasksToRender) {
    taskList.innerHTML = ''; 
    
    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-info">
                <strong>${task.name}</strong>
                <span style="font-size: 13px; color: #555;">Hạn: ${task.deadline || 'Không có'} | Mức ưu tiên: ${task.priority}</span>
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Hoàn tác' : 'Hoàn thành'}
                </button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Xóa</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// 3. Xử lý sự kiện thêm công việc
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = taskNameInput.value.trim();
    
    // Kiểm tra tên rỗng
    if (name === '') {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';

    // Thêm object mới
    const newTask = {
        id: Date.now(),
        name: name,
        deadline: taskDeadlineInput.value,
        priority: taskPriorityInput.value,
        completed: false
    };

    tasks.unshift(newTask); // Thêm lên đầu danh sách
    taskForm.reset(); // Xóa nội dung trên form
    applySearchAndFilter(); // Cập nhật lại giao diện
});

// 4. Đánh dấu hoàn thành
window.toggleTask = function(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        applySearchAndFilter();
    }
};

// 5. Xóa công việc
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    applySearchAndFilter();
};

// 6. Xử lý tìm kiếm và lọc
function applySearchAndFilter() {
    const keyword = searchInput.value.toLowerCase();
    const status = filterStatus.value;

    const filtered = tasks.filter(task => {
        const matchKeyword = task.name.toLowerCase().includes(keyword);
        let matchStatus = true;
        
        if (status === 'completed') {
            matchStatus = task.completed === true;
        } else if (status === 'incomplete') {
            matchStatus = task.completed === false;
        }
        
        return matchKeyword && matchStatus;
    });

    renderTasks(filtered);
}

// Lắng nghe sự kiện gõ phím để tìm kiếm và chọn bộ lọc
searchInput.addEventListener('input', applySearchAndFilter);
filterStatus.addEventListener('change', applySearchAndFilter);

// 7. Gọi hàm hiển thị lần đầu khi load trang
renderTasks(tasks);
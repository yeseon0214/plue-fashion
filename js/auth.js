const Auth = {
    admin: {
        name: 'PLUE.Officl',
        password: 'jys#170214'
    },

    signup: (name, communication, password) => {
        if (!name || !communication || !password) {
            alert('모든 항목을 입력해주세요.');
            return false;
        }

        const users = Storage.getUsers();
        if (users.find(u => u.name === name)) {
            alert('이미 존재하는 이름입니다.');
            return false;
        }

        users.push({ name, communication, password, createdAt: new Date().toISOString() });
        Storage.saveUsers(users);
        alert('회원가입이 완료되었습니다!');
        return true;
    },

    login: (name, password) => {
        if (!name || !password) {
            alert('이름과 비밀번호를 입력해주세요.');
            return false;
        }

        // 관리자 로그인
        if (name === Auth.admin.name && password === Auth.admin.password) {
            Storage.setCurrentUser({ name, isAdmin: true });
            window.location.href = 'pages/admin.html';
            return true;
        }

        // 일반 사용자 로그인
        const users = Storage.getUsers();
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            Storage.setCurrentUser({ name: user.name, communication: user.communication });
            window.location.href = '#';
            location.reload();
            return true;
        }

        alert('이름 또는 비밀번호가 잘못되었습니다.');
        return false;
    },

    logout: () => {
        Storage.clearCurrentUser();
        location.reload();
    },

    isLoggedIn: () => !!Storage.getCurrentUser(),
    isAdmin: () => Storage.getCurrentUser()?.isAdmin || false
};

// DOM 요소 관련 함수
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function logout() {
    Auth.logout();
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const userMenu = document.getElementById('userMenu');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal('loginModal'));
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => openModal('signupModal'));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('loginName').value;
            const password = document.getElementById('loginPassword').value;
            Auth.login(name, password);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const communication = document.getElementById('communication').value;
            const password = document.getElementById('signupPassword').value;
            if (Auth.signup(name, communication, password)) {
                closeModal('signupModal');
                document.getElementById('signupForm').reset();
            }
        });
    }

    // 로그인 상태 표시
    const currentUser = Storage.getCurrentUser();
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            userMenu.innerHTML = `
                <a href="pages/mypage.html" class="user-menu-link">마이페이지</a>
                <button class="user-menu-link" onclick="logout()">로그아웃</button>
            `;
        }
    }
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});
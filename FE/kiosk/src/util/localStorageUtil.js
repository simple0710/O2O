export function saveLockerBodyIdFromLocal() {
    localStorage.setItem('locker_body_id', 1);
}

export function getLockerBodyIdFromLocal() {
    return localStorage.getItem('locker_body_id');
}

// 사용자 정보를 로컬 스토리지에 저장하는 함수
export function saveUserToLocal(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// 로컬 스토리지에서 사용자 정보를 가져오는 함수
export function getUserFromLocal() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
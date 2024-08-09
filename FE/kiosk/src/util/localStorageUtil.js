export function saveLockerBodyIdFromLocal() {
    localStorage.setItem('locker_body_id', 2);
}

export function getLockerBodyIdFromLocal() {
    return localStorage.getItem('locker_body_id');
}
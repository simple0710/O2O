

export function saveObjectToSession(key, data){
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function getObjectFromSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function getUserIdFromSession(){
    const data = getObjectFromSession("user");
    if(data != null && data.user_id){
        return data.user_id;
    }
    return null;
}
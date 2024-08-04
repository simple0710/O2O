
export function formatDate(date){
    let newDate = new Date(date);
    if(isNaN(newDate)) return date;
    // 8월 4일 16시 24분
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('ko-KR', options); // "8월 4일"
    const formattedTime = newDate.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' }); // "16시 24분"

    return `${formattedDate} ${formattedTime}`; // "8월 4일 16시 24분"
}

export function formatDateSimple(date){
    let newDate = new Date(date);
    if(isNaN(newDate)) return date;
    // 8.4 16:30

    const formattedDate = newDate.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric'
    }); // "8.4"

    const formattedTime = newDate.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
    }); // "16:30"

    return `${formattedDate} ${formattedTime}`; 
}
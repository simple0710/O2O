
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
    // 8.4 16:30
    let newDate = new Date(date);
    if(isNaN(newDate)) return date;
    // 8.4 16:30
    const month = newDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
    const day = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes().toString().padStart(2, '0'); // 2자리로 맞춤

    return `${month}.${day} ${hours}:${minutes}`;
}
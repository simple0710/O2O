export function base64ToFile(dataType, base64String, fileName) {
 
     // Base64 문자열에서 데이터 타입과 실제 데이터 분리
     if(!base64String) return null;
     const mime = dataType;
     const cleanBase64 = base64String.replace(/^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/, ""); // data URL 형식 제거
 
     // Base64 문자열이 올바른 형식인지 확인
     if (cleanBase64.length % 4 !== 0) {
         throw new Error("Invalid base64 string");
     }
 
     // Base64 문자열을 디코딩
     const bstr = atob(cleanBase64);
     const n = bstr.length;
     const u8arr = new Uint8Array(n);
     
     for (let i = 0; i < n; i++) {
         u8arr[i] = bstr.charCodeAt(i);
     }
 
    
    return new File([u8arr], fileName, {type:mime});
}

export function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name; // 다운로드할 파일 이름 설정
    document.body.appendChild(a);
    a.click(); // 링크 클릭하여 다운로드 시작
    document.body.removeChild(a); // 링크 제거
    URL.revokeObjectURL(url); // 메모리 해제
}
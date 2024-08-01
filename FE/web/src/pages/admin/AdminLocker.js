// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../style/AdminMainpage.css';
// import '../../style/AdminLocker.css';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { ScaleLoader} from 'react-spinners';

// const LockerInfo = () => {
//   const [lockersData, setLockersData] = useState([]);
//   const [lockerDetails, setLockerDetails] = useState([]);
//   const [selectedLockerBody, setSelectedLockerBody] = useState(null);
//   const [lockerOptions, setLockerOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingStartTime, setLoadingStartTime] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     // 쿼리 파라미터에서 locker_body_id 추출
//     const queryParams = new URLSearchParams(location.search);
//     const lockerBodyId = queryParams.get('locker_body_id');

//     // 사물함 이름 데이터 로드
//     axios.get('/lockers/names')
//       .then(response => {
//         const data = response.data.data;
//         console.log('Fetched lockers data:', data);
//         setLockersData(data);

//         const options = data.map(lockerBody => ({
//           value: lockerBody.locker_body_name,
//           label: lockerBody.locker_body_name,
//           id: lockerBody.locker_body_id
//         }));
//         setLockerOptions(options);

//         // 선택된 사물함이 있을 경우 lockerDetails 로드
//         if (lockerBodyId) {
//           const selectedBody = data.find(body => body.locker_body_id.toString() === lockerBodyId);
//           if (selectedBody) {
//             setSelectedLockerBody(selectedBody);
//             startLoading(); // 로딩 시작
//             // 선택된 사물함의 lockers 데이터 로드
//             axios.get(`/lockers?locker_body_id=${lockerBodyId}`)
//               .then(response => {
//                 const lockers = response.data.data;
//                 setLockerDetails(lockers);
//               })
//               .catch(error => console.error('Failed to load locker details:', error))
//               .finally(() => {
//                 stopLoading(); // 로딩 종료
//               });
//           }
//         }
//       })
//       .catch(error => console.error('Failed to load locker data:', error));
//   }, [location.search]);

//   const startLoading = () => {
//     setIsLoading(true);
//     setLoadingStartTime(Date.now());
//   };

//   const stopLoading = () => {
//     // 3초 후 로딩 종료
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleLockerChange = (event) => {
//     const lockerBodyName = event.target.value;
//     const selectedBody = lockersData.find(body => body.locker_body_name === lockerBodyName);

//     // 이전 정보 초기화
//     setLockerDetails([]);
//     setSelectedLockerBody(selectedBody);

//     if (selectedBody) {
//       startLoading(); // 로딩 시작
//       axios.get(`/lockers?locker_body_id=${selectedBody.locker_body_id}`)
//         .then(response => {
//           const lockers = response.data.data;
//           setLockerDetails(lockers);
//         })
//         .catch(error => console.error('Failed to load locker details:', error))
//         .finally(() => {
//           stopLoading(); // 로딩 종료
//         });
//     }
//   };

//   const renderTable = () => {
//     if (!selectedLockerBody) return null;

//     const { row, column } = selectedLockerBody;

//     const table = Array.from({ length: row }, () => Array.from({ length: column }).fill(null));

//     lockerDetails.forEach(locker => {
//       const { locker_row, locker_column, product_nm, total_cnt, product_cnt } = locker;
//       if (locker_row && locker_column) {
//         table[locker_row - 1][locker_column - 1] = { product_nm, total_cnt, product_cnt };
//       }
//     });

//     return (
//       <table className="locker-table">
//         <tbody>
//           {Array.from({ length: row }).map((_, rowIndex) => (
//             <tr key={rowIndex}>
//               {Array.from({ length: column }).map((_, colIndex) => (
//                 <td key={colIndex} className="locker-cell">
//                   {table[rowIndex][colIndex] ? (
//                     <div className='rounded-content'>
//                       <div>{table[rowIndex][colIndex].product_nm}</div>
//                       <div>({table[rowIndex][colIndex].product_cnt}/{table[rowIndex][colIndex].total_cnt})</div>
//                     </div>
//                   ) : (
//                     <div className="rounded-content">
//                       <div>none</div>
//                       <div>0/0</div>
//                     </div>
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div>
//       <h3>사물함 정보 조회</h3>
//       <br />
//       <select onChange={handleLockerChange} className="locker-select">
//         <option value="">사물함을 선택하세요</option>
//         {lockerOptions.map(option => (
//           <option key={option.id} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {isLoading ? (
//         <div className='spinner'>
//           <ScaleLoader 
//             color='lightblue'
//             size='50'
//           />
//         </div>
//       ) : (
//         selectedLockerBody && (
//           <div>
//             {renderTable()}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default LockerInfo;


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/AdminMainpage.css';
import '../../style/AdminLocker.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ScaleLoader} from 'react-spinners';

const LockerInfo = () => {
  const [lockersData, setLockersData] = useState([]);
  const [lockerDetails, setLockerDetails] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [lockerOptions, setLockerOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // 쿼리 파라미터에서 locker_body_id 추출
    const queryParams = new URLSearchParams(location.search);
    const lockerBodyId = queryParams.get('locker_body_id');

    // 사물함 이름 데이터 로드
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        console.log('Fetched lockers data:', data);
        setLockersData(data);

        const options = data.map(lockerBody => ({
          value: lockerBody.locker_body_name,
          label: lockerBody.locker_body_name,
          id: lockerBody.locker_body_id
        }));
        setLockerOptions(options);

        // 선택된 사물함이 있을 경우 lockerDetails 로드
        if (lockerBodyId) {
          const selectedBody = data.find(body => body.locker_body_id.toString() === lockerBodyId);
          if (selectedBody) {
            setSelectedLockerBody(selectedBody);
            startLoading(); // 로딩 시작
            // 선택된 사물함의 lockers 데이터 로드
            axios.get(`/lockers?locker_body_id=${lockerBodyId}`)
              .then(response => {
                const lockers = response.data.data;
                setLockerDetails(lockers);
              })
              .catch(error => console.error('Failed to load locker details:', error))
              .finally(() => {
                stopLoading(); // 로딩 종료
              });
          }
        }
      })
      .catch(error => console.error('Failed to load locker data:', error));
  }, [location.search]);

  const startLoading = () => {
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  };

  const stopLoading = () => {
    // 3초 후 로딩 종료
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleLockerChange = (event) => {
    const lockerBodyName = event.target.value;
    const selectedBody = lockersData.find(body => body.locker_body_name === lockerBodyName);

    // 이전 정보 초기화
    setLockerDetails([]);
    setSelectedLockerBody(selectedBody);

    if (selectedBody) {
      startLoading(); // 로딩 시작
      axios.get(`/lockers?locker_body_id=${selectedBody.locker_body_id}`)
        .then(response => {
          const lockers = response.data.data;
          setLockerDetails(lockers);
        })
        .catch(error => console.error('Failed to load locker details:', error))
        .finally(() => {
          stopLoading(); // 로딩 종료
        });
    }
  };

  const renderTable = () => {
    if (!selectedLockerBody) return null;

    const { row, column } = selectedLockerBody;

    const table = Array.from({ length: row }, () => Array.from({ length: column }).fill(null));

    lockerDetails.forEach(locker => {
      const { locker_row, locker_column, product_nm, total_cnt, product_cnt } = locker;
      if (locker_row && locker_column) {
        table[locker_row - 1][locker_column - 1] = { product_nm, total_cnt, product_cnt };
      }
    });

    return (
      <table className="locker-table">
        <tbody>
          {Array.from({ length: row }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: column }).map((_, colIndex) => (
                <td key={colIndex} className="locker-cell">
                  {table[rowIndex][colIndex] ? (
                    <div className='rounded-content'>
                      <div>{table[rowIndex][colIndex].product_nm}</div>
                      <div>({table[rowIndex][colIndex].product_cnt}/{table[rowIndex][colIndex].total_cnt})</div>
                    </div>
                  ) : (
                    <div className="rounded-content">
                      <div>none</div>
                      <div>0/0</div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h3>사물함 정보 조회</h3>
      <br />
      <select onChange={handleLockerChange} className="locker-select">
        <option value="">사물함을 선택하세요</option>
        {lockerOptions.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isLoading ? (
        <div className='spinner'>
          <ScaleLoader 
            color='lightblue'
            size='50'
          />
        </div>
      ) : (
        selectedLockerBody && (
          <div>
            {renderTable()}
          </div>
        )
      )}
    </div>
  );
};

export default LockerInfo;

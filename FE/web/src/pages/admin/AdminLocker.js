import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/AdminMainpage.css';
import '../../style/AdminLocker.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const LockerInfo = () => {
  const [lockersData, setLockersData] = useState([]);
  const [lockerDetails, setLockerDetails] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [lockerOptions, setLockerOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const lockerBodyId = queryParams.get('locker_body_id');

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

        const initialSelectedBody = lockerBodyId 
          ? data.find(body => body.locker_body_id.toString() === lockerBodyId) 
          : data[0]; // 첫 번째 사물함 선택

        if (initialSelectedBody) {
          setSelectedLockerBody(initialSelectedBody);
          startLoading();
          axios.get(`/lockers?locker_body_id=${initialSelectedBody.locker_body_id}`)
            .then(response => {
              const lockers = response.data.data;
              setLockerDetails(lockers);
              setIsLogoVisible(false);
            })
            .catch(error => console.error('Failed to load locker details:', error))
            .finally(() => {
              stopLoading();
            });
        }
      })
      .catch(error => console.error('Failed to load locker data:', error))
      .finally(() => {
        setIsLoading(false); // 초기 로딩 상태 종료
      });
  }, [location.search]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleLockerChange = (event) => {
    const lockerBodyName = event.target.value;
    const selectedBody = lockersData.find(body => body.locker_body_name === lockerBodyName);

    setLockerDetails([]);
    setSelectedLockerBody(selectedBody);

    if (selectedBody) {
      startLoading();
      axios.get(`/lockers?locker_body_id=${selectedBody.locker_body_id}`)
        .then(response => {
          const lockers = response.data.data;
          setLockerDetails(lockers);
          setIsLogoVisible(false);
        })
        .catch(error => console.error('Failed to load locker details:', error))
        .finally(() => {
          stopLoading();
        });
    }
  };

  const renderTable = () => {
    if (!selectedLockerBody) return null;

    const { row, column } = selectedLockerBody;

    // Create a table structure with empty cells
    const table = Array.from({ length: row }, () => Array.from({ length: column }).fill(null));

    // Populate the table with locker details
    lockerDetails.forEach(locker => {
      const { locker_row, locker_column, product_nm, total_cnt, product_cnt } = locker;
      if (locker_row && locker_column && locker_row <= row && locker_column <= column) {
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
                      <div className='admin-spinner'>
                        <ScaleLoader 
                          color='gray'
                          size='50'
                        />
                      </div>
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
      <select onChange={handleLockerChange} value={selectedLockerBody ? selectedLockerBody.locker_body_name : ''} className="locker-select">
        {lockerOptions.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isLoading ? (
        <div className='admin-spinner'>
          <ScaleLoader 
            color='gray'
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

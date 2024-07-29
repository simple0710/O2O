import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/AdminMainpage.css';
import '../../style/AdminLocker.css';
import axios from 'axios';


const LockerInfo = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLockerBody, setSelectedLockerBody] = useState(null);
  const [lockerOptions, setLockerOptions] = useState([]);

  useEffect(() => {
    
    axios.get('/locker.json')
      .then(response => {
        const data = response.data;
        setLockersData(data);

        
        const options = data.map(lockerBody => ({
          value: lockerBody.locker_body_name,
          label: lockerBody.locker_body_name
        }));
        setLockerOptions(options);
      })
      .catch(error => console.error('Failed to load locker data:', error));
  }, []);

  const handleLockerChange = (event) => {
    const lockerBodyName = event.target.value;
    const selectedBody = lockersData.find(body => body.locker_body_name === lockerBodyName);
    setSelectedLockerBody(selectedBody);
  };

  const renderTable = () => {
    if (!selectedLockerBody) return null;

    const { row, column, lockers } = selectedLockerBody;

    const table = Array.from({ length: row }, () => Array.from({ length: column }).fill(null));

    lockers.forEach(locker => {
      const { locker_row, locker_column, product_nm, total_cnt, product_cnt } = locker;
      table[locker_row - 1][locker_column - 1] = { product_nm, total_cnt, product_cnt };
    });

    return (
      <table className="locker-table">
        <tbody>
          {Array.from({ length: row }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: column }).map((_, colIndex) => (
                <td key={colIndex} className="locker-cell">
                  {table[rowIndex][colIndex] ? (
                    <>
                      <div>{table[rowIndex][colIndex].product_nm}</div>
                      <div>({table[rowIndex][colIndex].product_cnt}/{table[rowIndex][colIndex].total_cnt})</div>
                    </>
                  ) : (
                    'none'
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
      <br></br>
      <select onChange={handleLockerChange} className="locker-select">
        <option value="">사물함을 선택하세요</option>
        {lockerOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {selectedLockerBody && (
        <div>
          {renderTable()}
        </div>
      )}
    </div>
  );
};

export default LockerInfo;

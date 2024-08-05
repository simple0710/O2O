import React, {useState} from 'react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import '../../style/RequestItme.css'
import { Table } from 'react-bootstrap'

const NotRefund = () => {

    return (
        <div>
            <Nav/>
            <div className="content-container">
                <Sidebar/>
                <div className='content'>
                <div className='title'>
            <h3>미반납 물품 조회</h3>
          </div>
          <Table className='custom-table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>물품명</th>
                <th>물품 개수</th>
                <th>사물함 위치</th>
                <th>반납 예정 일자</th>
              </tr>
            </thead>
            <tbody>
              {/* {overdueUsers.map((user, index) => (
                <tr key={index}>
                 <td></td>
                </tr>
              ))} */}
            </tbody>
          </Table>
                </div>
            </div>
        </div>
    );
};


export default NotRefund;
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/MainPageApp.css';
import '../../style/Locker.css';
import { Modal } from 'react-bootstrap';

const Locker = () => {
    return (
        <div className="outer-box">
            <p>사물함</p>
            <table className="responsive-table">
                <tbody>
                <tr>
                    <td>Table cell 1</td>
                    <td>Table cell 2</td>
                    <td>Table cell 2</td>
                </tr>
                <tr>
                    <td>Table cell 3</td>
                    <td>Table cell 4</td>
                    <td>Table cell 2</td>
                </tr>
                <tr>
                    <td>Table cell 3</td>
                    <td>Table cell 4</td>
                    <td>Table cell 2</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Locker;

import spinner from '../../assets/img/spinner.gif'
import '../../styles/common/Common.css'

export const Loading = ({msg}) => {
    return (
        <div className='center-div'>
            <img src={spinner} alt="로딩 중" />
            <br/>
            <p className='center-p'>{msg}</p>
        </div>
    );
};


    
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalComponent from './modalComponent';
import "../styles/blink.css"

function MonitorItem({index, data, satuan, ket, alarm, enableAlarm, fullData, ba }) {

  const [show, setShow] = useState(false);
  // console.log("Monitoring : ", localStorage.getItem("blink"))
  function handleClose () {
    setShow(false)
  }
  const formatNum = (num) => {
    var formattedNum = ("0"+num).slice(-2)
    return formattedNum
  }

  return (
    // <div className=''>
      <div 
        className= { ket=="Status" && data == 2 || data ==3 ? 'col-2 mx-auto text-center mt-3 border my-border-radius shadow bg-warning text-white'
          : ket=="Status" && data == 1 ? 'col-2 mx-auto text-center mt-3 border my-border-radius shadow bg-success text-white': alarm && enableAlarm  ?
          'col-2 mx-auto text-center mt-3 border my-border-radius shadow bg-danger text-white':
          'col-2 mx-auto text-center mt-3 border my-border-radius shadow'
        }
      // style={alarm && enableAlarm ? {animation: "blink"}:{}}
      >
        <button className='btn' onClick={()=>setShow(true)}>
          <img src='/assets/Settings.png' width={30} height={30} className='mt-2' />
        </button>
        
        <div className='isiData mt-3'>
          <h1 className='fw-bold fs-1'>{ket=="Status"? (data==1?"RUN": data == 0 ? "STOP" : data == 2 ? "START UP" : "COOL DOWN") : (ket=="Running Hour"?`${formatNum(Math.floor(data/60))}:${formatNum(data%60)}`: data)}</h1>
        </div>
        <div className='keterangan mt-3'>
          <h3 className='fw-bold fs-4'>{ket=="Status"? "." : satuan}</h3>
          <h4 className='fw-bold fs-5'>{ket}</h4>
        </div>

        <ModalComponent
          show={show}
          handleClose={handleClose}
          nama = {ket}
          fullData={fullData}
          index={index}
        />
      </div>
    // </div>
    
  )
}

export default MonitorItem
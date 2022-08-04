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

  return (
    // <div className=''>
      <div className={ alarm && enableAlarm && localStorage.getItem("blink")=='true' ?' col-2 mx-auto text-center mt-3 border border-3 border-danger my-border-radius shadow':'col-2 mx-auto text-center mt-3 border my-border-radius shadow'}
      // style={alarm && enableAlarm ? {animation: "blink"}:{}}
      >
        <button className='btn' onClick={()=>setShow(true)}>
          <img src='/assets/Settings.png' width={30} height={30} className='mt-2' />
        </button>
        
        <div className='isiData mt-3'>
          <h1 className='fw-bold fs-1'>{ket=="Status"? (data==1?"RUN":"STOP") : (ket=="Running Hour"?`${Math.floor(data/60)}:${data%60}`: data)}</h1>
        </div>
        <div className='keterangan mt-3'>
          <h3 className='fw-bold fs-4'>{satuan}</h3>
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
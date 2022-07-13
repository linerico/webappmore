import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalComponent from './modalComponent';

function MonitorItem({index, data, satuan, ket, alarm, enableAlarm, fullData }) {

  const [show, setShow] = useState(false);

  function handleClose () {
    setShow(false)
  }

  return (
    <div className={alarm && enableAlarm ?'col-2 mx-auto text-center mt-3 border border-danger my-border-radius shadow':'col-2 mx-auto text-center mt-3 border my-border-radius shadow'}>
      <button className='btn' onClick={()=>setShow(true)}>
        <img src='/assets/Settings.png' width={30} height={30} className='mt-2' />
      </button>
      
      <div className='isiData mt-3'>
        <h1 className='fw-bold fs-1'>{data}</h1>
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
  )
}

export default MonitorItem
import React, { useState } from 'react';
import NavBar from '../components/NavBar.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, Router, useHistory, useParams } from 'react-router-dom';
import PemantauanComp from '../components/PemantauanComp.js';
import LaporanComp from '../components/LaporanComp.js';
import DocumentComp from '../components/DocumentComp.js';
import NavbarHeader from '../components/navbarHeader.js';


function Monitoring() {

  const router = useHistory()

  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false)
  }

  const {homeId,mesinId} = useParams()
  localStorage.setItem("activeMesin", mesinId)  
  return (
    <div className='monitoring'>
      <NavBar />
      <div className='content'>
        <NavbarHeader
        step2={2}
        step1={1}
        homeId={homeId}
        mesinId={mesinId}
        />

        
        <div className='nav container mt-5'>
          <Tabs
            defaultActiveKey="Pemantauan"
            id="uncontrolled-tab-example"
            className="mb-5 w-100"
          >
            <Tab eventKey="Pemantauan" title="Pemantauan" className="w-100">
              <PemantauanComp />
            </Tab>
            <Tab eventKey="Laporan" title="Laporan">
              <LaporanComp />
            </Tab>
            <Tab eventKey="Dokumen" title="Dokumen">
              <DocumentComp />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Monitoring
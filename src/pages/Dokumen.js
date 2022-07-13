import React from 'react';
import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';
import DocumentItem from '../components/DocumentItem';
import {DocumentList} from '../helpers/DocumentList';

function Dokumen() {
  return (
    <div className='dokumen'>
      <NavBar/>
        <div className='content'>
            <div className='navigator'>
              <img/>
              <button>Ubah</button>
              <br/>
              <button>Hapus</button>
            </div>
            <div className='ribbon'>
              <h3>Pemantauan</h3>
              <h3>Laporan</h3>
              <h3>Dokumen</h3>
            </div>
            <div className='documentList'>
              <button>+Tambah</button>
              <input name='search' type='text'/>
              {DocumentList.map((menuItem, key) => {
                return (
                  <DocumentItem
                  key={key}
                  name={menuItem.name}/>
                );
              })}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Dokumen
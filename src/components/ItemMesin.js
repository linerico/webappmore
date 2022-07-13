/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import "../styles/ItemMesin.css";
import { Link, useParams } from 'react-router-dom';
import { enCodeLink } from '../utilities';

function ItemMesin({ image, id, name, type, brand }) {

  const {homeId} = useParams()

  return (
    <div className='col-4'>
      <Link className='text-black text-decoration-none' to={`/pabrik/${homeId}/mesin/${id}`}>
        <div className='shadow my-border-radius d-flex align-items-center'>
          <img
            src={image}
            style={{
              height:"100px",
              width: "100px"
            }}
          />
          <div className='d-flex flex-column px-4'>
            <h3 className='text-nowrap mb-0 fw-bold fs-4'>{name}</h3>
            <p className='mb-0'>Tipe : {type}</p>
            <p className='mb-0'>Merek : {brand}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemMesin
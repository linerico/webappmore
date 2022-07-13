/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { enCodeLink } from '../utilities';

function ItemPabrik(props) {

  const { image, id, name, caption } = props

  return (
    <div className='col-4 text-center mt-3 '>
      <Link className='text-black text-decoration-none' to={`/pabrik/${id}`}>
        <div className='border my-border-radius shadow '>
          <img
            src={image}
            style={
              {width:"100%", height:"200px"}
            }
          />
          <p className='fw-bold mb-0'>{name}</p>
          <p>{caption}</p>
        </div>
      </Link>
    </div>

  )
}

export default ItemPabrik 
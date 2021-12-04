import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemSocial from './ItemSocial/ItemSocial';
import ItemCounts from './ItemCounts/ItemCounts';
import ItemTrading from './ItemTrading/ItemTrading';
import ItemInfo from './ItemInfo/ItemInfo';
import './Item.scss';

const Item = () => {
  const [parcelData, setParcelData] = useState(null);
  const location = useLocation();

  const loadParcel = async () => {
    const id = location.pathname.split('/')[2];
    const query = `
    query {
      getParcelById(_id: "${id}") {
        name,
        metaverse,
        image,
        user,
        price,
        external_url,
        description,
        area,
        island,
        suburb
      }
    }
    `;

    const response = await axios.post('http://localhost:5000/graphql', { query: query });
    const parcel = response.data.data.getParcelById;
    setParcelData(parcel);
  }

  useEffect(() => {
    loadParcel();
  }, []);

  return (
    <main className="page__item">
    {!parcelData ? 'Loading parcel...'
    : <><ItemSocial />
    <ItemCounts name={parcelData.name} image={parcelData.image} user={parcelData.user} />
    <ItemTrading />
    <ItemInfo /></>}
    </main>
  )
}

export default Item
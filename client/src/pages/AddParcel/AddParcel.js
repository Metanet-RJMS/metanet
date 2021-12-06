import React, { useState, useEffect } from 'react';
import { loadInfoToCreateParcel, createParcel, validateJwt } from '../../api/fetch';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/auth';
import './AddParcel.scss';
import '../Register/Form.scss';
import '../Marketplace/Sort/Sort.scss';

function AddParcel() {
  const [idInput, setIdInput] = useState(null);
  const [inputData, setInputData] = useState({ metaverse: 'cryptovoxels' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIdInput = ev => setIdInput(ev.target.value);

  const handleIdConfirmation = async ev => {
    ev.preventDefault();
    loadInfoToCreateParcel(setInputData, idInput, inputData);
  }

  const handleInputData = (ev) => {
    setInputData({ ...inputData, [ev.target.name]: ev.target.value })
  }

  const addHandler = async (ev) => {
    ev.preventDefault();
    createParcel(inputData)
  }

  useEffect(() => {
    validateJwt(navigate, dispatch, logoutAction);
  }, []);

  return (
    <main className="page__register" >
      <h1 className="page__register-title">Add your parcel</h1>
      <label htmlFor="metaverse">Choose metaverse</label>
      <select className="sort__form__select" id="metaverses" name="metaverse" onChange={handleInputData}>
        <option value="cryptovoxels">Cryptovoxels</option>
      </select>

      <form className="page__register__form" onSubmit={handleIdConfirmation}>
        <label htmlFor="parcelid">Pass in your official parcel id</label>
        <input className="page__register__form-text" type="text" name="parcelid" onChange={handleIdInput} required />
        <input className="page__register__form-btn" type="submit" value="Load parcel information" />
      </form>
      {inputData.parcel_id ?
        <form className="page__register__form" onSubmit={addHandler}>

          <div className="item__counts-img">
            <img src={inputData.image} alt="" />
          </div>

          <label htmlFor="name">Name</label>
          <input className="page__register__form-text" type="text" name="name" onChange={handleInputData} value={inputData.name} required />

          <label htmlFor="description">Description</label>
          <input className="page__register__form-text" type="text" name="description" onChange={handleInputData} value={inputData.description} required />

          <label htmlFor="area">Area</label>
          <input className="page__register__form-text" type="text" name="area" onChange={handleInputData} value={inputData.area} required />

          <label htmlFor="island">Island</label>
          <input className="page__register__form-text" type="text" name="island" onChange={handleInputData} value={inputData.island} required />

          <label htmlFor="suburb">Suburb</label>
          <input className="page__register__form-text" type="text" name="suburb" onChange={handleInputData} value={inputData.suburb} required />

          <label htmlFor="suburb">Price</label>
          <input className="page__register__form-text" type="text" name="price" onChange={handleInputData} value={inputData.price} required />

          <input className="page__register__form-btn" type="submit" value="Add parcel to marketplace" />
        </form>
        : ''}
    </main>
  )
}

export default AddParcel

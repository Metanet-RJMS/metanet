import React, { useState } from 'react';
import { updateOffer } from '../../../api/fetch';
import { useSelector } from 'react-redux';
import defaultProfileImage from '../../../assets/img/avatar.jpeg'
import './Replies.scss';

const Replies = ({ offerData }) => {
  const loggedInUser = useSelector(state => state.authorization);
  const [mappingData, setMappingData] = useState({ ...offerData });
  const [inputData, setInputData] = useState({ _id: offerData._id, user: loggedInUser });

  const handleInputData = ev => setInputData({ ...inputData, [ev.target.name]: ev.target.value });
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await updateOffer(inputData);
    setMappingData({ ...response.data.data.updateOfferById });
    ev.target.reset();
  }

  return (
    <>
      {(offerData.message !== 'undefined') ? <><h4><i>"{offerData.message}"</i></h4><p>- <i>{offerData.bidder}</i></p></> : ''}
      {!mappingData.replies ? '' :
        <ul className="offer__replies">
          {mappingData.replies.map((reply, idx) => <li key={idx} className="offers__offer-replies-reply">
            <img className="offers__offer-replies-reply-img" src={defaultProfileImage} alt="offer img" />
            <p className="offers__offer-replies-reply-user">{reply.user}</p>
            <div className="offers__offer-replies-reply-text">{reply.reply}</div>
          </li>)}
        </ul>}

      <form className="offers__offer-form" onSubmit={handleSubmit} autoComplete="off">
        <input className="offers__offer-form-text" type="text" name="reply" onChange={handleInputData} required />
        <input className="offers__offer-form-submit material-icons-outlined" type="submit" value="send" />
      </form>
    </>
  )
}

export default Replies

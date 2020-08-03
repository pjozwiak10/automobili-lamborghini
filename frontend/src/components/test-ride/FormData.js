import React from 'react'

const FormData = ({ text, handleInputChange }) => {
  return (
    <div className="test-ride__form test-ride__form--data">
      <h2 className="test-ride__form-header">Enter data</h2>
      <div className="test-ride__inputBox">
        <label htmlFor="" className="test-ride__label">Name</label>
        <input type="text" className="test-ride__input browser-default" name="name" onChange={handleInputChange} value={text.name} />
      </div>
      <div className="test-ride__inputBox">
        <label htmlFor="" className="test-ride__label">Email</label>
        <input type="text" className="test-ride__input browser-default" name="email" onChange={handleInputChange} value={text.email} />
      </div>
      <div className="test-ride__inputBox">
        <label htmlFor="" className="test-ride__label">Phone Number</label>
        <input type="number" className="test-ride__input browser-default" name="phone" onChange={handleInputChange} value={text.phone} />
      </div>
      <div className="test-ride__inputBox">
        <label htmlFor="" className="test-ride__label">Date</label>
        <input type="text" className="test-ride__input datepicker browser-default" name="date" onChange={handleInputChange} value={text.date} />
      </div>
      <div className="test-ride__inputBox test-ride__inputBox--textarea">
        <label htmlFor="" className="test-ride__label">Message</label>
        <textarea className="test-ride__textarea browser-default" type="text" placeholder="Tell us what you expect from a test ride" name="message" onChange={handleInputChange} value={text.message}></textarea>
      </div>
    </div>
  );
}

export default FormData;
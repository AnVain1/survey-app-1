import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    company: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(formData);
  };
  

  return (
    <div>
      <h2>Yhteydenotto</h2>
      <form>
        <input
          type="text"
          name="email"
          placeholder="sähköposti"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="puhelinnumero"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="yritys"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="yhteyshenkilö"
          value={formData.name}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit}>Lähetä</button>
    </div>
  );
};

export default ContactForm;

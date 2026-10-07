import React, { useState } from 'react';
import './Order.scss';

export default function Order() {
  // State for form data and errors
  const [formData, setFormData] = useState({
    phone: '',
    street: '',
    city: '',
    zip: '',
    payment: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    street: '',
    city: '',
    zip: '',
    payment: ''
  });

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!/^[0-9]{10,15}$/.test(value)) error = 'Invalid phone number';
        break;
      case 'street':
        if (!value) error = 'Street address is required';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      case 'zip':
        if (!value) error = 'ZIP code is required';
        else if (!/^\d{5}(-\d{4})?$/.test(value)) error = 'Invalid ZIP code';
        break;
      case 'payment':
        if (!value) error = 'Payment option is required';
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input changes and validate
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'radio' ? e.target.id : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Validate on change (optional: can remove if you prefer onBlur-only)
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, fieldValue)
      }));
    }
  };

  // Validate on blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Check if form is valid before submission
  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      // Add API call or further logic here
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <section className='order' id='order'>
      <h3 className="sub-heading">order now</h3>
      <h1>free and fast</h1>

      <form onSubmit={handleSubmit}>
        <div className="inputBox">
          <div className="input">
            <span>Your Number</span>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder='enter your number'
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="input">
            <span>Street Address</span>
            <input
              type="text"
              name="street"
              placeholder="123 Main St"
              value={formData.street}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>
        </div>
        <div className="inputBox">
          <div className="input">
            <span>City</span>
            <input
              type="text"
              name="city"
              placeholder='Nairobi'
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="input">
            <span>ZIP Code</span>
            <input
              type="text"
              name="zip"
              placeholder="10001"
              value={formData.zip}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.zip && <p className="error">{errors.zip}</p>}
          </div>
        </div>
        <div className="inputBox">
          <div className="input radio">
            <span>50% Payment</span>
            <input
              type='radio'
              name='payment'
              id='50%'
              onChange={handleChange}
              checked={formData.payment === '50%'}
            />
          </div>
          <div className="input radio">
            <span>Full Payment</span>
            <input
              type='radio'
              name='payment'
              id='full'
              onChange={handleChange}
              checked={formData.payment === 'full'}
            />
          </div>
          {errors.payment && <p className="error">{errors.payment}</p>}
        </div>
        <input type="submit" value="Proceed to Checkout" className='btn'/>
      </form>
    </section>
  );
}
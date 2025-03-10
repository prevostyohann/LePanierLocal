import React, { useState, useEffect } from 'react';

const MyForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});
  const [selectOptions, setSelectOptions] = useState({});
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === 'select' && field.apiEndpoint && field.name !== 'sub_category') {
        fetch(`http://localhost:8000${field.apiEndpoint}`)
          .then(response => response.json())
          .then(data => {
            setSelectOptions(prevOptions => ({
              ...prevOptions,
              [field.name]: data
            }));
          })
          .catch(error => console.error(`Error fetching options for ${field.name}:`, error));
      }
    });
  }, [fields]);

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch sub-categories based on selected category
    if (name === 'category') {
      fetch(`http://localhost:8000/api/subcategories?category_id=${value}`)
        .then(response => response.json())
        .then(data => {
          setSubCategories(data);
        })
        .catch(error => console.error('Error fetching sub-categories:', error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'Invalid email address';
      } else if (field.name === 'confirm-password' && formData['password'] !== formData['confirm-password']) {
        newErrors[field.name] = 'Passwords do not match';
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData);
      setFormData(fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {}));
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={field.name === 'category' ? handleCategoryChange : handleChange}
            >
              <option value="">Select {field.label}</option>
              {(field.name === 'sub_category' ? subCategories : selectOptions[field.name])?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          )}
          {errors[field.name] && (
            <div>{errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default MyForm;
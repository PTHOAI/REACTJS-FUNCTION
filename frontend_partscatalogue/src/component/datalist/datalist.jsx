import React, { useState, useEffect } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const Datalist = ({ options, onSelect, isEditMode, initialValue }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setFilteredOptions(options);
    if (initialValue && isEditMode) {
      setInputValue(initialValue?.label);
    }
  }, [initialValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = options.filter((option) => {
    const lowerCaseLabel = option.label?.toLowerCase();
    const lowerCaseCode = option.code?.toLowerCase();
    return (
      (lowerCaseLabel && lowerCaseLabel.includes(value.toLowerCase())) ||
      (lowerCaseCode && lowerCaseCode.includes(value.toLowerCase()))
    );
  });
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {  
    setSelectedOption(option);
    setInputValue(option.label);
    onSelect(option.id, option.label);
    setIsOpen(false);
  };
  return (
    <div className='relative'>
      <div className='flex items-center border border-gray-300 p-2 w-full cursor-pointer'>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          placeholder='Chọn một tùy chọn...'
          className='w-full outline-none'
        />
        <HiOutlineChevronDown className='ml-auto' onClick={handleToggle} />
      </div>
      {isOpen && (
        <ul className='absolute z-10 mt-2 py-1 w-full border border-gray-300 bg-white max-h-40 overflow-auto'>
          {filteredOptions?.map((option) => (
            <li
              key={option.id}
              className={`cursor-pointer p-2 ${
                selectedOption && selectedOption.id === option.id ? 'bg-yellow-100 text-black' : ''
              }`}
              onClick={() => handleSelectOption(option)}
            >
              <div className='flex items-center'>
                <span>{option.label}</span>
                <span className='ml-auto text-gray-500'>{option.code}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Datalist;

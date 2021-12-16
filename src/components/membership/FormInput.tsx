import React from 'react';
import styles from './form__input.module.css';

interface FromInputProps {
  /**
   * Label contents
   */
  labelText: string;

  /**
   * input type
   */
  inputType: string | string[];

  /**
   * Optional click handler
   */
  onChange?: () => void;
}

function FromInput({ labelText, inputType }: FromInputProps) {
  return (
    <div>
      <label className={styles.label}>{labelText}</label>
      {Array.isArray(inputType) ? (
        inputType.map((type) => <input type={type}></input>)
      ) : (
        <input type={inputType}></input>
      )}
    </div>
  );
}

export default FromInput;

import React from 'react';
import styles from './FormInfo.module.css';

function FormInfo() {
  return (
    <section>
      <div className={styles.container}>
        <h2>User Info</h2>
        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input type="text" name="" required="required" />
              <span className={styles.text}>First Name</span>
              <span className={styles.line}></span>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input type="text" name="" required="required" />
              <span className={styles.text}>Last Name</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>
        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input type="text" name="" required="required" />
              <span className={styles.text}>Email</span>
              <span className={styles.line}></span>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input type="text" name="" required="required" />
              <span className={styles.text}>Mobile</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>

        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={`${styles.inputBox} ${styles.textarea}`}>
              <textarea required="required"></textarea>
              <span className={styles.text}>Type Your Message Here...</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>

        <div className={styles.row100}>
          <div className={styles.col}>
            <input type="submit" value="등록" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormInfo;

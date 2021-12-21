import React, { useState } from 'react';
import styles from './FormInfo.module.css';
import moment from 'moment';
import 'moment/locale/ko';
import { addPost } from '../../api';

function FormInfo() {
  const today = moment().format('YYYY-MM-DD');

  const [wodType, setWodType] = useState('Daily WOD');
  const [joinDate, setJoinDate] = useState(today);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');

  const handleWodTypeChange = ({ target: { value } }) => {
    setWodType(value);
  };

  const handleJoinDateChange = ({ target: { value } }) => {
    setJoinDate(value);
  };

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };

  const handleFileChange = ({ target: { value } }) => {
    setFile(value);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();

      setTitle('');
      setContent('');
      setFile('');
    }
    addPost({ wodType, joinDate, title, content, file });
  };

  return (
    <section>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>WOD</h2>
        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <span className={`${styles.text} ${styles.select}`}>분류</span>
              <select className={styles.line} value={wodType} onChange={handleWodTypeChange}>
                <option value="Daily WOD">Daily WOD</option>
                <option value="Named WOD">Named WOD</option>
              </select>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input
                type="date"
                name=""
                required="required"
                value={joinDate}
                onChange={handleJoinDateChange}
              />
              <span className={styles.text}>등록일</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>
        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={styles.inputBox}>
              <input
                type="text"
                name=""
                required="required"
                value={title}
                onChange={handleTitleChange}
              />
              <span className={styles.text}>제목</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>
        <div className={styles.row100}>
          <div className={styles.col}>
            <div className={`${styles.inputBox} ${styles.textarea}`}>
              <textarea
                required="required"
                value={content}
                onChange={handleContentChange}
              ></textarea>
              <span className={styles.text}>내용</span>
              <span className={styles.line}></span>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.inputBox}>
            <input
              className={`${styles.line} ${styles.file}`}
              type="file"
              value={file}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={styles.row100}>
          <div className={styles.col}>
            <input type="submit" value="등록" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default FormInfo;

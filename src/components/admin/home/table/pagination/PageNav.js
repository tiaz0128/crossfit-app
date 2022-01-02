import React, { useState } from 'react';
import styles from './PageNav.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
function PageNav() {
  const [selectBtn, setSelectBtn] = useState(1);

  const handleSelectBtn = (e) => {
    console.log(e.target.innerText);
    setSelectBtn(e.target.innerText);
  };

  return (
    <ul className={styles.nav}>
      <li className={styles.arrow}>
        <button>
          <IoIosArrowBack className="icon" size="10" color="#8898aa" />
        </button>
      </li>
      <li>
        <button className={`${selectBtn} && ${styles.action}`} onClick={handleSelectBtn}>
          1
        </button>
      </li>
      <li>
        <button>2</button>
      </li>
      <li>
        <button>3</button>
      </li>
      <li className={styles.arrow}>
        <button>
          <IoIosArrowForward className="icon" size="10" color="#8898aa" />
        </button>
      </li>
    </ul>
  );
}

export default PageNav;

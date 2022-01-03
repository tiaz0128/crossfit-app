import React from 'react';
import styles from './PagePath.module.css';
import { AiFillHome } from 'react-icons/ai';

interface Props {
  pagePath: any;
}

const PagePath: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.pagePath}>
        <AiFillHome className="icon" size="15" color="rgb(172 178 188)" /> /
        <span> {props.pagePath} </span>
      </div>
      <h4 className={styles.pageName}>{props.pagePath}</h4>
    </div>
  );
};

export default PagePath;

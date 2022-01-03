import React from 'react';
import styles from './UserTable.module.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import PageNav from './pagination/PageNav';
// import Pagination from '@mui/material/Pagination';

const UserTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>Projects</h4>
          <p className={styles.subtitle}>
            <i className="fas fa-check"></i> 30 done this month
          </p>
        </div>
        <div className={styles.menu}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>COMPANIES</th>
            <th>MEMBERS</th>
            <th>BUDGET</th>
            <th>COMPLETION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.avatar}>
              <img src="img/profile.jpg" alt="Image placeholder" />
            </td>
            <td>
              <h6 className={styles.name}> Soft UI XD Version</h6>
            </td>
            <td>
              <span className={styles.info}> $14,000 </span>
            </td>
            <td>
              <div className={styles.progressWrap}>
                <div className={styles.percentag}>60%</div>
                <div className={styles.progress}>
                  <div className={styles.progressBar}></div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.avatar}>
              <img src="img/profile.jpg" alt="Image placeholder" />
            </td>
            <td>
              <h6 className={styles.name}> Soft UI XD Version</h6>
            </td>
            <td>
              <span className={styles.info}> $14,000 </span>
            </td>
            <td>
              <div className={styles.progressWrap}>
                <div className={styles.percentag}>60%</div>
                <div className={styles.progress}>
                  <div className={styles.progressBar}></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

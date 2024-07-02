import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: '', color: '' });
  const { setGroups, groups } = props;
  
  const colorOptions = [
    '#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'
  ];
  
  const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const [screenSize, setScreenSize] = useState(getScreenSize());
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleChangeColor = (e) => {
    const selectedColor = e.target.getAttribute('color');
    setFormData({ ...formData, color: selectedColor });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    const newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length
      }
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };
  
  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.modalBackgroundMobile}>
          <div className={styles.modalContainerMobile}>
            <span>
              <button
                className={styles.closeButtonMobile}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalTextMobile}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <br />
            <label className={styles.modalColor}>Choose Colour</label>
            {colorOptions.map((color, index) => (
              <button
                className={`${styles.colorButton} ${formData.color === color ? styles.selected : ''}`}
                name="color"
                color={color}
                key={index}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px'
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button
              className={styles.modalCreateMobile}
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Colour</label>
            {colorOptions.map((color, index) => (
              <button
                className={`${styles.colorButton} ${formData.color === color ? styles.selected : ''}`}
                name="color"
                color={color}
                key={index}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px'
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={styles.modalCreate} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

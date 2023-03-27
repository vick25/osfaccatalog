import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


const AddCategory = (props) => {
  // const [visible, setVisible] = useState(false);
  console.log(props);
  const handleClose = () => {
    props.handleClose();
  }

  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog header="Add category" visible={props.visible} onHide={handleClose}
          style={{ width: '50vw' }} closable={false} draggable={false}>
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className='p-dialog-footer pb-0'>
            <Button label="No" icon="pi pi-times" onClick={handleClose} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleClose} autoFocus />
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default AddCategory;
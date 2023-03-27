import React, { useState } from 'react';
import { Button } from 'primereact/button';
import AddCategory from '../../components/dialogs/AddCategory';

const Listings = () => {
    const [visibleCategory, setVisibleCategory] = useState(false);


    const handleAddCategory = (e) => {
        e.preventDefault();
        setVisibleCategory(true);
    }

    let closeAddCategoryDlg = () => setVisibleCategory(false);

    const callbackModal = () => {
        setVisibleCategory(false);
    }

    return (
        <div className="grid">
            <div className="col-3">
                <Button label="Add Category" icon="pi pi-plus" className="thematic p-button-success" onClick={handleAddCategory}>
                    <AddCategory visible={visibleCategory} onHide={closeAddCategoryDlg} handleClose={callbackModal} />
                </Button>
            </div>
        </div>
    )
}

export default Listings
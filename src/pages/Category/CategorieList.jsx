import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Navigation from '../../components/navigation/Navigation';
import { getCategories, deleteCategory } from '../../services/CategoryService';
import AddCategory from '../../components/dialogs/AddCategory';
import UpdateCategoryModal from '../../components/dialogs/UpdateCategoryModal';
//Context
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';

const CategorieList = () => {
  const GlobalState = useContext(StateContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useContext(LoadingContext);
  const [categories, setCategories] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editCategorie, setEditCategorie] = useState([]);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setVisibleCategory(true);
  }

  const fetchCategories = async () => {
    let mounted = true;
    try {
      const result = await getCategories();
      if (mounted) {
        setCategories(result);
        setIsCategoryUpdated(false);
      }
    } catch (err) {
      if (!err.response)
        console.log(`Error: ${err.message}`);

      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      setError(true);
    }
    finally {
      mounted = false;
      setIsCategoryUpdated(false);
      setLoading(false);
    }
  };

  const handleUpdate = (e, cat) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditCategorie(cat);
  };

  const handleDelete = (e, categoryId) => {
    if (window.confirm('Are you sure you want to delete this category ?')) {
      e.preventDefault();
      const deleteCat = async () => {
        try {
          const result = await deleteCategory(categoryId, GlobalState.userToken);
          alert(result);
          setIsCategoryUpdated(true);
        } catch (error) {
          alert("Failed to Delete Categorie");
          setError(true);
        } finally {
          fetchCategories();
        }
      }
      deleteCat();
    };
  };

  let closeAddCategoryDlg = () => setVisibleCategory(false);
  let editModalClose = () => setEditModalShow(false);

  useEffect(() => {
    setLoading(true);
    fetchCategories();

  }, [isCategoryUpdated]);

  return (
    <>
      <Navigation />
      <div className="container-fluid">
        {error ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert">
            <strong>There was an Error!!</strong> {`Sorry for the
              inconvenience. :(`}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"></button>
          </div>
        ) : (
          ""
        )}

        <h2 style={{ marginTop: 0 }} className='project'>Manage categories</h2>
        <div className="row side-row" >
          <Table responsive striped bordered hover className="react-bootstrap-table" id="dataTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category title</th>
                <th>Description</th>
                <th>Created date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) =>
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.categoryTitle}</td>
                  <td>{cat.description}</td>
                  <td>{cat.created}</td>
                  <td className='buttons-table'>
                    <Button className="mr-0 bi bi-pencil-square"
                      onClick={e => handleUpdate(e, cat)}>
                    </Button>
                    <Button className="mr-2 bi bi-trash-fill" variant="danger"
                      onClick={e => handleDelete(e, cat.id)}>
                    </Button>
                  </td>
                </tr>
              )
              }
            </tbody>
          </Table>
        </div>
      </div>

      <ButtonToolbar aria-label="Basic example">
        {<Button className="thematic bi-plus-lg" variant="success" onClick={handleAddCategory}>Add Category
        </Button>}{' '}
      </ButtonToolbar>


      <AddCategory show={visibleCategory} setupdated={setIsCategoryUpdated} onHide={closeAddCategoryDlg} />

      <UpdateCategoryModal show={editModalShow} categorie={editCategorie} setupdated={setIsCategoryUpdated} onHide={editModalClose} />
    </>
  );
};

export default CategorieList;
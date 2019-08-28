import React, { Component } from "react";
import ItemContainer from "./ItemContainer";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import "./../styles/style.css";
import { bindActionCreators } from "redux";
import { getApiData, addTempBook } from "../actions/bookAction";

class Home extends Component {
  state = {
    totalData: [],
    searchData: "",
    showData: this.props.books,
    showAddModal: false,
    showEditModal: false,
    newBook: getNewBook() //default book
  };

  //fetching and updating default data
  async componentDidMount() {
    await this.props.GetData();
    this.setState({ totalData: this.props.books, showData: this.props.books });
  }

  //book search
  txtSearchHandler = e => {
    let { searchData, totalData, showData } = this.state;
    searchData = e.target.value;
    showData = totalData.filter(z =>
      z.name.toUpperCase().includes(searchData.toUpperCase())
    );
    this.setState({ searchData, showData });
  };

  //show add a new book modal
  btnAddBookHandler = () => {
    this.setState({
      showAddModal: !this.state.showAddModal,
      newBook: getNewBook()
    });
  };

  //allow editing a book
  btnEditBookHandler = () => {
    this.setState({
      showEditModal: this.state.showEditModal,
      newBook: getNewBook()
    });
  };

  //new book entry handler
  txtChangeEventHandler = e => {
    const { id, value } = e.currentTarget;
    let { newBook } = this.state;
    newBook[id] = value;
    this.setState({ newBook });
  };

  //save book and update the records
  saveNewBook = e => {
    e.preventDefault();
    let { totalData, newBook } = this.state;
    var data = [...totalData, newBook];
    this.props.addBookNew(newBook);
    this.setState({ totalData: data, showData: data }, () =>
      this.btnAddBookHandler()
    );
  };

  //update a book
  updateBook = book => {
    let { newBook } = book;
    let unMatchedResult = [
      ...this.state.totalData.filter(z => z.isbn !== newBook.isbn)
    ];
    const finalData = [...unMatchedResult, newBook];
    this.setState({ totalData: finalData, showData: finalData }, () =>
      this.btnEditBookHandler()
    );
  };

  //return book fields
  getCombinedElement = (name, id) => (
    <>
      <input
        className="itemInput"
        id={id}
        placeholder={name}
        onChange={e => this.txtChangeEventHandler(e)}
        value={this.state.newBook[id]}
      />
      <br />
    </>
  );

  render() {
    const { showData, searchData, showAddModal } = this.state;
    return (
      <>
        <div className="divMainHeader">
          <div className="divTitle">
            <h2>Book Library System</h2>
          </div>
          <div className="divAddBook">
            <input
              type="button"
              className="addButton"
              onClick={this.btnAddBookHandler}
              value="Add Book"
            />
          </div>
        </div>
        <div className="inputSearch">
          <input
            className="searchBar"
            placeholder="Search here"
            value={searchData}
            onChange={this.txtSearchHandler}
          />
          <span>
            {showData && showData.length > 0
              ? "Total Count: " + showData.length
              : "No Record Found"}
          </span>
        </div>
        <div className="divMainContainer">
          {showData &&
            showData.map(z => {
              return (
                <ItemContainer
                  key={z.isbn}
                  data={z}
                  updateData={this.updateBook}
                />
              );
            })}
        </div>

        <Modal
          visible={showAddModal}
          width="450"
          height="450"
          effect="fadeInUp"
          onClickAway={this.btnAddBookHandler}
        >
          <div>
            <input
              type="button"
              className="closeAddBook"
              onClick={this.btnAddBookHandler}
              value="x"
            />
            <form style={{ marginLeft: 40 }}>
              <h3>Add New Book</h3>
              <>
                {this.getCombinedElement("Name", "name")}
                {this.getCombinedElement("Description", "description")}
                {this.getCombinedElement("Author", "author")}
                {this.getCombinedElement("Published Year", "year")}
                {this.getCombinedElement("ISBN No.", "isbn")}
                {this.getCombinedElement("Count", "count")}
              </>
              <div className="closeButtonContainer">
                <input
                  type="button"
                  onClick={this.saveNewBook}
                  value="Submit"
                />
                <input
                  type="button"
                  onClick={this.btnAddBookHandler}
                  value="Cancel"
                />
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { books: state };
};

const mapDispatchToProps = dispatch => {
  return {
    GetData: bindActionCreators(getApiData, dispatch),
    addBookNew: bindActionCreators(addTempBook, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// return a blank new book
function getNewBook() {
  return {
    name: "",
    year: "",
    count: 0,
    isbn: "",
    author: "",
    imageurl: "",
    description: ""
  };
}

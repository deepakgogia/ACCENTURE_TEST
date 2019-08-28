import React, { Component } from "react";
import "./../styles/style.css";
import Modal from "react-awesome-modal";
import { connect } from 'react-redux';


class ItemContainer extends Component {
  state = {
    infoVisible: false,
    editVisible: false,
    newBook: {
      name: this.props.data.name,
      year: this.props.data.year,
      count: this.props.data.count,
      isbn: this.props.data.isbn,
      author: this.props.data.author,
      imageurl: this.props.data.imageurl,
      description: this.props.data.description
    }
  };

  openModal = () => {
    this.setState({ infoVisible: true });
  };

  closeModal = () => {
    this.setState({ infoVisible: false });
  };

  openEditModal = () => {
    this.setState({ editVisible: true });
  }

  closeEditModal = () => {
    this.setState({ editVisible: false });
  }

  styles = {
    margin: "21px"
  };

  closeStyle = {
    margin: "-10px",
    float: "right"
  };

  //return entry book fields
  getCombinedElement = (name, id, value) => (
    <>
      <input
        className="itemInput"
        id={id}
        placeholder={name}
        value={value}
        onChange={e => this.txtChangeEventHandler(e)}
      />
      <br />
    </>
  );

  //update book entry handler
  txtChangeEventHandler = e => {
    const { id, value } = e.currentTarget;
    let { newBook } = this.state;
    newBook[id] = value;
    this.setState({ newBook });
  };

  //update a book
  updateBook = () => {
    this.props.updateData(this.state);
    this.closeEditModal();
  };

  render() {
    //setting default url
    const url =
      this.props.data.imageurl ||
      "https://images-na.ssl-images-amazon.com/images/I/31SBUfObyjL.jpg";

    return (
      <>
        <div className="divClass">
          <img src={url} alt="" />
          <h5>{this.props.data.name}</h5>
          <input type="button" onClick={this.openModal} value='info' />
          <input type="button" onClick={this.openEditModal} value='edit' />
          <Modal
            visible={this.state.infoVisible}
            width="400"
            height="400"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div style={this.styles}>
              <div style={this.closeStyle}>
                <a href="#" onClick={() => this.closeModal()}>
                  Close
                </a>
              </div>
              <div style={this.styles}>
                <b>{this.props.data.name}</b>
                <br />
              </div>
              <div style={this.styles}>
                Description: {this.props.data.description}
              </div>
              <div style={this.styles}>Author: {this.props.data.author}</div>
              <div style={this.styles}>
                Book's Count: {this.props.data.count}
              </div>
              <div style={this.styles}>
                Publish Year: {this.props.data.year}
              </div>
              <div style={this.styles}>ISBN: {this.props.data.isbn}</div>
            </div>
          </Modal>
          <Modal
            visible={this.state.editVisible}
            width="450"
            height="450"
            effect="fadeInUp"
            onClickAway={this.closeEditModal}
          >
            <div>
              <input className="closeAddBook" type='button' onClick={this.closeEditModal} value='x' />
              <form style={{ marginLeft: 40 }}>
                <h3>Update Book</h3>
                <>
                  {this.getCombinedElement("Name", "name", this.state.newBook.name)}
                  {this.getCombinedElement("Description", "description", this.state.newBook.description)}
                  {this.getCombinedElement("Author", "author", this.state.newBook.author)}
                  {this.getCombinedElement("Published Year", "year", this.state.newBook.year)}
                  {this.getCombinedElement("ISBN No.", "isbn", this.state.newBook.isbn)}
                  {this.getCombinedElement("Count", "count", this.state.newBook.count)}
                </>
                <div className="closeButtonContainer">
                  <input type='button' onClick={this.updateBook} value='Update' />
                  <input type='button' onClick={this.closeEditModal} value='Cancel' />
                </div>
              </form>
            </div>
          </Modal>
        </div >
      </>
    );
  }
}
const mapStateToProps = (state, props) => {
  return { ...state };
}

export default connect(mapStateToProps)(ItemContainer);
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <ListGroup style={{ maxWidth: 400 }}>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name, note }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="warning"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  <i className="fas fa-trash-alt" />
                </Button>
                {name}, note: {note}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);

import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import * as weddingActions from '../../core/actions/wedding.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as editingActions from '../../core/actions/editing.actions';

class DashboardPage extends Component {

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    editingActions: PropTypes.object.isRequired,
    wedding: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }

  render() {
    return (
      <Layout>
        dashboard
      </Layout>
    );
  }

}

export default connect((state) => ({
  wedding: state.wedding,
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
  editingActions: bindActionCreators(editingActions, dispatch),
}))(DashboardPage);

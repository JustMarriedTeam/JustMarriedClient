import React, { PropTypes, PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import ContentSection from '../../../components/ContentSection';
import PrimaryParticipant
  from '../../../components/Participants/PrimaryParticipant/primary.participant';
import LayoutContainer from '../../../layout/LayoutContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  submit,
  isInvalid,
} from 'redux-form';
import * as weddingActions from '../../../core/actions/wedding.actions';
import store from '../../../core/store';
import keys from 'lodash/keys';
import map from 'lodash/map';
import includes from 'lodash/includes';
import SavingError from '../../../core/errors/saving.error';

class ParticipantsView extends PureComponent {

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    participants: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(props) {
    this.props.onMount({
      onSubmit() {
        const roles = keys(props.participants);
        const formNames = map(roles, (role) => `ParticipantForm_${role}`);
        const invalidForms = map(formNames, (name) => isInvalid(name)(store.getState()));
        if (!includes(invalidForms, true)) {
          store.dispatch(submit(formNames));
        } else {
          throw new SavingError('Check your input');
        }
      },
    });
  }

  render() {
    const { isEditing, participants } = this.props;

    const renderParticipant = (role, roleName) => <PrimaryParticipant
      form={`ParticipantForm_${role}`}
      onSubmit={(details) => this.props.weddingActions.updateParticipant(details)}
      isEditable={isEditing}
      participantRole={role}
      participantRoleName={roleName}
      initialValues={participants[role]}
    />;

    return (
      <LayoutContainer>

          <ContentSection header={<h2>The Young Couple</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                {renderParticipant('bride', 'Bride')}
              </Box>

              <Box sm={12} md={5} m={2}>
                {renderParticipant('groom', 'Groom')}
              </Box>

            </Flex>

          </ContentSection>


          <ContentSection alternate header={<h2>Witnesses</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                {renderParticipant('bridesmaid', 'Bridesmaid')}
              </Box>

              <Box sm={12} md={5} m={2}>
                {renderParticipant('bestMan', 'Best man')}
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection header={<h2>Parents</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                {renderParticipant('motherOfBride', 'Brides mother')}
              </Box>

              <Box sm={12} md={5} m={2}>
                {renderParticipant('fatherOfBride', 'Brides father')}
              </Box>

            </Flex>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                {renderParticipant('motherOfGroom', 'Grooms mother')}
              </Box>

              <Box sm={12} md={5} m={2}>
                {renderParticipant('fatherOfGroom', 'Grooms father')}
              </Box>

            </Flex>

          </ContentSection>


        </LayoutContainer>
    );
  }

}

// https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect((state) => ({
  isEditing: state.action.editing,
}), (dispatch) => ({
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(ParticipantsView);

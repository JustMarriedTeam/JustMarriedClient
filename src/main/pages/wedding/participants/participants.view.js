import React, { PropTypes, PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import ContentSection from '../../../components/ContentSection';
import PrimaryParticipant
  from '../../../components/Participants/PrimaryParticipant/primary.participant';
import LayoutContainer from '../../../layout/LayoutContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionBarActions from '../../../core/actions/actionbar.actions';
import * as weddingActions from '../../../core/actions/wedding.actions';


class ParticipantsView extends PureComponent {

  static propTypes = {
    actionBarActions: PropTypes.object.isRequired,
    weddingActions: PropTypes.object.isRequired,
    participants: PropTypes.object.isRequired,
    editButton: PropTypes.element.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.actionBarActions.displayContextMenu(
      this.props.editButton
    );
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
  participants: state.wedding.participants,
  isEditing: state.action.editing,
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(ParticipantsView);

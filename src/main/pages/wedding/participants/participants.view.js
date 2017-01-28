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

    return (
      <LayoutContainer>

          <ContentSection header={<h2>The Young Couple</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_bride'}
                  isEditable={isEditing}
                  participantRole="bride"
                  participantRoleName="Bride"
                  initialValues={participants.bride}
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_groom'}
                  isEditable={isEditing}
                  participantRole="groom"
                  participantRoleName="Groom"
                  initialValues={participants.groom}
                />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection alternate header={<h2>Witnesses</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_bridesmaid'}
                  isEditable={isEditing}
                  participantRole="bridesmaid"
                  participantRoleName="Bridesmaid"
                  initialValues={participants.bridesmaid}
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_bestMan'}
                  isEditable={isEditing}
                  participantRole="bestMan"
                  participantRoleName="Best Man"
                  initialValues={participants.bestMan}
                />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection header={<h2>Parents</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_motherOfBride'}
                  isEditable={isEditing}
                  participantRole="motherOfBride"
                  participantRoleName="Bride's Mother"
                  initialValues={participants.motherOfBride}
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_fatherOfBride'}
                  isEditable={isEditing}
                  participantRole="fatherOfBride"
                  participantRoleName="Bride's Father"
                  initialValues={participants.fatherOfBride}
                />
              </Box>

            </Flex>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_motherOfGroom'}
                  isEditable={isEditing}
                  participantRole="motherOfGroom"
                  participantRoleName="Groom's Mother"
                  initialValues={participants.motherOfGroom}
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  form={'ParticipantForm_fatherOfGroom'}
                  isEditable={isEditing}
                  participantRole="fatherOfGroom"
                  participantRoleName="Groom's Father"
                  initialValues={participants.fatherOfGroom}
                />
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

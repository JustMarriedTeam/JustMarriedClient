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
import EditButton from '../../../components/EditButton';


class ParticipantsView extends PureComponent {

  static propTypes = {
    actionBarActions: PropTypes.object.isRequired,
    weddingActions: PropTypes.object.isRequired,
    participants: PropTypes.array.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.actionBarActions.displayContextMenu(
      <EditButton />
    );
  }

  render() {
    const { isEditing } = this.props;

    return (
      <LayoutContainer>

          <ContentSection header={<h2>The Young Couple</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="bride"
                  participantRoleName="Bride"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="groom"
                  participantRoleName="Groom"
                />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection alternate header={<h2>Witnesses</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="bridesmaid"
                  participantRoleName="Bridesmaid"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="bestMan"
                  participantRoleName="Best Man"
                />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection header={<h2>Parents</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="motherOfBride"
                  participantRoleName="Bride's Mother"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="fatherOfBride"
                  participantRoleName="Bride's Father"
                />
              </Box>

            </Flex>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="motherOfGroom"
                  participantRoleName="Groom's Mother"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  isEditable={isEditing}
                  participantRole="fatherOfGroom"
                  participantRoleName="Groom's Father"
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

import React, { PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import ContentSection from '../../../components/ContentSection';
import PrimaryParticipant
  from '../../../components/Participants/PrimaryParticipant/primary.participant';
import LayoutContainer from '../../../layout/LayoutContainer';


export default class ParticipantsView extends PureComponent {

  render() {
    return (<LayoutContainer>

          <ContentSection header={<h2>The Young Couple</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  participantRole="bride"
                  participantRoleName="Bride"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
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
                  participantRole="bridesmaid"
                  participantRoleName="Bridesmaid"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
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
                  participantRole="motherOfBride"
                  participantRoleName="Bride's Mother"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  participantRole="fatherOfBride"
                  participantRoleName="Bride's Father"
                />
              </Box>

            </Flex>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  participantRole="motherOfGroom"
                  participantRoleName="Groom's Mother"
                />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant
                  participantRole="fatherOfGroom"
                  participantRoleName="Groom's Father"
                />
              </Box>

            </Flex>

          </ContentSection>


        </LayoutContainer>);
  }

}

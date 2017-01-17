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
                <PrimaryParticipant participantRole="bride" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="groom" />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection alternate header={<h2>Witnesses</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="bride" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="groom" />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection header={<h2>Parents</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="motherOfBride" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="fatherOfBride" />
              </Box>

            </Flex>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="motherOfGroom" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="fatherOfGroom" />
              </Box>

            </Flex>

          </ContentSection>


        </LayoutContainer>);
  }

}

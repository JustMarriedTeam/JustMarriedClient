import React, {PureComponent} from "react";
import {Flex, Box} from "reflexbox";
import LayoutContainer from "../../../layout/LayoutContainer";
import ContentSection from "../../../components/ContentSection";
import PrimaryParticipant from "../../../components/Participants/PrimaryParticipant/primary.participant";
export default class ParticipantsView extends PureComponent {

  render() {
    return (<div>
        <LayoutContainer>

          <ContentSection header={<h2>Bride & Groom</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="bride" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="groom" />
              </Box>

            </Flex>

          </ContentSection>

          <ContentSection alternate header={<h2>Best Man & Bridesmaid</h2>}>

            <Flex wrap align="center" justify="space-around">

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="bride" />
              </Box>

              <Box sm={12} md={5} m={2}>
                <PrimaryParticipant participantRole="groom" />
              </Box>

            </Flex>

          </ContentSection>


        </LayoutContainer>
      </div>
    );
  }

}

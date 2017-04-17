/* global describe, beforeEach, afterEach, it */
import {
  denormalizeParticipant,
} from '../../../main/core/normalization/participant.normalizer';
import { expect } from 'chai';

describe('Participant (de)normalization', () => {

  it('should denormalize participant', () => {
    expect(denormalizeParticipant({
      active: true,
      id: '58972e823b87a6696c40ab8d',
      role: 'bride',
      user: '58972c993b87a6696c40ab86',
    }, {
      participants: {
        '58972e823b87a6696c40ab8d': {
          active: true,
          id: '58972e823b87a6696c40ab8d',
          role: 'bride',
          user: '58972c993b87a6696c40ab86',
        },
        '58972e823b87a6696c40ab8f': {
          active: true,
          id: '58972e823b87a6696c40ab8f',
          role: 'groom',
          user: '58972c7e3b87a6696c40ab83',
        },
      },
      users: {
        '58972c7e3b87a6696c40ab83': {
          firstName: 'Grzegorz',
          id: '58972c7e3b87a6696c40ab83',
          lastName: 'Gurgul',
          username: 'ggurgul',
        },
        '58972c993b87a6696c40ab86': {
          firstName: 'Agata',
          id: '58972c993b87a6696c40ab86',
          lastName: 'Nowakiewicz',
          username: 'anowakiewicz',
        },
      },
    })).to.be.deep.eql({
      active: true,
      id: '58972e823b87a6696c40ab8d',
      role: 'bride',
      user: {
        firstName: 'Agata',
        id: '58972c993b87a6696c40ab86',
        lastName: 'Nowakiewicz',
        username: 'anowakiewicz',
      },
    });
  });

});

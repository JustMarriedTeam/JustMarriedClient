import { normalizeWedding, denormalizeWedding } from '../../../main/core/normalization/wedding.normalizer';
import { expect } from 'chai';

describe('wedding (de)normalization', () => {

  it('should normalize wedding', () => {
    expect(normalizeWedding({
      id: '58972e823b87a6696c40ab8a',
      guests: [
        {
          firstName: 'Mateusz',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8c',
        },
        {
          firstName: 'Agata',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8b',
        },
      ],
      tasks: [
        {
          id: '58972f263b87a6696c40ab99',
          description: 'Every wedding needs wedding rings!',
          status: 'pending',
          name: 'Buy wedding ring',
        },
        {
          id: '58972f573b87a6696c40aba0',
          description: 'Every weeding needs some guests!',
          status: 'pending',
          name: 'Invite guests',
        },
      ],
      participants: [
        {
          role: 'groom',
          active: true,
          user: {
            username: 'ggurgul',
            firstName: 'Grzegorz',
            lastName: 'Gurgul',
            id: '58972c7e3b87a6696c40ab83',
          },
          id: '58972e823b87a6696c40ab8f',
        },
        {
          role: 'bride',
          active: true,
          user: {
            username: 'anowakiewicz',
            firstName: 'Agata',
            lastName: 'Nowakiewicz',
            id: '58972c993b87a6696c40ab86',
          },
          id: '58972e823b87a6696c40ab8d',
        },
      ],
      owners: [
        {
          id: '58972c7e3b87a6696c40ab83',
          username: 'ggurgul',
          firstName: 'Grzegorz',
          lastName: 'Gurgul',
        },
      ],
    })).to.be.deep.eql({
      entities: {
        weddings: {
          '58972e823b87a6696c40ab8a': {
            guests: [
              '58972e823b87a6696c40ab8c',
              '58972e823b87a6696c40ab8b',
            ],
            id: '58972e823b87a6696c40ab8a',
            owners: [
              '58972c7e3b87a6696c40ab83',
            ],
            participants: [
              '58972e823b87a6696c40ab8f',
              '58972e823b87a6696c40ab8d',
            ],
            tasks: [
              '58972f263b87a6696c40ab99',
              '58972f573b87a6696c40aba0',
            ],
          },
        },
        guests: {
          '58972e823b87a6696c40ab8b': {
            firstName: 'Agata',
            id: '58972e823b87a6696c40ab8b',
            lastName: 'Machowicz',
          },
          '58972e823b87a6696c40ab8c': {
            firstName: 'Mateusz',
            id: '58972e823b87a6696c40ab8c',
            lastName: 'Machowicz',
          },
        },
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
        tasks: {
          '58972f263b87a6696c40ab99': {
            description: 'Every wedding needs wedding rings!',
            id: '58972f263b87a6696c40ab99',
            name: 'Buy wedding ring',
            status: 'pending',
          },
          '58972f573b87a6696c40aba0': {
            description: 'Every weeding needs some guests!',
            id: '58972f573b87a6696c40aba0',
            name: 'Invite guests',
            status: 'pending',
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
      },
      result: '58972e823b87a6696c40ab8a',
    });
  });

  it('should denormalize wedding', () => {
    expect(denormalizeWedding({"id":"58972e823b87a6696c40ab8a","participants":["589f221dec102777aef1687c","589f221dec102777aef1687a","589f221dec102777aef16878","589f221dec102777aef16876"],"guests":["589f221dec102777aef1686e","589f221dec102777aef1686d"],"tasks":["589f221dec102777aef16875","589f221dec102777aef16874","589f221dec102777aef16873","589f221dec102777aef16872","589f221dec102777aef16871","589f221dec102777aef16870","589f221dec102777aef1686f"],"owners":["58972c7e3b87a6696c40ab83"]},
      {"weddings":{"58972e823b87a6696c40ab8a":{"id":"58972e823b87a6696c40ab8a","participants":["589f221dec102777aef1687c","589f221dec102777aef1687a","589f221dec102777aef16878","589f221dec102777aef16876"],"guests":["589f221dec102777aef1686e","589f221dec102777aef1686d"],"tasks":["589f221dec102777aef16875","589f221dec102777aef16874","589f221dec102777aef16873","589f221dec102777aef16872","589f221dec102777aef16871","589f221dec102777aef16870","589f221dec102777aef1686f"],"owners":["58972c7e3b87a6696c40ab83"]}},"guests":{"589f221dec102777aef1686e":{"id":"589f221dec102777aef1686e","firstName":"Mateusz","lastName":"Machowicz"},"589f221dec102777aef1686d":{"id":"589f221dec102777aef1686d","firstName":"Agata","lastName":"Machowicz"}},"participants":{"589f221dec102777aef1687c":{"id":"589f221dec102777aef1687c","user":"589f221dec102777aef1687d","role":"groom","active":true},"589f221dec102777aef1687a":{"id":"589f221dec102777aef1687a","user":"589f221dec102777aef1687b","role":"bride","active":true},"589f221dec102777aef16878":{"id":"589f221dec102777aef16878","user":"589f221dec102777aef16879","role":"bridesmaid","active":false},"589f221dec102777aef16876":{"id":"589f221dec102777aef16876","user":"589f221dec102777aef16877","role":"bestMan","active":false}},"tasks":{"589f221dec102777aef16875":{"description":"Every wedding needs wedding rings!","status":"pending","name":"Buy wedding ring","id":"589f221dec102777aef16875"},"589f221dec102777aef16874":{"description":"Every weeding needs some guests!","status":"pending","name":"Invite guests","id":"589f221dec102777aef16874"},"589f221dec102777aef16873":{"description":"Every wedding needs food!","status":"blocked","name":"Choose food","id":"589f221dec102777aef16873"},"589f221dec102777aef16872":{"description":"Every wedding needs flowers!","status":"pending","name":"Buy flowers","id":"589f221dec102777aef16872"},"589f221dec102777aef16871":{"description":"Every wedding needs invitations!","status":"pending","name":"Create invitations","id":"589f221dec102777aef16871"},"589f221dec102777aef16870":{"description":"Every wedding needs guests to be seated somehow!","status":"blocked","name":"Sit guests","id":"589f221dec102777aef16870"},"589f221dec102777aef1686f":{"description":"Every wedding needs proposal first!","status":"done","name":"Propose","id":"589f221dec102777aef1686f"}},"users":{"589f221dec102777aef1687d":{"id":"589f221dec102777aef1687d","username":"ggurgul","firstName":"Grzegorz","lastName":"Gurgul"},"589f221dec102777aef1687b":{"id":"589f221dec102777aef1687b","username":"anowakiewicz","firstName":"Agata","lastName":"Nowakiewicz"},"589f221dec102777aef16879":{"id":"589f221dec102777aef16879"},"589f221dec102777aef16877":{"id":"589f221dec102777aef16877"},"58972c7e3b87a6696c40ab83":{"id":"58972c7e3b87a6696c40ab83","username":"ggurgul","firstName":"Grzegorz","lastName":"Gurgul"}}})
    ).to.be.deep.eql({
      id: '58972e823b87a6696c40ab8a',
      guests: [
        {
          firstName: 'Mateusz',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8c',
        },
        {
          firstName: 'Agata',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8b',
        },
      ],
      tasks: [
        {
          id: '58972f263b87a6696c40ab99',
          description: 'Every wedding needs wedding rings!',
          status: 'pending',
          name: 'Buy wedding ring',
        },
        {
          id: '58972f573b87a6696c40aba0',
          description: 'Every weeding needs some guests!',
          status: 'pending',
          name: 'Invite guests',
        },
      ],
      participants: [
        {
          role: 'groom',
          active: true,
          user: {
            username: 'ggurgul',
            firstName: 'Grzegorz',
            lastName: 'Gurgul',
            id: '58972c7e3b87a6696c40ab83',
          },
          id: '58972e823b87a6696c40ab8f',
        },
        {
          role: 'bride',
          active: true,
          user: {
            username: 'anowakiewicz',
            firstName: 'Agata',
            lastName: 'Nowakiewicz',
            id: '58972c993b87a6696c40ab86',
          },
          id: '58972e823b87a6696c40ab8d',
        },
      ],
      owners: [
        {
          id: '58972c7e3b87a6696c40ab83',
          username: 'ggurgul',
          firstName: 'Grzegorz',
          lastName: 'Gurgul',
        },
      ],
    });
  });

});

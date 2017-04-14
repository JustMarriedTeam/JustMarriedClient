/* global describe, beforeEach, afterEach, it */
import {
  normalizeTask,
  denormalizeTask,
  normalizeTaskList,
  denormalizeTaskList,
} from '../../../main/core/normalization/task.normalizer';
import { expect } from 'chai';

describe('single task (de)normalization', () => {

  it('should normalize task', () => {
    expect(normalizeTask({
      id: '58972f263b87a6696c40ab99',
      description: 'Every wedding needs wedding rings!',
      status: 'pending',
      name: 'Buy wedding ring',
    })).to.be.deep.eql({
      entities: {
        tasks: {
          '58972f263b87a6696c40ab99': {
            description: 'Every wedding needs wedding rings!',
            id: '58972f263b87a6696c40ab99',
            name: 'Buy wedding ring',
            status: 'pending',
          },
        },
      },
      result: '58972f263b87a6696c40ab99',
    });
  });

  it('should denormalize task', () => {
    expect(denormalizeTask({
      description: 'Every wedding needs wedding rings!',
      id: '58972f263b87a6696c40ab99',
      name: 'Buy wedding ring',
      status: 'pending',
    }, {
      weddings: {},
      users: {},
      tasks: {
        '58972f573b87a6696c40aba0': {
          description: 'Every weeding needs some guests!',
          id: '58972f573b87a6696c40aba0',
          name: 'Invite guests',
          status: 'pending',
        },
      },
    })).to.be.deep.eql({
      description: 'Every wedding needs wedding rings!',
      id: '58972f263b87a6696c40ab99',
      name: 'Buy wedding ring',
      status: 'pending',
    });
  });

});


describe('task list (de)normalization', () => {

  it('should normalize task list', () => {
    expect(normalizeTaskList([
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
    ])).to.be.deep.eql({
      entities: {
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
      },
      result: [
        '58972f263b87a6696c40ab99',
        '58972f573b87a6696c40aba0',
      ],
    });
  });

  it('should denormalize task list', () => {
    expect(denormalizeTaskList([
      '58972f263b87a6696c40ab99',
      '58972f573b87a6696c40aba0',
    ], {
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
    })).to.be.deep.eql([
      {
        description: 'Every wedding needs wedding rings!',
        id: '58972f263b87a6696c40ab99',
        name: 'Buy wedding ring',
        status: 'pending',
      },
      {
        description: 'Every weeding needs some guests!',
        id: '58972f573b87a6696c40aba0',
        name: 'Invite guests',
        status: 'pending',
      },
    ]);
  });

});

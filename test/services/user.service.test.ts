import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

import * as userService from '../../src/services/user.service';

describe('userService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get user data when user exists', async () => {
    const userData = { username: 'test', uid: 'testUid' };
    const stub = sinon.stub(axios, 'get').resolves({ data: [userData] });

    const result = await userService.getUserData('test');
    expect(result).to.deep.equal(userData);
    sinon.assert.calledWith(stub, `${process.env.API_URL}/users.json`);
  });

  it('should return undefined when user does not exist', async () => {
    const stub = sinon.stub(axios, 'get').resolves({ data: [] });

    const result = await userService.getUserData('nonExistentUser');
    expect(result).to.be.undefined;
    sinon.assert.calledWith(stub, `${process.env.API_URL}/users.json`);
  });

  it('should get profile data when profile exists', async () => {
    const profileData = { userUid: 'testUid', address: 'testAddress', birthdate: 'testBirthdate' };
    const stub = sinon.stub(axios, 'get').resolves({ data: [profileData] });

    const result = await userService.getProfileData('testUid');
    expect(result).to.deep.equal(profileData);
    sinon.assert.calledWith(stub, `${process.env.API_URL}/userProfiles.json`);
  });

  it('should return undefined when profile does not exist', async () => {
    const stub = sinon.stub(axios, 'get').resolves({ data: [] });

    const result = await userService.getProfileData('nonExistentUid');
    expect(result).to.be.undefined;
    sinon.assert.calledWith(stub, `${process.env.API_URL}/userProfiles.json`);
  });
});

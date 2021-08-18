import { anything, instance, mock, when } from 'ts-mockito';
import { DefaultApi as NationalRegistryAPI } from '../../../gen/thjodskra';
import { NationalRegistryAPIService } from './unempolyment.natreg';

describe('National Registry api', () => {
  it('successful call to lookup a citizen', async () => {
    const api = mock(NationalRegistryAPI);
    when(api.citizenSSNGet('1234567890')).thenResolve({
      config: null,
      headers: [],
      data: {
        SSN: '1234567890',
        Name: '',
        PostalCode: 100,
        Address: '',
        Children: '',
        City: '',
      },
      status: 200,
      statusText: 'ok',
    });
    const sut = new NationalRegistryAPIService(instance(api));
    expect(
      await sut.getCitizen({
        nationalId: '1234567890',
      }),
    ).toEqual({
      Address: '',
      Children: '',
      City: '',
      Name: '',
      PostalCode: 100,
      SSN: '1234567890',
    });
  });
  it('failed call to lookup a citizen', async () => {
    const api = mock(NationalRegistryAPI);
    when(api.citizenSSNGet('1234567890')).thenReject(
      new Error('Citizen not found'),
    );
    const sut = new NationalRegistryAPIService(instance(api));
    await expect(
      sut.getCitizen({
        nationalId: '1234567890',
      }),
    ).rejects.toStrictEqual(
      new Error(
        'Error retrieving information from National Regitry: Citizen not found',
      ),
    );
  });
});

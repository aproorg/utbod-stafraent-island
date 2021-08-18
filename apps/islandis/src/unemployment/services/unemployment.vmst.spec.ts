import { anything, instance, mock, when } from 'ts-mockito';
import { VMSTApiService } from './unemployment.vmst';
import { ApplicationsV1Api as VMSTApi } from '../../../gen/vmst';

describe('VMST api', () => {
  it('successful call to create an application', async () => {
    const api = mock(VMSTApi);
    when(api.applicationControllerCreateApplication(anything())).thenResolve({
      config: null,
      headers: [],
      data: {
        id: '12',
        name: '',
        postalCode: 100,
        address: '',
        preferredJobs: [],
        children: [],
        city: '',
        nationalId: '',
      },
      status: 200,
      statusText: 'ok',
    });
    const sut = new VMSTApiService(instance(api));
    expect(
      await sut.createApplication({
        nationalId: '11111',
        children: [],
        name: 'Gervimadur',
        preferredJobs: [],
        startDate: new Date(),
        city: 'Reykjavik',
        postalCode: 108,
        address: '',
      }),
    ).toEqual({ id: '12' });
  });
  it('failed call to create an application', async () => {
    const api = mock(VMSTApi);
    when(api.applicationControllerCreateApplication(anything())).thenReject(
      new Error('Internal error'),
    );
    const sut = new VMSTApiService(instance(api));
    await expect(
      sut.createApplication({
        nationalId: '11111',
        children: [],
        name: 'Gervimadur',
        preferredJobs: [],
        startDate: new Date(),
        city: 'Reykjavik',
        postalCode: 108,
        address: '',
      }),
    ).rejects.toStrictEqual(
      new Error('Error creating application with VMST: Internal error'),
    );
  });
});

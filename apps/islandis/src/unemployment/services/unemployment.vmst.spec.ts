import { anything, mock, when } from 'ts-mockito';
import { VMSTApiService } from './unemployment.vmst';
import { ApplicationsV1Api as VMSTApi } from '../../../gen/vmst';

xdescribe('VMST api', () => {
  it('successful call to create an application', async () => {
    const api = mock(VMSTApi);
    const sut = new VMSTApiService(api);
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
    ).toEqual({ id: 12 });
  });
  it('failed call to create an application', async () => {
    const api = mock(VMSTApi);
    const sut = new VMSTApiService(api);
    when(api.applicationControllerCreateApplication(anything())).thenThrow(
      new Error('Internal error'),
    );
    expect(
      async () =>
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
    ).toThrow('asdfasdf');
  });
});

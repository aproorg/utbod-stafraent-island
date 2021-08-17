import { Injectable } from '@nestjs/common';
import { ApplicationsV1Api as VMSTApi } from '../../gen/vmst';
import { DefaultApi as NationalRegistryAPI } from '../../gen/thjodskra';

@Injectable()
export class VMSTApiService extends VMSTApi {}
@Injectable()
export class NationalRegistryAPIService extends NationalRegistryAPI {}

import { Inject, Injectable } from "@nestjs/common";
import { Resource } from "./resource.model";
import { ResourceDto } from "./dto/resource.dto";

@Injectable()
export class ResourceService {
  constructor(private resourceModel: typeof Resource) {}

  async findByNationalId(nationalId: string): Promise<Resource | null> {
    return null;
  }

  async create(resource: ResourceDto): Promise<Resource> {
    return null;
  }
}

import { Observable } from 'rxjs';
import { LocationRoot } from './appointy.go.location.service';
import { ProgramRoot } from './appointy.go.program.service';

export enum RoleType {
  PROGRAM_MANAGER = 0,
  PROGRAM_ADMIN = 1,
  LOCAL_ADMIN = 2,
  SERVICE_PROVIDER = 3
}

export class Role {
  localAdmin?: LocalAdmin;
  programManager?: ProgramManager;
  programAdmin?: ProgramAdmin;
  serviceProvider?: ServiceProvider;

  constructor() {
    this.localAdmin = new LocalAdmin();
    this.programManager = new ProgramManager();
    this.programAdmin = new ProgramAdmin();
    this.serviceProvider = new ServiceProvider();
  }
}

export class LocalAdmin {
  type: RoleType;
  divisonsIds: DivisionRoot[];

  constructor() {
    this.type = null;
    this.divisonsIds = [];
  }
}

export class DivisionRoot {
  programId: string;
  locationId: string;
  divisionId: string;

  constructor() {
    this.programId = '';
    this.locationId = '';
    this.divisionId = '';
  }
}

export class ProgramManager {
  type: RoleType;
  programId: string;

  constructor() {
    this.type = null;
    this.programId = '';
  }
}

export class ProgramAdmin {
  type: RoleType;
  locationIds: LocationRoot[];

  constructor() {
    this.type = null;
    this.locationIds = [];
  }
}

export class ServiceProvider {
  type: RoleType;
  serviceProviderId: string;
  programId: string;

  constructor() {
    this.type = null;
    this.serviceProviderId = '';
    this.programId = '';
  }
}

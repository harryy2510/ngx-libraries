import { Observable } from 'rxjs';
import { ProgramRoot } from './appointy.go.program.service';

export abstract class ServiceLocations {
  abstract addLocation(location: Location): Observable<LocationIdentifier>;
  abstract getLocation(locationIdentifier: LocationIdentifier): Observable<Location>;
  abstract updateLocation(location: Location): Observable<void>;
  abstract deleteLocation(locationIdentifier: LocationIdentifier): Observable<void>;
  abstract getLocationsByProgram(programRoot: ProgramRoot): Observable<LocationList>;
  abstract getLocationByCode(getLocationByCodeReq: GetLocationByCodeReq): Observable<Location>;
  abstract changeLocationStatus(changeLocationStatusReq: ChangeLocationStatusReq): Observable<void>;
}

export class LocationRoot {
  programId: string;
  locationId: string;

  constructor() {
    this.programId = '';
    this.locationId = '';
  }
}

export class ChangeLocationStatusReq {
  base: LocationIdentifier;
  status: boolean;

  constructor() {
    this.base = new LocationIdentifier();
    this.status = null;
  }
}

export class Location {
  base: ProgramRoot;
  id: string;
  title: string;
  code: string;
  city: string;
  metadata: {
    [key: string]: string;
  };
  isActive: boolean;

  constructor() {
    this.base = new ProgramRoot();
    this.id = '';
    this.title = '';
    this.code = '';
    this.city = '';
    this.metadata = {};
    this.isActive = null;
  }
}

export class LocationIdentifier {
  programId: string;
  id: string;

  constructor() {
    this.programId = '';
    this.id = '';
  }
}

export class LocationList {
  locations: Location[];

  constructor() {
    this.locations = [];
  }
}

export class GetLocationByCodeReq {
  code: string;
  programId: string;

  constructor() {
    this.code = '';
    this.programId = '';
  }
}

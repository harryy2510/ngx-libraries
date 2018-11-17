import {Observable} from 'rxjs';

export abstract class ServicePrograms {
  abstract addProgram(program: Program): Observable<ProgramIdentifier>;

  abstract getProgram(programIdentifier: ProgramIdentifier): Observable<Program>;

  abstract updateProgram(program: Program): Observable<void>;

  abstract deleteProgram(programIdentifier: ProgramIdentifier): Observable<void>;

  abstract getPrograms(): Observable<ProgramList>;

  abstract changeProgramStatus(changeProgramStatusReq: ChangeProgramStatusReq): Observable<void>;
}

export class ProgramRoot {
  programId: string;

  constructor() {
    this.programId = '';
  }
}

export class Program {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  slug: string;
  type: string;
  metadata: {
    [key: string]: string;
  };
  isActive: boolean;

  constructor() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.logoUrl = '';
    this.slug = '';
    this.type = '';
    this.metadata = {};
    this.isActive = null;
  }
}

export class ChangeProgramStatusReq {
  base: ProgramIdentifier;
  status: boolean;

  constructor() {
    this.base = new ProgramIdentifier();
    this.status = null;
  }
}

export class ProgramIdentifier {
  id: string;

  constructor() {
    this.id = '';
  }
}

export class ProgramList {
  programs: Program[];

  constructor() {
    this.programs = [];
  }
}

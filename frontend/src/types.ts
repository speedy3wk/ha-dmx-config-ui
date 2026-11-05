export type Path = Array<string | number>;

export interface ValidationIssue {
  path: Path;
  code: string;
  message: string;
  params?: Record<string, string | number>;
  severity?: "error" | "warning";
}

export interface PreviewResult {
  yaml: string;
  current: string;
  diff: string;
  changed: boolean;
  path: string;
  errors: ValidationIssue[];
}

export interface DeployResult {
  status: "written" | "unchanged" | "invalid";
  path: string;
  included?: boolean;
  check_error?: string | null;
  restart_required?: boolean;
  errors?: ValidationIssue[];
  warnings?: ValidationIssue[];
  installed_fixtures?: string[];
}

export interface StatusResult {
  version: string;
  restart_required: boolean;
  backends: { dmx: BackendInfo };
  dmx: DmxStatus;
}

export interface BackendInfo {
  installed: boolean;
  loaded: boolean;
  version: string | null;
}

export interface DmxStatus {
  path: string;
  file_exists: boolean;
  included: boolean;
  foreign_block: boolean;
}

/** Minimal subset of the Home Assistant frontend object we rely on. */
export interface HomeAssistant {
  language?: string;
  locale?: { language?: string };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

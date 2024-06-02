export interface DrizzleError {
  code: string;
  errno: number;
  message: string;
  sql: string;
  sqlMessage: string;
  sqlState: string;
}
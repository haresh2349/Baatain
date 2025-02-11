export class APIError extends Error {
  statusCode: number;
  errors?: { field: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    errors?: { field: string; message: string }[]
  ) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

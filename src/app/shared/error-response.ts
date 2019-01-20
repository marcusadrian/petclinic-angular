export interface ErrorResponse {
  errors?: ErrorResponseDetail[];
}

export interface ErrorResponseDetail {
  invalidValue?: string;
  message?: string;
  messageTemplate?: string;
  propertyPath?: string;
}

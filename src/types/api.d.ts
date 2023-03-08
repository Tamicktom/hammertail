/**
 * API Response. If status is "success", data will be present and errors will be undefined.
 * If status is "error", errors will be present and data will be undefined.
 */

export interface APIResponse<T> {
  status: "success" | "error";
  errors?: string[];
  data?: T;
}

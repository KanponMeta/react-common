declare interface NormalResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type SuccessResult<T> = {
  success: true;
  data: T;
};

export type FailureResult<T extends string> = {
  success: false;
  errorType: T;
  error: string;
};

type Result<T, E extends string> = SuccessResult<T> | FailureResult<E>;

export default Result;

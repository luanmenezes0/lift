import Axios, { AxiosRequestConfig } from 'axios';
 
export const axiosInstance = Axios.create({ baseURL: 'http://localhost:1337/' }); // use your own URL here or environment variable

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = axiosInstance({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
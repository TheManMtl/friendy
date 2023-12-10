/* eslint-disable @typescript-eslint/no-explicit-any */
interface Repo<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<any>;
  save(t: T): Promise<any>;
}

export default Repo;

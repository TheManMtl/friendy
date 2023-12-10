interface Repo<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<unknown>;
  save(t: T): Promise<unknown>;
}

export default Repo;

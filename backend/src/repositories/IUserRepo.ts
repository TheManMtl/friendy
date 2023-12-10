import User from "../db/models";
import Repo from "./IRepo";
import { UserDTO, UserProfileDTO } from "../dtos/UserDTO";

export interface IUserRepo extends Repo<typeof User> {
  createUser(user: any): Promise<UserDTO>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { IUserRepo } from "./IUserRepo";
import { UserDTO } from "../dtos/UserDTO";
import { resolve } from "path";

class UserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }
  public async createUser(user: any): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      if (
        !user.username ||
        !user.password ||
        !user.email ||
        !user.passwordCopy
      ) {
        reject({ statusCode: 404, message: "Please complete all fields" });
      }
    });
  }
  public async exists(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(t: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  save(t: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default UserRepo;

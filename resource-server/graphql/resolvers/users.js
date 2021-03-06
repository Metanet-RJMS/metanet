import { UserModel } from "../../models/user.js";

export const getUserByUsername = async (args) => {
  try {
      const fetchedUser = await UserModel.findOne(args);
      return fetchedUser;
  } catch (err) {
      console.log(err.message);
  };
};

export const createUser = async args => {
  try {
    const { 
      user,
      email,
      firstname,
      lastname,
      image,
      description
    } = args.user;

    const userObj = new UserModel({
      user,
      email,
      firstname,
      lastname,
      image,
      description
    });

    const newUser = await userObj.save();

    console.log('Created new user: ', newUser);
    return newUser;

  } catch (err) {
    console.log(err);
  }
};
/**
 * `createUser` function is used to create a new user object.
 *
 * @param {string} googleId - This is the unique identifier provided by Google for the user.
 * @param {string} name - This is the name of the user.
 * @param {string} profileImage - This is the URL of the user's profile image.
 *
 * @returns {User} The function returns a new user object. The returned object includes the googleId, name, and profileImage provided as parameters, and sets the role property to Role.USER by default.
 *
 * @example
 * const user = createUser('1234567890', 'John Doe', 'https://example.com/profile.jpg');
 *
 * @see {@link User} for the definition of the User type.
 * @see {@link Role} for the definition of the Role enumeration.
 */
import { Role, User } from "@/types/user";

export default function createUser(
  googleId: string,
  name: string,
  profileImage: string,
): User {
  return {
    googleId,
    name,
    profileImage,
    role: Role.USER,
  };
}

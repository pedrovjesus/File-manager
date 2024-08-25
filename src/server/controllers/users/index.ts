import * as signUp from './SignUp'
import * as signIn from './SignIn'

export const UserController = {
    ...signUp,
    ...signIn
}
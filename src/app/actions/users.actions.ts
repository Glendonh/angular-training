import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { User } from "../services/users.service";

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Fetch Users': emptyProps(),
    'Load Users': props<{users: User[]}>()
  }
})
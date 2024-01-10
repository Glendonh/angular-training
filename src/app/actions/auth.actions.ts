import { createActionGroup, props, emptyProps } from "@ngrx/store";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login User': props<{username: string, password: string}>(),
    'Login Success': props<{username: string}>(),
    'Login Failure': props<{error: string}>(),
    'Logout': emptyProps()
  }
})
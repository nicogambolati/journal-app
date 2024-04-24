import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  testUser,
} from "../../fixtures/authFixtures";

describe("test in authSlice", () => {
  test('should return the initial state and be called "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test('should call "login', () => {
    // console.log(login(testUser));
    const state = authSlice.reducer(initialState, login(testUser));
    // console.log(state);

    expect(state).toEqual({
      status: "authenticated",
      uid: testUser.uid,
      email: testUser.email,
      displayName: testUser.displayName,
      photoURL: testUser.photoURL,
      errorMessage: null,
    });
  });

  test('should call "logout without arguments', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test('should call "logout with arguments', () => {
    const errorMessage = "test error message";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test('should change status to "checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});

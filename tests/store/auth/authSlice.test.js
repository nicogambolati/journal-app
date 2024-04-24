import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";

describe("test in authSlice", () => {
  test('should return the initial state and be called "auth"', () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);

    expect(authSlice.name).toBe("auth");
  });
});

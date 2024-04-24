import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout, startGoogleSignIn } from "../../../src/store/auth";
import { checkingAuthentication } from "../../../src/store/auth/thunks";
import { testUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("test in thunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('should call "checkingAuthentication"', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn should call "checkingCredentials" & "login - success"', async () => {
    const loginData = { ok: true, ...testUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn should call "checkingCredentials" & "logout - error"', async () => {
    const loginData = { ok: false, errorMessage: 'error in Google' };
    await singInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });
});

export const initialState = {
  status: "checking", // 'checking', 'authenticated', 'not-authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: "authenticated",
  uid: "ABC123",
  email: "test@example.com",
  displayName: "Test Name",
  photoURL: "http://test.jpg",
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const testUser = {
  uid: "ABC123",
  email: "test@example.com",
  displayName: "Test Name",
  photoURL: "http://test.jpg",
};

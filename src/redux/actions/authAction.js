export const login = (user) => {
    const serializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
  
    return {
      type: 'LOGIN',
      payload: serializableUser,
    };
  };
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
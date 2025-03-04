export const cookieSerialize = (loginResult) => {
  return `fid=${loginResult.fid}; uf=${loginResult.uf}; _d=${loginResult._d}; UID=${
    loginResult._uid || loginResult.UID
  }; vc3=${loginResult.vc3};`;
};

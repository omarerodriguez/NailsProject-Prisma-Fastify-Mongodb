const extractTokenToHeader = (reqObject) => {
  return reqObject.headers?.authorization?.split(' ')[1];
};

const verifyScopesByRole = (tokenRole, scopes) => {
  if (
    tokenRole === 'ADMIN' &&
    (scopes.includes('USER') || scopes.includes('ADMIN'))
  )
    return true;
  else if (tokenRole === 'USER' && scopes.includes('USER')) return true;
  return false;
};

module.exports = {
  extractTokenToHeader,
  verifyScopesByRole,
};

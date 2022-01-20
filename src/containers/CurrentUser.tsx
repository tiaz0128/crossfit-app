import React from 'react';

interface CurrentUserProps {}

const CurrentUser: React.FunctionComponent<CurrentUserProps> = ({ children }) => {
  return <>{children}</>;
};

export default CurrentUser;

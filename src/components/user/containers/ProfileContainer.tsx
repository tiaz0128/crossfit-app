import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';

interface ProfileContainerProps {}

const ProfileContainer: React.FunctionComponent<ProfileContainerProps> = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  return <div></div>;
};

export default ProfileContainer;

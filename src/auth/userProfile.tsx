import React from 'react';

import config from '../config';
import authService from './authService';

export const tunnistusSuomifiAMR = 'heltunnistussuomifi';

export type AMR =
  | 'github'
  | 'google'
  | 'facebook'
  | 'yletunnus'
  | typeof tunnistusSuomifiAMR
  | typeof config.helsinkiAccountAMR;

export type AMRStatic =
  | 'github'
  | 'google'
  | 'facebook'
  | 'yletunnus'
  | 'helsinkiAccount'
  | 'tunnistusSuomifi';

export interface Profile {
  amr: AMR;
  auth_time: number;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  sub: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
}

function useProfile(): ProfileState {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let ignore = false;

    function getUser() {
      setIsLoading(true);

      authService
        .getUser()
        .then(user => {
          if (ignore) {
            return;
          }
          setProfile(
            user && user.expired === false
              ? ((user.profile as unknown) as Profile)
              : null
          );
        })
        .catch(() => {
          if (ignore) {
            return;
          }

          setError(Error('User was not found'));
        })
        .finally(() => {
          if (ignore) {
            return;
          }

          setIsLoading(false);
        });
    }

    getUser();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    profile,
    loading: isLoading,
    error,
  };
}

export default useProfile;
import { useState } from "react";
import { UserKeys } from "../../enums/User";
import { v4 as uuidv4 } from "uuid";

function useUser() {
  const [ user, _setUserId ] = useState(sessionStorage.getItem(UserKeys.Id));

  const setUserId = (userId: string) => {
    // Some side-effect here ...
    sessionStorage.setItem('userId', userId);
    _setUserId(userId);
  };

  const setOrGenerateUserId = (userId: string) => {
      let newId = userId || uuidv4();
      setUserId(newId)
      return newId
    }
  ;

  const getUserHeader = () => {
    return {
      headers: new Headers({
        'user': `${ user }`,
      })
    }
  }

  return {
    user,
    getUserHeader,
    setOrGenerateUserId,
  };
}

export default useUser;

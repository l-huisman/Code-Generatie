import { createContext, useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import axios from "axios";
import { useRouter } from "next/router";
export type UserContextType = User | null | undefined;

export interface UserContextState {
  user?: UserContextType;
  setUser: React.Dispatch<React.SetStateAction<UserContextType>>;
  refreshUser: () => void;
  logoutUser: () => void;
}

interface UserProviderProps {
  children: JSX.Element;
}

export const UserContext = createContext<UserContextState>(null!);

export function UserProvider(props: UserProviderProps): JSX.Element {
  const { children } = props;
  const [userContext, setUser] = useState<UserContextType>(undefined);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const userInfo = await axios.get(`/api/me`);
      setUser(userInfo.data ? userInfo.data : null);
      console.log(userInfo.data);
      // setUser({
      //   id: 1,
      //   username: "test",
      //   email: "",
      //   firstName: "Joost",
      //   lastName: "Test",
      //   userType: "EMPLOYEE",
      // });
    } catch (e) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`/api/logout`);
      setUser(null);
      router.push("/login");
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (userContext === undefined) {
    // Do not load the children of the provider if the user is undefined.
    // Lets further wait...
    // undefined = we have not determined the login state yet
    // null = not logged in
    // User value = logged in
    return <div className="flex items-center justify-center "></div>;
  }

  return (
    <UserContext.Provider
      value={{
        user: userContext,
        setUser,
        refreshUser: getCurrentUser,
        logoutUser: logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

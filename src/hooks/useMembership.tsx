import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
type MembershipContext = [boolean, Dispatch<SetStateAction<boolean>>];

const membershipContext = createContext<MembershipContext | null>(null);

export default function useMembership() {
  return useContext(membershipContext)!;
}

export function MembershipProvider({ children }: { children?: ReactNode }) {
  const membership = useLocalStorage("hasMembership", false);

  return (
    <membershipContext.Provider value={membership}>
      {children}
    </membershipContext.Provider>
  );
}

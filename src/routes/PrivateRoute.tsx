import { useAppSelector } from "@/redux/hook";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/signin", { state: { from: pathname } });
    }
  }, [token, pathname, navigate]);

  if (!token) {
    return null; // or any loading indicator you prefer while redirecting
  }

  return <>{children}</>;
}

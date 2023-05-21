import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
const AccountsDetailHook = () => {
  const { enqueueSnackbar } = useSnackbar();
  const accountUpdated = useAppSelector(
    (item) => item.authReducer.accountCreated
  );
  const [accounts, setAccounts] = useState([]);

  const authAccounst = async () => {
    try {
      const res: any = await axios.get(`${""}/auth-signup.json`);
      const { status } = res;
      const data = await res.data;
      switch (status) {
        case 200:
          let recieveData: any = [];
          for (const key in data) {
            recieveData.push({
              id: key,
              firstName: data[key].firstName,
              lastName: data[key].lastName,
              email: data[key].email,
              userName: data[key].userName,
              password: data[key].password,
              confirmPassword: data[key].confirmPassword,
              isAdmin: data[key]?.isAdmin,
            });
          }
          setAccounts(recieveData);
          break;
        default:
          enqueueSnackbar("Some Thing Went Wrong", {
            variant: "error",
          });
          break;
      }
    } catch (error) {
      enqueueSnackbar("Some Thing Went Wrong", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    authAccounst();
  }, [accountUpdated]);
  return {
    authData: accounts,
  };
};

export default AccountsDetailHook;

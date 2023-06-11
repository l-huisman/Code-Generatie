import axios from "axios";
import toast from "react-hot-toast";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  use,
} from "react";
import dayjs from "dayjs";
import { accountsData } from "@/assets/data";

const useAccounts = (
  type: string,
  ApiConfig: any,
  id?: number,
  userId?: number
) => {
  const [accounts, setAccounts] = useState<any>([]);
  const [account, setAccount] = useState<any>({});
  const [state, setState] = useState<any>({});
  const [filters, setFilters] = useState<any>({
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(),
    search: "",
    fromAccountIban: null,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAccount = useCallback(async () => {
    try {
      const { data } = await axios.get(`/backend/accounts/${id}`, ApiConfig);

      setAccount(data?.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id, ApiConfig]);

  const getAccounts = useCallback(async () => {
    try {
      setAccounts(accountsData);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id]);

  const getMyAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/backend/accounts/user/${userId}`,
        ApiConfig
      );

      setAccounts(data?.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
    setLoading(false);
  }, [userId, ApiConfig]);

  useEffect(() => {
    switch (type) {
      case "user":
        getMyAccounts();
        break;
      case "all":
        getAccounts();
        break;
    }
  }, []);

  useEffect(() => {
    getAccounts();
  }, [pageNumber]);

  return {
    account,
    accounts,
    state,
    filters,
    pageNumber,
    totalRows,
    perPage,
    loading,
    setPageNumber,
    setState,
    setFilters,
  };
};

export default useAccounts;

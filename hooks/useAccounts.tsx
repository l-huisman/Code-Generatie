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

const useAccounts = (ApiConfig: any, id?: number) => {
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

  const getAccount = useCallback(async () => {
    try {
      const { data } = await axios.get(`/backend/accounts/${id}`);

      setAccount(data?.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id]);

  const getAccounts = useCallback(async () => {
    try {
      setAccounts(accountsData);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id]);

  const addTransaction = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `/backend/transactions`,
        state,
        ApiConfig
      );

      toast.success(data?.message);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [ApiConfig]);

  useEffect(() => {
    if (id) getAccount();
    else getAccounts();
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
    setPageNumber,
    setState,
    setFilters,
    addTransaction,
  };
};

export default useAccounts;

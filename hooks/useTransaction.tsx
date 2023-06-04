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
import { transactionsData } from "@/assets/data";

const useTransaction = (ApiConfig: any, accountId?: number, id?: number) => {
  const [transactions, setTransactions] = useState<any>([]);
  const [transaction, setTransaction] = useState<any>({});
  const [state, setState] = useState<any>({});
  const [filters, setFilters] = useState<any>({
    startDate: `${new Date().getFullYear()}-01-01`,
    endDate: dayjs(new Date()).format("YYYY-MM-DD"),
    search: "",
    fromAccountIban: null,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const getTransaction = useCallback(async () => {
    try {
      //const { data } = await axios.get(`/backend/transactions/${id}`);

      setTransaction(transactionsData?.[0]);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [id]);

  const getTransactions = useCallback(async () => {
    try {
      // const { data } = await axios.get(
      //   `/backend/transactions?start_date=${dayjs(filters?.startDate).format(
      //     "YYYY-MM-DD"
      //   )}&end_date=${dayjs(filters?.endDate).format(
      //     "YYYY-MM-DD"
      //   )}&from_account_iban=${filters?.fromAccountIban}&search=${
      //     filters?.search
      //   }&pageNumber=${pageNumber}`
      // );

      setTransactions(transactionsData);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [accountId]);

  const addTransaction = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `/backend/transactions`,
        state,
        ApiConfig
      );

      toast.success(data?.msg);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
  }, [ApiConfig]);

  useEffect(() => {
    if (id) getTransaction();
    else if (accountId) getTransactions();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [pageNumber]);

  return {
    transactions,
    transaction,
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

export default useTransaction;

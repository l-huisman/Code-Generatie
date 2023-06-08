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

const useTransaction = (
  type: string,
  ApiConfig: any,
  id?: number,
  accountId?: number
) => {
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
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [modalType, setModalType] = useState("Deposit");

  const getTransaction = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/backend/transactions/${id}`,
        ApiConfig
      );

      setTransaction(data);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
    setLoading(false);
  }, [id, ApiConfig, filters]);

  const getTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/backend/transactions?start_date=${dayjs(filters?.startDate).format(
          "YYYY-MM-DD"
        )}&end_date=${dayjs(filters?.endDate).format("YYYY-MM-DD")}&search=${
          filters?.search
        }`,
        ApiConfig
      );

      setTransactions(data);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
    setLoading(false);
  }, [ApiConfig, filters]);

  const getTransactionsByUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/backend/transactions/user`, ApiConfig);

      setTransactions(data);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
    setLoading(false);
  }, [ApiConfig]);

  const getTransactionsByAccount = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/backend/transactions/accounts/${accountId}?start_date=${dayjs(
          filters?.startDate
        ).format("YYYY-MM-DD")}&end_date=${dayjs(filters?.endDate).format(
          "YYYY-MM-DD"
        )}&search=${filters?.search}`,
        ApiConfig
      );

      setTransactions(data);
    } catch (e: any) {
      toast.error(e?.response?.data?.msg);
    }
    setLoading(false);
  }, [accountId, filters, ApiConfig]);

  const addTransaction = useCallback(
    async (type: string) => {
      try {
        const { data } = await axios.post(
          `/backend/transactions`,
          {
            fromAccountIban: state?.fromAccount?.meta?.iban,
            toAccountIban: state?.toAccount?.meta?.iban
              ? state?.toAccount?.meta?.iban
              : state?.toAccountIban,
            transactionType: type,
            amount: state?.amount,
            label: state?.label,
            description: state?.description,
          },
          ApiConfig
        );

        toast.success(data?.msg);
      } catch (e: any) {
        toast.error(e?.response?.data?.msg);
      }
    },
    [ApiConfig, state]
  );

  useEffect(() => {
    switch (type) {
      case "single":
        getTransaction();
        break;
      case "all":
        getTransactions();
        break;
      case "user":
        getTransactionsByUser();
        break;
      case "account":
        getTransactionsByAccount();
        break;
    }
  }, []);

  // useEffect(() => {
  //   getTransactions();
  // }, [pageNumber]);

  return {
    transactions,
    transaction,
    state,
    filters,
    pageNumber,
    totalRows,
    perPage,
    loading,
    openAddModal,
    modalType,
    setModalType,
    setOpenAddModal,
    setPageNumber,
    setState,
    setFilters,
    addTransaction,
    getTransactions,
    getTransactionsByAccount,
  };
};

export default useTransaction;

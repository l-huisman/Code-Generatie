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
    iban: "",
    search_iban: "",
    fromAccountIban: null,
    amountRelation: "",
    amount: "",
  });
  const pageSizes = [5, 10, 20, 30];
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes?.[0]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [modalType, setModalType] = useState("Deposit");
  const amountRelationTypes = [
    {
      id: 1,
      name: "<",
    },
    {
      id: 2,
      name: ">",
    },
    {
      id: 3,
      name: "=",
    },
    {
      id: 4,
      name: "",
    },
  ];

  const getTransaction = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/backend/transactions/${id}`,
        ApiConfig
      );

      setTransaction(data?.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
    setLoading(false);
  }, [id, ApiConfig, filters]);

  const getTransactions = useCallback(
    async (page?: number, size?: number) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/backend/transactions?start_date=${dayjs(filters?.startDate).format(
            "YYYY-MM-DD"
          )}&end_date=${dayjs(filters?.endDate).format("YYYY-MM-DD")}&iban=${
            filters?.iban
          }&amount_relation=${filters?.amountRelation?.name || ""}&amount=${
            filters?.amount
          }&page_number=${page != null ? page - 1 : pageNumber - 1}&page_size=${
            size || pageSize
          }`,
          ApiConfig
        );

        setTransactions(data?.data);

        setTotalRows(Number(data?.message));
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
      setLoading(false);
    },
    [ApiConfig, filters, pageNumber, pageSize]
  );

  const getTransactionsByUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/backend/transactions/user`, ApiConfig);

      setTransactions(data?.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
    setLoading(false);
  }, [ApiConfig]);

  const getTransactionsByAccount = useCallback(
    async (page?: number, size?: number) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/backend/transactions/accounts/${accountId}?start_date=${dayjs(
            filters?.startDate
          ).format("YYYY-MM-DD")}&end_date=${dayjs(filters?.endDate).format(
            "YYYY-MM-DD"
          )}&search_iban=${filters?.search_iban}&amount_relation=${
            filters?.amountRelation?.name || ""
          }&amount=${filters?.amount}&page_number=${
            page != null ? page - 1 : pageNumber - 1
          }&page_size=${size || pageSize}`,
          ApiConfig
        );

        setTransactions(data?.data);
        setTotalRows(Number(data?.message));
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
      setLoading(false);
    },
    [accountId, filters, ApiConfig, pageSize]
  );

  const addTransaction = useCallback(
    async (type: string) => {
      try {
        const { data } = await axios.post(
          `/backend/transactions`,
          {
            fromAccountIban: state?.fromAccount?.meta?.iban
              ? state?.fromAccount?.meta?.iban
              : state?.fromAccountIban,
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

        setState({
          label: "",
          description: "",
          amount: "",
          toAccountIban: "",
          fromAccountIban: "",
        });
        setOpenAddModal(false);
        toast.success(data?.message);
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
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
        console.log("kaas2");
        getTransactions();
        break;
      case "user":
        getTransactionsByUser();
        break;
      case "account":
        getTransactionsByAccount();
        break;
    }
    return () => {};
  }, [type]);

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
    pageSize,
    loading,
    openAddModal,
    modalType,
    pageSizes,
    amountRelationTypes,
    setPageSize,
    setPageNumber,
    setTotalRows,
    setModalType,
    setOpenAddModal,
    setState,
    setFilters,
    addTransaction,
    getTransactions,
    getTransactionsByAccount,
  };
};

export default useTransaction;

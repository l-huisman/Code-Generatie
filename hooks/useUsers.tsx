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
import { accountsData, usersData } from "@/assets/data";

const useUsers = (ApiConfig: any, id?: number) => {
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>({});
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

  const getUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`/backend/users/${id}`, ApiConfig);

      setUser(data);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id]);

  const getUsers = useCallback(async () => {
    try {
      setUsers(usersData);
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  }, [id]);

  useEffect(() => {
    if (id) getUser();
    else getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [pageNumber]);

  return {
    user,
    users,
    state,
    filters,
    pageNumber,
    totalRows,
    perPage,
    setPageNumber,
    setState,
    setFilters,
  };
};

export default useUsers;

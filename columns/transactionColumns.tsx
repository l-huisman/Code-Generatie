import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/button";
import dayjs from "dayjs";

export const transactionColumns = [
  {
    name: "Type",
    selector: (row: any) => row.transaction_type,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    name: "Label",
    selector: (row: any) => row.label,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: any) => row.description,
    sortable: true,
  },
  {
    name: "Created at",
    selector: (row: any) => row.created_at,
    format: (row: any, index: number) =>
      row.created_at ? dayjs(row?.created_at).format("HH:mm DD/MM/YYYY") : "-",
    sortable: true,
  },
];

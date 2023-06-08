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
    selector: (row: any) => row.transactionType,
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
    selector: (row: any) => row.createdAt,
    format: (row: any, index: number) =>
      row.createdAt ? dayjs(row?.createdAt).format("HH:mm DD/MM/YYYY") : "-",
    sortable: true,
  },
];

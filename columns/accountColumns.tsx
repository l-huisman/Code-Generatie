import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/button";

export const accountColumns = [
  {
    name: "Iban",
    selector: (row: any) => row.iban,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: any) => row.isSavings,
    format: (row: any, index: number) =>
      row.isSavings ? "Savings" : "Payment",
    sortable: true,
  },
  {
    name: "Active",
    selector: (row: any) => row.active,
    format: (row: any, index: number) => (row.active ? "Active" : "Inactive"),
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row: any) => row.balance,
    sortable: true,
  },
  {
    name: "Transaction limit",
    selector: (row: any) => row.transactionLimit,
    sortable: true,
  },
  {
    name: "Daily limit",
    selector: (row: any) => row.dailyLimit,
    sortable: true,
  },
  {
    name: "Absolute limit",
    selector: (row: any) => row.absoluteLimit,
    sortable: true,
  },
];

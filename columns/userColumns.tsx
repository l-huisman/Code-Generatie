import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/button";

export const userColumns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "First name",
    selector: (row: any) => row.firstName,
    sortable: true,
  },
  {
    name: "Last name",
    selector: (row: any) => row.lastName,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row: any) => row.username,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: any) => row.userType,
    sortable: true,
  },
];

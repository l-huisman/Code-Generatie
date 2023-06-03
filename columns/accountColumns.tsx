import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/button";

export const accountColumns = () => [
  {
    name: "Voornaam",
    selector: (row: any) => row.first_name,
  },
  {
    name: "Achternaam",
    selector: (row: any) => row.last_name,
  },
  {
    name: "Gebruikersnaam",
    selector: (row: any) => row.username,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
  },
  {
    name: "Telefoonnummer",
    selector: (row: any) => row.phonenumber,
  },
];

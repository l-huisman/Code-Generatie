import {
  ChartPieIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CurrencyEuroIcon,
  DocumentArrowDownIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  PhoneIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export const transactionsData = [
  {
    id: 1,
    label: "Salary",
    description: "Salary",
    amount: 100000,
    transaction_type: "Transfer",
    from_account_iban: "NL01INHO0000000001",
    created_at: "20:19 2021-09-01",
  },
];

export const sidebarItems = [
  {
    name: "Users",
    icon: <UsersIcon className="h-6 w-6" />,
    href: "/dashboard/users",
  },
  {
    name: "Accounts",
    icon: <CircleStackIcon className="h-6 w-6" />,
    href: "/dashboard/accounts",
  },
  {
    name: "Transactions",
    icon: <CurrencyEuroIcon className="h-6 w-6" />,
    href: "/dashboard/transactions",
  },
];

export const accountsData = [
  {
    iban: "NL01INHO0000000001",
    balance: 100000,
    name: "Payment account",
    dailyLimit: 100,
    transactionLimit: 1000,
    absoluteLimit: 100,
    isSaving: false,
    active: true,
  },
];

export const usersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "test@example.com",
    userType: "USER",
  },
];

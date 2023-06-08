import { sidebarItems } from "@/assets/data";
import DashboardLayout from "@/layout/dashboardLayout";
import { UsersIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { useEffect } from "react";

export default function Dashboard() {
  return (
    <>
      <DashboardLayout title="Dashboard">
        <div className="w-full grid grid-cols-2 gap-4 p-4">
          {sidebarItems.map((item) => (
            <Link
              href={item?.href}
              className="shadow-xl p-10 rounded-lg flex items-center gap-x-2 hover:bg-primary hover:text-white cursor-pointer"
            >
              {item?.icon}
              <h3 className="font-semibold text-xl">{item?.name}</h3>
            </Link>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}

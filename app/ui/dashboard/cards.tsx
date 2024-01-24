import { fetchCardData } from '@/app/lib/data';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      <Card title="Ingreso mensual" value={totalPaidInvoices} type="collected" />
      <Card title="Total Ahorrado" value={totalPendingInvoices} type="pending" />
      <Card title="Gastos Fijos" value={numberOfInvoices} type="invoices" />
      <Card
        title="Gastos mensuales"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-800 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-50" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-50">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-gray-600 px-4 py-8 text-center text-2xl text-gray-50`}
      >
        {value}
      </p>
    </div>
  );
}

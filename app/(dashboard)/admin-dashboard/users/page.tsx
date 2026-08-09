import { Users } from "lucide-react";
import { getUserList } from "../../_actions/admin_actions/userActions";
import UserTable from "../../_components/admin/UserTable";
import { UserEmailSearch } from "../../_components/admin/EmailSearchBox";


export default async function UserListPage({
  searchParams,
}: {
  searchParams?: Promise<{ email?: string }>;
}) {
  const query = await searchParams;
  const res = await getUserList(query?.email);
  const users = res.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 dark:text-slate-300">
            <Users className="w-6 h-6 text-primary" /> User Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View, manage roles, and update platform account access status.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-700">Total Registered:</span>
          <span className="bg-white px-2 py-0.5 rounded font-mono font-bold text-slate-900 shadow-sm">
            {users.length}
          </span>
        </div>
      </div>

      {/* 🟢 Email Search Component with Button */}
      <div className="flex justify-end">
        <UserEmailSearch />
      </div>

      {/* Responsive Table/Card View */}
      <UserTable users={users} />
    </div>
  );
}
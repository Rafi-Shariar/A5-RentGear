/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert, UserCheck, UserX, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatus } from "../../_actions/admin_actions/userActions";
import { useRouter } from "next/navigation";

export interface User {
  userId: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  address: string;
  photoURL: string;
  accountStatus: "ACTIVE" | "SUSPENDED" | string;
  createdAt: string;
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleStatusToggle = async () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.accountStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setIsUpdating(true);

    try {

      const res = await updateUserStatus(selectedUser.userId, newStatus)

      if(res.success){
        toast.success(`User status updated to ${newStatus}`);
        setIsOpen(false);
        router.refresh();
      }else{
         toast.error("Failed to update status");
      }
      

    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">Admin</Badge>;
      case "PROVIDER":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Provider</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200">Customer</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "ACTIVE" ? (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
      </Badge>
    ) : (
      <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200 gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Suspended
      </Badge>
    );
  };

  return (
    <>
      {/* Desktop & Tablet Table View */}
      <div className="hidden md:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.userId} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <Image
                          src={user.photoURL || "/placeholder-avatar.png"}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 truncate text-sm">{user.name}</span>
                        <span className="text-xs text-slate-500 truncate">{user.address}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs text-slate-600 gap-0.5">
                      <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {user.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {user.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.accountStatus)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal(user)}
                      className="text-xs font-medium"
                    >
                      Change Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Responsive View (Cards) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user.userId} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{user.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.accountStatus)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {user.email}</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {user.phoneNumber}</p>
              <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" /> {user.address}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenModal(user)}
              className="w-full text-xs mt-2"
            >
              Update Status
            </Button>
          </div>
        ))}
      </div>

      {/* Status Action Confirmation Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              {selectedUser?.accountStatus === "ACTIVE" ? (
                <ShieldAlert className="w-5 h-5 text-rose-600" />
              ) : (
                <Shield className="w-5 h-5 text-emerald-600" />
              )}
              {selectedUser?.accountStatus === "ACTIVE" ? "Suspend Account" : "Reactivate Account"}
            </DialogTitle>
            <DialogDescription className="text-slate-600 pt-2">
              Are you sure you want to change status for{" "}
              <span className="font-semibold text-slate-900">{selectedUser?.name}</span>?
              {selectedUser?.accountStatus === "ACTIVE" ? (
                <p className="mt-2 text-xs bg-rose-50 text-rose-700 p-2.5 rounded-lg border border-rose-200">
                  ⚠️ This user will be blocked from logging into the platform and placing/managing orders.
                </p>
              ) : (
                <p className="mt-2 text-xs bg-emerald-50 text-emerald-700 p-2.5 rounded-lg border border-emerald-200">
                  ✅ Access will be restored, allowing full platform features.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button
              variant={selectedUser?.accountStatus === "ACTIVE" ? "destructive" : "default"}
              onClick={handleStatusToggle}
              disabled={isUpdating}
              className="gap-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : selectedUser?.accountStatus === "ACTIVE" ? (
                <>
                  <UserX className="w-4 h-4" /> Suspend User
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" /> Activate User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
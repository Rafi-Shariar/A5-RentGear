import React from "react";

import { 
  ShoppingBag, 
  User, 
  Store, 
  Calendar, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderList } from "../../_actions/admin_actions/orderAction";
import { IAdminOrder } from "@/lib/types";
import { AdminOrderFilters } from "../../_components/admin/OrderFilters";
import { AdminPagination } from "../../_components/admin/AdminPagination";


// Helper Function for Order Status Badges
const getStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300">Confirmed</Badge>;
    case "PAID":
      return <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 border-teal-300">Paid</Badge>;
    case "PICKED_UP":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300">Picked Up</Badge>;
    case "PLACED":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300">Placed</Badge>;
    case "RETURNED":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300">Returned</Badge>;
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const AdminOrderListPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; status?: string }>;
}) => {
  const query = await searchParams;
  const currentPage = Number(query?.page) || 1;
  const limit = 10;

  const getOrdersRes = await getOrderList({
    page: currentPage.toString(),
    limit: limit.toString(),
    status: query?.status,
  });

  if (!getOrdersRes?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Failed to Load Orders</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {getOrdersRes?.message || "Something went wrong while fetching platform orders."}
        </p>
      </div>
    );
  }

  const totalOrders = getOrdersRes.data?.totalOrder || 0;
  const orders: IAdminOrder[] = getOrdersRes.data?.orders || [];
  const totalPages = Math.ceil(totalOrders / limit);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            System Orders Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and monitor all gear rental transactions made across the platform.
          </p>
        </div>
        <div>
          <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">
            Total Orders: <span className="ml-1 font-bold text-primary">{totalOrders}</span>
          </Badge>
        </div>
      </div>

      {/* 🟢 Status Filter Tabs */}
      <AdminOrderFilters />

      {/* Orders Table */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl bg-muted/20">
          <PackageCheck className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <p className="font-medium text-foreground">No Orders Found</p>
          <p className="text-sm text-muted-foreground mt-1">There are no rental orders matching your current filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px] py-4">Order & Status</TableHead>
                  <TableHead className="w-[240px]">Customer Details</TableHead>
                  <TableHead className="w-[220px]">Gear Item</TableHead>
                  <TableHead className="w-[220px]">Provider / Shop</TableHead>
                  <TableHead className="w-[240px]">Rental Schedule</TableHead>
                  <TableHead className="w-[120px] text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId} className="hover:bg-muted/30 transition-colors">
                    
                    {/* Order ID & Status */}
                    <TableCell className="py-4 align-top">
                      <div className="space-y-2">
                        <div className="font-mono text-xs text-muted-foreground font-semibold">
                          #{order.orderId.substring(0, 8).toUpperCase()}
                        </div>
                        <div>{getStatusBadge(order.status)}</div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.orderedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </div>
                      </div>
                    </TableCell>

                    {/* Customer Info */}
                    <TableCell className="align-top">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          {order.user?.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {order.user?.email}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {order.user?.phoneNumber}
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 flex items-start gap-1 line-clamp-2 mt-1" title={order.user?.address}>
                          <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                          {order.user?.address}
                        </p>
                      </div>
                    </TableCell>

                    {/* Gear Info */}
                    <TableCell className="align-top">
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium uppercase text-muted-foreground tracking-wider">
                          {order.gear?.brand}
                        </p>
                        <p className="text-xs font-semibold text-foreground line-clamp-1" title={order.gear?.title}>
                          {order.gear?.title}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {order.gear?.category?.categoryName}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Qty: <strong className="text-foreground">{order.quantity}</strong>
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Provider Info */}
                    <TableCell className="align-top">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-emerald-600" />
                          {order.gear?.provider?.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {order.gear?.provider?.email}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {order.gear?.provider?.phoneNumber}
                        </p>
                      </div>
                    </TableCell>

                    {/* Dates */}
                    <TableCell className="align-top">
                      <div className="bg-muted/40 p-2.5 rounded-lg border border-border/50 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Collection:</span>
                          <span className="font-medium text-foreground">
                            {new Date(order.collectionDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <div className="flex items-center justify-center text-muted-foreground/60">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                        <div className="flex items-center justify-between border-t border-border/40 pt-1">
                          <span className="text-muted-foreground">Return:</span>
                          <span className="font-medium text-foreground">
                            {new Date(order.returnDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="align-top text-right">
                      <div className="text-base font-bold text-primary">
                        ৳{order.totalAmount}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        ৳{order.gear?.price} / day
                      </p>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 🟢 Pagination Controls */}
          <AdminPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default AdminOrderListPage;
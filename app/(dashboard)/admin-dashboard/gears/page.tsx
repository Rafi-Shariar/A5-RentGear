import React from "react";
import Image from "next/image";
import { getGearList } from "../../_actions/admin_actions/gearAction";

import {
  Package,
  Store,
  AlertCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Tag,
  Layers,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IGear, IGearAdmin } from "@/lib/types";

const AllGearsPage = async () => {
  const getGearRes = await getGearList();

  if (!getGearRes?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-3" />
        <h3 className="text-lg font-semibold text-foreground">
          Failed to Load Gears
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {getGearRes?.message ||
            "Something went wrong while fetching gear inventory."}
        </p>
      </div>
    );
  }

  const totalGears = getGearRes?.data?.totalGears || 0;
  const gears = getGearRes?.data?.gears || [];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            System Gear Inventory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and review all rental items listed by providers across the
            platform.
          </p>
        </div>
        <div>
          <Badge
            variant="secondary"
            className="px-3 py-1.5 text-sm font-medium"
          >
            Total Items:{" "}
            <span className="ml-1 font-bold text-primary">{totalGears}</span>
          </Badge>
        </div>
      </div>

      {/* Table Section */}
      {gears.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl bg-muted/20">
          <Package className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <p className="font-medium text-foreground">No Gears Listed Yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            There are no rental items available in the system.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] py-4">Item Details</TableHead>
                <TableHead className="w-[140px]">Category</TableHead>
                <TableHead className="w-[120px]">Daily Rate</TableHead>
                <TableHead className="w-[100px]">Stock</TableHead>
                <TableHead className="w-[280px]">Provider / Shop</TableHead>
                <TableHead className="w-[140px]">Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gears.map((gear : IGearAdmin, index : number) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Gear Info & Image */}
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden border bg-muted shrink-0">
                        <Image
                          src={gear.imageURL}
                          alt={gear.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="space-y-1 max-w-[220px]">
                        <div className="flex items-center gap-1 text-[11px] font-medium uppercase text-muted-foreground tracking-wider">
                          <Tag className="w-3 h-3" />
                          {gear.brand}
                        </div>
                        <p
                          className="font-medium text-sm text-foreground truncate"
                          title={gear.title}
                        >
                          {gear.title}
                        </p>
                        <p
                          className="text-xs text-muted-foreground line-clamp-1"
                          title={gear.description}
                        >
                          {gear.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-background font-normal text-xs py-1"
                    >
                      <Layers className="w-3 h-3 mr-1 text-primary" />
                      {gear.category?.categoryName || "N/A"}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div className="font-semibold text-sm text-foreground">
                      ৳{gear.price}
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {" "}
                        / day
                      </span>
                    </div>
                  </TableCell>

                  {/* Stock Status */}
                  <TableCell>
                    <Badge
                      variant={gear.stock > 0 ? "secondary" : "destructive"}
                      className={
                        gear.stock > 0
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                          : ""
                      }
                    >
                      {gear.stock > 0
                        ? `${gear.stock} in stock`
                        : "Out of stock"}
                    </Badge>
                  </TableCell>

                  {/* Provider Details */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border shrink-0">
                        <AvatarImage
                          src={gear.provider?.photoURL}
                          alt={gear.provider?.name}
                        />
                        <AvatarFallback className="text-xs font-semibold">
                          {gear.provider?.name?.substring(0, 2).toUpperCase() ||
                            "PS"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5 overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {gear.provider?.name}
                          </p>
                          {gear.provider?.accountStatus === "ACTIVE" ? (
                            <span title="Active Account">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          ) : (
                            <span title="Inactive Account">
                              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {gear.provider?.email}
                        </p>
                        {gear.provider?.phoneNumber && (
                          <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" />
                            {gear.provider?.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground/70" />
                      {new Date(gear.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllGearsPage;

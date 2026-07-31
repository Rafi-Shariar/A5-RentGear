"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, PackageX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteGearDialog } from "./DeleteGearDialog";
import { MyGearsProps } from "@/lib/types";


export const GearTable = ({ gears }: MyGearsProps) => {
  if (!gears || gears.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card">
        <PackageX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No gear items found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Start by adding new gear to your inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-md shadow-sm bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px]">Item</TableHead>
            <TableHead>Title & Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gears.map((gear) => (
            <TableRow key={gear.gearId} className="hover:bg-muted/30">
              {/* Image Column */}
              <TableCell>
                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted border">
                  <Image
                    src={gear.imageURL}
                    alt={gear.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              </TableCell>

              {/* Title & Brand Column */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground line-clamp-1">
                    {gear.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {gear.brand}
                  </span>
                </div>
              </TableCell>

              {/* Category Column */}
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {gear.category?.categoryName || "Uncategorized"}
                </Badge>
              </TableCell>

              {/* Price Column */}
              <TableCell className="font-semibold">
                ${gear.price.toLocaleString()}
              </TableCell>

              {/* Stock Status Badge */}
              <TableCell>
                {gear.stock > 10 ? (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                    {gear.stock} in stock
                  </Badge>
                ) : gear.stock > 0 ? (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none">
                    Low Stock ({gear.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>

              {/* Action Buttons */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {/* Edit Navigation Button */}
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/provider/manage-gears/edit/${gear.gearId}`}>
                      <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      <span className="sr-only">Edit Gear</span>
                    </Link>
                  </Button>

                  {/* Delete Confirmation Dialog Trigger */}
                  <DeleteGearDialog
                    gearId={gear.gearId}
                    gearTitle={gear.title}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
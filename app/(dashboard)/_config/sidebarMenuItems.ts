import { ISidebarItem } from "@/lib/types"
import { ArrowLeftToLine, BadgeDollarSign, ChartBarStacked, CirclePlus, ClockArrowRightIcon, Divide, FileText, LayoutDashboard, MessageCircleCode, PackageSearch, ShoppingCart, Users } from "lucide-react"

const CUSTOMER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Dashboard", href:'/dashboard', icon : LayoutDashboard},
    { label : "My Orders", href:'/dashboard/my-orders', icon : ShoppingCart},
    { label : "My Reviews", href:'/dashboard/my-reviews', icon : MessageCircleCode},
    { label : "Payment Histoty", href:'/dashboard/payment-history', icon : BadgeDollarSign},
    { label : "Back Home", href:'/', icon : ArrowLeftToLine},
]

const PROVIDER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "dashboard", href:'/provider-dashboard', icon : LayoutDashboard},
    { label : "Add New Gear", href:'/provider-dashboard/add-gear', icon : CirclePlus},
    { label : "My Orders", href:'/provider-dashboard/my-orders', icon : ClockArrowRightIcon},
    { label : "Back Home", href:'/', icon : ArrowLeftToLine},
]

const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Admin Dashboard", href:'/admin-dashboard', icon : LayoutDashboard},
    { label : "Add New Category", href:'/admin-dashboard/add-category', icon : ChartBarStacked},
    { label : "User List", href:'/admin-dashboard/users', icon : Users},
    { label : "Gear List", href:'/admin-dashboard/gears', icon : PackageSearch},
    { label : "Order List", href:'/admin-dashboard/orders', icon : BadgeDollarSign},
    { label : "Back Home", href:'/', icon : ArrowLeftToLine},
]

export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}
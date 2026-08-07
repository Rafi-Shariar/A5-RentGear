import { ISidebarItem } from "@/lib/types"
import { ArrowLeftToLine, BadgeDollarSign, ChartBarStacked, CirclePlus, ClockArrowRightIcon, Divide, FileText, Key, LayoutDashboard, MessageCircleCode, PackageSearch, ShoppingCart, UserPen, Users } from "lucide-react"

const CUSTOMER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Dashboard", href:'/dashboard', icon : LayoutDashboard},
    { label : "My Orders", href:'/dashboard/my-orders', icon : ShoppingCart},
    { label : "Payment Histoty", href:'/dashboard/payment-history', icon : BadgeDollarSign},
    { label : "My Profile", href:'/dashboard/my-profile', icon : UserPen},
    { label : "Change Password", href:'/dashboard/password', icon : Key},


]

const PROVIDER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "dashboard", href:'/provider-dashboard', icon : LayoutDashboard},
    { label : "Add New Gear", href:'/provider-dashboard/add-gear', icon : CirclePlus},
    { label : "My Gears", href:'/provider-dashboard/my-gears', icon : PackageSearch},
    { label : "My Orders", href:'/provider-dashboard/my-orders', icon : ClockArrowRightIcon},

]

const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Admin Dashboard", href:'/admin-dashboard', icon : LayoutDashboard},
    { label : "Add New Category", href:'/admin-dashboard/add-category', icon : ChartBarStacked},
    { label : "User List", href:'/admin-dashboard/users', icon : Users},
    { label : "Gear List", href:'/admin-dashboard/gears', icon : PackageSearch},
    { label : "Order List", href:'/admin-dashboard/orders', icon : BadgeDollarSign},

]

export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}
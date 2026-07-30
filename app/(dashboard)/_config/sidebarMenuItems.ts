import { ISidebarItem } from "@/lib/types"
import { ArrowLeftToLine, BadgeDollarSign, Divide, FileText, LayoutDashboard, MessageCircleCode, ShoppingCart } from "lucide-react"

const CUSTOMER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Dashboard", href:'/dashboard', icon : LayoutDashboard},
    { label : "My Orders", href:'/dashboard/my-orders', icon : ShoppingCart},
    { label : "My Reviews", href:'/dashboard/my-reviews', icon : MessageCircleCode},
    { label : "Payment Histoty", href:'/dashboard/payment-history', icon : BadgeDollarSign},
    { label : "Back Home", href:'/', icon : ArrowLeftToLine},
]

const PROVIDER_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "dashboard", href:'/provider-dashboard', icon : LayoutDashboard},
    { label : "My Posts", href:'/author-dashboard/my-posts', icon : FileText},
]

const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
    { label : "Admin dashboard", href:'/admin-dashboard', icon : LayoutDashboard},
    { label : "My Posts", href:'/admin-dashboard/my-posts', icon : FileText},
]

export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CbotAdminComponent } from './cbot-admin.component';
import { StaffModule } from 'src/app/shared/dialog/staff/staff.module';


const routes: Routes = [
   {
    path: '',
    component: CbotAdminComponent,
    children: [     
      //main menu
      {
        path: 'appointment',
        loadChildren: () => import('../cbot-admin/appointment/appointment.module').then(m => m.AppointmentModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../cbot-admin/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('../cbot-admin/quick-sale/quick-sale.module').then(m => m.QuickSaleModule),
      },
      {
        path: 'campaigns',
        loadChildren: () => import('../cbot-admin/campaigns/campaigns.module').then(m => m.CampaignsModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('../cbot-admin/customers/customers.module').then(m => m.CustomersModule),
      },            
      {
        path: 'services',
        loadChildren: () => import('../cbot-admin/services/services.module').then(m => m.ServicesModule),
      },
      {
        path: 'products',
        loadChildren: () => import('../cbot-admin/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'vendors',
        loadChildren: () => import('../cbot-admin/suppliers/suppliers.module').then(m => m.SuppliersModule),
      },
      {
        path: 'purchaseOrder',
        loadChildren: () => import('../cbot-admin/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'purchaseBill',
        loadChildren: () => import('../cbot-admin/purchase-bill/purchase-bill.module').then(m => m.PurchaseBillModule),
      },
      {
        path: 'inventory',
        loadChildren: () => import('../cbot-admin/inventory/inventory.module').then(m => m.InventoryModule),
      },
      {
        path: 'storeTransfer',
        loadChildren: () => import('../cbot-admin/store-transfer/store-transfer.module').then(m => m.StoreTransferModule),
      },
      {
        path: 'location',
        loadChildren: () => import('../cbot-admin/store-locations/store-locations.module').then(m => m.StoreLocationsModule),
      },
      {
        path: 'saleBill',
        loadChildren: () => import('../cbot-admin/sale-bills/sale-bills.module').then(m => m.SaleBillsModule),
      },
      {
        path: 'vendorBill',
        loadChildren: () => import('../cbot-admin/vendor-bills/vendor-bills.module').then(m => m.VendorBillsModule),
      },
      {
        path: 'cashRegister',
        loadChildren: () => import('../cbot-admin/cash-register/cash-register.module').then(m => m.CashRegisterModule),
      },
      {
        path: 'dayBook',
        loadChildren: () => import('../cbot-admin/day-book/day-book.module').then(m => m.DayBookModule),
      },
      {
        path: 'staffs',
        loadChildren: () => import('../cbot-admin/employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: 'attendance',
        loadChildren: () => import('../cbot-admin/staff-attendance/staff-attendance.module').then(m => m.StaffAttendanceModule),
      },
      {
        path: 'leaves',
        loadChildren: () => import('../cbot-admin/staff-leave/staff-leave.module').then(m => m.StaffLeaveModule),
      },
      {
        path: 'payroll',
        loadChildren: () => import('../cbot-admin/staff-payroll/staff-payroll.module').then(m => m.StaffPayrollModule),
      },
      {
        path: 'payrollMaster',
        loadChildren: () => import('../cbot-admin/payroll-master/payroll-master.module').then(m => m.PayrollMasterModule),
      },
      {
        path: 'giftVoucher',
        loadChildren: () => import('../cbot-admin/promo-voucher/promo-voucher.module').then(m => m.PromoVoucherModule),
      },
      {
        path: 'prepaidCard',
        loadChildren: () => import('../cbot-admin/prepaid-card/prepaid-card.module').then(m => m.PrepaidCardModule),
      },
      {
        path: 'loyalty',
        loadChildren: () => import('../cbot-admin/loyalty/loyalty.module').then(m => m.LoyaltyModule),
      },      
      {
        path: 'reports',
        loadChildren: () => import('../cbot-admin/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('../cbot-admin/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'expenses',
        loadChildren: () => import('../cbot-admin/expenses/expenses.module').then(m => m.ExpensesModule),
      },

      //Sub menu
      {
        path: 'bookingCreate',
        loadChildren: () => import('../../shared/dialog/booking/booking.module').then(m => m.BookingModule),
      },
      {
        path: 'customerCreate',
        loadChildren: () => import('../../shared/dialog/customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'customerView',
        loadChildren: () => import('../../shared/dialog/customer-view/customer-view.module').then(m => m.CustomerViewModule),
      },
      {
        path: 'vendorCreate',
        loadChildren: () => import('../../shared/dialog/supplier/supplier.module').then(m => m.SupplierModule),
      },
      {
        path: 'saleCreate',
        loadChildren: () => import('../../shared/dialog/sale/sale.module').then(m => m.SaleModule),
      },
      {
        path: 'purchaseOrderCreate',
        loadChildren: () => import('../../shared/dialog/purchase/purchase-order-create/purchase-order-create.module').then(m => m.PurchaseOrderCreateModule),
      },
      {
        path: 'purchaseBillCreate',
        loadChildren: () => import('../../shared/dialog/purchase/purchase-bill-create/purchase-bill-create.module').then(m => m.PurchaseBillCreateModule),
      },
      {
        path: 'locationCreate',
        loadChildren: () => import('../../shared/dialog/stock/inventory-location/inventory-location.module').then(m => m.InventoryLocationModule),
      },
      {
        path: 'transferCreate',
        loadChildren: () => import('../../shared/dialog/stock/inventory-transfer/inventory-transfer.module').then(m => m.InventoryTransferModule),
      },
      {
        path: 'staffCreate',
        loadChildren: () => import('../../shared/dialog/staff/staff.module').then(m=> m.StaffModule),
      },
      {
        path: 'attendanceCreate',
        loadChildren: () => import('../../shared/dialog/hr/attendance/attendance.module').then(m=> m.AttendanceModule),
      },
      {
        path: 'leaveCreate',
        loadChildren: () => import('../../shared/dialog/hr/leaves/leaves.module').then(m=> m.LeavesModule),
      },
      {
        path: 'payrollCreate',
        loadChildren: () => import('../../shared/dialog/hr/payroll/payroll.module').then(m=> m.PayrollModule),
      },
      {
        path: 'payrollMasterCreate',
        loadChildren: () => import('../../shared/dialog/hr/payroll-master-create/payroll-master-create.module').then(m=> m.PayrollMasterCreateModule),
      },
      {
        path: 'expenseCreate',
        loadChildren: () => import('../../shared/dialog/expense-create/expense-create.module').then(m=> m.ExpenseCreateModule),
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbotAdminRoutingModule { }

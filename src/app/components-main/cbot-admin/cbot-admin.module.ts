import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CbotAdminRoutingModule } from './cbot-admin-routing.module';
import { CbotAdminComponent } from './cbot-admin.component';
import { SharedModule } from 'src/app/shared/module/module.module';
import { AppointmentModule } from './appointment/appointment.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { EmployeesModule } from './employees/employees.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ReportsModule } from './reports/reports.module';
import { SettingsModule } from './settings/settings.module';
import { InventoryModule } from './inventory/inventory.module';
import { QuickSaleModule } from './quick-sale/quick-sale.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PurchaseBillModule } from './purchase-bill/purchase-bill.module';
import { StoreTransferModule } from './store-transfer/store-transfer.module';
import { StoreLocationsModule } from './store-locations/store-locations.module';
import { SaleBillsModule } from './sale-bills/sale-bills.module';
import { VendorBillsModule } from './vendor-bills/vendor-bills.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { DayBookModule } from './day-book/day-book.module';
import { StaffAttendanceModule } from './staff-attendance/staff-attendance.module';
import { StaffLeaveModule } from './staff-leave/staff-leave.module';
import { StaffPayrollModule } from './staff-payroll/staff-payroll.module';
import { PayrollMasterModule } from './payroll-master/payroll-master.module';
import { PromoVoucherModule } from './promo-voucher/promo-voucher.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { PrepaidCardModule } from './prepaid-card/prepaid-card.module';
import { ExpensesModule } from './expenses/expenses.module';

@NgModule({
  declarations: [CbotAdminComponent],
  imports: [
    CommonModule,
    CbotAdminRoutingModule,
    SharedModule,
    AppointmentModule,
    CampaignsModule,
    DashboardModule,
    CustomersModule,
    ProductsModule,
    ServicesModule,
    EmployeesModule,
    SuppliersModule,
    ReportsModule,
    SettingsModule,
    InventoryModule,
    QuickSaleModule,
    PurchaseOrderModule,
    PurchaseBillModule,
    StoreTransferModule,
    StoreLocationsModule,
    SaleBillsModule,
    VendorBillsModule,
    CashRegisterModule,
    DayBookModule,
    StaffAttendanceModule,
    StaffLeaveModule,
    StaffPayrollModule,
    PayrollMasterModule,
    PromoVoucherModule,
    LoyaltyModule,
    PrepaidCardModule,
    ExpensesModule
  ]
})
export class CbotAdminModule { }

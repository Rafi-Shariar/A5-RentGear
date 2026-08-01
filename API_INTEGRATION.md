## API Documentation

Below is the comprehensive list of API endpoints used across the application, categorized by user roles and access levels.

---

### 🌐 Public APIs

| API Endpoint | Method | Component / File | Description / Purpose |
| :--- | :---: | :--- | :--- |
| `api/gear` | `GET` | `GearPage.tsx` | Fetch all listed gears |
| `api/gear/:id` | `GET` | `GearDetailsPage.tsx` | Fetch detailed information of a specific gear |
| `api/category` | `GET` | `AddNewGearPage.tsx` | Fetch all categories (used when adding new gear) |
| `api/auth/register` | `POST` | `RegisterForm.tsx` | Register a new user |
| `api/auth/login` | `POST` | `LoginForm.tsx` | Authenticate and login user |
| `api/auth/refresh-token` | `POST` | `getAccessToken.ts` | Generate a new access token |

---

### 👤 Shared User APIs (Authenticated)

| API Endpoint | Method | Component / File | Description / Purpose |
| :--- | :---: | :--- | :--- |
| `api/user/me` | `GET` | `LoginForm.tsx` | Fetch logged-in user profile details |
| `api/user/update` | `PATCH` | `UpdateProfilePage.tsx` | Update user profile information |
| `api/user/password` | `PATCH` | `ChangePasswordPage.tsx` | Change user password |

---

### 🛒 Customer APIs

| API Endpoint | Method | Component / File | Description / Purpose |
| :--- | :---: | :--- | :--- |
| `api/rentals` | `GET` | `MyOrdersPage.tsx` | Fetch all rentals/orders of the logged-in customer |
| `api/rentals/:id` | `GET` | `OrderDetailsPage.tsx` | Fetch detailed information of a specific order |
| `api/rentals/:id` | `DELETE` | `OrdersTable.tsx` | Cancel or delete an order |
| `api/payments` | `GET` | `PaymentHistoryPage.tsx` | Fetch payment history |
| `api/payments/:id` | `GET` | `PaymentDetailsPage.tsx` | Fetch specific payment details |
| `api/payments/create` | `POST` | `OrdersTable.tsx` | Initiate payment for a confirmed order |
| `api/reviews` | `POST` | `GearDetailsPage.tsx` | Post a review for a gear |

---

### 📦 Provider APIs

| API Endpoint | Method | Component / File | Description / Purpose |
| :--- | :---: | :--- | :--- |
| `api/provider` | `GET` | `GearTable.tsx` | Fetch all gears listed by the provider |
| `api/provider/gear` | `POST` | `AddNewGearForm.tsx` | Add a new gear listing |
| `api/provider/gear/:id` | `PUT` | `EditGearForm.tsx` | Update gear details |
| `api/provider/gear/:id` | `DELETE` | `GearTable.tsx` | Delete a gear listing |
| `api/provider/orders` | `GET` | `MyOrdersPage.tsx` | Fetch all order requests for provider's gear |

---

### 🛡️ Admin APIs

| API Endpoint | Method | Component / File | Description / Purpose |
| :--- | :---: | :--- | :--- |
| `api/admin/overview` | `GET` | `AdminPage.tsx` | Fetch overall platform overview and analytics |
| `api/admin/category` | `POST` | `AddNewCategory.tsx` | Add a new gear category |
| `api/admin/users` | `GET` | `UserListPage.tsx` | Fetch list of all registered users |
| `api/admin/users/:id` | `PATCH` | `UserTable.tsx` | Update user roles or status |
| `api/admin/gear` | `GET` | `AllGearsPage.tsx` | Fetch all gear listings across the system |
| `api/admin/rentals` | `GET` | `AdminOrderListPage.tsx` | Fetch all system-wide rental orders |
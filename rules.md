# Quy tắc và Phong cách Phát triển Code Toàn dự án (VitaDairy Admin v2)

Tài liệu này tổng hợp các tiêu chuẩn, kiến trúc, quy tắc đặt tên, quản lý form, xử lý UI và xây dựng component/hooks nhằm đảm bảo tính thống nhất, hiệu năng cao và khả năng bảo trì tốt cho toàn bộ mã nguồn của dự án.

---

## Nguyên Tắc Nhận Diện Thiết Kế Qua Hình Ảnh
* Khi nhận được yêu cầu phát triển giao diện (UI) dựa trên hình ảnh được gửi từ phía người dùng, mọi giải pháp thiết kế hoặc sinh mã nguồn (gen code) **vẫn phải tuân thủ nghiêm ngặt toàn bộ các nguyên tắc kiến trúc, quy tắc DRY, đặt file/component, đặt tên và tính an toàn kiểu dữ liệu (không dùng `any`)** được nêu dưới đây. Tuyệt đối không vì mục đích tái hiện nhanh giao diện từ ảnh mà bỏ qua tiêu chuẩn kỹ thuật của dự án.

---


## 2. Tiêu chuẩn Đặt tên (Naming Conventions)

### Khai báo Enums và Types
* **Enums**: Bắt buộc thêm hậu tố `Enum` khi tạo enum để dễ phân biệt trong codebase.
  * *Ví dụ*: `SpecialTypeMissionEnum`, `ConfirmActionEnum`, `UserRoleEnum`.
* **Interfaces / Types**: Đặt tên viết hoa chữ cái đầu theo chuẩn PascalCase. Đối với interface nên bắt đầu bằng tiền tố `I`.
  * *Ví dụ*: `IAffiliateMissionFormValues`, `IUserManageFilter`.

### Form và Trạng thái (Variables & Fields)
* Tên biến, thuộc tính, hoặc định danh state sử dụng chuẩn **camelCase**.
* Các thuộc tính boolean nên bắt đầu bằng `is`, `has`, `enable`, `show`,... để biểu thị rõ tính chất đúng/sai.
  * *Ví dụ*: `isActive`, `hasMissionSteps`, `enableNotiCompleteMission`.

---

- Xử dụng axios và tách file các thứ đừng gom vào 1 cụm tách ra service, api, utils....
- Đối với các thư viện thì ưu tiên dùng các thư viện có sẵn và tích hợp tốt với NextJS
- Nếu là dùng component thì tìm trong common trước, 

## 4. Quy trình Tạo Custom Hooks (API & React Query)

* **Tránh trùng lặp**: Khảo sát thư mục `src/common/hooks/` trước khi tự viết mới hook.
* **Quy tắc Đặt tên**: Tên hook bắt buộc bắt đầu bằng tiền tố `use` (ví dụ: `useDeleteAffiliateMission`).
* **Khai báo Dịch vụ & Kiểu dữ liệu**:
  * API service phải khai báo ở file `services.ts` của module.
  * Dữ liệu đầu vào, đầu ra của API phải được định nghĩa kiểu cụ thể trong `interface.ts` (không dùng `any`).
* **Ràng buộc Callback cho thao tác Tạo/Sửa/Xóa**:
  * Tất cả custom hooks thực hiện thao tác thay đổi dữ liệu (Tạo mới, Chỉnh sửa, Xóa) **bắt buộc phải nhận tham số `callback`** (kiểu `ICallback` chứa `onSuccess` và `onError`) để bên ngoài UI component có thể dễ dàng xử lý các hành vi sau khi gọi API thành công/thất bại (ví dụ: tắt modal, reset form, navigate trang khác, hiển thị toast thông báo).
* **Quản lý Cache (Invalidate Queries)**:
  * Sau khi thực hiện thành công một thao tác Tạo/Sửa/Xóa, hook phải chủ động gọi `queryClient.invalidateQueries` với các query keys tương ứng để tự động cập nhật danh sách/dữ liệu mới nhất lên UI.

---




## 7. Quy trình Kiểm tra & Chất lượng Code (Verification & Validation)

* **Type-safety**:
  * Mọi dòng code viết ra cần an toàn về kiểu dữ liệu. **Tuyệt đối không sử dụng kiểu dữ liệu `any`** trong bất kỳ trường hợp nào.
  * Trước khi tạo PR hoặc đóng gói hoàn tất tính năng, bắt buộc chạy kiểm tra TypeScript không xuất file:
    ```bash
    npx tsc --noEmit
    ```
* **Quản lý API Calls**:
  * Tận dụng tối đa `react-query` hooks để quản lý việc gọi API, cache dữ liệu và tự động load lại khi thay đổi danh sách/trạng thái.

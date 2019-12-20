
<a  href="http://osip.ml"><img  src="https://i.ibb.co/Fwy1yFh/logo.png"  title="OSIP Project"  alt="OSIP"></a>

  

# O.S.I.P Document

  

### ***Looking over [OSIP Web-app](http://osip.ml)***

  

[![INSERT YOUR GRAPHIC HERE](https://i.ibb.co/hDyjwRc/Screen-Shot-2019-12-20-at-17-30-48.png)]()
*Trending page in OSIP Web-app*
 
---

  

## Table of Contents (Optional)

  

> If your `README` has a lot of info, section headers might be nice.

  

-  [Installation](#installation)

-  [Features](#features)

-  [Contributing](#contributing)

-  [Team](#team)

-  [License](#license)

  

## Installation

### **OSIP server**

> Cài đặt thư viện và các dependency

```$ npm install```

> Chạy project

```$ node index.js```

> Nếu bạn dùng nodemon

```$ nodemon index.js```

  ### **OSIP web-app**
> Cài đặt thư viện và các dependency

```$ npm install```
> Chạy project

```$ npm start```

## Features

#### **For users**
- Theo dõi, thống kê các xu hướng tìm kiếm trên các trang TMĐT.
- Tìm kiếm từ khoá, hàng hoá cùng lúc trên nhiều trang TMĐT.
- Tìm kiếm các mã khuyến mại trên các trang TMĐT.
- Quản lí các mã khuyến mại yêu thích.
- Tìm kiếm các đợt flash-sales, khung giờ vàng giảm giá trên các trang TMĐT.  

#### **For administrator**
- Quản lí tài khoản người dùng trong toàn bộ hệ thống.
- Quản lí danh sách các chức năng của hệ thống.
- Quản lí danh sách các vai trò của hệ thống.

## Backend API Visualize and Interact

  

- Sử dụng *swagger* để tương tác và hình dung hoá từng api của hệ thống

  

-  [osip-server](https://osip-server.herokuapp.com/)

  

## Running the tests

> Sử dụng mocha để test cho từng api của Project

  

```$ npm run test```

  

## Deployment

  
### **OSIP server**
- Sử dụng GitLab CI/CD để tự động kiểm thử và deploy code lên server Heroku

- Mỗi khi push lên master ta sử dụng Node.js docker runner để deploy ứng dụng lên Heroku

### **OSIP web-app**
- Build bản production cho project front-end webapp:
  ```$ npm build```
- Tiếp tục đưa thư mục dist sau khi build lên server

## Database and Cache

  

- Sử dụng add-on Heroku Postgres để lưu trữ dữ liệu

- Sử dụng add-on Heroku Redis để cache dữ liệu

  

## Cron Job

  

- Hệ thống tự cập nhật hàng ngày:

	- Xu hướng tìm kiếm

	- Khuyến mãi

	- Flash Sale

  

## Contributing

  

Hướng dẫn cơ bản để đóng góp vào project.

Source code gốc mà nhóm đang thực hiện: [OSIP Gitlab](https://gitlab.com/osipg)
  

#### General

  

- Chắc chắn rằng không có pull request nào đề cập đến vấn đề/feature mà bạn đang thực hiện.

- Đưa ra issue nếu tồn tại vấn đề mới, gán nhãn phù hợp cho từng vấn đề.

- Tạo nhánh issue/feature để giải quyết vấn đề bạn đang giải quyết.

- Tên nhánh ngắn gọn (dưới 30 ký tự) , nối nhanh giữa các từ bởi dấu `-` theo dạng **type**-**subject**:

- Issue: `issue-IssueID-desc`. Ví dụ: `issue-12-auth-error`.

- Feature: `feat-desc`. Ví dụ: `feat-search-product-api`.

- Docs: `doc-desc`. Ví dụ: `doc-search-product-docs`.

  

#### Commit Message Format

  

Mỗi commit message có **type** và có mô tả **subject**:

  

```

<type>: <subject>

```

  

Nội dung commit không quá 100 kí tự, ngắn gọn đủ diễn đạt nội dung commit muốn đề cập. Điều này giúp cho

dev dễ theo dõi git log:

  

```

#271 feat(containers): add exposed ports in the containers view

#270 fix(templates): fix a display issue in the templates view

#269 style(dashboard): update dashboard with new layout

```

  

Trong trường hợp có nhiều loại thay đổi, ngăn tách giữa các type bởi `/`. Ví dụ: `feat/fix: something ...` .

  

#### Type

  

Giá trị **type** có thể nhận một số giá trị:

  

*  **feat**: Feature mới

*  **fix**: Fix lỗi bug

*  **docs**: Tài liệu, api

*  **style**: Thay đổi code style, không ảnh hưởng ý nghĩa của code (dấu, typo,..)

semi-colons, etc)

*  **refactor**: Thay đổi cấu trúc tổ chức của project

*  **test**: Thêm các test thiếu

*  **chore**: Thay đổi nhỏ liên quan đến build process, tool và thư viện phụ thuộc,...

  

#### Subject

  

Tiêu đề của commit cần:

* Sử dụng động từ nguyên thể, thì hiện tại đơn.

* Không viết hoa chữ cái đầu

* Không sử dụng dấu (.) ở cuối câu

  

#### Tham khảo

-  [Portainer Contributing Guide](https://raw.githubusercontent.com/portainer/portainer/develop/CONTRIBUTING.md)

-  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)

> To get started...

  

## Team
***OSIP team from K62 CACLC1 - UET - VNU***
- **Trần Bá Hoà**: Front-end leader & developer
- **Nguyễn Hữu Hoà**: Back-end leader & developer
- **Lê Minh Tâm**: BA & Front-end developer
- **Dương Thị Thuý Hằng**: Back-end developer
- **Phạm Ngọc Anh Trang**: Back-end developer
- **Khổng Thị Mai Loan**: Tester & Back-end developer
## License

  

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

  

-  **[MIT license](http://opensource.org/licenses/mit-license.php)**

- Copyright 2019 © OSIP
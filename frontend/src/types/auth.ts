export interface LoginRequest {
  tenDangNhap: string;
  matKhau: string;
}

export interface LoginResponse {
  token: string;
  tenDangNhap: string;
  vaiTro: string;
  maKH: number | null;
}

export interface RegisterRequest {
  tenDangNhap: string;
  matKhau: string;
  hoTen: string;
  sdt: string;
  email: string;
  cmndCccd: string;
  diaChi: string;
  ngaySinh: string;
  gioiTinh: string;
}

export interface ProfileDTO {
  maKH: number;
  tenDangNhap: string;
  vaiTro: string;
  hoTen: string;
  sdt: string;
  email: string;
  cmndCccd: string;
  diaChi: string;
  ngaySinh: string;
  gioiTinh: string;
  ngayTao: string;
}

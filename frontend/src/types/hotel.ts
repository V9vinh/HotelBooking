export type TrangThaiLoaiPhong = 'HoatDong' | 'Ngung';

export type TrangThaiPhong = 'Trong' | 'CoKhach' | 'DangDon' | 'BaoTri';

export interface LoaiPhong {
  maLoaiPhong: number;
  tenLoaiPhong: string;
  giaCoBan: number;
  sucChua: number;
  tienNghi: string;
  moTa: string;
  trangThai: TrangThaiLoaiPhong;
}

export interface Phong {
  maPhong: number;
  soPhong: string;
  tang: number;
  trangThai: TrangThaiPhong;
  ghiChu: string;
  loaiPhong: LoaiPhong;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface KiemTraPhongTrongResponse {
  maPhong: number;
  soPhong: string;
  ngayNhan: string;
  ngayTra: string;
  conTrong: boolean;
  thongBao: string;
}

export interface LocPhongParams {
  keyword?: string;
  maLoaiPhong?: number | '';
  sucChua?: number | '';
  giaTu?: number | '';
  giaDen?: number | '';
  tang?: number | '';
  trangThai?: TrangThaiPhong | '';
  ngayNhan?: string;
  ngayTra?: string;
}

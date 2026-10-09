import type { ApiResponse, KiemTraPhongTrongResponse, LoaiPhong, LocPhongParams, Phong } from '../types/hotel';

const BASE_URL = '/api/phong';

export const phongApi = {
  /**
   * Chức năng 1 & 4: Tìm kiếm và lọc danh sách phòng
   */
  async getRooms(params?: LocPhongParams): Promise<ApiResponse<Phong[]>> {
    const query = new URLSearchParams();

    if (params) {
      if (params.keyword?.trim()) query.append('keyword', params.keyword.trim());
      if (params.maLoaiPhong !== undefined && params.maLoaiPhong !== '') {
        query.append('maLoaiPhong', params.maLoaiPhong.toString());
      }
      if (params.sucChua !== undefined && params.sucChua !== '') {
        query.append('sucChua', params.sucChua.toString());
      }
      if (params.giaTu !== undefined && params.giaTu !== '') {
        query.append('giaTu', params.giaTu.toString());
      }
      if (params.giaDen !== undefined && params.giaDen !== '') {
        query.append('giaDen', params.giaDen.toString());
      }
      if (params.tang !== undefined && params.tang !== '') {
        query.append('tang', params.tang.toString());
      }
      if (params.trangThai) query.append('trangThai', params.trangThai);
      if (params.ngayNhan) query.append('ngayNhan', params.ngayNhan);
      if (params.ngayTra) query.append('ngayTra', params.ngayTra);
    }

    const url = query.toString() ? `${BASE_URL}?${query.toString()}` : BASE_URL;
    const response = await fetch(url);
    const result: ApiResponse<Phong[]> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Không thể tải danh sách phòng');
    }
    return result;
  },

  /**
   * Chức năng 2: Xem chi tiết phòng
   */
  async getRoomDetail(id: number): Promise<ApiResponse<Phong>> {
    const response = await fetch(`${BASE_URL}/${id}`);
    const result: ApiResponse<Phong> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Không thể tải chi tiết phòng');
    }
    return result;
  },

  /**
   * Chức năng 3: Kiểm tra phòng trống theo khoảng ngày
   */
  async getAvailableRooms(ngayNhan: string, ngayTra: string): Promise<ApiResponse<Phong[]>> {
    const query = new URLSearchParams({ ngayNhan, ngayTra });
    const response = await fetch(`${BASE_URL}/trong?${query.toString()}`);
    const result: ApiResponse<Phong[]> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Không thể kiểm tra phòng trống');
    }
    return result;
  },

  /**
   * Chức năng 3 (bổ trợ): Kiểm tra một phòng cụ thể
   */
  async checkRoomAvailability(id: number, ngayNhan: string, ngayTra: string): Promise<ApiResponse<KiemTraPhongTrongResponse>> {
    const query = new URLSearchParams({ ngayNhan, ngayTra });
    const response = await fetch(`${BASE_URL}/${id}/kiem-tra-trong?${query.toString()}`);
    const result: ApiResponse<KiemTraPhongTrongResponse> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Không thể kiểm tra phòng này');
    }
    return result;
  },

  /**
   * Lấy danh sách loại phòng để phục vụ dropdown bộ lọc
   */
  async getRoomTypes(): Promise<ApiResponse<LoaiPhong[]>> {
    const response = await fetch(`${BASE_URL}/loai-phong`);
    const result: ApiResponse<LoaiPhong[]> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Không thể tải danh sách loại phòng');
    }
    return result;
  },
};

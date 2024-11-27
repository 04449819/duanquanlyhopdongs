using DBcontext.Models;
using DBcontext.Viewmodel;

namespace API.Iserviecs
{
    public interface IHopDongServices
    {
        Task<IEnumerable<Hopdong>> GetAllAsync();          // Lấy tất cả Hợp đồng
        Task<Hopdong> GetByIdAsync(int id);                // Lấy hợp đồng Id
        Task AddAsync(Viewmodel product);                    // Thêm mới thêm hợp đồng
        Task UpdateAsync(int id, Hopdong product);                 // Cập nhật hợp đồng
        Task DeleteAsync(int id);                          // xoá hợp đồng



    }
}

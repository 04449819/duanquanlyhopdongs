using API.Iserviecs;
using DBcontext.Models;
using DBcontext.Viewmodel;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class HopdongServices : IHopDongServices
    {
        private readonly ApplicationDbContext _context;

        public HopdongServices(ApplicationDbContext context)
        {
            _context = context;
        }

        // Thêm hợp đồng mới
        public async Task AddAsync(Viewmodel product)
        {
            var hopDong = new Hopdong // Giả sử HopDong là lớp thực thể trong DBContext
            {
                Hopdongid = product.Hopdongid,
                HoTenA = product.HoTenA,
                HoTenB = product.HoTenB,
                Gmaila = product.Gmaila,
                Gmailb = product.Gmailb,
                Noidung = product.Noidung,
                NgayThayDoi = DateTime.Now
            };

            await _context.Hopdongs.AddAsync(hopDong);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ExistsByIdAsync(string id)
        {
            return await _context.Hopdongs.AnyAsync(h => h.Hopdongid == id);
        }

        // Xóa hợp đồng theo ID
        public async Task DeleteAsync(int id)
        {
            var hopDong = await _context.Hopdongs.FindAsync(id);
            if (hopDong != null)
            {
                _context.Hopdongs.Remove(hopDong);
                await _context.SaveChangesAsync();
            }
        }

        // Lấy tất cả hợp đồng
        public async Task<IEnumerable<Hopdong>> GetAllAsync()
        {
            var hopDongs = await _context.Hopdongs
               
                .ToListAsync();

            return hopDongs;
        }

        // Lấy hợp đồng theo ID
        public async Task<Hopdong> GetByIdAsync(int id)
        {
            var hopDong = await _context.Hopdongs.FindAsync(id);
                // Giả sử Hopdongid là kiểu string trong DB
                
               

            return hopDong;
        }

        // Cập nhật hợp đồng
        public async Task UpdateAsync(int id, Hopdong product)
        {
            // Tìm hợp đồng trong cơ sở dữ liệu theo id
            var hopDong = await _context.Hopdongs.FirstOrDefaultAsync(c => c.Id == id);

            // Kiểm tra xem hợp đồng có tồn tại hay không
            if (hopDong == null)
            {
                // Nếu không tìm thấy hợp đồng, trả về lỗi 404
                throw new Exception($"Không tìm thấy hợp đồng với ID: {id}");
            }

            // Cập nhật các thuộc tính của hợp đồng
            hopDong.HoTenA = product.HoTenA;
            hopDong.HoTenB = product.HoTenB;
            hopDong.Gmaila = product.Gmaila;
            hopDong.Gmailb = product.Gmailb;
            hopDong.Noidung = product.Noidung;
            hopDong.NgayThayDoi = product.NgayThayDoi;

            // Cập nhật hợp đồng trong DB
            _context.Hopdongs.Update(hopDong);

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();
        }

    }
}

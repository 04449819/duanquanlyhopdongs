﻿using API.Iserviecs;
using API.Services;
using DBcontext.Models;
using DBcontext.Viewmodel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HopdongController : ControllerBase
    {
        private readonly IHopDongServices _hopDongServices;
		private readonly  ApplicationDbContext db;

		public HopdongController(IHopDongServices hopDongServices)
        {
            _hopDongServices = hopDongServices;
			db = new ApplicationDbContext();

		}

        // API để lấy tất cả hợp đồng
        [HttpGet]
        public async Task<IActionResult> GetAllHopDongs()
        {
            var hopDongs = await _hopDongServices.GetAllAsync();
            if (hopDongs == null || !hopDongs.Any())
            {
                return NotFound("Không có hợp đồng nào.");
            }
            return Ok(hopDongs);
        }

        // API để lấy hợp đồng theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHopDongById(int id)
        {
            var hopDong = await _hopDongServices.GetByIdAsync(id);
            if (hopDong == null)
            {
                return NotFound($"Không tìm thấy hợp đồng với ID: {id}");
            }
            return Ok(hopDong);
        }

		[HttpGet("haha")]
		public async Task<IActionResult> GetHopDongById1(int id1)
		{
			var hopDong = await db.HopdongLichsus.FindAsync(id1);
			if (hopDong == null)
			{
				return NotFound($"Không tìm thấy hợp đồng với ID: {id1}");
			}
			return Ok(hopDong);
		}

		// API để thêm hợp đồng mới
		[HttpPost]
        public async Task<IActionResult> AddHopDong([FromBody] Viewmodel product)
        {
            if (product == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            await _hopDongServices.AddAsync(product);
            return Ok("1");
        }

        // API để cập nhật hợp đồng
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHopDong(int id, [FromBody] Hopdong product)
        {
            
            try
            {
                await _hopDongServices.UpdateAsync(id, product);  // Truyền id và đối tượng product vào
                return Ok("1");  // Trả về mã thành công 204 No Content
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);  // Trả về lỗi nếu không tìm thấy hợp đồng
            }
        }


        // API để xóa hợp đồng theo ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHopDong(int id)
        {
            var hopDong = await _hopDongServices.GetByIdAsync(id);
            if (hopDong == null)
            {
                return NotFound($"Không tìm thấy hợp đồng với ID: {id}");
            }

            await _hopDongServices.DeleteAsync(id);
			return Ok("1");
		}



		[HttpGet("getalllsbyid")]
		public async Task<IActionResult> GetAlllsHopDongs(string Hopdongid )
		{
			var lshopDongs = await db.HopdongLichsus
						   .Where(p => p.Hopdongid == Hopdongid && p.ThaoTac == "DELETE")
						   .ToListAsync();

			if (lshopDongs == null || lshopDongs.Count == 0)
			{
				return NotFound("Không có lịch sử hợp đồng nào.");
			}

			return Ok(lshopDongs);
		}
	}
}

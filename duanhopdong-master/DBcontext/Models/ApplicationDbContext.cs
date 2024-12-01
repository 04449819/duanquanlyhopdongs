using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DBcontext.Models
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Hopdong> Hopdongs { get; set; } = null!;
        public virtual DbSet<HopdongLichsu> HopdongLichsus { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
				optionsBuilder.UseSqlServer(@"Data Source=VIP-21;Initial Catalog=QUANlYHOPDONG;Integrated Security=True");
			}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hopdong>(entity =>
            {
                entity.ToTable("HOPDONG");

                entity.Property(e => e.Gmaila)
                    .HasMaxLength(255)
                    .HasColumnName("GMAILA");

                entity.Property(e => e.Gmailb)
                    .HasMaxLength(255)
                    .HasColumnName("GMAILB");

                entity.Property(e => e.HoTenA).HasMaxLength(255);

                entity.Property(e => e.HoTenB).HasMaxLength(255);

                entity.Property(e => e.Hopdongid)
                    .HasMaxLength(15)
                    .HasColumnName("HOPDONGID");

                entity.Property(e => e.NgayThayDoi)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Noidung)
                    .HasMaxLength(50)
                    .HasColumnName("NOIDUNG");
            });

            modelBuilder.Entity<HopdongLichsu>(entity =>
            {
                entity.ToTable("HOPDONG_LICHSU");

                entity.Property(e => e.Gmaila)
                    .HasMaxLength(255)
                    .HasColumnName("GMAILA");

                entity.Property(e => e.Gmailb)
                    .HasMaxLength(255)
                    .HasColumnName("GMAILB");

                entity.Property(e => e.HoTenA).HasMaxLength(255);

                entity.Property(e => e.HoTenB).HasMaxLength(255);

                entity.Property(e => e.Hopdongid)
                    .HasMaxLength(15)
                    .HasColumnName("HOPDONGID");

                entity.Property(e => e.NgayThayDoi)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Noidung)
                    .HasMaxLength(50)
                    .HasColumnName("NOIDUNG");

                entity.Property(e => e.ThaoTac).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

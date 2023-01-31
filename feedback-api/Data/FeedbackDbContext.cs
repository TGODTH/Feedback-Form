using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace feedback_api.Data
{

    public partial class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext()
        {
        }

        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DepartmentsTb> DepartmentsTbs { get; set; }

        public virtual DbSet<EmployeesTb> EmployeesTbs { get; set; }

        public virtual DbSet<FeedbacksTb> FeedbacksTbs { get; set; }

        public virtual DbSet<QuestionGroupTb> QuestionGroupTbs { get; set; }

        public virtual DbSet<QuestionsTb> QuestionsTbs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DepartmentsTb>(entity =>
            {
                entity.HasKey(e => e.Department).HasName("PK_de");

                entity.ToTable("departments_tb");

                entity.Property(e => e.Department).HasMaxLength(50);
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<EmployeesTb>(entity =>
            {
                entity.HasKey(e => e.Pw).HasName("PK_em");

                entity.ToTable("employees_tb");

                entity.Property(e => e.Pw)
                    .HasMaxLength(20)
                    .HasColumnName("PW");
                entity.Property(e => e.Department).HasMaxLength(50);
            });

            modelBuilder.Entity<FeedbacksTb>().ToTable("feedbacks_tb").HasKey(x => new { x.Pw, x.QG, x.QId });

            //modelBuilder.Entity<FeedbacksTb>(entity =>
            //{
            //    entity.HasKey(e => e.Pw && e.QId && e.QG).HasName("PK_feedback_tb");

            //    entity.ToTable("feedbacks_tb");

            //    entity.Property(e => e.Pw)
            //        .HasMaxLength(20)
            //        .HasColumnName("PW");
            //    entity.Property(e => e.Department).HasMaxLength(50);
            //    entity.Property(e => e.FirstDtm)
            //        .HasColumnType("smalldatetime")
            //        .HasColumnName("FirstDTM");
            //    entity.Property(e => e.LastDtm)
            //        .HasColumnType("smalldatetime")
            //        .HasColumnName("LastDTM");
            //    entity.Property(e => e.QG).HasColumnName("qG");
            //    entity.Property(e => e.QId).HasColumnName("qID");
            //});



            modelBuilder.Entity<QuestionGroupTb>(entity =>
            {
                entity.HasKey(e => e.QG);

                entity.ToTable("questionGroup_tb");

                entity.Property(e => e.QG).HasColumnName("qG");
                entity.Property(e => e.QGname)
                    .HasMaxLength(50)
                    .HasColumnName("qGName");
            });

            modelBuilder.Entity<QuestionsTb>(entity =>
            {
                entity.HasKey(e => e.QName);

                entity.ToTable("questions_tb");

                entity.Property(e => e.QName)
                    .HasMaxLength(400)
                    .HasColumnName("qName");
                entity.Property(e => e.QG).HasColumnName("qG");
                entity.Property(e => e.QId).HasColumnName("qID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

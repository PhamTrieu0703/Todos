using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Configuration;
using TodosBackEnd.Models;
using TodosBackEnd.Seeders;

namespace TodosBackEnd.Data
{
    public class TodosDbContext : DbContext
    {
        public TodosDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoCofiguration());

            modelBuilder.Seed();
        }

        public DbSet<Todo> Todos { get; set; }
    }
}

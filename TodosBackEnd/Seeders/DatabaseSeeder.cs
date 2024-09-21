using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Models;

namespace TodosBackEnd.Seeders
{
    public static class DatabaseSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Todo>().HasData(
                new Todo() { Id = 1 , Name = "Nhiem vu 1" , IsComplete =false},
                new Todo() { Id = 2, Name = "Nhiem vu 2", IsComplete = false }

                );
       

        }
    }
}

namespace PizzaBackend.DTOs
{
    public class CreateUserDto // POST kéréshez
    {
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int Role { get; set; } // 0 = Customer, 1 = Admin
    }

    public class UserDto // GET válaszhoz
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int Role { get; set; } // 0 = Customer, 1 = Admin
    }
}

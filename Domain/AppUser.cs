using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        // Additional properties added in conjunction to properties for Identity User like email
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        
    }
}
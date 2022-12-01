using Duende.IdentityServer.Models;

namespace NgDotnet.Identity;

public class Resources
{
    public static IEnumerable<IdentityResource> GetMoreResources()
    {
        return new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new()
            {
                Name = "profile",
                DisplayName = "User Profile Data",
                UserClaims = new []{"name", "email", "dateOfBirth"}
            }
        };
    }
}
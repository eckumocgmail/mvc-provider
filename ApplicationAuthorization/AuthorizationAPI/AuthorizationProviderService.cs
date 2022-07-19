using ApplicationDb.Entities;

using SignalR.DataTransport.Signalr;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceAuthorization.AuthorizationAPI
{
    public class AuthorizationProviderService : HubServer,APIAuthorization
    {
        private readonly APIAuthorization _auth;

        public AuthorizationProviderService(APIAuthorization auth)
        {
            _auth = auth;
        }

        public void Signout(bool? IsFront = false)
        {
            _auth.Signout(IsFront);
        }

        public User Signin(string RFIDLabel)
        {
            return _auth.Signin(RFIDLabel);
        }

        public User Signin(string Email, string Password, bool? IsFront = false)
        {
            return _auth.Signin(Email,Password,IsFront);
        }

        public User Verify(bool? IsFront = false)
        {
            return _auth.Verify( IsFront);
        }

        public ConcurrentDictionary<string, object> Session()
        {
            return _auth.Session();
        }

        public bool IsSignin()
        {
            return _auth.IsSignin();
        }

        public bool InRole(string roleName)
        {
            return _auth.InRole(roleName);
        }

        public bool IsActivated()
        {
            return _auth.IsActivated( );
        }

        public void Signup(string Email, string Password, string Confirmation, string SurName, string FirstName, string LastName, DateTime Birthday, string Tel)
        {
            _auth.Signup(Email,Password,Confirmation,SurName,FirstName,LastName,Birthday,Tel);
        }

        public bool HasUserWithEmail(string email)
        {
            return _auth.HasUserWithEmail(email);
        }

        public bool HasUserWithActivationKey(string activationKey)
        {
            return _auth.HasUserWithActivationKey(activationKey);
        }

        public bool HasUserWithTel(string tel)
        {
            return _auth.HasUserWithTel(tel);
        }

        public User GetUserByEmail(string email)
        {
            return _auth.GetUserByEmail(email);
        }

        public User GetUserByTel(string tel)
        {
            return _auth.GetUserByTel(tel);
        }

        public string GetHashSha256(string password)
        {
            return _auth.GetHashSha256(password);
        }

        public string GenerateRandomPassword(int length)
        {
            return _auth.GenerateRandomPassword(length);
        }

        public string GenerateActivationKey(int length)
        {
            return _auth.GenerateActivationKey(length);
        }

        public void RestorePasswordByEmail(string email)
        {
            _auth.RestorePasswordByEmail(email);
        }
    }
}

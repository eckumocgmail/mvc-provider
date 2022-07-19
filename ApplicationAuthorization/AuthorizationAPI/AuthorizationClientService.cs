using ApplicationDb.Entities;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceAuthorization.AuthorizationAPI
{
    class AuthorizationClientService: HubClient,APIAuthorization
    {
        public void Signout(bool? IsFront = false)
        {
            this.Request(               
                "Signout",
                new Dictionary<string, object>()
                {
                    {"IsFront",IsFront }
                },             
                (response)=> { }
            ).Wait();
        }

        public User Signin(string RFIDLabel)
        {
            throw new NotImplementedException();
        }

        public User Signin(string Email, string Password, bool? IsFront = false)
        {
            throw new NotImplementedException();
        }

        public User Verify(bool? IsFront = false)
        {
            throw new NotImplementedException();
        }

        public ConcurrentDictionary<string, object> Session()
        {
            throw new NotImplementedException();
        }

        public bool IsSignin()
        {
            bool result = false;
            bool ready = false;
            this.Request(
                "IsSignin",
                new Dictionary<string, object>()
                {
                   
                },
                (response) => {
                    Debug.WriteLine(response);
                }
            ).Wait();

            while (true)
            {
                Thread.Sleep(100);
                if (ready)
                {
                    break;
                }
            }
            return result;
        }

        public bool InRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public bool IsActivated()
        {
            throw new NotImplementedException();
        }

        public void Signup(string Email, string Password, string Confirmation, string SurName, string FirstName, string LastName, DateTime Birthday, string Tel)
        {
            throw new NotImplementedException();
        }

        public bool HasUserWithEmail(string email)
        {
            throw new NotImplementedException();
        }

        public bool HasUserWithActivationKey(string activationKey)
        {
            throw new NotImplementedException();
        }

        public bool HasUserWithTel(string tel)
        {
            throw new NotImplementedException();
        }

        public User GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public User GetUserByTel(string tel)
        {
            throw new NotImplementedException();
        }

        public string GetHashSha256(string password)
        {
            throw new NotImplementedException();
        }

        public string GenerateRandomPassword(int length)
        {
            throw new NotImplementedException();
        }

        public string GenerateActivationKey(int length)
        {
            throw new NotImplementedException();
        }

        public void RestorePasswordByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}

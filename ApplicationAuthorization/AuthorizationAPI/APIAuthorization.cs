using Core.Services.CoreAPI;

using ApplicationDb.Entities;
using System;
using System.Collections.Concurrent;


    public interface APIAuthorization: APIRegistration
    {
    

    void Signout(bool? IsFront = false);




        User Signin(string RFIDLabel);
        User Signin(string Email, string Password, bool? IsFront=false);        

        User Verify(bool? IsFront = false);
        ConcurrentDictionary<string,object> Session();

       

        bool IsSignin();
        bool InRole(string roleName);
        bool IsActivated();
        
    }

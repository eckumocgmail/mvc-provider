using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IMessageClient
{
    Task Request(DataRequestMessage message);
}
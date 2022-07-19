using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
public class ViewContextDefault : Dictionary<int,object>, IDisposable
{
    public void Dispose()
    {

    }
}
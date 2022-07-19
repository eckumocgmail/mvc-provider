using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ViewFactory: ViewNode
{ 

    public int Scope { get; set; }

    public object Create( string typeName )
    {
        return ReflectionService.CreateWithDefaultConstructor<object>(typeName);
    }


    internal void CreateLink(List<string> lists, ViewNode pnode)
    {
        if (lists.Count() >= 1)
        {
            string name = lists.Last();
            lists.RemoveAt(lists.Count() - 1);
            ViewNode node = Find(lists);

            node.Append(name, pnode);
        }
    }



    public string GetHelp() {
        return Attrs.LabelFor(GetType());
    }



}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;


public class ViewNode: ViewPane
{
    [JsonIgnore]
    
    public ViewNode Parent  = null;

    [JsonIgnore]

    public List<ViewNode> Children = new List<ViewNode>();

    public static string ROOT_INDEX = "*";







    /// <summary>
    /// Рекурсивный вызов 
    /// </summary>
    /// <param name="action"></param>
    public void Do(Action<ViewNode> action)
    {
        
        action(this);
        foreach (ViewNode p in Children)
        {
            p.Do(action);
        }
    }

    internal void Append(string name, ViewNode pnode)
    {
        throw new NotImplementedException();
    }

    public event EventHandler OnAppended;
    public ViewNode Append(ViewNode pchild)
    {
        if (pchild.Parent == this)
        {
            return pchild;
        }
        if (pchild.Parent != null)
        {
            pchild.RemoveFromParent();
        }
        pchild.Parent = this;
        Children.Add(pchild);
        this.Changed = true;
        return pchild;
    }

    public event EventHandler OnRemoved;
    public void RemoveFromParent()
    {
        if (Parent == null)
        {
            return;
        }
        Writing.ToConsole(GetType().Name + " Children Node Removed " + GetHashCode());
        if (this.Parent != null)
        {
            this.Parent.Children.Remove(this);
            this.Parent.Changed = true;
            this.Parent = null;
        }
    }


    public event EventHandler OnDropped;
    public void Drop(ViewNode draggable)
    {
        Writing.ToConsole(GetType().Name + " Children Node Dropped " + GetHashCode());
        draggable.RemoveFromParent();
        Append(draggable);
    }


    public void SetParent(ViewNode parent)
    {
        if (this.Parent != null)
        {
            this.RemoveFromParent();
        }
        this.Parent = parent;
        if (this.Parent.Children == null)
        {
            this.Parent.Children = new List<ViewNode>();
        }

        this.Parent.Children.Add(this);
        this.Parent.Changed = true;
    }

    public ViewNode Find(List<string> path)
    {
        var p = GetRoot();
         
        foreach (string s in path )
        {
            if (string.IsNullOrEmpty(s) == false)
            {
                Debug.WriteLine(s);
                int index = int.Parse(s);
                if (Children.Count() > index)
                {
                    p = Children.ToArray()[index];
                }
                else
                {
                    throw new Exception($"Не найти {path}");
                }
            }
        }
        return p;
    }

    public ViewNode Find(string path)
    {
        var p = GetRoot();
        if (path == "root")
        {
            if (GetRoot() != this)
            {
                throw new Exception("Не правильно задан индекс");
            }
            else
            {
                return GetRoot();
            }
        }
        path = path.Replace("root-", "");
        foreach (string s in path.Split("[-]"))
        {
            if (string.IsNullOrEmpty(s) == false)
            {
                Debug.WriteLine(s);
                int index = int.Parse(s);
                if (Children.Count() > index)
                {
                    p = Children.ToArray()[index];
                }
                else
                {
                    throw new Exception($"Не найти {path}");
                }
            }
        }
        return p;
    }


    public void Broadcast(Action<ViewNode> action)
    {
        action(this);
        foreach (var p in Children)
        {
            p.Broadcast(action);
        }
    }


    public ViewNode GetRoot()
    {
        var p = this;
        while (p.Parent != null)
        {
            p = p.Parent;
        }
        return p;
    }

    public List<string> GetPath()
    {
        List<string> path = new List<string>();
        var p = this;
        while (p != null)
        {
            path.Add(p.GetLocalIndex());
            p = p.Parent;
            
        }
        path.Reverse();
        return path;
    }

    private string GetLocalIndex()
    {
        if (Parent != null)
        {
            return Parent.Children.IndexOf(this)+"";
        }
        return Operators.Search;
    }
}


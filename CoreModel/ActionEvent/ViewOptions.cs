using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


public class ViewOptions: ActionEvent.ActiveItem
{
    public bool Focusable { get => Get<bool>("Focusable"); set => Set<bool>("Focusable", value); }
    public virtual bool Focused { get => Get<bool>("Focused"); set => Set<bool>("Focused", value); }
    public bool Selectable { get => Get<bool>("Selectable"); set => Set<bool>("Selectable", value); }
    public bool Selected { get => Get<bool>("Selected"); set => Set<bool>("Selected", value); }
    public bool MultiSelect { get => Get<bool>("Selected"); set => Set<bool>("Selected", value); }
    public bool Dropable { get => Get<bool>("Dropable"); set => Set<bool>("Dropable", value); }
    public bool Draggable { get => Get<bool>("Draggable"); set => Set<bool>("Draggable", value); }
    public bool Editable { get => Get<bool>("Editable"); set => Set<bool>("Editable", value); }
    public bool Searchable { get => Get<bool>("Searchable"); set => Set<bool>("Searchable", value); }
    public bool Checkable { get => Get<bool>("Checkable"); set => Set<bool>("Checkable", value); }
    public bool Checked { get => Get<bool>("Checked"); set => Set<bool>("Checked", value); }
    public bool Visible { get => Get<bool>("Visible"); set => Set<bool>("Visible", value); }
    public bool Expanded { get => Get<bool>("Expanded"); set => Set<bool>("Expanded", value); }
    public bool Edited { get => Get<bool>("Edited"); set => Set<bool>("Edited", value); }

    public ViewOptions(){
        this.MultiSelect = false;
        this.Selectable = false;
        this.Dropable = false;
        this.Draggable = false;
        this.Focusable = true;
        this.Searchable = false;
        this.Checkable = false;
        this.Searchable = false;
        this.Editable = true;
        this.Focused = false;
        this.Selected = false;
        this.Edited = false;
        this.Expanded = false;
        this.Checked = false;
        this.Visible = true;            
    }


    public string GetOptionsClasses() {
        var classList = new List<string>();
        if (Dropable) classList.Add("dropable");
        if (Draggable) classList.Add("draggable");
        if (Selectable) classList.Add("selectable");
        if (Focusable) classList.Add("focusable");
        if (Searchable) classList.Add("searchable");
        if (Focusable) classList.Add("focusable");
        if (Focusable) classList.Add("focusable");
        if (Editable) classList.Add("editable");
        if (Focusable) classList.Add("focusable");
        if (Focused) classList.Add("focused");
        if (Selected) classList.Add("selected");
        if (Edited) classList.Add("edited");
        if (Expanded) classList.Add("expanded");
        if (Checked) classList.Add("checked");
        if (Visible) classList.Add("visible");
        string _class = "";
        classList.ForEach(c => { _class += " " + c; });
        if (_class.Length > 0) _class = _class.Substring(1);
        return _class;
    }

    public virtual void Focus()
    {
        if( Focusable)
        {
            Focused = Focused == true ? false : true;
            Changed = true;
        }
        
    }


    public virtual void Check()
    {
        if (Checkable)
        {
            Checked = Checked == true ? false : true;
            Changed = true;
        }        
    }


    public virtual void Edit()
    {
        if( Editable)
        {
            Edited = Edited == true ? false : true;
            Changed = true;
        }        
    }
    

    public virtual void Select()
    {
        if (Selectable)
        {
            Selected = Selected == true ? false : true;
            Changed = true;
            SendEvent(new { 
                Type="Select",
                Source=this,
                Value=Selected
            });            
        }            
    }

    public virtual void Expand()
    {        
        Expanded = Expanded == true ? false : true;
        Changed = true;
    }

    public virtual ViewOptions SetSelectable(bool value)
    {
        Selectable = value;
        return this;
    }

    public virtual ViewOptions SetSelectionMode(bool multi)
    {
        MultiSelect = multi;
        return this;
    }

    public virtual ViewOptions SetCheckable(bool value)
    {
        Checkable = value;
        return this;
    }

    public virtual void ToggleEditable()
    {
        Edited = Edited ? false : true;
    }

    public virtual ViewOptions SetEdited(bool edited)
    {
        this.Edited = edited;
        
        return this;
    }

    public virtual ViewOptions SetEditable(bool editable)
    {
        this.Editable = editable;
        return this;
    }
    public virtual ViewOptions SetNotEditable()
    {        
        Editable = false;
        Changed = true;
        return this;
    }   
    public virtual ViewOptions SetEditMode()
    {
    
        Edited = true;
        Changed = false;
        return  this;
    }
    public virtual ViewOptions Hide()
    {
        Visible = false;
        return this;
    }     
}


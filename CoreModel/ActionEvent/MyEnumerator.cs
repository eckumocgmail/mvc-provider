using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreConstructorAngular.ActionEvent
{
    class MyEnumerator<T> : IEnumerator<T>
    {
        public T Current => this._collection[this._iteration];
        object System.Collections.IEnumerator.Current => this._collection[this._iteration];

        private readonly T[] _collection;
        private int _iteration = 0;


        public MyEnumerator(IList<T> collection)
        {
            this._collection = collection.ToArray();
        }

        public bool MoveNext()
        {
            Writing.ToConsole("move next");
            if ((_iteration+1) == _collection.Count())
            {
                return false;
            }
            else if ((_iteration + 1) < _collection.Count())
            {
                _iteration++;
                return true;
            }
            else
            {
                return false;
            }
        }

        public void Reset()
        {
            _iteration = 0;
        }



        public void Dispose()
        {

        }

        
    }
}

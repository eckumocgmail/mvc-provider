using CoreModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.StatisticsDataModel
{
    public class DataInput: BaseEntity
    {
        
        public int DatasetID { get; set; }
        public int LocationID { get; set; }
        public int IndicatorID { get; set; }
        public int Granularity { get; set; }
        public DateTime DataFrom { get; set; }
        public float Value { get; set; }
        public long Timestamp { get; set; }
    }
}

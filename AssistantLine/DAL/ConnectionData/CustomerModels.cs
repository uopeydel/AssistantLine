using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.CustomerModels
{
    public class CustomerModel
    {
        public int _id; 

        public string displayName { get; set; }

        public string userId { get; set; }

        public string pictureUrl { get; set; }

        public object statusMessage { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ConnectionModels
{
    public class ConnectionModel
    {
        public string MongoLocal { get; set; }
        public string connectionMongo { get; set; }
        public string ChannelAccessToken { get; set; }
        public string NameLineAt { get; set; }
        public string IdLineAt { get; set; }
        public string userId { get; set; }
    }
}

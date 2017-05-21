using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Line.Models
{
    class ChatLogModels
    {

    }

    class UserProfileModels
    {
        public string _id { get; set; }
        public string displayName { get; set; }
        public string userId { get; set; }
        public string pictureUrl { get; set; }
        public string statusMessage { get; set; }
        public string status { get; set; }
        public string lastConversationTalkWith { get; set; }
        public string lastConversationTalkTime { get; set; }
        public string everclaim { get; set; }
        public string eversales { get; set; }
        public string everbuy { get; set; }
        public string everread { get; set; }
    }


}

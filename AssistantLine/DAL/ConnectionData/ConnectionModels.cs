using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ConnectionData
{
    public class ConnectionModels
    {
        public string MongoLocal { get; set; }
        public string connectionMongo { get; set; }
        public string ChannelAccessToken { get; set; }
        public string NameLineAt { get; set; }
        public string IdLineAt { get; set; }
        public string userId { get; set; }
    }

    public class dataUser
    {
        public int id;
        public string _userDisplayName;
        public string _userid;
        public string _message;
    }

    public class helpDeskStruct
    {
        public string _id;
        public string HelpDeskUserId;
        public string HelpDeskUserPass;
        public string HelpDeskUserRealName;
        public HelpDeskUserRoleStruct HelpDeskUserRole;
        public string HelpDeskUserStatusOnline; //online offline busy



        public string HelpDeskUserLineName;

        public string HelpDeskUserLineId;

        public string HelpDeskUserLineAuth;
        public HelpDeskUserLineLangStruct HelpDeskUserLineLang;

    }

    public class HelpDeskUserRoleStruct
    {
        public bool Create;
        public bool Delete;
        public bool Edit;
    }
    public class HelpDeskUserLineLangStruct
    {
        public bool EN;
        public bool JP;
        public bool TH;
    }
}

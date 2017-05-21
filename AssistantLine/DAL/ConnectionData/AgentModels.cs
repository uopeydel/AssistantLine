using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.AgentModels
{
    public class AgentModel
    {
        public string _id;
        public string AgentUserId;
        public string AgentUserPass;
        public string AgentUserRealName;
        public AgentRole AgentUserRole;
        public string AgentUserStatusOnline; //online offline busy

        public string AgentUserLineName;

        public string AgentUserLineId;

        public string AgentUserLineAuth;
        public AgentLang AgentUserLineLang;

    }

    public class AgentRole
    {
        public bool Create;
        public bool Delete;
        public bool Edit;
    }
    public class AgentLang
    {
        public bool EN;
        public bool JP;
        public bool TH;
    }
}

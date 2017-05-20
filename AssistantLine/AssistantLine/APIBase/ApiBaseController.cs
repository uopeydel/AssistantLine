using Spring.Context;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine.APIBase
{
    public class ApiBaseController : ApiController
    {
        protected IApplicationContext appContext;

        protected class getConnection
        {
            public string connectionMongo;
            public string ChannelAccessToken;
            public string NameLineAt;
            public string IdLineAt;
            public string userId;
        }

        protected getConnection TakeConnection()
        {
            var obj = new getConnection();
            string path = System.Web.HttpContext.Current.Server.MapPath("") + "\\connection.xml";
            string connectionMongo = System.Xml.Linq.XElement.Load(path).Elements("Mongo").FirstOrDefault().Attribute("connection").Value;
            System.Xml.Linq.XElement Line = System.Xml.Linq.XElement.Load(path).Elements("Line").FirstOrDefault();
            string ChannelAccessToken = Line.Attribute("ChannelAccessToken").Value;
            string NameLineAt = Line.Attribute("ChannelAccessToken").Value;
            string IdLineAt = Line.Attribute("IdLineAt").Value;
            string userId = Line.Attribute("userId").Value;
            obj.ChannelAccessToken = ChannelAccessToken;
            obj.connectionMongo = connectionMongo;
            obj.IdLineAt = IdLineAt;
            obj.NameLineAt = NameLineAt;
            obj.userId = userId;
            return obj;
        }

        protected void savelog(string textData)
        {
            string n = string.Format("text-{0:yyyy-MM-dd_hh-mm-ss-tt-fff}", DateTime.Now);
            var root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile\\errorlog");
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
            File.WriteAllText(root + "\\" + n + "_errorlog.txt", textData);
        }
    }
}

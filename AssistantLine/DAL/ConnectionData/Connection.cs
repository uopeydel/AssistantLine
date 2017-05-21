using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.DAOInf;
using MongoDB.Driver;
using MongoDB.Bson;
using DAL.ConnectionModels;

namespace DAL.Connection
{
    public class Connection
    {
        public ConnectionModel TakeConnection()
        {
            var obj = new ConnectionModel();

            string path = System.AppDomain.CurrentDomain.BaseDirectory + "connection.xml";

            System.Xml.Linq.XElement Line = System.Xml.Linq.XElement.Load(path).Elements("Line").FirstOrDefault();

            obj.ChannelAccessToken = Line.Attribute("ChannelAccessToken").Value;
            obj.connectionMongo = System.Xml.Linq.XElement.Load(path).Elements("Mongo").FirstOrDefault().Attribute("connection").Value;
            obj.IdLineAt = Line.Attribute("IdLineAt").Value;
            obj.NameLineAt = Line.Attribute("ChannelAccessToken").Value;
            obj.userId = Line.Attribute("userId").Value;

            obj.MongoLocal = System.Xml.Linq.XElement.Load(path).Elements("MongoLocal").FirstOrDefault().Attribute("connection").Value;

            return obj;
        }


        //protected static IMongoClient _client;
        //protected static IMongoDatabase _database;
        //private List<helpDeskStruct> tempHelpDeskStruct = new List<helpDeskStruct>();

        //public void saveLog()
        //{
        //    try
        //    {
        //        var client = new MongoClient(TakeConnection().MongoLocal);

        //        _database = client.GetDatabase("AssistantLineProject");

        //        var userLineDB = _database.GetCollection<dataUser>("userlineBot");

        //        //dataUser userdata = new dataUser();
        //        //userdata.id = loadFromMongo().Count;
        //        //userdata._userid = userid;
        //        //userdata._message = usermess;
        //        //userdata._userDisplayName = userdisplayname;

        //        var filter = new BsonDocument();
                 
        //        dataUser userdata = new dataUser();
        //        userdata._id = userLineDB.Find(filter).ToList().Count;
        //        userdata._userid = "002";
        //        userdata._message = "003";
        //        userdata._userDisplayName = "004";
        //        userLineDB.InsertOne(userdata);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

    }
}

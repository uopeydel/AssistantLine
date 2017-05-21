using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine.Controllers
{
    
    public class ManageController : ApiController
    {

        //-----------------------------------------
        public class dataUser
        {
            public int id;
            public string _userDisplayName;
            public string _userid;
            public string _message;
        }


        //public List<dataUser> user = new List<dataUser>();

        [HttpGet]
        public List<dataUser> getUser()
        {
            var userdata = new List<dataUser>(); //
            userdata = loadFromMongo();

            while (userdata.Count > 15)
            {
                userdata.RemoveAt(0);
            }

            return userdata;
        }
        //-------------------------------------
        protected static IMongoClient _client;
        protected static IMongoDatabase _database;
        private List<helpDeskStruct> tempHelpDeskStruct = new List<helpDeskStruct>();

        protected void saveToMongo(string userid, string usermess, string userdisplayname)
        {
            var client = new MongoClient(uri);

            _database = client.GetDatabase("shopproject");

            var userLineDB = _database.GetCollection<dataUser>("userlineBot");

            dataUser userdata = new dataUser();
            userdata.id = loadFromMongo().Count;
            userdata._userid = userid;
            userdata._message = usermess;
            userdata._userDisplayName = userdisplayname;
            userLineDB.InsertOne(userdata);
        }


        protected List<dataUser> loadFromMongo()
        {
            var client = new MongoClient(uri);

            _database = client.GetDatabase("shopproject");

            var userLineDB = _database.GetCollection<dataUser>("userlineBot");

            var filter = new BsonDocument();

            return userLineDB.Find(filter).ToList();
        }

        protected List<helpDeskStruct> loadHelpDeskFromMongo()
        {
            var client = new MongoClient(uri);

            _database = client.GetDatabase("shopproject");

            var helpdesk = _database.GetCollection<helpDeskStruct>("HelpDeskData");

            var filter = new BsonDocument();

            return helpdesk.Find(filter).ToList();
        }


        protected bool chkTextRegister(string textSend)
        {
            string sub = textSend.Substring(0, 9);
            if (sub == "register!")
            {
                return true;
            }
            return false;
        }

        protected bool chkDataHelpDesk(string key, string value)
        {
            var client = new MongoClient(uri);
            _database = client.GetDatabase("shopproject");

            var collection = _database.GetCollection<helpDeskStruct>("HelpDeskData");
            var filter = Builders<helpDeskStruct>.Filter.Eq(key, value);
            var result = collection.Find(filter).ToList();
            if (result.Count == 1)
            {
                return true;
            }

            return false;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult POST()
        {
            string ChannelAccessToken = "kqJHzsi56OH56WLEq+29E0HoCR7sI/ddKh9CuSfHB/ENK/PSFTRW+pQRg5L7dRB7hHPMhMLUg7CvErwEHRZSMD0tZvA9JGo6Rxmr5oUAcn5FwS4WEEG/ztNtpA2uw8I1QcIRg8vgF4zYIZZlubOigAdB04t89/1O/w1cDnyilFU=";

            try
            {
                bool thisIsHelpDeskAuth = false;//ถ้าลงทะเบียนครั้งเเรกเสร็จ จะจบขั้นตอนเลย ไม่ไปทำไรต่อ
                bool thisIsHelpDesk = false; //เอาไว้เก็บว่าคนส่งมารอบนี้เป็นใคร

                string postData = Request.Content.ReadAsStringAsync().Result;
                var ReceivedMessage = LineMessengerSDK.LineBot.Utility.Parsing(postData);
                string Message;
                Message = ReceivedMessage.events[0].source.userId + " _:_ " + ReceivedMessage.events[0].message.text;



                if (chkTextRegister(ReceivedMessage.events[0].message.text))
                {
                    //-- ตรวจสอบคำว่าเป็น help desk ลงทะเบียนไหม 
                    foreach (var teml in tempHelpDeskStruct)
                    {
                        if (teml.HelpDeskUserLineAuth == ReceivedMessage.events[0].message.text)
                        {
                            thisIsHelpDeskAuth = true;
                        }
                    }
                    if (!thisIsHelpDeskAuth)
                    {
                        //ตรวจ temp ไม่เจอ ค่อยตรวจต่อในเบส
                        if (chkDataHelpDesk("HelpDeskUserLineAuth", ReceivedMessage.events[0].message.text))
                        {
                            //update  temp help desk 
                            tempHelpDeskStruct = loadHelpDeskFromMongo();
                            //+ need update auth key not dupilicate use while
                            var dupilicate = false;
                            while (dupilicate)
                            {

                            }

                            //update new help desk to data base

                            //
                        }
                    }

                }



                //-ตรวจสอบไอดีว่าเป็น helpdesk ไหม
                foreach (var teml in tempHelpDeskStruct)
                {
                    if (teml.HelpDeskUserLineId == ReceivedMessage.events[0].source.userId)
                    {
                        thisIsHelpDesk = true;
                    }
                }

                if (!thisIsHelpDesk)
                {
                    //ตรวจ temp ไม่เจอ ค่อยตรวจต่อในเบส
                    if (chkDataHelpDesk("HelpDeskUserLineId", ReceivedMessage.events[0].source.userId))
                    {
                        //update  temp help desk
                        tempHelpDeskStruct = loadHelpDeskFromMongo();
                        //send data to customer each type..............


                    }
                    else
                    {
                        //check hook help desk or already talk with help desk

                        //send data to help desk
                    }
                }
                else
                {
                    //send data to customer each type..............
                    if (ReceivedMessage.events[0].message.type == "text")
                    {
                        string[] cuttext = ReceivedMessage.events[0].message.text.Split('*');
                        if (cuttext.Length == 2)
                        {
                            LineMessengerSDK.LineBot.Utility.PushMessage(cuttext[0], cuttext[1], ChannelAccessToken);
                        }
                        else
                        {
                            LineMessengerSDK.LineBot.Utility.PushMessage(ReceivedMessage.events[0].source.userId, "ส่งข้อมูลผิดพลาด", ChannelAccessToken);
                        }
                    }

                }




                //-------------------------------------------------------------------------------------------------------------------------------------------------------
                if (ReceivedMessage.events[0].source.userId == "U83670cc497f32dcba4e722be89893a6e")//me is helpdesk
                {
                    string[] cuttext = ReceivedMessage.events[0].message.text.Split('*');
                    if (cuttext.Length == 2)
                    {
                        LineMessengerSDK.LineBot.Utility.PushMessage(cuttext[0], cuttext[1], ChannelAccessToken);
                    }
                    else
                    {
                        LineMessengerSDK.LineBot.Utility.PushMessage(ReceivedMessage.events[0].source.userId, "ส่งข้อมูลผิดพลาด", ChannelAccessToken);
                    }
                }
                else //this is normal user
                {
                    //var tmpUserData = findFromMongo();
                    //foreach (var usdt in tmpUserData) {
                    //    if (usdt._id != ReceivedMessage.events[0].source.userId)
                    //    {
                    //        //--- mongo add >
                    //        saveToMongo(ReceivedMessage.events[0].source.userId, ReceivedMessage.events[0].message.text);
                    //        break;
                    //    }
                    //}
                    var uid = LineMessengerSDK.LineBot.Utility.GetUserInfo(ReceivedMessage.events[0].source.userId, ChannelAccessToken);

                    saveToMongo(ReceivedMessage.events[0].source.userId, ReceivedMessage.events[0].message.text, uid.displayName);
                    LineMessengerSDK.LineBot.Utility.PushMessage("U83670cc497f32dcba4e722be89893a6e", ReceivedMessage.events[0].source.userId + "*" + ReceivedMessage.events[0].message.text, ChannelAccessToken);
                }

                //LineMessengerSDK.LineBot.Utility.PushMessage(ReceivedMessage.events[0].source.userId, Message , ChannelAccessToken);

                //     LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId , "" , ChannelAccessToken);
                #region coment



                #region Carouseltemplate

                if (ReceivedMessage.events[0].message.text == "Carouseltemplate")
                {

                    dynamic action1 = new ExpandoObject();
                    action1.type = "postback";
                    action1.label = "Buy";
                    action1.data = "action=buy&itemid=111";

                    dynamic action2 = new ExpandoObject();
                    action2.type = "postback";
                    action2.label = "Add to cart";
                    action2.data = "action=add&itemid=111";

                    dynamic action3 = new ExpandoObject();
                    action3.type = "uri";
                    action3.label = "View detail";
                    action3.uri = "https://www.facebook.com/";

                    dynamic columns1 = new ExpandoObject();
                    columns1.thumbnailImageUrl = "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg";
                    columns1.title = "this is menu";
                    columns1.text = "description";
                    columns1.actions = new List<ExpandoObject>();
                    columns1.actions.Add(action1);
                    columns1.actions.Add(action2);
                    columns1.actions.Add(action3);

                    dynamic templateSub = new ExpandoObject();
                    templateSub.type = "carousel";
                    templateSub.columns = new List<ExpandoObject>();
                    templateSub.columns.Add(columns1);
                    templateSub.columns.Add(columns1);

                    dynamic template = new ExpandoObject();
                    template.type = "template";
                    template.altText = "this is a carousel template";
                    template.template = templateSub;// new List<ExpandoObject>();


                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(template);

                    var serialized = JsonConvert.SerializeObject(mainJson);
                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region confirmtemplate

                if (ReceivedMessage.events[0].message.text == "confirmtemplate")
                {
                    dynamic action1 = new ExpandoObject();
                    action1.type = "message";
                    action1.label = "Yes";
                    action1.text = "yes";

                    dynamic action2 = new ExpandoObject();
                    action2.type = "message";
                    action2.label = "No";
                    action2.text = "no";

                    dynamic templateSub = new ExpandoObject();
                    templateSub.type = "confirm";
                    templateSub.text = "Are you sure?";
                    templateSub.actions = new List<ExpandoObject>();
                    templateSub.actions.Add(action1);
                    templateSub.actions.Add(action2);

                    dynamic template = new ExpandoObject();
                    template.type = "template";
                    template.altText = "this is a confirm template";
                    template.template = templateSub;// new List<ExpandoObject>();


                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(template);

                    var serialized = JsonConvert.SerializeObject(mainJson);
                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region template

                if (ReceivedMessage.events[0].message.text == "template")
                {
                    dynamic action1 = new ExpandoObject();
                    action1.type = "postback";
                    action1.label = "Buy";
                    action1.data = "action=buy&itemid=123";

                    dynamic action2 = new ExpandoObject();
                    action2.type = "postback";
                    action2.label = "Add to cart";
                    action2.data = "action=add&itemid=123";

                    dynamic action3 = new ExpandoObject();
                    action3.type = "uri";
                    action3.label = "View detail";
                    action3.uri = "https://www.facebook.com/";

                    dynamic templateSub = new ExpandoObject();
                    templateSub.type = "buttons";
                    templateSub.thumbnailImageUrl = "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg";
                    templateSub.title = "Menu";
                    templateSub.text = "Please select";
                    templateSub.actions = new List<ExpandoObject>();
                    templateSub.actions.Add(action1);
                    templateSub.actions.Add(action2);
                    templateSub.actions.Add(action3);


                    dynamic template = new ExpandoObject();
                    template.type = "template";
                    template.altText = "this is a buttons template";
                    template.template = templateSub;// new List<ExpandoObject>();


                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(template);

                    var serialized = JsonConvert.SerializeObject(mainJson);
                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region video

                if (ReceivedMessage.events[0].message.text == "video")
                {

                    dynamic video = new ExpandoObject();
                    video.type = "video";
                    video.originalContentUrl = "https://dev-chat.on.lk/Content/video/cat.mp4";
                    video.previewImageUrl = "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg";


                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(video);

                    var serialized = JsonConvert.SerializeObject(mainJson);
                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region แผนที่

                if (ReceivedMessage.events[0].message.text == "แผนที่")
                {

                    dynamic location = new ExpandoObject();
                    location.type = "location";
                    location.title = "บริษัท การบินกรุงเทพ จำกัด";
                    location.address = "Address ----";
                    location.latitude = 13.806179;
                    location.longitude = 100.559518;

                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(location);

                    var serialized = JsonConvert.SerializeObject(mainJson);
                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region สติกเกอร์

                if (ReceivedMessage.events[0].message.text == "สติกเกอร์")
                {
                    Random rnd = new Random();

                    dynamic sticker = new ExpandoObject();
                    sticker.type = "sticker";

                    sticker.packageId = 0;
                    sticker.stickerId = rnd.Next(2, 90);

                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(sticker);

                    var serialized = JsonConvert.SerializeObject(mainJson);

                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion

                #region imagemap


                if (ReceivedMessage.events[0].message.text == "imagemap")
                {
                    dynamic area1 = new ExpandoObject();
                    area1.x = 0;
                    area1.y = 0;
                    area1.width = 520;
                    area1.height = 1040;

                    dynamic area2 = new ExpandoObject();
                    area2.x = 520;
                    area2.y = 0;
                    area2.width = 520;
                    area2.height = 1040;


                    dynamic action1 = new ExpandoObject();
                    action1.type = "uri";
                    action1.linkUri = "https://www.google.co.th";
                    action1.area = area1;

                    dynamic action2 = new ExpandoObject();
                    action2.type = "message";
                    action2.text = "testText";
                    action2.area = area2;


                    dynamic baseSize = new ExpandoObject();
                    baseSize.height = 1040;
                    baseSize.width = 1040;


                    dynamic Imagemap = new ExpandoObject();
                    Imagemap.type = "imagemap";
                    Imagemap.baseUrl = "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo";
                    Imagemap.altText = "this is an imagemap";
                    Imagemap.baseSize = baseSize;
                    Imagemap.actions = new List<ExpandoObject>();
                    Imagemap.actions.Add(action1);
                    Imagemap.actions.Add(action2);

                    dynamic mainJson = new ExpandoObject();
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                    mainJson.messages = new List<ExpandoObject>();
                    mainJson.messages.Add(Imagemap);

                    var serialized = JsonConvert.SerializeObject(mainJson);


                    LineMessengerSDK.LineBot.Utility.PushImageMapMessage(ReceivedMessage.events[0].source.userId, serialized, ChannelAccessToken);
                }
                #endregion


                #endregion
                return Ok("complete 07");
            }
            catch (Exception ex)
            {
                return Ok(ex + "error 09");
            }
        }










        List<datastrucc> ds = new List<datastrucc>();

        [HttpGet]
        public List<datastrucc> testnnn(int id, string name)
        {

            ds.Add(new datastrucc(id, name + " "));

            //var cmd = CommandService.GetCommand(PATH + "GetPOLineRemainListDTO_AllLine.sql", new KeyValuePair<string, string>());
            //var polist = poDAO.GetPoLineRemain(cmd, docid);


            return ds;
        }


    }

    public class helpdeskController : ApiController
    {

        protected static string uri = "mongodb://lapadoldb:lapadol0mlab@ds042729.mlab.com:42729/shopproject";
        //mongodb://localhost:27017/lapadol
        //protected static IMongoClient _client;
        protected static IMongoDatabase _database;
        protected List<helpDeskStruct> getHelpDeskListFromMongo()
        {
            var client = new MongoClient(uri);
            _database = client.GetDatabase("shopproject");
            var helpDeskDB = _database.GetCollection<helpDeskStruct>("HelpDeskData");
            var filter = new BsonDocument();
            return helpDeskDB.Find(filter).ToList();
        }

        [HttpGet]
        public helpDeskStruct Login(string username, string password)
        {
            var allhelpdeskData = getHelpDeskListFromMongo();
            foreach (var helpdeskdata in allhelpdeskData)
            {
                if (helpdeskdata.HelpDeskUserId == username.Trim() && helpdeskdata.HelpDeskUserPass == password.Trim() && helpdeskdata.HelpDeskUserLineId != "")
                {
                    return helpdeskdata;
                }
            }
            return null;
        }




        [HttpGet]
        public List<helpDeskStruct> HelpDeskList()
        {
            var helpdeskList = new List<helpDeskStruct>();
            helpdeskList = getHelpDeskListFromMongo();
            return helpdeskList;
        }


        [HttpPost]
        public List<helpDeskStruct> HelpDeskListToMongo(List<helpDeskStruct> helpdeskData)
        {

            var client = new MongoClient(uri);

            _database = client.GetDatabase("shopproject");

            var helpDeskDB = _database.GetCollection<helpDeskStruct>("HelpDeskData");
            var builder = Builders<BsonDocument>.Filter;

            var filter = new BsonDocument();
            var oldHelpDeskList = helpDeskDB.Find(filter).ToList();

            foreach (var helpdesk in helpdeskData)
            {
                var result = helpDeskDB.ReplaceOne(
                filter: new BsonDocument("HelpDeskUserId", helpdesk.HelpDeskUserId),
                options: new UpdateOptions { IsUpsert = true },
                replacement: helpdesk);
            }
            return helpdeskData;
        }

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

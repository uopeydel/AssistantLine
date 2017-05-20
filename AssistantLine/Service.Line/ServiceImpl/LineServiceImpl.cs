using Service.Line.ServiceInf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Net;
using System.IO;
using System.Dynamic;
using Service.Line.LineMessengerSDK;
using Newtonsoft.Json;
//using DAL.DAOInf;

namespace Service.Line.ServiceImpl
{
    public class LineServiceImpl : ILineService
    {

        //public IDepartmentDAO departmentKjDAO;
        //public IOrganizationDAO organizationKjDAO;
        //public IProjectDAO projectKjDAO;
        //public IStakeholderDAO stakeholderKjDAO;
        public string getTest(string dataTest, string path)
        { 
            return dataTest + "=>x"+ path;
        }

        public byte[] GetUserUploadedContent(string ContentID, string ChannelAccessToken)
        {
            try
            {
                ContentID = ContentID.Trim();
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                return webClient.DownloadData("https://api.line.me/v2/bot/message/" + ContentID + "/content");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ReceievedMessage ParsingToReceievedMessage(string RawData)
        {
            return (ReceievedMessage)JsonConvert.DeserializeObject<ReceievedMessage>(RawData);
        }

        public LineUserInfoModel GetUserInfo(string uid, string ChannelAccessToken)
        {
            try
            {
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                return (LineUserInfoModel)JsonConvert.DeserializeObject<LineUserInfoModel>(Encoding.UTF8.GetString(webClient.DownloadData(string.Format("https://api.line.me/v2/bot/profile/{0}", (object)uid))));
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("GetUserInfo: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }

        public string PushMessage(string ToUserID, string Message, string ChannelAccessToken)
        {
            string str = "\r\n{{\r\n    'to': '{0}',\r\n    'messages':[\r\n        {{\r\n            'type':'text',\r\n            'text':'{1}'\r\n        }}\r\n    ]\r\n}}\r\n";
            try
            {
                Message = Message.Replace("\n", "\\n");
                Message = Message.Replace("\r", "\\r");
                Message = Message.Replace("\"", "'");
                string s = string.Format(str.Replace("'", "\""), (object)ToUserID, (object)Message);
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                byte[] bytes = Encoding.UTF8.GetBytes(s);
                return Encoding.UTF8.GetString(webClient.UploadData("https://api.line.me/v2/bot/message/push", bytes));
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("PushMessage API ERROR: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }

        public string PushDynamicMessage(string Message, string ChannelAccessToken)
        {

            try
            {
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                byte[] bytes = Encoding.UTF8.GetBytes(Message);
                Encoding.UTF8.GetString(webClient.UploadData("https://api.line.me/v2/bot/message/push", bytes));
                return "ok";
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("PushDynamicMessage API ERROR: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }

        public string ReplyMessage(string ReplyToken, string Message, string ChannelAccessToken)
        {
            string str = "\r\n{{\r\n    'replyToken':'{0}',\r\n    'messages':[\r\n        {{\r\n            'type':'text',\r\n            'text':'{1}'\r\n        }}\r\n    ]\r\n}}";
            try
            {
                Message = Message.Replace("\n", "\\n");
                Message = Message.Replace("\r", "\\r");
                Message = Message.Replace("\"", "'");
                string s = string.Format(str.Replace("'", "\""), (object)ReplyToken, (object)Message);
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                byte[] bytes = Encoding.UTF8.GetBytes(s);
                return Encoding.UTF8.GetString(webClient.UploadData("https://api.line.me/v2/bot/message/reply", bytes));
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("ReplyMessage API ERROR: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }

        public string ReplyMessage(string JasonData, string ChannelAccessToken)
        {
            try
            {
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                byte[] bytes = Encoding.UTF8.GetBytes(JasonData);
                return Encoding.UTF8.GetString(webClient.UploadData("https://api.line.me/v2/bot/message/reply", bytes));
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("ReplyMessage API ERROR: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }

        public string MulticastMessage(string Message, string ChannelAccessToken)
        {
            try
            {
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/json");
                webClient.Headers.Add("Authorization", "Bearer " + ChannelAccessToken);
                byte[] bytes = Encoding.UTF8.GetBytes(Message);
                return Encoding.UTF8.GetString(webClient.UploadData("https://api.line.me/v2/bot/message/multicast", bytes));
            }
            catch (WebException ex)
            {
                using (StreamReader streamReader = new StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("MulticastMessage API ERROR: " + streamReader.ReadToEnd(), (Exception)ex);
            }
        }
        public dynamic DeclareDynamicAreasModel(AreaModel areas)
        {
            dynamic area = new ExpandoObject();
            area.x = areas.x;// 28;
            area.y = areas.y;// 438;
            area.width = areas.width;// 165;
            area.height = areas.height; // 155;

            return area;
        }



        public dynamic DeclareDynamicActionsModel(ActionModel action)
        {
            dynamic actionModel = new ExpandoObject();
            if (action.area == null)
            {
                if (action.type == "postback")
                {
                    actionModel.type = action.type;// "postback";
                    actionModel.label = action.label;
                    actionModel.data = action.data; // "action=buy&itemid=111";
                }
                else if (action.type == "uri")
                {
                    actionModel.type = action.type;//"uri";
                    actionModel.label = action.label;
                    actionModel.uri = action.uri; //"https://www.facebook.com/";
                }
                else if (action.type == "message")
                {
                    actionModel.type = action.type;//"message";
                    actionModel.label = action.label;
                    actionModel.text = action.text; //"yes";
                }
            }
            else
            {
                if (action.type == "uri")
                {
                    actionModel.type = action.type;//"uri";
                    actionModel.linkUri = action.linkUri; //link uri   
                    actionModel.area = DeclareDynamicAreasModel(action.area);
                }
                else if (action.type == "message")
                {
                    actionModel.type = action.type; // "message";
                    actionModel.text = action.text; //text
                    actionModel.area = DeclareDynamicAreasModel(action.area);
                }
            }
            return actionModel;
        }

        public dynamic DeclareDynamicColumnModel(ActionModel[] actions, string thumbnailImageUrl, string title, string text)
        {
            dynamic columns = new ExpandoObject();
            columns.thumbnailImageUrl = thumbnailImageUrl; // link https png jpg
            columns.title = title; // "this is menu";
            columns.text = text;// "description";
            columns.actions = new List<ExpandoObject>();
            foreach (ActionModel detailAction in actions)
            {
                columns.actions.Add(DeclareDynamicActionsModel(detailAction));
            }

            return columns;
        }

        public dynamic DeclareDynamicCarouselTemplateModel(ColumnModel[] columns, string altText)
        {
            dynamic templateSub = new ExpandoObject();
            templateSub.type = "carousel";
            templateSub.columns = new List<ExpandoObject>();
            foreach (ColumnModel column in columns)
            {
                templateSub.columns.Add(DeclareDynamicColumnModel(column.actions, column.thumbnailImageUrl, column.title, column.text));
            }

            dynamic template = new ExpandoObject();
            template.type = "template";
            template.altText = altText; // "this is a carousel template";
            template.template = templateSub;// new List<ExpandoObject>();

            return template;
        }

        public dynamic DeclareDynamicConfirmTemplateModel(ActionModel[] actions, string altText, string text)
        {
            dynamic templateSub = new ExpandoObject();
            templateSub.type = "confirm";
            templateSub.text = text; //"Are you sure?";
            templateSub.actions = new List<ExpandoObject>();
            foreach (ActionModel detailAction in actions)
            {
                templateSub.actions.Add(DeclareDynamicActionsModel(detailAction));
            }

            dynamic template = new ExpandoObject();
            template.type = "template";
            template.altText = altText;
            template.template = templateSub;// new List<ExpandoObject>();

            return template;
        }

        public dynamic DeclareDynamicTemplateModel(ActionModel[] actions, string altText, string text, string title, string thumbnailImageUrl)
        {
            dynamic templateSub = new ExpandoObject();
            templateSub.type = "buttons";
            templateSub.thumbnailImageUrl = thumbnailImageUrl; //link https png jpg
            templateSub.title = title; // "Menu";
            templateSub.text = text; // "Please select";
            templateSub.actions = new List<ExpandoObject>();
            foreach (ActionModel detailAction in actions)
            {
                templateSub.actions.Add(DeclareDynamicActionsModel(detailAction));
            }

            dynamic template = new ExpandoObject();
            template.type = "template";
            template.altText = altText; // "this is a buttons template";
            template.template = templateSub;// new List<ExpandoObject>(); 
            return template;
        }


        public dynamic DeclareDynamicTextModel(string message)
        {
            dynamic text = new ExpandoObject();
            text.type = "text";
            text.text = message;
            return text;
        }


        public dynamic DeclareDynamicImageModel(string originalContentUrl, string previewImageUrl)
        {
            dynamic image = new ExpandoObject();
            image.type = "image";
            image.originalContentUrl = originalContentUrl; // link https png jpg
            image.previewImageUrl = previewImageUrl; // link https png jpg

            return image;
        }

        public dynamic DeclareDynamicVideoModel(string originalContentUrl, string previewImageUrl)
        {
            dynamic video = new ExpandoObject();
            video.type = "video";
            video.originalContentUrl = originalContentUrl; // link https mp4
            video.previewImageUrl = previewImageUrl; // prev image jpg png

            return video;
        }


        public dynamic DeclareDynamicAudioModel(string originalContentUrl, int duration)
        {
            dynamic audio = new ExpandoObject();
            audio.type = "audio";
            audio.originalContentUrl = originalContentUrl; // link https m4a
            audio.duration = duration; // long time

            return audio;
        }


        public dynamic DeclareDynamicLocationModel(string title, string address, double latitude, double longitude)
        {
            dynamic location = new ExpandoObject();
            location.type = "location";
            location.title = title; // "Longkong studio";
            location.address = address; // "Longkong studio Address";
            location.latitude = latitude; // 13.891185;
            location.longitude = longitude; // 100.559556;

            return location;
        }



        public dynamic DeclareDynamicStickernModel(int packageId, int stickerId)
        {
            dynamic sticker = new ExpandoObject();
            sticker.type = "sticker";
            sticker.packageId = packageId;//// 1,2,3;
            sticker.stickerId = stickerId; //  rnd.Next(2, 15);

            return sticker;
        }


        public dynamic DeclareDynamicImagemapModel(ActionModel[] actions, string baseUrl, string altText)
        {
            dynamic baseSized = new ExpandoObject();
            baseSized.height = 1040;
            baseSized.width = 1040;

            dynamic Imagemap = new ExpandoObject();
            Imagemap.type = "imagemap";
            Imagemap.baseUrl = baseUrl;// "https://raw.githubusercontent.com/uopeydel/testline1/master/imagefolder/picstar"; image folder root
            Imagemap.altText = altText; // "this is an imagemap";
            Imagemap.baseSize = baseSized;

            Imagemap.actions = new List<ExpandoObject>();
            foreach (ActionModel detailAction in actions)
            {
                Imagemap.actions.Add(DeclareDynamicActionsModel(detailAction));
            }
            return Imagemap;
        }


        public void SendDynamicMessageToCustommer(ReceievedMessage ReceivedMessage)
        {

            try
            {
                dynamic dataJson = new ExpandoObject();

                if (ReceivedMessage.events[0].message.type == "text")
                {
                    dataJson = DeclareDynamicTextModel(ReceivedMessage.events[0].message.text);
                }
                else if (ReceivedMessage.events[0].message.type == "image")
                {
                    dataJson = DeclareDynamicImageModel(
                         ReceivedMessage.events[0].message.originalContentUrl,
                        ReceivedMessage.events[0].message.previewImageUrl

                        );
                }
                else if (ReceivedMessage.events[0].message.type == "video")
                {
                    dataJson = DeclareDynamicVideoModel(
                        ReceivedMessage.events[0].message.originalContentUrl,
                        ReceivedMessage.events[0].message.previewImageUrl

                        );
                }
                else if (ReceivedMessage.events[0].message.type == "audio")
                {
                    dataJson = DeclareDynamicAudioModel(
                        ReceivedMessage.events[0].message.originalContentUrl,
                        ReceivedMessage.events[0].message.duration
                        );
                }
                else if (ReceivedMessage.events[0].message.type == "location")
                {
                    dataJson = DeclareDynamicLocationModel(
                        ReceivedMessage.events[0].message.title,
                        ReceivedMessage.events[0].message.address,
                        ReceivedMessage.events[0].message.latitude,
                        ReceivedMessage.events[0].message.longitude
                        );
                }
                else if (ReceivedMessage.events[0].message.type == "sticker")
                {
                    dataJson = DeclareDynamicStickernModel(ReceivedMessage.events[0].message.packageId, ReceivedMessage.events[0].message.stickerId);
                }
                else if (ReceivedMessage.events[0].message.type == "imagemap")
                {
                    dataJson = DeclareDynamicImagemapModel(
                        ReceivedMessage.events[0].message.actions,
                        ReceivedMessage.events[0].message.baseUrl,
                        ReceivedMessage.events[0].message.altText

                        );
                }
                else if (ReceivedMessage.events[0].message.type == "buttons" && ReceivedMessage.events[0].message.template.type == "buttons") //template
                {
                    dataJson = DeclareDynamicTemplateModel(
                        ReceivedMessage.events[0].message.template.actions,
                        ReceivedMessage.events[0].message.altText,
                        ReceivedMessage.events[0].message.template.text,
                        ReceivedMessage.events[0].message.template.title,
                        ReceivedMessage.events[0].message.template.thumbnailImageUrl
                        );
                }
                else if (ReceivedMessage.events[0].message.type == "buttons" && ReceivedMessage.events[0].message.template.type == "carousel")//carouseltemplate
                {
                    dataJson = DeclareDynamicCarouselTemplateModel(
                        ReceivedMessage.events[0].message.template.columns,
                        ReceivedMessage.events[0].message.altText);
                }
                else if (ReceivedMessage.events[0].message.type == "buttons" && ReceivedMessage.events[0].message.template.type == "confirm")//confirm
                {
                    dataJson = DeclareDynamicConfirmTemplateModel(
                        ReceivedMessage.events[0].message.template.actions,
                        ReceivedMessage.events[0].message.altText,
                        ReceivedMessage.events[0].message.text);
                }

                var ChannelAccessToken = ConfigurationSettings.AppSettings["ChannelAccessToken"].ToString();
                dynamic mainJson = new ExpandoObject();
                if (ReceivedMessage.events[0].source.multicastToUserId != null && ReceivedMessage.events[0].source.multicastToUserId.Length > 0)
                {
                    mainJson.to = ReceivedMessage.events[0].source.multicastToUserId;
                }
                else
                {
                    mainJson.to = ReceivedMessage.events[0].source.userId;
                }
                mainJson.messages = new List<ExpandoObject>();
                mainJson.messages.Add(dataJson);
                var serialized = JsonConvert.SerializeObject(mainJson);
                PushDynamicMessage(serialized, ChannelAccessToken);
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }




        public string savefileBase64(string fileBase64, string root, string fileType, string fileExtension)
        {
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }

            string n = string.Format("text-{0:yyyy-MM-dd_hh-mm-ss-tt-fff}", DateTime.Now);
            string filename = "file_" + n + "_." + fileExtension;
            File.WriteAllBytes(root + "\\" + filename, Convert.FromBase64String(fileBase64));

            string filePath = @"https://prototype-kjapi.on.lk/saveFile/" + fileType + "/" + filename;

            return filePath;
        }


        public string savefileByte(byte[] fileByte, string root, string fileType, string fileExtension)
        {
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }

            string n = string.Format("text-{0:yyyy-MM-dd_hh-mm-ss-tt-fff}", DateTime.Now);
            string filename = "file_" + n + "_." + fileExtension;
            System.IO.File.WriteAllBytes(root + "\\" + filename, fileByte);

            string filePath = @"https://prototype-kjapi.on.lk/saveFile/" + fileType + "/" + filename;

            return filePath;
        }






    }
}

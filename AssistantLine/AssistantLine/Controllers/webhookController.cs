using AssistantLine.APIBase;
using Service.Line.ServiceInf;
using Spring.Context.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine.Controllers
{
    public class webhookController : ApiBaseController
    {
        private webhookController()
        {
            appContext = ContextRegistry.GetContext();
        }



        [HttpPost]
        [Route("linebot/webhook")]
        public IHttpActionResult defaultapi()
        {
            try
            {
                string postData = Request.Content.ReadAsStringAsync().Result;
                
                var lineSrv = (ILineService)appContext.GetObject("lineSrv");
                var ReceivedMessage = lineSrv.ParsingToReceievedMessage(postData);

                string userId = ReceivedMessage.events[0].source.userId;
                string replyToken = ReceivedMessage.events[0].replyToken;
                long timestamp = ReceivedMessage.events[0].timestamp;
                string contentId = ReceivedMessage.events[0].message.id;
                var userInfo = lineSrv.GetUserInfo(userId, TakeConnection().ChannelAccessToken);

                if (ReceivedMessage.events[0].type == "postback")
                {
                    lineSrv.ReplyMessage(replyToken, " ex postback " + ReceivedMessage.events[0].postback.data, TakeConnection().ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "text")
                { 
                    lineSrv.ReplyMessage(replyToken, ReceivedMessage.events[0].source.userId + " [text] " + ReceivedMessage.events[0].message.text, TakeConnection().ChannelAccessToken); 
                }
                else if (ReceivedMessage.events[0].type == "follow")
                { 
                    lineSrv.ReplyMessage(replyToken, "Thank For Follow Me :)", TakeConnection().ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].type == "unfollow")
                {
                     //save to base who unfollow 
                }
                else if (ReceivedMessage.events[0].type == "join")
                {
                    lineSrv.ReplyMessage(replyToken, "ขออภัย ระบบเรายังไม่รองรับการสนทนาแบบกลุ่ม", TakeConnection().ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "image")
                {
                    //byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    //string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "image";
                    //string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "png");

                    //lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "video")
                {
                    //byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    //string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "video";
                    //string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "mp4");

                    //lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);

                }
                else if (ReceivedMessage.events[0].message.type == "audio")
                {
                    //byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    //string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "audio";
                    //string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "m4a");

                    //lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);

                }
                else if (ReceivedMessage.events[0].message.type == "sticker")
                {
                    lineSrv.ReplyMessage(replyToken, " [] " + ReceivedMessage.events[0].message.packageId + " s " + ReceivedMessage.events[0].message.stickerId, TakeConnection().ChannelAccessToken);
                }
                else
                {
                    //savelog(" else " + postData);
                }


                return Ok();
            }
            catch (Exception exc)
            {
                //savelog(exc.ToString());
                return Ok(exc.ToString());
            }
        }

        /*
         [HttpPost]
        [Route("line/hook/0001")]
        [Route("line/hook/0002")]
        [Route("line/hook/0003")]
        [Route("line/hook/0004")]
        [Route("line/hook/MBSE")]
        [Route("line/hook/CHNG")]
        var projectCode = Url.Request.RequestUri.Segments[3];
         */


        #region hiddenDefaultAPI
        /*
        [HttpPost]
        [Route("linebot/webhook")]
        public IHttpActionResult defaultapi()
        {
            try
            {
                string postData = Request.Content.ReadAsStringAsync().Result;

                var lineSrv = (ILineService)appContext.GetObject("lineSrv");
                var ReceivedMessage = lineSrv.ParsingToReceievedMessage(postData);

                string userId = ReceivedMessage.events[0].source.userId;
                string replyToken = ReceivedMessage.events[0].replyToken;
                long timestamp = ReceivedMessage.events[0].timestamp;
                string contentId = ReceivedMessage.events[0].message.id;
                var userInfo = lineSrv.GetUserInfo(userId, ChannelAccessToken);

                if (ReceivedMessage.events[0].type == "postback")
                {
                    lineSrv.ReplyMessage(replyToken, " ex postback " + ReceivedMessage.events[0].postback.data, ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "text")
                {
                    lineSrv.ReplyMessage(replyToken, ReceivedMessage.events[0].source.userId + " [text] " + ReceivedMessage.events[0].message.text, ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].type == "follow")
                {
                    lineSrv.ReplyMessage(replyToken, "Thank For Follow Me :)", ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].type == "unfollow")
                {
                    //save to base who unfollow 
                }
                else if (ReceivedMessage.events[0].type == "join")
                {
                    lineSrv.ReplyMessage(replyToken, "ขออภัย ระบบเรายังไม่รองรับการสนทนาแบบกลุ่ม", ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "image")
                {
                    byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "image";
                    string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "png");

                    lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);
                }
                else if (ReceivedMessage.events[0].message.type == "video")
                {
                    byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "video";
                    string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "mp4");

                    lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);

                }
                else if (ReceivedMessage.events[0].message.type == "audio")
                {
                    byte[] fileByte = lineSrv.GetUserUploadedContent(contentId, ChannelAccessToken);
                    string root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile") + "\\" + "audio";
                    string filePath = lineSrv.savefileByte(fileByte, root, ReceivedMessage.events[0].message.type, "m4a");

                    lineSrv.ReplyMessage(replyToken, filePath, ChannelAccessToken);

                }
                else if (ReceivedMessage.events[0].message.type == "sticker")
                {
                    lineSrv.ReplyMessage(replyToken, " [] " + ReceivedMessage.events[0].message.packageId + " s " + ReceivedMessage.events[0].message.stickerId, ChannelAccessToken);
                }
                else
                {
                    //savelog(" else " + postData);
                }


                return Ok();
            }
            catch (Exception exc)
            {
                //savelog(exc.ToString());
                return Ok(exc.ToString());
            }
        }*/
        #endregion

    }
}

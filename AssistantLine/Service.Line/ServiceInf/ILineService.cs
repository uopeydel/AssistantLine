using Service.Line.LineMessengerSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Newtonsoft.Json;

namespace Service.Line.ServiceInf
{
    public interface ILineService
    {
        string getTest(string dataTest ,string path);
        byte[] GetUserUploadedContent(string ContentID);
        ReceievedMessage ParsingToReceievedMessage(string RawData);
        LineUserInfoModel GetUserInfo(string uid);
        string PushMessage(string ToUserID, string Message);
        string PushDynamicMessage( string Message);
        string ReplyMessage(string ReplyToken, string Message);
        string ReplyMessage(string JasonData);
        dynamic DeclareDynamicAreasModel(AreaModel areas);
        dynamic DeclareDynamicActionsModel(ActionModel actions);
        dynamic DeclareDynamicColumnModel(ActionModel[] actions, string thumbnailImageUrl, string title, string text);
        dynamic DeclareDynamicCarouselTemplateModel(ColumnModel[] columns, string altText);
        dynamic DeclareDynamicConfirmTemplateModel(ActionModel[] actions, string altText, string text);
        dynamic DeclareDynamicTemplateModel(ActionModel[] actions, string altText, string text, string title, string thumbnailImageUrl);
        dynamic DeclareDynamicVideoModel(string originalContentUrl, string previewImageUrl);
        dynamic DeclareDynamicLocationModel(string title, string address, double latitude, double longitude);
        dynamic DeclareDynamicStickernModel(int packageId, int stickerId);
        dynamic DeclareDynamicImagemapModel(ActionModel[] actions, string baseUrl, string altText);

        void  SendDynamicMessageToCustommer(ReceievedMessage ReceivedMessage );
         

        string savefileBase64(string fileBase64, string root, string fileType, string fileExtension);
        string savefileByte(byte[] fileByte, string root, string fileType, string fileExtension);
    }
}

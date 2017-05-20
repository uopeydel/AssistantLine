namespace Service.Line.LineMessengerSDK
{
    public class MessageModel
    {
        public string type { get; set; }

        public string id { get; set; }

        public string text { get; set; }

        public string title { get; set; }

        public string altText { get; set; }

        //location
        public string address { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }

        
        //sticker
        public int packageId { get; set; } 

        public int stickerId { get; set; }

        //imagemap
        public string baseUrl { get; set; }
        
        public baseSizeModel baseSize { get; set; }
        
        public ActionModel[] actions { get; set; }




        //template
        public TemplateModel template { get; set; }

        public string originalContentUrl { get; set; }

        public int duration { get; set; }

        public string previewImageUrl { get; set; }

    }
}

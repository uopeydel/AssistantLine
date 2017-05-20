namespace Service.Line.LineMessengerSDK
{
    public  class TemplateModel
    {
        public string type { get; set; }
        public string text { get; set; } 
        public string thumbnailImageUrl { get; set; }
        public string title { get; set; }
        public ActionModel[] actions { get; set; }

        public ColumnModel[] columns { get; set; }
    }
     
}

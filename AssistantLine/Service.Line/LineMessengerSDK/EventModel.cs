namespace Service.Line.LineMessengerSDK
{
    public class EventModel
    {
        public string type { get; set; }

        public string replyToken { get; set; }

        public SourceModel source { get; set; }

        public long timestamp { get; set; }

        public MessageModel message { get; set; }

        public PostbackModel postback { get; set;  }

    }

}

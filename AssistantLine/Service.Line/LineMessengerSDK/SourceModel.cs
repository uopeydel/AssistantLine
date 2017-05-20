namespace Service.Line.LineMessengerSDK
{
    public class SourceModel
    {
        public string groupId { get; set; }

        public string userId { get; set; }

        public string type { get; set; }

        public string[] multicastToUserId { get; set; }
    }
}

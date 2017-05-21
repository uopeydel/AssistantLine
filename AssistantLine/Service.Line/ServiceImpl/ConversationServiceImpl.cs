using Service.Line.ServiceInf;
using Newtonsoft.Json;
using DAL.DAOInf;
using DAL.CustomerModels; 
using DAL.ConversationModels;

namespace Service.Line.ServiceImpl
{
    public class ConversationServiceImpl : IConversationServiceInf
    {
        public ILogDAOInf logDAO;
        public ICustomerDAOInf customerDAO;
        public IConversationDAOInf conversationDAO;


        public string CreateConversationData(ConversationModel conversation)
        {
            conversationDAO.CreateConversationData(conversation);
            return "";
        }

    }

}

using Service.Line.ServiceInf;
using Newtonsoft.Json;
using DAL.DAOInf;
using DAL.CustomerModels;

namespace Service.Line.ServiceImpl
{
    public class CustomerServiceImpl : ICustomerServiceinf
    {
        public ILogDAOInf logDAO;
        public ICustomerDAOInf customerDAO;

        public bool CreateNewCustomer(string dataString)
        {
            var Obj = JsonConvert.DeserializeObject<CustomerModel>(dataString);
            return customerDAO.CreateNewCustomer(Obj);
        }

        public string TakeCustomerData(string uid)
        {
            var CustomerData = customerDAO.TakeCustomerData(uid);
            string jsonObj = JsonConvert.SerializeObject(CustomerData);
            return jsonObj;
        }
    }

}

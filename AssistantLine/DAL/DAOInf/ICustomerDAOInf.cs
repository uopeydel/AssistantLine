using DAL.CustomerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DAOInf
{
    public interface ICustomerDAOInf
    {
        bool CreateNewCustomer(CustomerModel chatData);
        CustomerModel TakeCustomerData(string uid);
    }

}

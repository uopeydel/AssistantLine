using DAL.CustomerModels;
using Service.Line.LineMessengerSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace Service.Line.ServiceInf
{
    public interface ICustomerServiceinf
    {
        bool CreateNewCustomer(string dataString);
        string TakeCustomerData(string dataString);
    }
}

using DAL.CustomerModels;
using DAL.DAOInf;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DAL.DAOImpl
{
    public class CustomerDAOImpl : ICustomerDAOInf
    {

        protected static IMongoClient _client;
        protected static IMongoDatabase _database;

        public bool CreateNewCustomer(CustomerModel CustomerData)
        {
            try
            {
                var connection = Connection.TakeConnection();
                var client = new MongoClient(connection.MongoLocal);
                _database = client.GetDatabase("AssistantLineProject");
                var CustomerDataDB = _database.GetCollection<CustomerModel>("Customer");
                var IsOldUser = CustomerDataDB.Find(x => x.userId == CustomerData.userId).Any();
                if (IsOldUser)
                {
                    CustomerDataDB.InsertOne(CustomerData);
                }
                return IsOldUser;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CustomerModel TakeCustomerData(string uid)
        {
            try
            {
                var connection = Connection.TakeConnection();
                var client = new MongoClient(connection.MongoLocal);
                _database = client.GetDatabase("AssistantLineProject");
                var CustomerDataDB = _database.GetCollection<CustomerModel>("Customer");
                var Customer = CustomerDataDB.Find(x => x.userId == uid).FirstOrDefault();
                return Customer;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}

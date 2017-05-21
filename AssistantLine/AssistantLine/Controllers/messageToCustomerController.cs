using AssistantLine.APIBase;
using Service.Line.ServiceInf;
using Spring.Context.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine
{
    public class messageToCustomerController : ApiBaseController
    {
        private messageToCustomerController()
        {
            appContext = ContextRegistry.GetContext();
        }

        [HttpPost]
        [Route("messageLineToCustomer")]
        public IHttpActionResult messageLineToCustomer()
        {
            try
            {
                
                //var srv = (IDocumentService)appContext.GetObject("DocumentSrv");
                //var request = Request.Content.ReadAsStringAsync().Result;
                //return Ok(srv.GetDocumentListGroupByUnit(request));
                var srv = (ICustomerServiceinf)appContext.GetObject("cusSrv");

                var request = Request.Content.ReadAsStringAsync().Result;
                return Ok(srv.CreateNewCustomer(request));
            }
            catch (WebException ex)
            {
                using (System.IO.StreamReader streamReader = new System.IO.StreamReader(ex.Response.GetResponseStream()))
                    throw new Exception("messageLineToCustomer" + streamReader.ReadToEnd(), (Exception)ex);
            }
        }


    }
}

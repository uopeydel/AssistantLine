using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine
{
    public class messageToCustomerController : ApiController
    {
        [HttpPost]
        [Route("messageToCustomer")]
        public IHttpActionResult messageToCustomer()
        {
            try
            {
                //var srv = (IDocumentService)appContext.GetObject("DocumentSrv");
                //var request = Request.Content.ReadAsStringAsync().Result;
                //return Ok(srv.GetDocumentListGroupByUnit(request));

                var request = Request.Content.ReadAsStringAsync().Result;
                return Ok("xxx");
            }
            catch (Exception e)
            {
                throw new Exception("error", e);
            }

        }

    }
}

using Spring.Context;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AssistantLine.APIBase
{
    public class ApiBaseController : ApiController
    {
        protected IApplicationContext appContext;
        
        protected void savelog(string textData)
        {
            string n = string.Format("text-{0:yyyy-MM-dd_hh-mm-ss-tt-fff}", DateTime.Now);
            var root = System.Web.HttpContext.Current.Server.MapPath("..\\saveFile\\errorlog");
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
            File.WriteAllText(root + "\\" + n + "_errorlog.txt", textData);
        }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace mobile.Controllers
{
    public class mobileController : ApiController
    {
        public class authModel
        {
            public string userName { get; set; }
            public string password { get; set; }
        }

        public class objTokenAfterLogin //expires 2 month
        {
            public string access_token { get; set; }
            public string token_type { get; set; }
            public string expires_in { get; set; }
            public string refresh_token { get; set; }
            public string audience { get; set; }
        }

        private objTokenAfterLogin dataTempAuth = new objTokenAfterLogin();

        private string name = "MobileApp";
        private string client_id = "";
        private string resBase = "https://test-api.com/";
        private string serviceBase = "https://comauthserver.com/oauth2/token";
        [HttpGet]
        [Route("api/mobile/auth/login")]
        public string authlogin()
        {
            //string userName = "Red@Red.Red";
            //string password = "Red@Red.Red";
            try
            {
                string postData = Request.Content.ReadAsStringAsync().Result;
                var authData = JsonConvert.DeserializeObject<authModel>(postData);
                #region testData
                /* test data */
                authData = new authModel();
                authData.userName = "Red@Red.Red";
                authData.password = "Red@Red.Red";
                /* test data */
                #endregion

                var data = "grant_type=password" +
                    "&username=" + authData.userName +
                    "&password=" + authData.password +
                    "&client_id=" + client_id;

                byte[] bytes = Encoding.UTF8.GetBytes(data);
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                var rev = Encoding.UTF8.GetString(webClient.UploadData(serviceBase, bytes));
                return rev;/*
                var dataObj = JsonConvert.DeserializeObject<objTokenAfterLogin>(rev);
                dataTempAuth = dataObj;
                return dataTempAuth;*/
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public class anythingData
        {
            public string aaa1 { get; set; }
            public string bbb2 { get; set; }
            public string ccc3 { get; set; }
        }


        public class objForRefreshTokens
        {
            public string refresh_token { get; set; }
            public string grant_type { get; set; }
            public string client_id { get; set; }
        }

        [HttpGet]
        [Route("api/mobile/auth/anythingpost")]
        public async Task<string> authanythingpost()
        {
            try
            {
                //string postData = Request.Content.ReadAsStringAsync().Result;
                //authModel authData = JsonConvert.DeserializeObject<authModel>(postData);

                #region => dummy data
                var authData = new authModel();
                authData.userName = "Red@Red.Red";
                authData.password = "Red@Red.Red";
                dataTempAuth.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
                dataTempAuth.refresh_token = "d9d0ca308de64e";
                dataTempAuth.token_type = "bearer ";
                #endregion

                anythingData andt = new anythingData
                {
                    aaa1 = "ax01",
                    bbb2 = "ax02",
                    ccc3 = "ax03"
                };

                string data = JsonConvert.SerializeObject(authData);

                byte[] bytes = Encoding.UTF8.GetBytes(data);
                WebClient webClient = new WebClient();
                webClient.Headers.Clear();
                webClient.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                webClient.Headers.Add("Authorization", dataTempAuth.token_type + dataTempAuth.access_token);
                string apiname = "test/anythingpost";
                resBase = "http://localhost:3000/";
                string rev = Encoding.UTF8.GetString(webClient.UploadData(resBase + apiname, bytes));
                anythingData dataObj = JsonConvert.DeserializeObject<anythingData>(rev);
                objTokenAfterLogin retToken = new objTokenAfterLogin();
                retToken.refresh_token = rev;
                return rev;
                //return retToken;
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.ProtocolError)
                {
                    var response = ex.Response as HttpWebResponse;
                    if (response != null)
                    {
                        if ((int)response.StatusCode == 401)
                        {
                            if (dataTempAuth != null)
                            {
                                var usingBuilkAuthToken = false;

                                if (response.ResponseUri.ToString().Split('/')[2] == resBase.Split('/')[2].ToString())
                                {
                                    usingBuilkAuthToken = true;
                                }

                                if (usingBuilkAuthToken)
                                {
                                    var taskUpload = RefreshToken();
                                    var waitForRefreshTokens = await taskUpload;
                                    return waitForRefreshTokens;
                                }
                            }
                        }
                    }
                    else
                    {
                        // no http status code available
                    }
                }
                else
                {
                    // no http status code available
                }
                throw ex;
            }
        }


        private async Task<string> RefreshToken()
        {
            objTokenAfterLogin particleResponse = new objTokenAfterLogin();

            var requestParameters = new[] {
                new KeyValuePair<string, string> ("refresh_token", dataTempAuth.refresh_token),
                new KeyValuePair<string, string> ("client_id", client_id),
                new KeyValuePair<string, string> ("grant_type", "refresh_token")/*, 
                new KeyValuePair<string, string> ("name", name),
                new KeyValuePair<string, string> ("type", "0"),
                new KeyValuePair<string, string> ("access_token", dataTempAuth.access_token),*/ 
            };

            var requestContent = new FormUrlEncodedContent(requestParameters);

            try
            {
                using (var client = new HttpClient())
                {

                    HttpResponseMessage response = await client.PostAsync(
                        serviceBase +
                        "?refresh_token=" + dataTempAuth.refresh_token +
                        "&client_id=" + client_id +
                        "&grant_type=" + "refresh_token",
                        requestContent
                    );
                    using (var reader = new System.IO.StreamReader(await response.Content.ReadAsStreamAsync()))
                    {
                        var responseText = await reader.ReadToEndAsync();
                        return responseText;
                        //particleResponse = JsonConvert.DeserializeObject<objTokenAfterLogin>(responseText);
                        //return particleResponse;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

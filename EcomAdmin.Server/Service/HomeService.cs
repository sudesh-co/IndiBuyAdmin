using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Service
{
    public class HomeService
    {

        public async Task<DataTable> RegisterCarouselItem(Dictionary<string, object> data)
        {
            return  DbHelper.ExecuteDataTable("usp_SaveCarouselItemWithImages", data);

        }

        public JObject getCarouselList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetHomeCarouselItemsGrid", para);
            if (ds.Tables.Count > 0)
            {
                rtnObj["data"] = JArray.FromObject(ds.Tables[0]);
            }
            if (ds.Tables.Count > 1)
            {
                rtnObj["meta"] = JArray.FromObject(ds.Tables[1]);
            }
            return rtnObj;
        }


        public JObject GetCarouselItemById(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetHomeCarouselItemDetails", para);
            if (ds.Tables.Count > 0)
            {
                rtnObj["data"] = JArray.FromObject(ds.Tables[0]);
            }
            if (ds.Tables.Count > 1)
            {
                rtnObj["imgdeta"] = JArray.FromObject(ds.Tables[1]);
            }
            return rtnObj;
        }
    }
}

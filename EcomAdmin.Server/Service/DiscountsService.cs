using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;

namespace EcomAdmin.Server.Service
{
    public class DiscountsService
    {
        public JObject getDiscountList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetDiscountsWithMetadata", para);
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
        public JObject saveDiscount(JObject data)
        {
            JObject rtnObj = new JObject();
            var jsonString = data.ToString(Newtonsoft.Json.Formatting.None);
            var param = new Dictionary<string, object> {{ "@Discount", jsonString }};

            var dt = DbHelper.ExecuteDataTable("usp_UpsertDiscountFull", param);
            rtnObj["data"] = JArray.FromObject(dt);
            return rtnObj;
        }

    }

}

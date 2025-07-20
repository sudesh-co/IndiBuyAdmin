using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace EcommerceAdmin.Server.DbHelpers
{
    public class DbHelper
    {
        private static string _connectionString = "Server=TUF-F15;Database=Ecommerce;Integrated Security=True;";
        public readonly IConfiguration _configuration;

        public DbHelper(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("Connection");
        }

        /// <summary>
        /// Executes a stored procedure and returns results as a DataTable.
        /// </summary>
        public static DataTable ExecuteDataTable(string procedureName, Dictionary<string, object>? parameters = null)
        {
            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new(procedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null)
            {
                foreach (var param in parameters)
                    cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
            }

            using SqlDataAdapter adapter = new(cmd);
            DataTable table = new();

            adapter.Fill(table);
            return table;
        }

        /// <summary>
        /// Executes a stored procedure and returns a DataSet (multiple tables).
        /// </summary>
        public static DataSet ExecuteDataSet(string procedureName, Dictionary<string, object>? parameters = null)
        {
            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new(procedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null)
            {
                foreach (var param in parameters)
                    cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
            }

            using SqlDataAdapter adapter = new(cmd);
            DataSet dataSet = new();
            adapter.Fill(dataSet);
            return dataSet;
        }

        /// <summary>
        /// Executes a stored procedure and maps results to a list of T using a provided mapper.
        /// </summary>
        public static List<T> ExecuteList<T>(string procedureName, Func<IDataReader, T> mapFunc, Dictionary<string, object>? parameters = null)
        {
            List<T> list = new();

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new(procedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null)
            {
                foreach (var param in parameters)
                    cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
            }

            conn.Open();
            using SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(mapFunc(reader));
            }

            return list;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

using Newtonsoft.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace thjodskra
{
    public class Function
    {
        const string TABLENAME_ENVIRONMENT_VARIABLE = "CitizenTable";
        const string ID_QUERY_STRING_NAME = "SSN";
        IDynamoDBContext DDBContext { get; set; }

        public Function()
        {
            var tableName = System.Environment.GetEnvironmentVariable(TABLENAME_ENVIRONMENT_VARIABLE);
            if (!string.IsNullOrEmpty(tableName))
            {
                AWSConfigsDynamoDB.Context.TypeMappings[typeof(Citizen)] = new Amazon.Util.TypeMapping(typeof(Citizen), tableName);
            }

            var config = new DynamoDBContextConfig { Conversion = DynamoDBEntryConversion.V2 };
            this.DDBContext = new DynamoDBContext(new AmazonDynamoDBClient(), config);
        }
        public Function(IDynamoDBContext context)
        {
            this.DDBContext = context;
        }

        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {

            string ssn = null;
            if (request.PathParameters != null && request.PathParameters.ContainsKey(ID_QUERY_STRING_NAME))
                ssn = request.PathParameters[ID_QUERY_STRING_NAME];
            else if (request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey(ID_QUERY_STRING_NAME))
                ssn = request.QueryStringParameters[ID_QUERY_STRING_NAME];

            if (string.IsNullOrEmpty(ssn))
            {
                return new APIGatewayProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Body = $"Missing required parameter {ID_QUERY_STRING_NAME}"
                };
            }

            context.Logger.LogLine($"Getting citizen {ssn}");
            var citizen = await DDBContext.LoadAsync<Citizen>(ssn);
            context.Logger.LogLine($"Found citizen: {citizen != null}");

            if (citizen == null)
            {
                return new APIGatewayProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

            context.Logger.LogLine($"Returning citizen: {citizen.Name}");

            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = JsonConvert.SerializeObject(citizen),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
            };
        }
    }
}

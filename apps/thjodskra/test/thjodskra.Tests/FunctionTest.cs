using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
using Amazon.DynamoDBv2.DataModel;

using Moq;
using Newtonsoft.Json;

using thjodskra;

namespace thjodskra.Tests
{
    public class FunctionTest
    {
        [Fact]
        public async Task TestGetCitizen()
        {
            var client = new Mock<IDynamoDBContext>();
            client.Setup(c => c.LoadAsync<Citizen>(It.IsAny<string>(), default).Result).Returns(new Citizen { SSN = "1234567890" });
            var function = new Function(client.Object);
            var context = new TestLambdaContext();
            var requestStr = File.ReadAllText("./SampleRequests/GetCitizen.json");
            var request = JsonConvert.DeserializeObject<APIGatewayProxyRequest>(requestStr);
            var response = await function.FunctionHandler(request, context);

            Assert.Equal(200, response.StatusCode);
            Assert.Equal("{\"SSN\":\"1234567890\",\"Name\":null,\"Address\":null,\"PostalCode\":108,\"Email\":null,\"Phone\":null,\"Children\":[],\"Spouse\":null}", response.Body);
        }
        [Fact]
        public async Task TestBadRequest()
        {
            var client = new Mock<IDynamoDBContext>();
            client.Setup(c => c.LoadAsync<Citizen>(It.IsAny<string>(), default).Result).Returns(new Citizen { SSN = "1234567890" });
            var function = new Function(client.Object);
            var context = new TestLambdaContext();
            var requestStr = File.ReadAllText("./SampleRequests/BadRequest.json");
            var request = JsonConvert.DeserializeObject<APIGatewayProxyRequest>(requestStr);
            var response = await function.FunctionHandler(request, context);

            Assert.Equal(400, response.StatusCode);
        }
        [Fact]
        public async Task TestCitizenNotFound()
        {
            var client = new Mock<IDynamoDBContext>();
            client.Setup(c => c.LoadAsync<Citizen>(It.IsAny<string>(), default).Result);
            var function = new Function(client.Object);
            var context = new TestLambdaContext();
            var requestStr = File.ReadAllText("./SampleRequests/GetCitizen.json");
            var request = JsonConvert.DeserializeObject<APIGatewayProxyRequest>(requestStr);
            var response = await function.FunctionHandler(request, context);

            Assert.Equal(404, response.StatusCode);
        }
    }
}

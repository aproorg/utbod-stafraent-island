using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;

using thjodskra;

namespace thjodskra.Tests
{
    public class FunctionTest
    {
        [Fact]
        public async void TestToUpperFunction()
        {

            // Invoke the lambda function and confirm the string was upper cased.
            var function = new Function();
            var context = new TestLambdaContext();
            var request = new APIGatewayProxyRequest
            {
                // PathParameters = new Dictionary<string, string>{"SSN" = "123456789"},
            };
            var response = await function.FunctionHandler(request, context);

            Assert.Equal(response.StatusCode, 200);
        }
    }
}

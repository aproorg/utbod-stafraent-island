using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;

namespace thjodskra
{
    public class Citizen
    {
        [DynamoDBHashKey]
        public string SSN { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<string> Children { get; set; }
        public string Spouse { get; set; }
    }
}

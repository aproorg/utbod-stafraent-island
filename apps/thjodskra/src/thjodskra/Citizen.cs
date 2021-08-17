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
        public int PostalCode { get; set; } = 108;
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<string> Children { get; set; } = new List<string>();
        public string Spouse { get; set; }
    }
}

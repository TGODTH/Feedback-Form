using System;
using System.Collections.Generic;

namespace feedback_api.Data
{

    public partial class FeedbacksTb
    {
        public string Pw { get; set; } = null!;

        public string Department { get; set; } = null!;

        public byte QG { get; set; }

        public byte QId { get; set; }

        public byte L1 { get; set; }

        public byte L2 { get; set; }

        public byte L3 { get; set; }

        public byte L4 { get; set; }

        public byte L5 { get; set; }

        public DateTime FirstDtm { get; set; }

        public DateTime LastDtm { get; set; }
    }
}
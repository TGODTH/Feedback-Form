using System;
using System.Collections.Generic;

namespace feedback_api.Data
{

    public partial class QuestionsTb
    {
        public byte QG { get; set; }

        public byte QId { get; set; }

        public string QName { get; set; } = null!;
    }
}
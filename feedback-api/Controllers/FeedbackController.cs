using System.Linq;
using System.Threading.Tasks;
using feedback_api.Data;
using feedback_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Text;
using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace feedback_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackDbContext _context;

        private readonly IConfiguration _configuration;
        public FeedbackController(FeedbackDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }


        private async Task CreateOrUpdateFeedback(string password, FeedbackDto feedback, DateTime submitTime)
        {
            var recordExist = this._context.FeedbacksTbs.Where(x => x.Pw == password && x.QG == feedback.QG && x.QId == feedback.QId).FirstOrDefault();

            if (recordExist != null)
            {
                recordExist.L1 = feedback.L1;
                recordExist.L2 = feedback.L2;
                recordExist.L3 = feedback.L3;
                recordExist.L4 = feedback.L4;
                recordExist.L5 = feedback.L5;
                recordExist.LastDtm = submitTime;
            }
            else
            {
                var newRecord = new FeedbacksTb
                {
                    Pw = password,
                    Department = await _context.EmployeesTbs
                        .Where(e => e.Pw == password)
                        .Select(e => e.Department)
                        .SingleOrDefaultAsync(),
                    QG = feedback.QG,
                    QId = feedback.QId,
                    L1 = feedback.L1,
                    L2 = feedback.L2,
                    L3 = feedback.L3,
                    L4 = feedback.L4,
                    L5 = feedback.L5,
                    FirstDtm = submitTime,
                    LastDtm = submitTime
                };
                _context.FeedbacksTbs.Add(newRecord);
            }
        }
        [HttpPost]
        public async Task<IActionResult> PostFeedback([FromQuery] string password, [FromQuery] string secretKey, [FromBody] List<FeedbackDto> feedbacksDto)

        {
            var key = _configuration.GetValue<string>("SECRET_KEY");
            if (secretKey != key)
            {
                return Unauthorized("Invalid secret key");
            }
            var submitTime = DateTime.Now;
            foreach (var feedback in feedbacksDto)
            {
                await CreateOrUpdateFeedback(password, feedback, submitTime);
            }
            _context.SaveChanges();
            return Ok();
        }

    }
}
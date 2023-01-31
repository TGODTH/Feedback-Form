using Microsoft.AspNetCore.Mvc;
using feedback_api.Data;
using System.Linq;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;


namespace feedback_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FeedbackDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(FeedbackDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Login([FromQuery] string password, [FromQuery] string secretKey)
        {
            var key = _configuration.GetValue<string>("SECRET_KEY");
            if (secretKey != key)
            {
                return Unauthorized("Invalid secret key");
            }
            var department = _context.EmployeesTbs
                .AsQueryable()
                .Where(e => e.Pw == password)
                .Select(e => e.Department)
                .FirstOrDefault();

            if (department == null)
            {
                return Unauthorized("Invalid password");
            }
            else
            {
                var departmentName = _context.DepartmentsTbs
                    .Where(d => d.Department == department)
                    .Select(d => d.Name)
                    .FirstOrDefault();

                var questionGroupTbs = _context.QuestionGroupTbs.ToList();
                var questionsTbs = _context.QuestionsTbs.ToList();

                var questions = questionGroupTbs.GroupJoin(
                        questionsTbs,
                        qg => qg.QG,
                        q => q.QG,
                        (qg, qs) => new
                        {
                            QuestionGroup = qg.QG,
                            QuestionGroupName = qg.QGname,
                            AllQuestions = qs.Select(q => q.QName)
                        }).ToList();
                return Ok(new { department, departmentName, questions });
            }
        }
    }
}

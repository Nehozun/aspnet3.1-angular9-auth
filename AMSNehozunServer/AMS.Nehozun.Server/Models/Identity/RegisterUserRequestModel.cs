﻿using System.ComponentModel.DataAnnotations;

namespace AMS.Nehozun.Server.Models.Identity
{
    public class RegisterUserRequestModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

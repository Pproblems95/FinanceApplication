using AutoMapper;
using Finance.Application.DTOs;
using Finance.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Finance.Application.Helper
{
    //Here you can add your dtos and models and map it using the automapper nugget package
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Transaction, TransactionDto>();
        }
    }
}

using HotelPMS.Controllers;
using HotelPMS.Models;
using HotelPMS.Models.Enums;
using HotelPMS.Repositories;
using HotelPMS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NuGet.ProjectModel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Tests.ServiceTests
{
    internal class CompanieserviceTests
    {
        private Mock<ICompanyRepository> _repository;
        private Mock<ILogger<CompaniesController>> _logger;
        private Mock<IRepositoryWrapper> _wrapper;
        private CompanyService _service;
        private List<Company> _list = new();
        private Company _item = new();

        private bool Equals(Company a1, Company a2)
        {
            return a1.Id.Equals(a2.Id)
                && a1.Code.Equals(a2.Code)
                && a1.Name.Equals(a2.Name)
                && a1.Logo.Equals(a2.Logo)
                && a1.Description.Equals(a2.Description);
        }
        public static Company Get(int id, string code, string name)
        {
            Company a = new();
            a.Id = id;
            a.Code = code;
            a.Name = name;
            a.Logo = "l";
            a.Description = "d";
            return a;
        }

        [OneTimeSetUp]
        public void Setup()
        {
            Company a1 = Get(1, "U", "UU");
            _item = a1;
            Company a2 = Get(2, "P", "PP");
            _list.Add(a1);
            _list.Add(a2);
            _logger = new Mock<ILogger<CompaniesController>>(MockBehavior.Strict);
            _repository = new Mock<ICompanyRepository>(MockBehavior.Strict);
            _wrapper = new Mock<IRepositoryWrapper>(MockBehavior.Strict);
            var su = new Mock<IUserService>(MockBehavior.Strict);
            var sh = new Mock<IHotelService>(MockBehavior.Strict);
            var ru = new Mock<IUserRepository>(MockBehavior.Strict);
            ru.Setup(w => w.GetByConditionAsync(hotel => hotel.CompanyId == 1)).Returns(Task.FromResult(new List<User>()));
            var rh = new Mock<IHotelRepository>(MockBehavior.Strict);
            rh.Setup(w => w.GetByConditionAsync(x => x.Id == 1)).Returns(Task.FromResult(new List<Hotel>()));
            _wrapper.Setup(w => w.Company).Returns(_repository.Object);
            _wrapper.Setup(w => w.User).Returns(ru.Object);
            _wrapper.Setup(w => w.Hotel).Returns(rh.Object);
            sh.Setup(r => r.DeleteAsync(1)).Returns(Task.FromResult(new Hotel()));
            su.Setup(r => r.DeleteAsync(1)).Returns(Task.FromResult(new User()));
            _service = new(_wrapper.Object, sh.Object, su.Object);
        }

        [Test]
        public async Task GetAll_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(_list));
            CompaniesController _controller = new(_logger.Object, _service);

            //Act
            List<Company> list = await _service.GetAllAsync();
            var res = _controller.Get();

            //Assert
            Assert.That(_list.Count, Is.EqualTo(2));
            Assert.That(Equals(_list.First(), list.First()));
            Assert.That(Equals(res.Result.Value.First(), _list.First()));
        }

        [Test]
        public async Task Get_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAsync(1)).Returns(Task.FromResult(_item));
            CompaniesController _controller = new(_logger.Object, _service);

            //Act
            Company item = await _service.GetByIdAsync(1);
            var res = _controller.Get(1);

            Assert.That(Equals(_list.First(), item));
            Assert.That(Equals(res.Result.Value, _list.First()));
        }

        [Test]
        public async Task Create_GoodData_PassAsync()
        {
            //Arrange
            Company a = Get(3, "T", "TT");
            _repository.Setup(r => r.AddAsync(a)).Returns(Task.FromResult(a));
            _repository.Setup(r => r.GetAsync(3)).Returns(Task.FromResult(a));
            CompaniesController _controller = new(_logger.Object, _service);

            //Act
            Company item = await _service.CreateAsync(a);
            var res = await _controller.Post(a);
            var temp = res.Result as CreatedAtActionResult;
            Assert.That(Equals(a, item));
            Assert.That(Equals(temp.Value, a));
        }

        [Test]
        public async Task Delete_GoodData_PassAsync()
        {
            //Arrange
            Company a = Get(3, "T", "TT");
            _repository.Setup(r => r.DeleteAsync(a.Id)).Returns(Task.FromResult(a));
            CompaniesController _controller = new(_logger.Object, _service);

            //Act
            Company item = await _service.DeleteAsync(a.Id);
            var res = await _controller.Delete(a.Id);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task Update_GoodData_PassAsync()
        {
            //Arrange
            Company a = Get(3, "T", "TT");
            _repository.Setup(r => r.UpdateAsync(a)).Returns(Task.FromResult(a));
            CompaniesController _controller = new(_logger.Object, _service);

            //Act
            Company item = await _service.UpdateAsync(a);
            var res = await _controller.Put(a);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task GetCondition_GoodData_PassAsync()
        {
            //Arrange
            Company a = Get(3, "T", "TT");
            _repository.Setup(r => r.GetByConditionAsync(x => x.Id == 3)).Returns(Task.FromResult(new List<Company> { a }));

            //Act
            List<Company> list = await _service.GetByConditionAsync(x => x.Id == 3);
            Assert.That(Equals(a, list.First()));
        }
    }
}

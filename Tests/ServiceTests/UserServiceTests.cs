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
    internal class UserServiceTests
    {
        private Mock<IUserRepository> _repository;
        private Mock<ILogger<UsersController>> _logger;
        private Mock<IRepositoryWrapper> _wrapper;
        private UserService _service;
        private List<User> _list = new();
        private User _item = new();

        private bool Equals(User a1, User a2)
        {
            return a1.Id.Equals(a2.Id)
                && a1.Name.Equals(a2.Name)
                && a1.Surname.Equals(a2.Surname)
                && a1.Gender.Equals(a2.Gender)
                && a1.Email.Equals(a2.Email)
                && a1.PhoneNumber.Equals(a2.PhoneNumber)
                && a1.ServiceType.Equals(a2.ServiceType)
                && a1.AccountId.Equals(a2.AccountId)
                && a1.CompanyId.Equals(a2.CompanyId)
                && a1.HotelId.Equals(a2.HotelId);
        }
        private User Get(int id, string name, string sname)
        {
            User a = new();
            a.Id = id;
            a.Name = name;
            a.Surname = sname;
            a.Gender = Gender.Woman;
            a.Email = "e@g.lt";
            a.PhoneNumber = "12345";
            a.ServiceType = ServiceType.Cleaning;
            a.AccountId = 1;
            a.CompanyId = 1;
            a.HotelId = 1;
            return a;
        }

        [OneTimeSetUp]
        public void Setup()
        {
            User a1 = Get(1, "U", "UU");
            _item = a1;
            User a2 = Get(2, "P", "PP");
            _list.Add(a1);
            _list.Add(a2);
            _logger = new Mock<ILogger<UsersController>>(MockBehavior.Strict);
            _repository = new Mock<IUserRepository>(MockBehavior.Strict);
            _wrapper = new Mock<IRepositoryWrapper>(MockBehavior.Strict);
            _wrapper.Setup(w => w.User).Returns(_repository.Object);
            _service = new(_wrapper.Object);
            var repo = new Mock<IAccountRepository>(MockBehavior.Strict);
            Account a = AccountServiceTests.Get(3, "T", "TT");
            repo.Setup(r => r.GetAsync(1)).Returns(Task.FromResult(a));
            _wrapper.Setup(w => w.Account).Returns(repo.Object);
        }

        [Test]
        public async Task GetAll_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(_list));
            UsersController _controller = new(_logger.Object, _service);

            //Act
            List<User> list = await _service.GetAllAsync();
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
            UsersController _controller = new(_logger.Object, _service);

            //Act
            User item = await _service.GetByIdAsync(1);
            var res = _controller.Get(1);

            Assert.That(Equals(_list.First(), item));
            Assert.That(Equals(res.Result.Value, _list.First()));
        }

        [Test]
        public async Task Create_GoodData_PassAsync()
        {
            //Arrange
            User a = Get(3, "T", "TT");
            _repository.Setup(r => r.AddAsync(a)).Returns(Task.FromResult(a));
            _repository.Setup(r => r.GetAsync(3)).Returns(Task.FromResult(a));
            UsersController _controller = new(_logger.Object, _service);

            //Act
            User item = await _service.CreateAsync(a);
            var res = await _controller.Post(a);
            var temp = res.Result as CreatedAtActionResult;
            Assert.That(Equals(a, item));
            Assert.That(Equals(temp.Value, a));
        }

        [Test]
        public async Task Delete_GoodData_PassAsync()
        {
            //Arrange
            User a = Get(3, "T", "TT");
            _repository.Setup(r => r.DeleteAsync(a.Id)).Returns(Task.FromResult(a));
            UsersController _controller = new(_logger.Object, _service);

            //Act
            User item = await _service.DeleteAsync(a.Id);
            var res = await _controller.Delete(a.Id);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task Update_GoodData_PassAsync()
        {
            //Arrange
            User a = Get(3, "T", "TT");
            _repository.Setup(r => r.UpdateAsync(a)).Returns(Task.FromResult(a));
            UsersController _controller = new(_logger.Object, _service);

            //Act
            User item = await _service.UpdateAsync(a);
            var res = await _controller.Put(a);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task GetCondition_GoodData_PassAsync()
        {
            //Arrange
            User a = Get(3, "T", "TT");
            _repository.Setup(r => r.GetByConditionAsync(x => x.Id == 3)).Returns(Task.FromResult(new List<User> { a }));

            //Act
            List<User> list = await _service.GetByConditionAsync(x => x.Id == 3);
            Assert.That(Equals(a, list.First()));
        }
    }
}

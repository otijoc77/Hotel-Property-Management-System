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
    internal class AccountServiceTests
    {
        private Mock<IAccountRepository> _repository;
        private Mock<ILogger<AccountsController>> _logger;
        private Mock<IRepositoryWrapper> _wrapper;
        private AccountService _service;
        private List<Account> _list = new();
        private Account _item = new();

        private bool Equals(Account a1, Account a2)
        {
            return a1.Id.Equals(a2.Id)
                && a1.Username.Equals(a2.Username)
                && a1.Password.Equals(a2.Password)
                && a1.Level.Equals(a2.Level)
                && a1.Created.Equals(a2.Created)
                && a1.Temporary.Equals(a2.Temporary);
        }
        public static Account Get(int id, string user, string pass)
        {
            Account a = new();
            a.Id = id;
            a.Username = user;
            a.Password = pass;
            a.Level = AccountLevel.Client;
            a.Created = DateTime.Today;
            a.Temporary = true;
            return a;
        }

        [OneTimeSetUp]
        public void Setup()
        {
            Account a1 = Get(1, "U", "UU");
            _item = a1;
            Account a2 = Get(2, "P", "PP");
            _list.Add(a1);
            _list.Add(a2);
            _logger = new Mock<ILogger<AccountsController>>(MockBehavior.Strict);
            _repository = new Mock<IAccountRepository>(MockBehavior.Strict);
            _wrapper = new Mock<IRepositoryWrapper>(MockBehavior.Strict);
            _wrapper.Setup(w => w.Account).Returns(_repository.Object);
            _service = new(_wrapper.Object);
        }

        [Test]
        public async Task GetAll_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(_list));
            AccountsController _controller = new(_logger.Object, _service);

            //Act
            List<Account> list = await _service.GetAllAsync();
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
            AccountsController _controller = new(_logger.Object, _service);

            //Act
            Account item = await _service.GetByIdAsync(1);
            var res = _controller.Get(1);

            Assert.That(Equals(_list.First(), item));
            Assert.That(Equals(res.Result.Value, _list.First()));
        }

        [Test]
        public async Task Create_GoodData_PassAsync()
        {
            //Arrange
            Account a = Get(3, "T", "TT");
            _repository.Setup(r => r.AddAsync(a)).Returns(Task.FromResult(a));
            _repository.Setup(r => r.GetAsync(3)).Returns(Task.FromResult(a));
            AccountsController _controller = new(_logger.Object, _service);

            //Act
            Account item = await _service.CreateAsync(a);
            var res = await _controller.Post(a);
            var temp = res.Result as CreatedAtActionResult;
            Assert.That(Equals(a, item));
            Assert.That(Equals(temp.Value, a));
        }

        [Test]
        public async Task Delete_GoodData_PassAsync()
        {
            //Arrange
            Account a = Get(3, "T", "TT");
            _repository.Setup(r => r.DeleteAsync(a.Id)).Returns(Task.FromResult(a));
            AccountsController _controller = new(_logger.Object, _service);

            //Act
            Account item = await _service.DeleteAsync(a.Id);
            var res = await _controller.Delete(a.Id);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task Update_GoodData_PassAsync()
        {
            //Arrange
            Account a = Get(3, "T", "TT");
            _repository.Setup(r => r.UpdateAsync(a)).Returns(Task.FromResult(a));
            AccountsController _controller = new(_logger.Object, _service);

            //Act
            Account item = await _service.UpdateAsync(a);
            var res = await _controller.Put(a);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task GetCondition_GoodData_PassAsync()
        {
            //Arrange
            Account a = Get(3, "T", "TT");
            _repository.Setup(r => r.GetByConditionAsync(x => x.Id == 3)).Returns(Task.FromResult(new List<Account> { a }));

            //Act
            List<Account> list = await _service.GetByConditionAsync(x => x.Id == 3);
            Assert.That(Equals(a, list.First()));
        }
    }
}

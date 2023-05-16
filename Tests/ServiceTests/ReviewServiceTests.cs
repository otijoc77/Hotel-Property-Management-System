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
    internal class ReviewServiceTests
    {
        private Mock<IReviewRepository> _repository;
        private Mock<ILogger<ReviewsController>> _logger;
        private Mock<IRepositoryWrapper> _wrapper;
        private ReviewService _service;
        private List<Review> _list = new();
        private Review _item = new();

        private bool Equals(Review a1, Review a2)
        {
            return a1.Id.Equals(a2.Id)
                && a1.Date.Equals(a2.Date)
                && a1.Rating.Equals(a2.Rating)
                && a1.Text.Equals(a2.Text)
                && a1.Anonymous.Equals(a2.Anonymous)
                && a1.HotelId.Equals(a2.HotelId)
                && a1.UserId.Equals(a2.UserId);
        }
        public static Review Get(int id)
        {
            Review a = new();
            a.Id = id;
            a.Date = DateTime.Today;
            a.Rating = 3;
            a.Text = "t";
            a.Anonymous = true;
            a.HotelId = 1;
            a.UserId = 1;
            return a;
        }

        [OneTimeSetUp]
        public void Setup()
        {
            Review a1 = Get(1);
            _item = a1;
            Review a2 = Get(2);
            _list.Add(a1);
            _list.Add(a2);
            _logger = new Mock<ILogger<ReviewsController>>(MockBehavior.Strict);
            _repository = new Mock<IReviewRepository>(MockBehavior.Strict);
            _wrapper = new Mock<IRepositoryWrapper>(MockBehavior.Strict);
            _wrapper.Setup(w => w.Review).Returns(_repository.Object);
            _service = new(_wrapper.Object);
        }

        [Test]
        public async Task GetAll_GoodData_PassAsync()
        {
            //Arrange
            _repository.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(_list));
            ReviewsController _controller = new(_logger.Object, _service);

            //Act
            List<Review> list = await _service.GetAllAsync();
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
            ReviewsController _controller = new(_logger.Object, _service);

            //Act
            Review item = await _service.GetByIdAsync(1);
            var res = _controller.Get(1);

            Assert.That(Equals(_list.First(), item));
            Assert.That(Equals(res.Result.Value, _list.First()));
        }

        [Test]
        public async Task Create_GoodData_PassAsync()
        {
            //Arrange
            Review a = Get(3);
            _repository.Setup(r => r.AddAsync(a)).Returns(Task.FromResult(a));
            _repository.Setup(r => r.GetAsync(3)).Returns(Task.FromResult(a));
            ReviewsController _controller = new(_logger.Object, _service);

            //Act
            Review item = await _service.CreateAsync(a);
            var res = await _controller.Post(a);
            var temp = res.Result as CreatedAtActionResult;
            Assert.That(Equals(a, item));
            Assert.That(Equals(temp.Value, a));
        }

        [Test]
        public async Task Delete_GoodData_PassAsync()
        {
            //Arrange
            Review a = Get(3);
            _repository.Setup(r => r.DeleteAsync(a.Id)).Returns(Task.FromResult(a));
            ReviewsController _controller = new(_logger.Object, _service);

            //Act
            Review item = await _service.DeleteAsync(a.Id);
            var res = await _controller.Delete(a.Id);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task Update_GoodData_PassAsync()
        {
            //Arrange
            Review a = Get(3);
            _repository.Setup(r => r.UpdateAsync(a)).Returns(Task.FromResult(a));
            ReviewsController _controller = new(_logger.Object, _service);

            //Act
            Review item = await _service.UpdateAsync(a);
            var res = await _controller.Put(a);
            Assert.That(Equals(a, item));
            Assert.That(Equals(res.Value, a));
        }

        [Test]
        public async Task GetCondition_GoodData_PassAsync()
        {
            //Arrange
            Review a = Get(3);
            _repository.Setup(r => r.GetByConditionAsync(x => x.Id == 3)).Returns(Task.FromResult(new List<Review> { a }));

            //Act
            List<Review> list = await _service.GetByConditionAsync(x => x.Id == 3);
            Assert.That(Equals(a, list.First()));
        }
    }
}
